#!/usr/bin/env python3
"""
inject_vocab.py — Injection des JSON *_import.json dans index.html

- Injecte les nouvelles entrées dans le tableau `words`
- La première phrase → champs standards phrase/phrase_roman/phrase_fr/audio_phrase
- Les phrases suivantes → commentaires JS APRES la virgule de l'objet
- Ne réinjecte pas les entrées déjà présentes (vérification par id)
- Crée un backup horodaté avant chaque modification

Usage:
  python inject_vocab.py --lang ru
  python inject_vocab.py --lang zh
  python inject_vocab.py --all
"""

import argparse
import json
import re
import shutil
from datetime import datetime
from pathlib import Path

# ─── CONFIG ───────────────────────────────────────────────────────────────────

BASE_DIR = Path(r"C:\Users\brugere\Documents\Workspace\dictionnaire-langues")
HTML_FILE = BASE_DIR / "index.html"

LANG_CONFIG = {
    "ru": BASE_DIR / "ru_import.json",
    "ja": BASE_DIR / "ja_import.json",
    "zh": BASE_DIR / "zh_import.json",
    "pl": BASE_DIR / "pl_import.json",
    "pt": BASE_DIR / "pt_import.json",
}

LANG_COMMENTS = {
    "ru": "// RUSSE",
    "ja": "// JAPONAIS",
    "zh": "// MANDARIN",
    "pl": "// POLONAIS",
    "pt": "// PORTUGAIS BR",
}


# ─── UTILITAIRES ──────────────────────────────────────────────────────────────

def load_json(path):
    if not path.exists():
        print(f"  ✗ Fichier JSON introuvable : {path}")
        return []
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def backup_html(html_path):
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup = html_path.parent / f"index.backup.{ts}.html"
    shutil.copy2(html_path, backup)
    print(f"  💾 Backup : {backup.name}")


def read_html(html_path):
    with open(html_path, encoding="utf-8") as f:
        return f.read()


def write_html(html_path, content):
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(content)


def get_existing_ids(html_content):
    return set(re.findall(r'id:\s*"([^"]+)"', html_content))


def esc(s):
    return str(s).replace("\\", "\\\\").replace('"', '\\"').replace('\r', '').replace('\n', ' ').strip()


# ─── FORMATAGE ────────────────────────────────────────────────────────────────

def phrase_to_comment(ph, lang, index):
    """Formate une phrase supplémentaire en commentaire JS sur une ligne."""
    parts = [f'phrase_{index}: "{esc(ph.get("text",""))}"']
    if lang == "ja" and ph.get("reading"):
        parts.append(f'reading: "{esc(ph.get("reading",""))}"')
    if lang in ("ru", "ja", "zh") and ph.get("roman"):
        parts.append(f'roman: "{esc(ph.get("roman",""))}"')
    if lang == "zh" and ph.get("trad") and ph.get("trad") != ph.get("text"):
        parts.append(f'trad: "{esc(ph.get("trad",""))}"')
    if ph.get("translation"):
        parts.append(f'transl: "{esc(ph.get("translation",""))}"')
    if ph.get("audio"):
        parts.append(f'audio: "{esc(ph.get("audio",""))}"')
    return "  // " + " | ".join(parts)


def entry_to_js(entry):
    """
    Retourne (objet_js, commentaires_extra).
    objet_js      : le bloc { ... } — sans virgule, sans commentaires
    commentaires  : string avec les phrases extra en // (peut être vide)

    La virgule est placée par inject_entries ENTRE objet_js et commentaires,
    ce qui donne :
        { ... },          <- virgule ici, JS valide
        // phrase_2: ...  <- commentaire après, inoffensif
    """
    lang = entry.get("lang", "")
    phrases = entry.get("phrases", [])
    first = phrases[0] if phrases else {}
    extra = phrases[1:] if len(phrases) > 1 else []

    lines = ["{"]
    lines.append(f'    id: "{esc(entry.get("id",""))}", lang: "{lang}", niveau: "{esc(entry.get("niveau","Nouveau"))}",')
    lines.append(f'    word: "{esc(entry.get("word",""))}",')

    if lang == "ja":
        lines.append(f'    reading: "{esc(entry.get("reading",""))}",')
        lines.append(f'    roman: "{esc(entry.get("roman",""))}",')
    elif lang == "zh":
        lines.append(f'    trad: "{esc(entry.get("trad",""))}",')
        lines.append(f'    roman: "{esc(entry.get("roman",""))}",')
        lines.append(f'    ton: "{esc(entry.get("ton",""))}", ton_symbol: "{esc(entry.get("ton_symbol",""))}",')
    elif lang == "ru":
        lines.append(f'    roman: "{esc(entry.get("roman",""))}",')
        if entry.get("genre"):
            lines.append(f'    genre: "{esc(entry.get("genre",""))}",')
    elif lang in ("pl", "pt"):
        if entry.get("genre"):
            lines.append(f'    genre: "{esc(entry.get("genre",""))}",')

    lines.append(f'    translation: "{esc(entry.get("translation",""))}", category: "{esc(entry.get("category","nom"))}",')
    lines.append(f'    phrase: "{esc(first.get("text",""))}",')
    if lang == "ja" and first.get("reading"):
        lines.append(f'    phrase_reading: "{esc(first.get("reading",""))}",')
    if lang in ("ru", "ja", "zh") and first.get("roman"):
        lines.append(f'    phrase_roman: "{esc(first.get("roman",""))}",')
    if lang == "zh" and first.get("trad") and first.get("trad") != first.get("text"):
        lines.append(f'    phrase_trad: "{esc(first.get("trad",""))}",')
    lines.append(f'    phrase_fr: "{esc(first.get("translation",""))}",')
    lines.append(f'    audio_word: "{esc(entry.get("audio_word",""))}", audio_phrase: "{esc(first.get("audio",""))}",')
    lines.append(f'    notes: ""')
    lines.append("  }")

    obj = "\n".join(lines)

    # Commentaires pour phrases extra — séparés de l'objet
    comments = ""
    if extra:
        clines = [f"  // ── Autres phrases pour '{esc(entry.get('word',''))}':" ]
        for i, ph in enumerate(extra, 2):
            clines.append(phrase_to_comment(ph, lang, i))
        comments = "\n" + "\n".join(clines)

    return obj, comments


# ─── INJECTION ────────────────────────────────────────────────────────────────

def inject_entries(html_content, entries, lang):
    existing_ids = get_existing_ids(html_content)
    marker = LANG_COMMENTS[lang]

    new_entries = [e for e in entries if e.get("id") not in existing_ids]
    if not new_entries:
        return html_content, 0

    # Construit le bloc à insérer :
    # },          <- virgule après l'objet JS (syntaxe valide)
    # // phrase_2 <- commentaires après la virgule (inoffensifs)
    blocks = []
    for e in new_entries:
        obj, comments = entry_to_js(e)
        # virgule après }, puis commentaires sur les lignes suivantes
        blocks.append(obj + "," + comments)

    insertion = "\n  " + "\n  ".join(blocks) + "\n  "

    match = re.search(re.escape(marker), html_content)
    if not match:
        print(f"  ✗ Marqueur '{marker}' introuvable dans le HTML.")
        print(f"    Ajoute ce commentaire dans ton tableau words : {marker}")
        return html_content, 0

    insert_pos = match.end()
    html_content = html_content[:insert_pos] + insertion + html_content[insert_pos:]
    return html_content, len(new_entries)


# ─── MAIN ─────────────────────────────────────────────────────────────────────

def process_lang(lang, html_content):
    json_path = LANG_CONFIG[lang]
    entries = load_json(json_path)
    if not entries:
        return html_content, 0
    html_content, n = inject_entries(html_content, entries, lang)
    print(f"  ✅ {lang.upper()} : {n} entrée(s) injectée(s)")
    return html_content, n


def main():
    parser = argparse.ArgumentParser(description="Injection vocabulaire dans index.html")
    parser.add_argument("--lang", choices=["ru","ja","zh","pl","pt"])
    parser.add_argument("--all", action="store_true")
    args = parser.parse_args()

    if not args.lang and not args.all:
        parser.print_help()
        return

    if not HTML_FILE.exists():
        print(f"✗ index.html introuvable : {HTML_FILE}")
        return

    backup_html(HTML_FILE)
    html_content = read_html(HTML_FILE)

    langs = list(LANG_CONFIG.keys()) if args.all else [args.lang]
    total = 0
    for lang in langs:
        print(f"\n🌐 {lang.upper()}")
        html_content, n = process_lang(lang, html_content)
        total += n

    write_html(HTML_FILE, html_content)
    print(f"\n✅ index.html mis à jour — {total} nouvelle(s) entrée(s) au total")


if __name__ == "__main__":
    main()
