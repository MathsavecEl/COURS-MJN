# Mes cours interactifs

Site statique hébergé gratuitement par GitHub Pages.

## Mettre le site en ligne (une seule fois)

1. Crée un compte gratuit sur https://github.com (si ce n'est pas déjà fait).
2. Clique sur **+** en haut à droite, puis **New repository**. Nom : `cours`. Coche **Public**. Clique **Create repository**.
3. Sur la page du dépôt, clique **uploading an existing file**, puis glisse-dépose **tout le contenu** du dossier `site-cours` (index.html, style.css, cours.js, README.md et le dossier `cours`). Clique **Commit changes**.
4. Va dans **Settings → Pages**. Sous *Branch*, choisis `main` et `/ (root)`, puis **Save**.
5. Après une à deux minutes, ton site est en ligne à l'adresse `https://mathsavecel.github.io/cours/`.

## Changer le titre, la présentation ou les classes

Ouvre `cours.js` sur GitHub, clique sur le crayon ✏️, modifie `SITE` (titre, ton nom, ta matière, ton établissement, texte d'accueil) ou `CLASSES`, puis **Commit changes**.

## Donner un lien direct à une classe

Ajoute `?classe=` à l'adresse, par exemple `https://mathsavecel.github.io/cours/?classe=Seconde`.
Le plus simple : clique sur l'onglet de la classe sur le site, puis copie l'adresse affichée.

## Ajouter un cours

1. Sur GitHub, ouvre le dossier `cours`, puis **Add file → Upload files**.
2. Dépose ton fichier HTML dans un nouveau dossier, par exemple `cours/6e-fractions/index.html`
   (dans la fenêtre d'envoi, tu peux glisser directement un dossier entier).
3. Ouvre `cours.js`, clique sur le crayon ✏️, ajoute un bloc pour ton cours (titre, classe, chapitre, type, description, lien ; avec `classe` écrite exactement comme dans `CLASSES`) et clique **Commit changes**.

Le site se met à jour tout seul en une minute environ.

Astuce : si un cours contient des images ou d'autres fichiers, mets-les dans le même dossier que son `index.html`.
