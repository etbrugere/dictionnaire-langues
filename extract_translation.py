#!/usr/bin/env python3
"""
extract_translation.py — Extrait id + mot + phrase (anglais) des *_import.json
vers un fichier texte simple a traduire a la main.

Par defaut (sans --lang) : traite TOUS les *_import.json presents et ecrit UN
SEUL fichier  a_traduire.txt , regroupe par langue. Plus besoin d'une commande
par langue.

Tu remplaces ensuite l'anglais par le francais sur les lignes 'mot:' et
'phrase:', puis tu lances  reinject_translation.py  pour reecrire les JSON.

Usage :
  python extract_translation.py            # toutes les langues -> a_traduire.txt
  python extract_translation.py --lang zh  # une seule langue   -> zh_a_traduire.txt

Astuce test : definir DICT_BASE_DIR vers le dossier projet.
"""

import argparse
import json
import os
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

BASE_DIR = Path(os.environ.get(
    "DICT_BASE_DIR",
    r"C:\Users\brugere\Documents\Workspace\dictionnaire-langues",
))

LANGS = ["ru", "ja", "zh", "pl", "pt", "de", "es"]
LANG_NAMES = {
    "ru": "Russe", "ja": "Japonais", "zh": "Mandarin", "pl": "Polonais",
    "pt": "Portugais", "de": "Allemand", "es": "Espagnol",
}


def lang_blocks(lang):
    """Retourne (n_mots, lignes) pour une langue, ou (0, []) si JSON absent."""
    src = BASE_DIR / f"{lang}_import.json"
    if not src.exists():
        return 0, []
    data = json.load(open(src, encoding="utf-8"))
    lines = []
    for e in data:
        phr = (e.get("phrases") or [{}])[0]
        lines.append(f"id: {e.get('id','')}")
        lines.append(f"mot: {e.get('translation','')}")
        if phr.get("translation", ""):
            lines.append(f"phrase: {phr.get('translation','')}")
        lines.append("")
    return len(data), lines


def header(scope, apply_cmd):
    return [
        "# " + "=" * 58,
        f"# A TRADUIRE — {scope}",
        "# Traduis en francais les lignes 'mot:' et 'phrase:' (remplace l'anglais).",
        "# Ne touche pas aux lignes 'id:'.",
        f"# Puis :  {apply_cmd}",
        "# " + "=" * 58,
        "",
    ]


def main():
    ap = argparse.ArgumentParser(
        description="Extrait mot + phrase (EN) des JSON vers un .txt a traduire.")
    ap.add_argument("--lang", choices=LANGS,
                    help="une seule langue (defaut : toutes, dans un seul fichier)")
    args = ap.parse_args()

    print(f"\nExtraction depuis les JSON ({BASE_DIR})\n")

    if args.lang:
        n, blocks = lang_blocks(args.lang)
        if not n:
            print(f"  {args.lang}_import.json introuvable.")
            return
        out = BASE_DIR / f"{args.lang}_a_traduire.txt"
        text = header(f"{LANG_NAMES[args.lang]} ({args.lang})",
                      f"python reinject_translation.py --lang {args.lang}")
        out.write_text("\n".join(text + blocks), encoding="utf-8")
        print(f"  {LANG_NAMES[args.lang]:<10} : {n} mot(s) -> {out.name}")
        print("\nTraduis 'mot:' et 'phrase:', puis : "
              f"python reinject_translation.py --lang {args.lang}")
        return

    # toutes les langues -> un seul fichier
    all_lines = header("toutes langues", "python reinject_translation.py")
    total = 0
    for lang in LANGS:
        n, blocks = lang_blocks(lang)
        if not n:
            continue
        all_lines.append(f"# ========== {LANG_NAMES[lang]} ({lang}) ==========")
        all_lines.append("")
        all_lines.extend(blocks)
        total += n
        print(f"  {LANG_NAMES[lang]:<10} : {n} mot(s)")

    if not total:
        print("  Aucun *_import.json trouve.")
        return
    out = BASE_DIR / "a_traduire.txt"
    out.write_text("\n".join(all_lines), encoding="utf-8")
    print(f"\n  {total} mot(s) au total -> {out.name}")
    print("\nTraduis 'mot:' et 'phrase:', puis : python reinject_translation.py")


if __name__ == "__main__":
    main()
