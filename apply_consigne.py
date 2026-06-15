#!/usr/bin/env python3
"""
apply_consigne.py — Applique les consignes de sélection de phrase depuis consigne_langues.txt
- Pour chaque entrée listée : garde la phrase choisie, supprime les commentaires
- Supprime les fichiers audio des phrases non retenues
"""

import os
import re
import shutil
from datetime import datetime
from pathlib import Path

BASE_DIR = Path(os.environ.get(
    "DICT_BASE_DIR",
    r"C:\Users\brugere\Documents\Workspace\dictionnaire-langues",
))
HTML_FILE = BASE_DIR / "index.html"
CONSIGNE_FILE = BASE_DIR / "consigne_langues.txt"

SECTION_HEADERS = {
    "// JAPONAIS", "// MANDARIN", "// RUSSE", "// POLONAIS",
    "// PORTUGAIS BR", "// PORTUGAIS", "// ALLEMAND", "// ESPAGNOL",
}


def parse_consigne(path):
    """Parse consigne_langues.txt → {entry_id: phrase_num}"""
    result = {}
    with open(path, encoding="utf-8") as f:
        for line in f:
            # Format correct avec guillemets fermants (gère les IDs Unicode : ł, ß…)
            id_m = re.search(r'id:\s*"([^"\s]+)"', line)
            if not id_m:
                # Fallback pour les lignes malformées sans guillemet fermant
                id_m = re.search(r'id:\s*"([a-z][a-z0-9_]+)', line)
            # Gère "phrase_N" et la faute de frappe "pharse_N"
            ph_m = re.search(r'(?:phrase|pharse)_(\d+)', line)
            if id_m and ph_m:
                result[id_m.group(1)] = int(ph_m.group(1))
    return result


def parse_comment_data(line):
    """
    Parse une ligne de commentaire :
    // phrase_2: "text" | reading: "..." | roman: "..." | transl: "..." | audio: "..."
    Retourne un dict avec clés : text, reading, roman, transl, audio
    """
    data = {}
    content = re.sub(r'^\s*//\s*', '', line).strip()
    for m in re.finditer(r'([\w]+):\s*"([^"]*)"', content):
        k, v = m.group(1), m.group(2)
        if re.match(r'phrase_\d+$', k):
            data['text'] = v
        else:
            data[k] = v
    return data


def find_phrase_in_comments(comment_lines, phrase_num):
    """Cherche phrase_N dans les commentaires et retourne ses données."""
    for cl in comment_lines:
        if re.search(rf'\bphrase_{phrase_num}:', cl):
            return parse_comment_data(cl)
    return None


def update_entry(entry_lines, ph_data):
    """Met à jour les champs phrase* et audio_phrase avec les données de ph_data."""
    updated = []
    for line in entry_lines:
        if re.search(r'\bphrase:\s*"', line) and 'text' in ph_data:
            line = re.sub(r'(\bphrase:\s*)"[^"]*"',
                          lambda m: f'{m.group(1)}"{ph_data["text"]}"', line)
        if 'phrase_reading' in line and 'reading' in ph_data:
            line = re.sub(r'(phrase_reading:\s*)"[^"]*"',
                          lambda m: f'{m.group(1)}"{ph_data["reading"]}"', line)
        if 'phrase_roman' in line and 'roman' in ph_data:
            line = re.sub(r'(phrase_roman:\s*)"[^"]*"',
                          lambda m: f'{m.group(1)}"{ph_data["roman"]}"', line)
        if 'phrase_fr' in line and 'transl' in ph_data:
            line = re.sub(r'(phrase_fr:\s*)"[^"]*"',
                          lambda m: f'{m.group(1)}"{ph_data["transl"]}"', line)
        if 'audio_phrase' in line and 'audio' in ph_data:
            line = re.sub(r'(audio_phrase:\s*)"[^"]*"',
                          lambda m: f'{m.group(1)}"{ph_data["audio"]}"', line)
        updated.append(line)
    return updated


def main():
    consigne = parse_consigne(CONSIGNE_FILE)
    print(f"{len(consigne)} entrees dans la consigne\n")

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup = HTML_FILE.parent / f"index.backup.{ts}.html"
    shutil.copy2(HTML_FILE, backup)
    print(f"Backup : {backup.name}\n")

    with open(HTML_FILE, encoding="utf-8") as f:
        raw = f.read()

    lines = raw.splitlines()
    result = []
    audio_to_delete = set()
    i = 0

    while i < len(lines):
        line = lines[i]

        # Détecte le début d'une entrée : ligne = '{' suivie d'une ligne id/lang
        if (line.strip() == '{'
                and i + 1 < len(lines)
                and re.search(r'\bid:\s*"([^"]+)"', lines[i + 1])
                and re.search(r'\blang:\s*"', lines[i + 1])):

            entry_lines = [line]
            i += 1

            id_m = re.search(r'id:\s*"([^"]+)"', lines[i])
            entry_id = id_m.group(1) if id_m else ""

            # Collecte le corps de l'entrée jusqu'à la accolade fermante
            while i < len(lines) and not re.match(r'\s*\}', lines[i]):
                entry_lines.append(lines[i])
                i += 1
            if i < len(lines):
                entry_lines.append(lines[i])  # ligne  },
                i += 1

            # Collecte les lignes de commentaires qui suivent (stop sur header de section)
            comment_lines = []
            while i < len(lines) and lines[i].strip().startswith('//'):
                if lines[i].strip() in SECTION_HEADERS:
                    break
                comment_lines.append(lines[i])
                i += 1

            if entry_id in consigne:
                phrase_num = consigne[entry_id]
                print(f"  {entry_id.encode('ascii','replace').decode()} -> phrase_{phrase_num}")

                if phrase_num == 1:
                    # Garder l'entrée telle quelle, supprimer les commentaires
                    result.extend(entry_lines)
                    for cl in comment_lines:
                        m = re.search(r'\baudio:\s*"([^"]+)"', cl)
                        if m and m.group(1):
                            audio_to_delete.add(m.group(1))
                else:
                    ph_data = find_phrase_in_comments(comment_lines, phrase_num)
                    if ph_data:
                        # Marquer l'ancien audio_phrase pour suppression
                        for el in entry_lines:
                            m = re.search(r'audio_phrase:\s*"([^"]+)"', el)
                            if m and m.group(1):
                                audio_to_delete.add(m.group(1))

                        # Mettre à jour l'entrée
                        entry_lines = update_entry(entry_lines, ph_data)
                        result.extend(entry_lines)

                        # Marquer les autres audios des commentaires pour suppression
                        new_audio = ph_data.get('audio', '')
                        for cl in comment_lines:
                            m = re.search(r'\baudio:\s*"([^"]+)"', cl)
                            if m and m.group(1) and m.group(1) != new_audio:
                                audio_to_delete.add(m.group(1))
                    else:
                        print(f"    WARN phrase_{phrase_num} introuvable dans les commentaires")
                        result.extend(entry_lines)
                # Dans tous les cas : commentaires supprimés

            else:
                # Hors consigne : tout conserver
                result.extend(entry_lines)
                result.extend(comment_lines)
        else:
            result.append(line)
            i += 1

    # Écriture du HTML mis à jour
    with open(HTML_FILE, "w", encoding="utf-8", newline='') as f:
        f.write('\n'.join(result))
    print(f"\nindex.html mis a jour")

    # Suppression des fichiers audio inutilisés
    deleted = 0
    missing = 0
    for audio_rel in sorted(audio_to_delete):
        if not audio_rel:
            continue
        path = BASE_DIR / audio_rel
        if path.exists():
            path.unlink()
            deleted += 1
        else:
            print(f"  Absent : {audio_rel}")
            missing += 1

    print(f"{deleted} fichier(s) audio supprime(s)"
          + (f" | {missing} deja absent(s)" if missing else ""))


if __name__ == "__main__":
    main()
