/* Configuration du site et catalogue des ressources. */
const SITE = {
  titre: "MJN COURS",
  presentation: "Cours, exercices et activités interactives pour apprendre, réviser et progresser en mathématiques.",
  enseignant: "",
  matiere: "Mathématiques",
  etablissement: "",
  droits: "Ressources pédagogiques",
  aPropos: [
    "Et si les mathématiques n’étaient pas si difficiles ? Jeune professeur, je suis AHA MAJANI El-Hamid et je souhaite déconstruire les idées reçues et montrer à mes élèves qu’avec les bons outils et un accompagnement adapté, chacun peut progresser à son rythme et reprendre confiance en soi. C’est avec cette conviction qu’est né MJN COURS !",
    "Programmes : 6e, 5e et Seconde conformes ; nouveaux programmes de 4e et 3e prévus respectivement pour 2027 et 2028."
  ],
  signature: "Khalili ☺",
  blague: "Un matheux n’urine pas, il fait π-π.",
  email: ""
};

const CLASSES = [
  { nom: "6e", court: "6e", couleur: 205 },
  { nom: "5e", court: "5e", couleur: 260 },
  { nom: "4e", court: "4e", couleur: 155 },
  { nom: "3e", court: "3e", couleur: 25 },
  { nom: "Seconde", court: "2de", couleur: 330 },
  { nom: "Première", label: "Première spécialité", court: "1re spé", couleur: 45 },
  { nom: "Terminale", label: "Terminale spécialité", court: "Tle spé", couleur: 190 },
  { nom: "Divers", court: "★", couleur: 285 }
];

const COURS = [
  {
    classe: "6e",
    titre: "Mathématiques en 6e ordinaire",
    chapitre: "Cours, exercices et automatismes",
    type: "Site de cours interactif",
    description: "Cours illustrés, exercices corrigés et automatismes.",
    lien: "maths-6e.html",
    nouveau: true
  },
  {
    classe: "6e",
    titre: "Mathématiques en 6e NLNS",
    chapitre: "",
    type: "",
    description: "",
    lien: "maths-6e-nlns.html",
    nouveau: true
  },
  {
    classe: "5e",
    titre: "Mathématiques en 5e — NLS et PLPS",
    chapitre: "Cours, remise à niveau et automatismes",
    type: "Site de cours interactif",
    description: "",
    lien: "maths-5e-nls.html",
    nouveau: true
  },
  {
    classe: "5e",
    titre: "Mathématiques en 5e ordinaire",
    chapitre: "Cours, exercices et automatismes",
    type: "Site de cours interactif",
    description: "Cours interactif et exercices de mathématiques.",
    lien: "maths-5e.html",
    nouveau: true
  },

  {
    classe: "4e",
    titre: "Mathématiques en 4e",
    chapitre: "Cours et exercices interactifs",
    type: "Site de cours interactif",
    description: "",
    lien: "maths-4e-416.html",
    nouveau: true
  },
  {
    classe: "3e",
    titre: "Mathématiques en 3e — prépa-métiers",
    chapitre: "Cours, automatismes et entraînement",
    type: "",
    description: "Chapitres, QCM et préparation aux évaluations.",
    lien: "maths-3e-306.html",
    nouveau: true
  },
  {
    classe: "3e",
    titre: "Mathématiques en 3e — ordinaire",
    chapitre: "Cours, automatismes et brevet",
    type: "Site de classe",
    description: "Chapitres, rappels de cours, exercices interactifs et problèmes type brevet.",
    lien: "maths-3e-312.html",
    nouveau: true
  },
  {
    classe: "Seconde",
    titre: "Mathématiques en Seconde",
    chapitre: "Cours et exercices interactifs",
    type: "Site de classe",
    description: "Cours, séries d'exercices et automatismes de Seconde.",
    lien: "maths-seconde.html",
    nouveau: true
  },
  {
    classe: "Seconde",
    titre: "SNT — Sciences numériques et technologie",
    chapitre: "SNT",
    type: "",
    description: "Cours et activités interactives de SNT.",
    lien: "snt-seconde.html",
    nouveau: true
  },
  {
    classe: "Première",
    titre: "Mathématiques en Première spécialité",
    chapitre: "Spécialité mathématiques",
    type: "Site de classe",
    description: "Cours, séries d'exercices et automatismes de Première spécialité.",
    lien: "maths-premiere-specialite.html",
    nouveau: true
  },
  {
    classe: "Divers",
    titre: "Tableur pas à pas — 5e à 3e",
    chapitre: "Tableur et calculs",
    type: "Activité interactive",
    description: "Apprends à utiliser un tableur avec des étapes guidées, des exemples et des exercices interactifs.",
    lien: "tableur-pas-a-pas-5e-3e.html",
    nouveau: true
  },
  {
    classe: "Divers",
    titre: "Course aux nombres — 3e",
    chapitre: "Calcul mental et automatismes",
    type: "Activité interactive",
    description: "Entraîne-toi avec des questions interactives, consulte les corrections et suis tes progrès.",
    lien: "course-aux-nombres-3e.html",
    nouveau: true
  },
  {
    classe: "Divers",
    titre: "Scratch pas à pas — apprendre en programmant",
    chapitre: "Programmation et mathématiques",
    type: "Activité interactive",
    description: "Découvre les blocs Scratch, construis des scripts et teste tes idées dans une activité guidée et interactive.",
    lien: "scratch-pas-a-pas.html",
    nouveau: true
  },
  {
    classe: "6e",
    titre: "Défis et exercices mélangés — 6e",
    chapitre: "défis transversaux",
    type: "Entraînement interactif",
    description: "Séries aléatoires et problèmes qui mélangent plusieurs notions, avec corrections expliquées.",
    lien: "maths-defis.html?classe=6e",
    nouveau: true
  },
  {
    classe: "5e",
    titre: "Défis et exercices mélangés — 5e",
    chapitre: "défis transversaux",
    type: "Entraînement interactif",
    description: "Séries aléatoires et problèmes qui mélangent plusieurs notions, avec corrections expliquées.",
    lien: "maths-defis.html?classe=5e",
    nouveau: true
  },
  {
    classe: "4e",
    titre: "Défis et exercices mélangés — 4e",
    chapitre: "défis transversaux",
    type: "Entraînement interactif",
    description: "Séries aléatoires et problèmes qui mélangent plusieurs notions, avec corrections expliquées.",
    lien: "maths-defis.html?classe=4e",
    nouveau: true
  },
  {
    classe: "3e",
    titre: "Défis et exercices mélangés — 3e",
    chapitre: "défis transversaux",
    type: "Entraînement interactif",
    description: "Séries aléatoires et problèmes qui mélangent plusieurs notions, avec corrections expliquées.",
    lien: "maths-defis.html?classe=3e",
    nouveau: true
  },
  {
    classe: "Seconde",
    titre: "Défis et exercices mélangés — Seconde",
    chapitre: "défis transversaux",
    type: "Entraînement interactif",
    description: "Séries aléatoires et problèmes qui mélangent plusieurs notions, avec corrections expliquées.",
    lien: "maths-defis.html?classe=Seconde",
    nouveau: true
  },
  {
    classe: "Première",
    titre: "Défis et exercices mélangés — Première spécialité",
    chapitre: "défis transversaux",
    type: "Entraînement interactif",
    description: "Séries aléatoires et problèmes qui mélangent plusieurs notions, avec corrections expliquées.",
    lien: "maths-defis.html?classe=Première",
    nouveau: true
  },
];
