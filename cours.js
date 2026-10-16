/* Configuration du site et catalogue des ressources. */
const SITE = {
  titre: "Mathématiques interactives",
  presentation: "Cours, automatismes et exercices interactifs pour réviser les mathématiques depuis un téléphone, une tablette ou un ordinateur.",
  enseignant: "M. AHA MAJANI",
  matiere: "Mathématiques",
  etablissement: "",
  droits: "Ressources pédagogiques",
  aPropos: [
    "Choisis ta classe, puis ouvre la ressource qui t'intéresse.",
    "Les activités interactives sont accessibles sans compte élève.",
    "Certains éléments (polices ou contenus externes) peuvent nécessiter une connexion Internet."
  ],
  signature: "",
  blague: "",
  email: ""
};

const CLASSES = [
  { nom: "6e", court: "6e", couleur: 205 },
  { nom: "5e", court: "5e", couleur: 260 },
  { nom: "4e", court: "4e", couleur: 155 },
  { nom: "3e", court: "3e", couleur: 25 },
  { nom: "Seconde", court: "2de", couleur: 330 },
  { nom: "Première", court: "1re", couleur: 45 },
  { nom: "Terminale", court: "Tle", couleur: 190 }
];

const COURS = [
  {
    classe: "4e",
    titre: "Mathématiques en 4e — classe 416",
    chapitre: "Cours et exercices interactifs",
    type: "Site de classe",
    description: "Chapitres, rappels de cours, exercices interactifs et automatismes.",
    lien: "cours/maths-4e-416.html",
    nouveau: true
  },
  {
    classe: "3e",
    titre: "Mathématiques en 3e prépa-métiers — classe 306",
    chapitre: "Cours, automatismes et entraînement",
    type: "Site de classe",
    description: "Cours interactifs, chapitres, QCM et préparation aux évaluations.",
    lien: "cours/maths-3e-306.html",
    nouveau: true
  },
  {
    classe: "3e",
    titre: "Mathématiques en 3e — classe 312",
    chapitre: "Cours, automatismes et brevet",
    type: "Site de classe",
    description: "Chapitres, rappels de cours, exercices interactifs et problèmes type brevet.",
    lien: "cours/maths-3e-312.html",
    nouveau: true
  },
  {
    classe: "Seconde",
    titre: "Mathématiques en Seconde",
    chapitre: "Cours et exercices interactifs",
    type: "Site de classe",
    description: "Cours, séries d'exercices et automatismes de Seconde.",
    lien: "cours/maths-seconde.html",
    nouveau: true
  },
  {
    classe: "Première",
    titre: "Mathématiques en Première spécialité",
    chapitre: "Spécialité mathématiques",
    type: "Site de classe",
    description: "Cours, séries d'exercices et automatismes de Première spécialité.",
    lien: "cours/maths-premiere-specialite.html",
    nouveau: true
  }
];
