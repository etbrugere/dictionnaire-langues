# 📖 Guide — Ajout de vocabulaire au dictionnaire

## Vue d'ensemble

```
Brave (onglets) → Ctrl+S → vocab_temp/ → extract_vocab.py → JSON + MP3
   → select_phrase.py (choix de LA phrase) → extract_translation.py → (tu traduis a_traduire.txt) → reinject_translation.py
   → inject_vocab.py → index.html (déjà en français) → build_anki.py → vocabulaire_langues.apkg → import dans Anki
```

> La traduction se fait désormais **sur le JSON, avant l'injection** (ÉTAPE 6) : `extract_translation.py` sort un seul fichier texte (`a_traduire.txt`, toutes langues), tu traduis, `reinject_translation.py` réécrit les JSON. `inject_vocab.py` (ÉTAPE 7) porte alors directement le **français** dans `index.html` — plus rien à traduire à la main dans le HTML. `apply_consigne.py` reste un **fallback** (ÉTAPE 8) pour d'anciennes entrées.
> `build_anki.py` (ÉTAPE 9) lit `index.html` (déjà en français) et génère les decks Anki avec audio. Re-importer chaque semaine n'ajoute que les nouveautés (pas de doublon).

---

## 📁 Structure du projet

```
C:\Users\brugere\Documents\Workspace\dictionnaire-langues\
├── index.html               ← ton dictionnaire
├── extract_vocab.py         ← script d'extraction
├── inject_vocab.py          ← script d'injection
├── select_phrase.py         ← choix d'UNE phrase par mot (au stade JSON)
├── extract_translation.py   ← sort l'anglais à traduire (un seul a_traduire.txt)
├── reinject_translation.py  ← réinjecte ton français dans les JSON
├── apply_consigne.py        ← (fallback) sélection auto dans index.html
├── build_anki.py            ← génère les decks Anki (.apkg) depuis index.html
├── consigne_langues.txt     ← (fallback) tes choix de phrases (id + numéro)
├── ru_import.json           ← données extraites russe
├── ja_import.json           ← données extraites japonais
├── zh_import.json           ← données extraites chinois
├── pl_import.json           ← données extraites polonais
├── pt_import.json           ← données extraites portugais
├── de_import.json           ← données extraites allemand
├── es_import.json           ← données extraites espagnol
└── audio/
    ├── ru/                  ← fichiers MP3 russes
    ├── ja/                  ← fichiers MP3 japonais
    ├── zh/                  ← fichiers MP3 chinois
    ├── pl/                  ← fichiers MP3 polonais
    ├── pt/                  ← fichiers MP3 portugais
    ├── de/                  ← fichiers MP3 allemands
    └── es/                  ← fichiers MP3 espagnols
└── anki/                    ← decks Anki générés (.apkg) — créé par build_anki.py
```
## En Résumé Linux :
- Ouvrir CMD dans vocab_temp
export DICT_BASE_DIR=/mnt/c/Users/brugere/Documents/Workspace/dictionnaire-langues
- Lancer extract_vocab.py par langue
python3 "$DICT_BASE_DIR/extract_vocab.py" --lang zh --files *.html
Remplace par la langue voulue :
| Langue | Code |
|--------|------|
| Russe | `ru` |
| Japonais | `ja` |
| Chinois | `zh` |
| Polonais | `pl` |
| Portugais | `pt` |
| Allemand | `de` |
| Espagnol | `es` |
- Choisir la phrase de chaque mot (toutes langues d'un coup)
python3 "$DICT_BASE_DIR/select_phrase.py"
- Sortir l'anglais à traduire (un seul fichier a_traduire.txt)
python3 "$DICT_BASE_DIR/extract_translation.py"
- Traduire les lignes `mot:` / `phrase:` dans a_traduire.txt (avec DeepL)
- Réinjecter le français dans les JSON
python3 "$DICT_BASE_DIR/reinject_translation.py"
- Injecter dans index.html (déjà en français)
python3 "$DICT_BASE_DIR/inject_vocab.py" --all
- Générer / mettre à jour les decks Anki (build_anki.py)
python3 "$DICT_BASE_DIR/build_anki.py" --all --combined


---

## 🔧 Installation (une seule fois)

Ouvre CMD et lance :
```cmd
pip install requests beautifulsoup4 genanki
```

---

## 🔁 Workflow complet — à chaque session

### ÉTAPE 1 — Ouvrir les pages dans Brave

Va sur les sites *Pod101 et ouvre autant d'onglets que tu veux :

| Langue | Site |
|--------|------|
| Japonais | https://www.japanesepod101.com/japanese-phrases/ |
| Chinois | https://www.chineseclass101.com/chinese-phrases/ |
| Russe | https://www.russianpod101.com/russian-phrases/ |
| Polonais | https://www.polishpod101.com/polish-phrases/ |
| Portugais | https://www.portuguesepod101.com/portuguese-phrases/ |
| Allemand | https://www.germanpod101.com/german-phrases/ |
| Espagnol | https://www.spanishpod101.com/spanish-phrases/ |

> Pour naviguer dans le temps : utilise les flèches `‹ ›` en haut de chaque page pour aller aux jours précédents.

---

### ÉTAPE 2 — Créer le dossier vocab_temp et sauvegarder les pages

1. Crée un dossier temporaire :
```
C:\Users\brugere\Downloads\vocab_temp\
```

2. Dans **chaque onglet Brave** :
   - `Ctrl+S`
   - Dans le menu **"Type"** → choisir **"Page Web, HTML uniquement"**
   - Sauvegarder dans `vocab_temp\`

> Les fichiers s'appelleront automatiquement quelque chose comme `Japanese Word of the Day.html`, `Russian Word of the Day (2).html` etc. Le nom n'a pas d'importance.

---

### ÉTAPE 3 — Ouvrir CMD dans vocab_temp

Dans l'explorateur Windows :
- Navigue jusqu'à `C:\Users\brugere\Downloads\vocab_temp\`
- **Shift + clic droit** dans le dossier → **"Ouvrir la fenêtre de commandes ici"**
  *(ou "Ouvrir PowerShell ici" selon ta version de Windows)*

En Linux : 
export DICT_BASE_DIR=/mnt/c/Users/brugere/Documents/Workspace/dictionnaire-langues

---

### ÉTAPE 4 — Lancer extract_vocab.py par langue

```cmd
python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\extract_vocab.py --lang ru --files *.html
```
```linux
python3 "$DICT_BASE_DIR/extract_vocab.py" --lang ru --files *.html
```




Remplace `ru` par la langue voulue :

| Langue | Code |
|--------|------|
| Russe | `ru` |
| Japonais | `ja` |
| Chinois | `zh` |
| Polonais | `pl` |
| Portugais | `pt` |
| Allemand | `de` |
| Espagnol | `es` |

**Si tu as des fichiers de plusieurs langues dans le même dossier**, lance une commande par langue en précisant les fichiers :
```cmd
python C:\...\extract_vocab.py --lang ru --files "Russian Word of the Day.html" "Russian Word of the Day (2).html"
python C:\...\extract_vocab.py --lang ja --files "Japanese Word of the Day.html"
python C:\...\extract_vocab.py --lang zh --files "Chinese Word of the Day.html" "Chinese Word of the Day (2).html"
python C:\...\extract_vocab.py --lang de --files "German Word of the Day.html"
python C:\...\extract_vocab.py --lang es --files "Spanish Word of the Day.html"
```

**Ce que fait le script :**
- Extrait mot, translittération, traduction, catégorie, genre, phrases exemples
- Télécharge les MP3 dans `audio/{langue}/`
- Met à jour le fichier `{langue}_import.json` (sans écraser les entrées existantes)

---

### ÉTAPE 5 — Choisir la phrase de chaque mot (select_phrase.py)

Avant d'injecter, tu choisis **une seule phrase d'exemple par mot**, directement sur le JSON. C'est plus simple à contrôler que dans `index.html`, surtout que les mots arrivent par vagues de ~10 par langue.

Lancé **sans argument**, il traite **toutes les langues** (tous les `*_import.json`) — pas besoin d'une commande par langue :

```cmd
python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\select_phrase.py
```
```linux
python3 "$DICT_BASE_DIR/select_phrase.py"
```


| Option | Effet |
|--------|-------|
| *(aucune)* | Traite **tous** les `*_import.json` |
| `--lang ru` | Traite seulement `ru_import.json` |
| `--file "C:\...\ru_import.json"` | Traite un fichier précis |

Pour chaque mot ayant plusieurs phrases, le script affiche les candidates :
```
[ru] 1/10  фунт [funt]  =  pound  (nom, masculin)
  1) Краткое написание фунтов-lb.
       roman   : Kratkoye napisaniye funtov-lb.
       -> abbreviation for pound
  2) Один фунт
       roman   : Odin funt
       -> one pound
  Choix [1-2, Entree=1, s=passer, q=quitter] :
```

| Touche | Action |
|--------|--------|
| `1`, `2`, … | Garde cette phrase |
| `Entrée` | Garde la phrase 1 (par défaut) |
| `s` | Passe ce mot (conserve toutes ses phrases) |
| `q` | Arrête ici (les mots suivants restent intacts) |

**Ce que fait le script :**
- Crée un backup `{langue}_import.backup.YYYYMMDD_HHMMSS.json` avant modification
- Réduit le tableau `phrases` à la **seule phrase choisie**
- **Supprime du disque** les MP3 des phrases non retenues (`audio/{langue}/…_phrase_N.mp3`)
- Les mots n'ayant qu'une seule phrase sont gardés automatiquement (pas de question)

> ✅ Le schéma JSON n'est **pas** modifié (`phrases` reste une liste, avec 1 élément) : `inject_vocab.py` fonctionne donc sans changement et n'insérera **aucun commentaire** dans `index.html`.
> 💡 Pour tester sur une autre machine que le PC Windows, définis la variable d'environnement `DICT_BASE_DIR` vers le dossier du projet.

---

### ÉTAPE 6 — Traduire en français (extract_translation.py → reinject_translation.py)

La traduction se fait **sur les JSON, avant l'injection**. Trois temps :

**1. Sortir l'anglais à traduire** — un seul fichier `a_traduire.txt` pour toutes les langues :
```cmd
python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\extract_translation.py
```
```linux
python3 "$DICT_BASE_DIR/extract_translation.py"
```
> `--lang zh` pour une seule langue (→ `zh_a_traduire.txt`).

Le fichier ressemble à :
```
# ========== Mandarin (zh) ==========

id: zh_shou
mot: hand
phrase: The child is raising his hand.
```

**2. Traduire à la main** : remplace l'anglais par le français sur les lignes `mot:` et `phrase:` (avec DeepL par ex.). **Ne touche pas** aux lignes `id:` (c'est la clé qui relie au JSON). Tu peux n'en traduire qu'une partie.

**3. Réinjecter dans les JSON** :
```cmd
python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\reinject_translation.py
```
```linux
python3 "$DICT_BASE_DIR/reinject_translation.py"
```

**Ce que fait reinject :**
- Répartit chaque entrée vers le bon JSON d'après le préfixe de l'`id` (`zh_…` → `zh_import.json`)
- Réécrit `translation` (le mot) et `phrases[0].translation` (la phrase)
- Ne touche **que les entrées réellement modifiées** (relançable sans risque)
- Backup horodaté de chaque JSON touché

> 💡 La traduction reste dans le JSON ; c'est `inject_vocab.py` (ÉTAPE 7) qui la porte ensuite dans `index.html`. Plus rien à traduire à la main dans le HTML.

---

### ÉTAPE 7 — Lancer inject_vocab.py

Une fois la traduction faite, injecte dans `index.html` :

```cmd
python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\inject_vocab.py --lang ru
```

Ou toutes les langues d'un coup :
```cmd
python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\inject_vocab.py --all
```
```linux
python3 "$DICT_BASE_DIR/inject_vocab.py" --all
```


**Ce que fait le script :**
- Crée automatiquement un backup `index.backup.YYYYMMDD_HHMMSS.html` avant toute modification
- **Garde-fou ÉTAPE 5** : refuse d'injecter une langue dont un mot a encore plusieurs phrases (il affiche les `id` concernés et te renvoie vers `select_phrase.py`)
- Insère chaque entrée dans le bon bloc du tableau `words`
- La phrase retenue devient `phrase` / `phrase_roman` / `phrase_fr` / `audio_phrase` — et comme le JSON a été traduit à l'ÉTAPE 6, `translation` et `phrase_fr` arrivent **déjà en français**
- Comme le JSON ne contient plus qu'une phrase par mot, **aucun commentaire** n'est ajouté

> ℹ️ **Si l'injection est refusée** (`⛔ injection refusée`), c'est que l'ÉTAPE 5 n'a pas été faite pour ces mots : lance `select_phrase.py`, puis relance l'injection.
> Pour injecter **sans choisir** (les phrases en trop deviennent des commentaires, à traiter en ÉTAPE 8) :
> ```cmd
> python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\inject_vocab.py --lang ru --force
> ```

---

### ÉTAPE 8 — (Fallback) Choix de phrase directement dans index.html (apply_consigne.py)

> Étape **optionnelle**. Utile uniquement pour les mots **déjà présents dans `index.html` avec des commentaires** (parce que tu as sauté l'ÉTAPE 5, ou pour d'anciennes entrées). Si tu as fait l'ÉTAPE 5, tu n'en as pas besoin.

Tu notes tes choix dans un fichier et le script s'occupe du reste : il **garde la phrase voulue**, **supprime les commentaires**, et **efface du disque les MP3 des phrases non retenues**.

#### 1. Créer / éditer `consigne_langues.txt`

Dans le dossier du projet, crée un fichier `consigne_langues.txt`. **Une ligne par entrée** à finaliser, contenant l'`id` de l'entrée et le numéro de phrase à garder :

```
id: "ru_funt" phrase_2
id: "ja_neko" phrase_1
id: "zh_mao"  phrase_3
```

- `phrase_1` = garder la phrase déjà en place (celle insérée par défaut en ÉTAPE 6)
- `phrase_2`, `phrase_3`, … = remplacer par la phrase correspondante trouvée dans les commentaires juste sous l'entrée

> 💡 Astuce : copie-colle directement la ligne `id: "..."` depuis `index.html` et ajoute ` phrase_N` à la fin.
> Le script est tolérant : peu importe l'ordre ou les espaces sur la ligne, il lui faut juste trouver `id: "..."` **et** `phrase_N` sur la **même ligne**. Il accepte même la faute de frappe `pharse_N`.

#### 2. Lancer le script

```cmd
python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\apply_consigne.py
```

**Ce que fait le script :**
- Crée automatiquement un backup `index.backup.YYYYMMDD_HHMMSS.html` avant toute modification
- Pour chaque entrée listée dans la consigne :
  - si `phrase_1` → garde l'entrée telle quelle
  - si `phrase_N` (N>1) → remplace `phrase` / `phrase_reading` / `phrase_roman` / `phrase_fr` / `audio_phrase` par les valeurs de la phrase choisie (trouvées dans les commentaires)
  - **supprime les lignes de commentaires** `// phrase_…` sous l'entrée
- **Supprime du disque** les fichiers MP3 des phrases **non** retenues (`audio/{langue}/…_phrase_N.mp3`)
- Affiche à la fin le nombre d'entrées traitées et de fichiers audio supprimés

> ⚠️ Les entrées **non listées** dans la consigne sont laissées **intactes** (entrée + commentaires conservés). Pense donc à **lister toutes les entrées** que tu veux finaliser, sinon leurs commentaires resteront en place.
> ⚠️ Le script **ne traduit pas** : `phrase_fr` est repris tel quel depuis les commentaires (souvent en anglais). Il te reste à le traduire en français à la main une fois le script passé.

---

### ÉTAPE 9 — Générer / mettre à jour les decks Anki (build_anki.py)

> À faire **après l'injection** (ÉTAPE 7) : le script lit **`index.html`** (ton dictionnaire final, en français depuis l'ÉTAPE 6), pas les `*_import.json`. Tu obtiens donc des cartes propres et françaises.

```cmd
python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\build_anki.py --all --combined
```
```linux
python3 "$DICT_BASE_DIR/build_anki.py" --all --combined
```

| Commande | Effet |
|----------|-------|
| `--all --combined` | Un seul fichier `anki\vocabulaire_langues.apkg` avec tous les sous-decks (le plus simple à ré-importer) |
| `--all` | Un `.apkg` par langue dans `anki\` (`ru.apkg`, `ja.apkg`, …) |
| `--lang ru` | Seulement le russe → `anki\ru.apkg` |
| `--production` | Ajoute en plus la carte inverse **Sens → Mot** |
| `--out "C:\...\anki"` | Change le dossier de sortie (défaut : `<projet>\anki`) |

**Ce que fait le script :**
- Crée un **deck par langue** : `Vocabulaire::Russe`, `Vocabulaire::Japonais`, …
- Pour chaque mot, **2 cartes avec audio** : `Mot → Sens` et `Phrase → Sens` (verso = lecture/roman, traduction FR, genre/ton, phrase + sa traduction)
- **Embarque les MP3** (`audio_word` + `audio_phrase`) dans le `.apkg` — rien d'autre à copier
- Si un MP3 est introuvable sur le disque, la carte est créée **sans** ce son (pas de plantage)

**Import dans Anki :** double-clic sur le `.apkg` (ou *Fichier → Importer…*).

> ✅ **Mise à jour hebdo sans doublon.** Le GUID de chaque note est dérivé de son `id`. Quand tu ré-importes le `.apkg` la semaine suivante, Anki **met à jour** les notes existantes et **n'ajoute que les nouvelles**. Donc chaque semaine : `build_anki.py` → ré-importer le même fichier, c'est tout.
> 💡 Le script lit le tableau `INITIAL_DATA` **du fichier `index.html` sur le disque**. Si tu ajoutes/édites des mots via l'interface web (stockés dans le `localStorage` du navigateur), ces changements **ne sont pas** dans le fichier : édite `index.html` directement pour qu'ils partent dans Anki.

---

### ÉTAPE 10 — Vider vocab_temp

Une fois tout injecté et vérifié, supprime le contenu de `vocab_temp\` pour repartir propre à la prochaine session.

---

## ⚠️ Notes importantes

- **Lance toujours `select_phrase.py` (ÉTAPE 5) AVANT `inject_vocab.py` (ÉTAPE 6)** : une fois la phrase choisie sur le JSON, l'injection produit une entrée propre, sans commentaire
- **Ne jamais lancer inject_vocab.py deux fois** sur le même JSON sans avoir vidé ou mis à jour le JSON entre les deux — le script vérifie les doublons par `id` mais mieux vaut rester propre
- **Les backups** s'accumulent dans le dossier du projet (`.backup.*.html` ET `.backup.*.json`) — pense à supprimer les anciens de temps en temps
- **Si un MP3 échoue** au téléchargement, le champ `audio_word` ou `audio_phrase` sera vide `""` dans le JSON — tu pourras le remplir manuellement plus tard
- **Si le site change de structure**, `extract_vocab.py` affichera `✗ Attribut data-wordday introuvable` — donne le fichier HTML à Claude Code pour qu'il identifie le nouveau pattern
- **Traduis au stade JSON (ÉTAPE 6) AVANT d'injecter (ÉTAPE 7)** : `inject_vocab.py` porte alors directement le français dans `index.html`, et `build_anki.py` (qui lit `index.html`) produit des cartes françaises. Ré-importer le même `.apkg` chaque semaine ne crée pas de doublon (GUID basé sur l'`id`).
