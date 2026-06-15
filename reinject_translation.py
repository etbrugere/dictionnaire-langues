#!/usr/bin/env python3
"""
reinject_translation.py — Reecrit dans les *_import.json le mot et la phrase
traduits depuis le fichier texte.

Par defaut (sans --lang) : lit  a_traduire.txt  (toutes langues) et repartit
chaque entree vers le bon JSON, d'apres le prefixe de l'`id` (ex: "zh_..." ->
zh_import.json). Plus besoin d'une commande par langue.

Pour chaque bloc :
    id: zh_shou
    mot: main
    phrase: L'enfant leve la main.
ecrit, dans l'entree d'`id` correspondant :
    translation              <- mot
    phrases[0].translation   <- phrase
Seules les entrees REELLEMENT modifiees sont reecrites. Backup horodate de
chaque JSON touche.

Usage :
  python reinject_translation.py            # lit a_traduire.txt (toutes langues)
  python reinject_translation.py --lang zh  # lit zh_a_traduire.txt

Astuce test : definir DICT_BASE_DIR vers le dossier projet.
"""

import argparse
import json
import os
import re
import shutil
import sys
from datetime import datetime
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


def parse_txt(path):
    """Retourne {id: {'mot': ..., 'phrase': ...}} (champs non vides seulement)."""
    res, cur = {}, None
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.rstrip()
        if line.lstrip().startswith("#"):
            continue
        m = re.match(r"\s*id:\s*(\S+)", line)
        if m:
            cur = m.group(1)
            res.setdefault(cur, {})
            continue
        if cur is None:
            continue
        m = re.match(r"\s*mot:\s*(.*)$", line)
        if m and m.group(1).strip():
            res[cur]["mot"] = m.group(1).strip()
            continue
        m = re.match(r"\s*phrase:\s*(.*)$", line)
        if m and m.group(1).strip():
            res[cur]["phrase"] = m.group(1).strip()
    return {k: v for k, v in res.items() if v}


def lang_of(entry_id):
    """Deduit la langue du prefixe de l'id (ex: 'zh_shou' -> 'zh')."""
    pref = entry_id.split("_", 1)[0]
    return pref if pref in LANGS else None


def apply_updates_to_lang(lang, updates):
    """updates = {id: {'mot','phrase'}} pour CETTE langue. Retourne n modifies."""
    src = BASE_DIR / f"{lang}_import.json"
    if not src.exists():
        print(f"  {LANG_NAMES[lang]:<10} : {src.name} introuvable, ignore.")
        return 0
    data = json.load(open(src, encoding="utf-8"))
    by_id = {e.get("id"): e for e in data}

    changed, missing, no_phrase = 0, [], []
    for eid, upd in updates.items():
        e = by_id.get(eid)
        if e is None:
            missing.append(eid)
            continue
        touched = False
        if "mot" in upd and upd["mot"] != e.get("translation"):
            e["translation"] = upd["mot"]
            touched = True
        if "phrase" in upd:
            if e.get("phrases"):
                if upd["phrase"] != e["phrases"][0].get("translation"):
                    e["phrases"][0]["translation"] = upd["phrase"]
                    touched = True
            else:
                no_phrase.append(eid)
        if touched:
            changed += 1

    for eid in missing:
        print(f"      ? id absent du JSON : {eid}")
    for eid in no_phrase:
        print(f"      ! pas de phrase pour : {eid} (mot mis a jour quand meme)")

    if not changed:
        print(f"  {LANG_NAMES[lang]:<10} : aucune modification.")
        return 0

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    bak = src.with_name(f"{src.stem}.backup.{ts}{src.suffix}")
    shutil.copy2(src, bak)
    with open(src, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  {LANG_NAMES[lang]:<10} : {changed} mot(s) modifie(s)  (backup : {bak.name})")
    return changed


def main():
    ap = argparse.ArgumentParser(
        description="Reinjecte les traductions FR du .txt dans les JSON.")
    ap.add_argument("--lang", choices=LANGS,
                    help="une seule langue (defaut : lit a_traduire.txt, toutes langues)")
    args = ap.parse_args()

    txt = (BASE_DIR / f"{args.lang}_a_traduire.txt") if args.lang else (BASE_DIR / "a_traduire.txt")
    if not txt.exists():
        sys.exit(f"Fichier introuvable : {txt}")

    updates = parse_txt(txt)
    if not updates:
        print("Rien a reinjecter.")
        return

    # regroupe par langue (prefixe de l'id)
    by_lang = {}
    unknown = []
    for eid, upd in updates.items():
        lang = lang_of(eid)
        if lang is None:
            unknown.append(eid)
            continue
        by_lang.setdefault(lang, {})[eid] = upd

    print(f"\nLecture : {txt.name}\n")
    total = 0
    for lang in LANGS:
        if lang in by_lang:
            total += apply_updates_to_lang(lang, by_lang[lang])
    for eid in unknown:
        print(f"  ? langue inconnue pour l'id : {eid}")

    print(f"\n{total} mot(s) modifie(s) au total.")
    print("Etape suivante :  python inject_vocab.py --all")


if __name__ == "__main__":
    main()
