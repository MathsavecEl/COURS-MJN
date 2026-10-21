# Application Android MJN COURS

Cette application Android ouvre le site public MJN COURS dans une WebView. Elle nécessite une connexion Internet et ne constitue pas une application hors ligne.

## Compilation et téléchargement de l’APK de test

Le workflow GitHub Actions `.github/workflows/build-apk.yml` compile un APK de test à chaque modification du dossier `android/` ou du workflow.

1. Ouvrir l’onglet **Actions** du dépôt.
2. Choisir **Build APK MJN COURS**.
3. Ouvrir la dernière exécution terminée avec succès.
4. Télécharger l’artefact **MJN-COURS-APK**.

L’artefact est conservé pendant 30 jours. L’APK de débogage sert aux essais : il est signé avec une clé de débogage et **ne doit pas être considéré comme une version de production pour Google Play**.

## Mesures de sécurité intégrées

- L’application charge le site officiel en HTTPS.
- Seules les pages HTTPS de `mathsavecel.github.io` restent dans la WebView.
- Les liens HTTPS vers d’autres domaines sont ouverts dans le navigateur externe.
- Les liens HTTP et les autres schémas sont bloqués.
- L’accès de la WebView aux fichiers locaux et au contenu mixte est désactivé.
- La sauvegarde automatique Android est désactivée dans le manifeste.
- Le workflow de compilation dispose uniquement de la permission GitHub `contents: read`.

Ces mesures réduisent certains risques, mais ne constituent pas à elles seules une certification de sécurité. Le site chargé dans l’application doit également être maintenu et testé.

## Avant toute publication sur une boutique

Une publication Google Play nécessite notamment une version de production signée, une fiche de boutique, une déclaration exacte des données et des pratiques de confidentialité, ainsi que le respect des règles Google Play. Il faut également tester l’application sur de vrais appareils.

Ne jamais ajouter de mot de passe, de clé privée ou de fichier de signature dans le dépôt public. Les secrets de signature doivent être conservés de manière privée.

La publication iPhone/iPad nécessite un projet iOS distinct et le processus de validation Apple.

Site : https://mathsavecel.github.io/COURS-MJN/
