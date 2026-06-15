#!/usr/bin/env python3
"""
select_phrase.py — Choix d'UNE phrase d'exemple par mot, AVANT inject_vocab.py.

Pour chaque mot d'un fichier {lang}_import.json :
  - affiche le mot + ses phrases candidates (texte, roman/reading, traduction)
  - tu choisis celle a garder
  - le tableau "phrases" est reduit a la seule phrase retenue
  - les MP3 des phrases NON retenues sont supprimes du disque

Le schema JSON n'est PAS modifie : "phrases" reste une liste (avec 1 seul
element), donc inject_vocab.py fonctionne sans changement et n'insere aucun
commentaire dans index.html.

Par defaut (sans argument) : traite TOUS les *_import.json presents. Plus besoin
de preciser la langue.

Usage :
  python select_phrase.py                       # toutes les langues
  python select_phrase.py --lang de             # une seule langue
  python select_phrase.py --file "C:\\...\\de_import.json"

Astuce test : definir la variable d'environnement DICT_BASE_DIR pour pointer
ailleurs que sur le chemin Windows par defaut.
"""

import argparse
import json
import os
import shutil
import sys
from datetime import datetime
from pathlib import Path

# Force la sortie console en UTF-8 (indispensable sous Windows pour ru/ja/zh).
# errors="replace" : au pire on voit des "?" plutot qu'un plantage.
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

BASE_DIR = Path(os.environ.get(
    "DICT_BASE_DIR",
    r"C:\Users\brugere\Documents\Workspace\dictionnaire-langues",
))

LANGS = ["ru", "ja", "zh", "pl", "pt", "de", "es"]


def load_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def backup_json(path):
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    bak = path.with_name(f"{path.stem}.backup.{ts}{path.suffix}")
    shutil.copy2(path, bak)
    return bak


def show_phrase(idx, ph):
    print(f"  {idx}) {ph.get('text', '')}")
    if ph.get("reading"):
        print(f"       reading : {ph['reading']}")
    if ph.get("roman"):
        print(f"       roman   : {ph['roman']}")
    if ph.get("translation"):
        print(f"       -> {ph['translation']}")


def word_header(i, total, w):
    word = w.get("word", "")
    roman = f" [{w['roman']}]" if w.get("roman") else ""
    bits = [b for b in (w.get("category"), w.get("genre")) if b]
    meta = f"  ({', '.join(bits)})" if bits else ""
    print(f"\n[{w.get('lang', '?')}] {i}/{total}  {word}{roman}  =  "
          f"{w.get('translation', '')}{meta}")


def prompt_choice(n):
    while True:
        raw = input(f"  Choix [1-{n}, Entree=1, s=passer, q=quitter] : ").strip().lower()
        if raw == "":
            return 1
        if raw == "s":
            return "skip"
        if raw == "q":
            return "quit"
        if raw.isdigit() and 1 <= int(raw) <= n:
            return int(raw)
        print(f"  -> Tape un nombre entre 1 et {n}, ou s / q.")


def process_file(path, audio_to_delete):
    if not path.exists():
        print(f"  X Fichier introuvable : {path.name}")
        return
    data = load_json(path)
    if not isinstance(data, list):
        print(f"  X Format inattendu (liste JSON attendue) : {path.name}")
        return

    total = len(data)
    print(f"\n===== {path.name}  ({total} mot(s)) =====")
    quit_all = False

    for i, w in enumerate(data, 1):
        if quit_all:
            break
        phrases = w.get("phrases", [])
        if len(phrases) <= 1:
            continue  # rien a choisir

        word_header(i, total, w)
        for j, ph in enumerate(phrases, 1):
            show_phrase(j, ph)

        choice = prompt_choice(len(phrases))
        if choice == "quit":
            print("  (arret — les mots restants sont laisses intacts)")
            quit_all = True
            break
        if choice == "skip":
            print("  (passe — toutes les phrases conservees)")
            continue

        kept = phrases[choice - 1]
        for j, ph in enumerate(phrases, 1):  # marquer les audios non retenus
            if j != choice and ph.get("audio"):
                audio_to_delete.add(ph["audio"])
        w["phrases"] = [kept]  # reduire a la phrase choisie
        print(f"  OK phrase {choice} gardee")

    bak = backup_json(path)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"\n  {path.name} mis a jour  (backup : {bak.name})")


def main():
    ap = argparse.ArgumentParser(
        description="Choix d'une phrase par mot au stade JSON (avant inject_vocab.py).")
    g = ap.add_mutually_exclusive_group(required=False)
    g.add_argument("--lang", choices=LANGS, help="Traiter {lang}_import.json")
    g.add_argument("--all", action="store_true", help="Traiter tous les *_import.json")
    g.add_argument("--file", help="Chemin d'un JSON precis")
    args = ap.parse_args()

    if args.file:
        targets = [Path(args.file)]
    elif args.lang:
        targets = [BASE_DIR / f"{args.lang}_import.json"]
    else:
        # defaut (et --all) : toutes les langues presentes
        targets = sorted(BASE_DIR.glob("*_import.json"))

    if not targets:
        print("Aucun fichier *_import.json a traiter.")
        return

    audio_to_delete = set()
    for path in targets:
        process_file(path, audio_to_delete)

    deleted = missing = 0
    for rel in sorted(audio_to_delete):
        if not rel:
            continue
        p = BASE_DIR / rel
        if p.exists():
            p.unlink()
            deleted += 1
        else:
            print(f"  Absent : {rel}")
            missing += 1
    print(f"\n{deleted} fichier(s) audio supprime(s)"
          + (f" | {missing} deja absent(s)" if missing else ""))


if __name__ == "__main__":
    main()
