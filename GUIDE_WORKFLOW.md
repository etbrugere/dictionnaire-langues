# 📖 Guide — Ajout de vocabulaire au dictionnaire

## Vue d'ensemble

```
Brave (onglets) → Ctrl+S → vocab_temp/ → extract_vocab.py → JSON + MP3 → inject_vocab.py → index.html
```

---

## 📁 Structure du projet

```
C:\Users\brugere\Documents\Workspace\dictionnaire-langues\
├── index.html               ← ton dictionnaire
├── extract_vocab.py         ← script d'extraction
├── inject_vocab.py          ← script d'injection
├── ru_import.json           ← données extraites russe
├── ja_import.json           ← données extraites japonais
├── zh_import.json           ← données extraites chinois
├── pl_import.json           ← données extraites polonais
├── pt_import.json           ← données extraites portugais
└── audio/
    ├── ru/                  ← fichiers MP3 russes
    ├── ja/                  ← fichiers MP3 japonais
    ├── zh/                  ← fichiers MP3 chinois
    ├── pl/                  ← fichiers MP3 polonais
    └── pt/                  ← fichiers MP3 portugais
```

---

## 🔧 Installation (une seule fois)

Ouvre CMD et lance :
```cmd
pip install requests beautifulsoup4
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

---

### ÉTAPE 4 — Lancer extract_vocab.py par langue

```cmd
python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\extract_vocab.py --lang ru --files *.html
```

Remplace `ru` par la langue voulue :

| Langue | Code |
|--------|------|
| Russe | `ru` |
| Japonais | `ja` |
| Chinois | `zh` |
| Polonais | `pl` |
| Portugais | `pt` |

**Si tu as des fichiers de plusieurs langues dans le même dossier**, lance une commande par langue en précisant les fichiers :
```cmd
python C:\...\extract_vocab.py --lang ru --files "Russian Word of the Day.html" "Russian Word of the Day (2).html"
python C:\...\extract_vocab.py --lang ja --files "Japanese Word of the Day.html"
python C:\...\extract_vocab.py --lang zh --files "Chinese Word of the Day.html" "Chinese Word of the Day (2).html"
```

**Ce que fait le script :**
- Extrait mot, translittération, traduction, catégorie, genre, phrases exemples
- Télécharge les MP3 dans `audio/{langue}/`
- Met à jour le fichier `{langue}_import.json` (sans écraser les entrées existantes)

---

### ÉTAPE 5 — Lancer inject_vocab.py

Une fois l'extraction terminée, injecte dans `index.html` :

```cmd
python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\inject_vocab.py --lang ru
```

Ou toutes les langues d'un coup :
```cmd
python C:\Users\brugere\Documents\Workspace\dictionnaire-langues\inject_vocab.py --all
```

**Ce que fait le script :**
- Crée automatiquement un backup `index.backup.YYYYMMDD_HHMMSS.html` avant toute modification
- Insère chaque entrée dans le bon bloc du tableau `words`
- La **première phrase** devient `phrase` / `phrase_roman` / `phrase_fr` / `audio_phrase`
- Les **phrases suivantes** apparaissent en commentaires JS juste en dessous pour que tu choisisses manuellement la meilleure

---

### ÉTAPE 6 — Éditer manuellement les entrées

Ouvre `index.html` dans VS Code (ou ton éditeur).

Chaque entrée injectée ressemble à ça :
```js
{
    id: "ru_funt", lang: "ru", niveau: "Nouveau",
    word: "фунт", roman: "funt",
    translation: "pound", category: "nom",
    phrase: "Краткое написание фунтов-lb.",
    phrase_roman: "Kratkoye napisaniye funtov-lb.",
    phrase_fr: "The abbreviation for pound is lb.",
    audio_word: "audio/ru/funt.mp3", audio_phrase: "audio/ru/funt_phrase_1.mp3",
    notes: ""
  }
  // ── Autres phrases pour 'фунт':
  // phrase_2: "Один фунт..." | roman: "Odin funt..." | audio: "audio/ru/funt_phrase_2.mp3"
  // phrase_3: "один фунт"   | roman: "odin funt"    | audio: "audio/ru/funt_phrase_3.mp3"
```

Pour chaque entrée :
1. **Choisis la meilleure phrase** parmi les commentaires si la première ne te convient pas
2. **Traduis** `phrase_fr` en français (actuellement en anglais)
3. **Supprime** les commentaires une fois ton choix fait
4. **Ajuste** `niveau` si besoin (`Nouveau` / `En cours` / `Maîtrisé`)

---

### ÉTAPE 7 — Vider vocab_temp

Une fois tout injecté et vérifié, supprime le contenu de `vocab_temp\` pour repartir propre à la prochaine session.

---

## ⚠️ Notes importantes

- **Ne jamais lancer inject_vocab.py deux fois** sur le même JSON sans avoir vidé ou mis à jour le JSON entre les deux — le script vérifie les doublons par `id` mais mieux vaut rester propre
- **Les backups** s'accumulent dans le dossier du projet — pense à en supprimer les anciens de temps en temps
- **Si un MP3 échoue** au téléchargement, le champ `audio_word` ou `audio_phrase` sera vide `""` dans le JSON — tu pourras le remplir manuellement plus tard
- **Si le site change de structure**, `extract_vocab.py` affichera `✗ Attribut data-wordday introuvable` — donne le fichier HTML à Claude Code pour qu'il identifie le nouveau pattern
