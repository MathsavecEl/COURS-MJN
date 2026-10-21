# Application Android MJN COURS

Cette application Android ouvre le site public MJN COURS dans une WebView.

## Compilation automatique

Le workflow GitHub Actions `.github/workflows/build-apk.yml` compile un APK de test à chaque modification du dossier `android/` ou du workflow.

1. Ouvrir l’onglet **Actions** du dépôt.
2. Choisir **Build APK MJN COURS**.
3. Ouvrir la dernière exécution réussie.
4. Télécharger l’artefact **MJN-COURS-APK**.

L’artefact est conservé pendant 30 jours. Il s’agit d’un APK de débogage signé avec la clé de débogage générée par Android Gradle Plugin ; ce n’est pas encore une version de production signée pour publication durable.

L’application nécessite une connexion Internet pour charger le site : https://mathsavecel.github.io/COURS-MJN/
