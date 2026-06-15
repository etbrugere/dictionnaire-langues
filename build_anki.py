#!/usr/bin/env python3
"""
build_anki.py — Genere un deck Anki (.apkg) par langue a partir de index.html.

POURQUOI index.html et pas les *_import.json ?
  C'est dans index.html que tu fais ton travail de traduction (ETAPE 7) :
  `translation` et `phrase_fr` y sont en FRANCAIS, alors que les JSON gardent
  l'anglais du site. On lit donc le dictionnaire FINAL pour avoir des cartes
  propres et francaises. Concretement on lit le tableau `const INITIAL_DATA`.

Place dans le pipeline (cf GUIDE_WORKFLOW.md) : APRES avoir traduit phrase_fr.

  extract_vocab.py -> select_phrase.py -> inject_vocab.py -> (traduire phrase_fr)
                                                          \\-> build_anki.py -> *.apkg

Ce que fait le script :
  - Un deck par langue : "Vocabulaire::Russe", "Vocabulaire::Japonais", ...
  - 2 cartes "reception" par mot, AVEC audio :
        * Mot    -> Sens   (tu vois/entends le mot, tu donnes le sens)
        * Phrase -> Sens   (idem avec la phrase d'exemple)
  - Option --production : ajoute la carte inverse Sens -> Mot
  - Embarque les MP3 references (audio_word + audio_phrase) dans le .apkg

Idempotence (le point cle pour la mise a jour hebdo) :
  Le GUID de chaque note est derive de l'`id` de l'entree (ex: "ru_funt").
  Quand tu re-importes un .apkg dans Anki :
    - une note dont le GUID existe deja  -> mise a jour (PAS de doublon)
    - une note nouvelle                  -> ajoutee
  Donc le workflow hebdo se resume a : relancer le script, re-importer.

Prerequis : pip install genanki

Usage :
  python build_anki.py --all --combined
  python build_anki.py --lang ru
  python build_anki.py --lang ja --production
  python build_anki.py --all --out "C:\\Users\\brugere\\Documents\\Workspace\\dictionnaire-langues\\anki"

Astuce test (hors PC Windows) : definir DICT_BASE_DIR vers le dossier projet.
"""

import argparse
import hashlib
import os
import re
import shutil
import sys
import tempfile
from pathlib import Path

try:
    import genanki
except ImportError:
    sys.exit("Module 'genanki' manquant.  Installe-le :  pip install genanki")

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

# ─── CONFIG ───────────────────────────────────────────────────────────────────

BASE_DIR = Path(os.environ.get(
    "DICT_BASE_DIR",
    r"C:\Users\brugere\Documents\Workspace\dictionnaire-langues",
))
HTML_FILE = BASE_DIR / "index.html"

LANGS = ["ru", "ja", "zh", "pl", "pt", "de", "es"]

LANG_NAMES = {
    "ru": "Russe", "ja": "Japonais", "zh": "Mandarin", "pl": "Polonais",
    "pt": "Portugais", "de": "Allemand", "es": "Espagnol",
}

PARENT_DECK = "Vocabulaire"          # deck parent (sous-decks par langue)


# ─── IDs STABLES ──────────────────────────────────────────────────────────────
# genanki exige des entiers stables pour model_id / deck_id : si on en regenere
# de nouveaux a chaque execution, Anki cree un nouveau deck/modele a chaque import.
# On les derive donc de maniere DETERMINISTE d'une chaine (md5), jamais via hash().

def stable_id(name: str) -> int:
    return int(hashlib.md5(name.encode("utf-8")).hexdigest()[:12], 16)


def deck_id_for(lang: str) -> int:
    return stable_id(f"dict-langues::deck::{lang}")


# ─── PARSEUR index.html (tableau INITIAL_DATA) ────────────────────────────────
# Les entrees sont des objets JS { cle: "valeur", ... } : toutes les valeurs
# sont des chaines entre guillemets. On scanne caractere par caractere pour
# gerer correctement les guillemets echappes (\") et les commentaires // ...
# (qui peuvent contenir des guillemets sans qu'on s'y trompe).

def extract_initial_data(html: str) -> str:
    """Retourne le texte du tableau entre 'const INITIAL_DATA = [' et le '];'."""
    m = re.search(r"const\s+INITIAL_DATA\s*=\s*\[", html)
    if not m:
        return ""
    rest = html[m.end():]
    end = rest.find("\n];")
    if end == -1:
        end = rest.find("];")
    return rest[:end] if end != -1 else rest


def split_objects(array_text: str):
    """Decoupe le texte du tableau en blocs d'objets de 1er niveau { ... }."""
    objs = []
    depth = 0
    in_str = esc = line_comment = False
    buf = []
    i, n = 0, len(array_text)
    while i < n:
        c = array_text[i]
        nxt = array_text[i + 1] if i + 1 < n else ""

        if line_comment:
            if c == "\n":
                line_comment = False
            i += 1
            continue
        if in_str:
            buf.append(c)
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                in_str = False
            i += 1
            continue
        # hors chaine
        if c == "/" and nxt == "/":
            line_comment = True
            i += 2
            continue
        if c == '"':
            in_str = True
            buf.append(c)
            i += 1
            continue
        if c == "{":
            depth += 1
            if depth == 1:
                buf = ["{"]
                i += 1
                continue
        elif c == "}":
            depth -= 1
            if depth == 0:
                buf.append("}")
                objs.append("".join(buf))
                buf = []
                i += 1
                continue
        if depth >= 1:
            buf.append(c)
        i += 1
    return objs


def _unescape_js(s: str) -> str:
    out = s.replace('\\"', '"').replace("\\\\", "\\")
    return out.replace("\\n", " ").replace("\\t", " ").replace("\\r", "")


_PAIR_RE = re.compile(r'(\w+)\s*:\s*"((?:\\.|[^"\\])*)"')


def parse_object(obj_text: str) -> dict:
    return {m.group(1): _unescape_js(m.group(2)) for m in _PAIR_RE.finditer(obj_text)}


def load_entries_from_html(html_path: Path):
    if not html_path.exists():
        sys.exit(f"index.html introuvable : {html_path}")
    html = html_path.read_text(encoding="utf-8")
    array_text = extract_initial_data(html)
    if not array_text:
        sys.exit("Tableau 'const INITIAL_DATA = [...]' introuvable dans index.html.")
    entries = [parse_object(o) for o in split_objects(array_text)]
    return [e for e in entries if e.get("id") and e.get("lang")]


# ─── MODELE (note type) ───────────────────────────────────────────────────────

FIELDS = [
    "ID", "Mot", "Lecture", "Roman", "Traditionnel", "Ton",
    "Traduction", "Categorie", "Genre", "AudioMot",
    "Phrase", "PhraseLecture", "PhraseRoman", "PhraseTrad",
    "PhraseTraduction", "AudioPhrase", "Notes",
]

CSS = """
.card { font-family: -apple-system, "Segoe UI", Roboto, sans-serif;
        font-size: 20px; text-align: center; color: #1d1d1f;
        background: #ffffff; }
.nightMode .card { color: #f2f2f2; background: #1e1e1e; }
.big       { font-size: 40px; font-weight: 600; margin: 8px 0; }
.reading   { font-size: 22px; color: #5b6dd8; }
.roman     { font-size: 18px; color: #888; font-style: italic; }
.ton       { font-size: 15px; color: #b0820a; letter-spacing: 1px; }
.trad-han  { font-size: 18px; color: #999; }
.sens      { font-size: 26px; margin: 6px 0; }
.meta      { font-size: 14px; color: #999; margin-top: 4px; }
.phrase-box{ margin-top: 16px; padding: 12px; border-radius: 10px;
             background: #f5f6fa; display: inline-block; }
.nightMode .phrase-box { background: #2a2a2a; }
.phrase    { font-size: 24px; }
.phrase-sub{ font-size: 16px; color: #888; }
.phrase-fr { font-size: 17px; color: #555; margin-top: 4px; }
.nightMode .phrase-fr { color: #bbb; }
.notes     { font-size: 13px; color: #aaa; margin-top: 10px; }
hr#answer  { border: none; border-top: 1px solid #ddd; margin: 14px 0; }
"""

CARD_MOT_SENS = {
    "name": "Mot -> Sens",
    "qfmt": '<div class="big">{{Mot}}</div>\n{{AudioMot}}',
    "afmt": """{{FrontSide}}
<hr id="answer">
{{#Lecture}}<div class="reading">{{Lecture}}</div>{{/Lecture}}
{{#Roman}}<div class="roman">{{Roman}}</div>{{/Roman}}
{{#Ton}}<div class="ton">{{Ton}}</div>{{/Ton}}
<div class="sens">{{Traduction}}</div>
<div class="meta">{{Categorie}}{{#Genre}} · {{Genre}}{{/Genre}}</div>
{{#Traditionnel}}<div class="trad-han">繁 {{Traditionnel}}</div>{{/Traditionnel}}
{{#Phrase}}<div class="phrase-box">
  <div class="phrase">{{Phrase}}</div>
  {{AudioPhrase}}
  {{#PhraseLecture}}<div class="phrase-sub">{{PhraseLecture}}</div>{{/PhraseLecture}}
  {{#PhraseRoman}}<div class="phrase-sub">{{PhraseRoman}}</div>{{/PhraseRoman}}
  <div class="phrase-fr">{{PhraseTraduction}}</div>
</div>{{/Phrase}}
{{#Notes}}<div class="notes">{{Notes}}</div>{{/Notes}}""",
}

CARD_PHRASE_SENS = {
    "name": "Phrase -> Sens",
    "qfmt": '{{#Phrase}}<div class="phrase big">{{Phrase}}</div>\n{{AudioPhrase}}{{/Phrase}}',
    "afmt": """{{FrontSide}}
<hr id="answer">
{{#PhraseLecture}}<div class="phrase-sub">{{PhraseLecture}}</div>{{/PhraseLecture}}
{{#PhraseRoman}}<div class="phrase-sub">{{PhraseRoman}}</div>{{/PhraseRoman}}
<div class="phrase-fr">{{PhraseTraduction}}</div>
<hr>
<div class="meta">mot : <b>{{Mot}}</b>{{#Roman}} ({{Roman}}){{/Roman}} — {{Traduction}}</div>""",
}

CARD_SENS_MOT = {
    "name": "Sens -> Mot",
    "qfmt": '<div class="sens big">{{Traduction}}</div>\n'
            '<div class="meta">{{Categorie}}{{#Genre}} · {{Genre}}{{/Genre}}</div>',
    "afmt": """{{FrontSide}}
<hr id="answer">
<div class="big">{{Mot}}</div>
{{#Lecture}}<div class="reading">{{Lecture}}</div>{{/Lecture}}
{{#Roman}}<div class="roman">{{Roman}}</div>{{/Roman}}
{{#Ton}}<div class="ton">{{Ton}}</div>{{/Ton}}
{{AudioMot}}
{{#Phrase}}<div class="phrase-box">
  <div class="phrase">{{Phrase}}</div>{{AudioPhrase}}
  <div class="phrase-fr">{{PhraseTraduction}}</div>
</div>{{/Phrase}}""",
}


def build_model(production: bool) -> genanki.Model:
    if production:
        templates = [CARD_MOT_SENS, CARD_PHRASE_SENS, CARD_SENS_MOT]
        name = "Vocab Langues (reception + production)"
        mid = stable_id("dict-langues::model::full::v1")
    else:
        templates = [CARD_MOT_SENS, CARD_PHRASE_SENS]
        name = "Vocab Langues (reception)"
        mid = stable_id("dict-langues::model::reception::v1")
    return genanki.Model(
        mid, name,
        fields=[{"name": f} for f in FIELDS],
        templates=templates,
        css=CSS,
        sort_field_index=1,   # tri par "Mot" dans le navigateur Anki
    )


# ─── MEDIA ────────────────────────────────────────────────────────────────────

class MediaCollector:
    """Copie les MP3 references vers un dossier temp avec un nom prefixe par la
    langue (anti-collision dans un .apkg combine) et renvoie la balise
    [sound:...] a mettre dans le champ."""

    def __init__(self):
        self.tmp = Path(tempfile.mkdtemp(prefix="anki_media_"))
        self.files = {}          # nom_dans_apkg -> chemin_temp
        self.missing = 0

    def sound(self, lang: str, rel_path: str) -> str:
        if not rel_path:
            return ""
        src = BASE_DIR / rel_path
        if not src.exists():
            self.missing += 1
            print(f"    audio absent : {rel_path}")
            return ""
        target = f"{lang}_{Path(rel_path).name}"
        if target not in self.files:
            shutil.copy2(src, self.tmp / target)
            self.files[target] = self.tmp / target
        return f"[sound:{target}]"

    def paths(self):
        return [str(p) for p in self.files.values()]

    def cleanup(self):
        shutil.rmtree(self.tmp, ignore_errors=True)


# ─── CONSTRUCTION DES NOTES ───────────────────────────────────────────────────

def entry_to_note(e: dict, model: genanki.Model, media: MediaCollector):
    lang = e.get("lang", "")
    fields = [
        e.get("id", ""),
        e.get("word", ""),
        e.get("reading", ""),
        e.get("roman", ""),
        e.get("trad", ""),
        e.get("ton", ""),
        e.get("translation", ""),
        e.get("category", ""),
        e.get("genre", ""),
        media.sound(lang, e.get("audio_word", "")),
        e.get("phrase", ""),
        e.get("phrase_reading", ""),
        e.get("phrase_roman", ""),
        e.get("phrase_trad", ""),
        e.get("phrase_fr", ""),
        media.sound(lang, e.get("audio_phrase", "")),
        e.get("notes", ""),
    ]
    return genanki.Note(
        model=model,
        fields=fields,
        guid=genanki.guid_for(e.get("id", "")),   # idempotence
        tags=[f"langue::{lang}"],
    )


# ─── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser(
        description="Genere un deck Anki (.apkg) par langue depuis index.html")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--lang", choices=LANGS, help="Une seule langue")
    g.add_argument("--all", action="store_true", help="Toutes les langues")
    ap.add_argument("--production", action="store_true",
                    help="Ajoute la carte inverse Sens -> Mot")
    ap.add_argument("--out", default=None,
                    help="Dossier de sortie des .apkg (defaut : <projet>/anki)")
    ap.add_argument("--combined", action="store_true",
                    help="Avec --all : un seul .apkg contenant tous les sous-decks "
                         "(plus simple a re-importer chaque semaine)")
    args = ap.parse_args()

    out_dir = Path(args.out) if args.out else (BASE_DIR / "anki")
    out_dir.mkdir(parents=True, exist_ok=True)

    model = build_model(args.production)

    print(f"\nGeneration Anki  |  modele : {model.name}")
    print(f"Source : {HTML_FILE}")
    print(f"Sortie : {out_dir}\n")

    all_entries = load_entries_from_html(HTML_FILE)
    media = MediaCollector()
    try:
        decks = []
        for lang in (LANGS if args.all else [args.lang]):
            sub = [e for e in all_entries if e.get("lang") == lang]
            if not sub:
                continue
            deck = genanki.Deck(deck_id_for(lang), f"{PARENT_DECK}::{LANG_NAMES[lang]}")
            for e in sub:
                deck.add_note(entry_to_note(e, model, media))
            print(f"  {LANG_NAMES[lang]:<10} : {len(sub)} note(s)")
            decks.append((lang, deck))

        if not decks:
            print("\nAucune entree a exporter (verifie index.html / --lang).")
            return

        media_paths = media.paths()

        if args.all and args.combined:
            pkg = genanki.Package([d for _, d in decks])
            pkg.media_files = media_paths
            out = out_dir / "vocabulaire_langues.apkg"
            pkg.write_to_file(out)
            print(f"\nOK -> {out.name}  ({len(media_paths)} fichier(s) audio embarque(s))")
        else:
            for lang, deck in decks:
                pkg = genanki.Package(deck)
                pkg.media_files = [p for p in media_paths
                                   if Path(p).name.startswith(f"{lang}_")]
                out = out_dir / f"{lang}.apkg"
                pkg.write_to_file(out)
                print(f"  -> {out.name}  ({len(pkg.media_files)} audio)")
            print("\nOK")

        if media.missing:
            print(f"\nNote : {media.missing} fichier(s) audio manquant(s) "
                  f"(champ audio laisse vide dans la carte).")

        print("\nImport dans Anki : Fichier > Importer… (ou double-clic sur le .apkg).")
        print("Re-importer plus tard met a jour les notes existantes, sans doublon.")
    finally:
        media.cleanup()


if __name__ == "__main__":
    main()
