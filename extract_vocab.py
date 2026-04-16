#!/usr/bin/env python3
"""
extract_vocab.py — Extraction vocabulaire *Pod101 → audio + JSON
Toutes les langues utilisent le même attribut data-wordday dans le HTML.

Usage:
  python extract_vocab.py --lang ru --files page1.html page2.html
  python extract_vocab.py --lang ja --files *.html
  python extract_vocab.py --lang zh --files *.html

Langues supportées : ru, ja, zh, pl, pt

Prérequis : pip install requests beautifulsoup4
"""

import argparse
import json
import re
import time
import unicodedata
from html import unescape
from pathlib import Path

import requests

# ─── CONFIG ───────────────────────────────────────────────────────────────────

BASE_DIR = Path(r"C:\Users\brugere\Documents\Workspace\dictionnaire-langues")

LANG_CONFIG = {
    "ru": {"audio_dir": BASE_DIR / "audio" / "ru", "json_file": BASE_DIR / "ru_import.json"},
    "ja": {"audio_dir": BASE_DIR / "audio" / "ja", "json_file": BASE_DIR / "ja_import.json"},
    "zh": {"audio_dir": BASE_DIR / "audio" / "zh", "json_file": BASE_DIR / "zh_import.json"},
    "pl": {"audio_dir": BASE_DIR / "audio" / "pl", "json_file": BASE_DIR / "pl_import.json"},
    "pt": {"audio_dir": BASE_DIR / "audio" / "pt", "json_file": BASE_DIR / "pt_import.json"},
}

# Mapping accents → numéro de ton chinois
TONE_MAP = {
    "ā":1,"ē":1,"ī":1,"ō":1,"ū":1,"Ā":1,"Ē":1,"Ī":1,"Ō":1,"Ū":1,
    "á":2,"é":2,"í":2,"ó":2,"ú":2,"Á":2,"É":2,"Í":2,"Ó":2,"Ú":2,
    "ǎ":3,"ě":3,"ǐ":3,"ǒ":3,"ǔ":3,"Ǎ":3,"Ě":3,"Ǐ":3,"Ǒ":3,"Ǔ":3,
    "à":4,"è":4,"ì":4,"ò":4,"ù":4,"À":4,"È":4,"Ì":4,"Ò":4,"Ù":4,
    "\u01d6":1,"\u01d8":2,"\u01da":3,"\u01dc":4,
}
TONE_SYMBOLS = {1:"—", 2:"/", 3:"v", 4:"\\", 0:"·"}

CAT_MAP = {
    "noun":"nom","verb":"verbe","adjective":"adjectif","adverb":"adverbe",
    "phrase":"expression","conjunction":"conjonction","pronoun":"pronom",
    "preposition":"préposition","interjection":"interjection","particle":"particule",
    "counter":"compteur","expression":"expression","salutation":"salutation",
}

GENRE_MAP = {
    "masculine":"masculin","feminine":"féminin","neuter":"neutre","neutral":"neutre",
}


# ─── UTILITAIRES ──────────────────────────────────────────────────────────────

def slugify(text):
    text = text.lower().strip()
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^\w\s]", "", text)
    text = re.sub(r"\s+", "_", text)
    return text.strip("_") or "unknown"


def detect_tones(pinyin):
    tones = []
    for syllable in re.split(r"[\s\-]+", pinyin.strip()):
        t = 0
        for char in syllable:
            if char in TONE_MAP:
                t = TONE_MAP[char]
                break
        tones.append(t)
    if not tones:
        return "Ton 0", "·"
    label = "Ton " + "+".join(str(t) for t in tones)
    symbols = "".join(TONE_SYMBOLS.get(t, "·") for t in tones)
    return label, symbols


def download_mp3(url, dest):
    if dest.exists():
        print(f"    ✓ Déjà présent : {dest.name}")
        return True
    try:
        r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=15)
        r.raise_for_status()
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(r.content)
        print(f"    ↓ Téléchargé   : {dest.name}")
        time.sleep(0.25)
        return True
    except Exception as e:
        print(f"    ✗ Échec : {url}\n      {e}")
        return False


def load_json(path):
    if path.exists():
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    return []


def save_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"\n✅ JSON sauvegardé : {path} ({len(data)} entrées)")


def already_exists(entries, word, lang):
    return any(e.get("word") == word and e.get("lang") == lang for e in entries)


# ─── PARSEUR UNIVERSEL ────────────────────────────────────────────────────────

def extract_wordday(html_path):
    """Extrait le JSON data-wordday depuis un fichier HTML *Pod101."""
    with open(html_path, encoding="utf-8", errors="replace") as f:
        content = f.read()

    match = re.search(r'data-wordday="([^"]+)"', content)
    if not match:
        return None

    raw = unescape(match.group(1))
    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"    ✗ JSON invalide : {e}")
        return None


# ─── CONSTRUCTION ENTRÉE ──────────────────────────────────────────────────────

def build_entry(data, lang, audio_dir):
    relative_prefix = f"audio/{lang}"
    word = data.get("text", "")
    translation = data.get("english", "")
    category = CAT_MAP.get(data.get("class", "").lower(), data.get("class", "nom"))
    roman = data.get("romanization", "")
    slug = slugify(roman or word)

    # Audio du mot
    audio_word_rel = ""
    if data.get("audio_target"):
        dest = audio_dir / f"{slug}.mp3"
        if download_mp3(data["audio_target"], dest):
            audio_word_rel = f"{relative_prefix}/{slug}.mp3"

    entry = {
        "id": f"{lang}_{slug}",
        "lang": lang,
        "niveau": "Nouveau",
        "word": word,
        "translation": translation,
        "category": category,
        "audio_word": audio_word_rel,
        "notes": "",
    }

    # Champs spécifiques par langue
    if lang == "ru":
        entry["roman"] = roman
        genre_raw = data.get("gender", "")
        if genre_raw:
            entry["genre"] = GENRE_MAP.get(genre_raw.lower(), genre_raw)

    elif lang == "ja":
        entry["reading"] = data.get("kana", "")
        entry["roman"] = roman

    elif lang == "zh":
        entry["trad"] = data.get("traditional", "")
        entry["roman"] = roman
        ton_label, ton_symbol = detect_tones(roman)
        entry["ton"] = ton_label
        entry["ton_symbol"] = ton_symbol

    elif lang in ("pl", "pt"):
        genre_raw = data.get("gender", "")
        if genre_raw:
            entry["genre"] = GENRE_MAP.get(genre_raw.lower(), genre_raw)

    # Phrases exemples
    phrases = []
    for i, sample in enumerate(data.get("samples", []), 1):
        ph_slug = f"{slug}_phrase_{i}"
        ph_audio_rel = ""
        if sample.get("audio_target"):
            dest = audio_dir / f"{ph_slug}.mp3"
            if download_mp3(sample["audio_target"], dest):
                ph_audio_rel = f"{relative_prefix}/{ph_slug}.mp3"

        phrase = {
            "text": sample.get("text", ""),
            "translation": sample.get("english", ""),
            "audio": ph_audio_rel,
        }

        if lang in ("ru", "ja", "zh"):
            phrase["roman"] = sample.get("romanization", "")
        if lang == "ja":
            phrase["reading"] = sample.get("kana", "")
        if lang == "zh":
            phrase["trad"] = sample.get("traditional", "")

        phrases.append(phrase)

    entry["phrases"] = phrases
    return entry


# ─── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Extraction vocabulaire *Pod101")
    parser.add_argument("--lang", required=True, choices=["ru","ja","zh","pl","pt"])
    parser.add_argument("--files", nargs="+", required=True,
                        help="Fichiers HTML à traiter")
    args = parser.parse_args()

    lang = args.lang
    cfg = LANG_CONFIG[lang]
    audio_dir = cfg["audio_dir"]

    # Expansion des wildcards (nécessaire sous Windows CMD)
    import glob
    expanded = []
    for f in args.files:
        matches = glob.glob(f)
        if matches:
            expanded.extend(matches)
        else:
            expanded.append(f)  # fichier nommé explicitement
    args.files = expanded

    print(f"\n🌐 Langue : {lang.upper()} | {len(args.files)} fichier(s)")

    existing = load_json(cfg["json_file"])
    print(f"📦 Entrées existantes : {len(existing)}")

    new_entries = []

    for html_file in args.files:
        print(f"\n📄 {html_file}")
        data = extract_wordday(html_file)

        if not data:
            print("  ✗ Attribut data-wordday introuvable.")
            continue

        word = data.get("text", "")
        roman = data.get("romanization", "")
        print(f"  → {word}  {roman}  |  {len(data.get('samples', []))} phrase(s)")

        if already_exists(existing, word, lang):
            print(f"  ⚠ Déjà présent, ignoré.")
            continue

        entry = build_entry(data, lang, audio_dir)
        new_entries.append(entry)

    if new_entries:
        save_json(cfg["json_file"], existing + new_entries)
        print(f"\n🆕 {len(new_entries)} nouvelle(s) entrée(s) ajoutée(s)")
    else:
        print("\nAucune nouvelle entrée à ajouter.")


if __name__ == "__main__":
    main()
