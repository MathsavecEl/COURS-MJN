/* Configuration du site et catalogue des ressources. */
const SITE = {
  titre: "COURS MJN",
  presentation: "Un espace pour mes élèves, mais aussi pour tous ceux qui souhaitent se défier, renouer avec les mathématiques et revoir les notions à leur rythme.",
  enseignant: "M. AHA MAJANI",
  matiere: "Mathématiques",
  etablissement: "",
  droits: "Ressources pédagogiques",
  aPropos: [
    "Ce site est destiné à mes élèves, mais aussi à tout élève qui souhaite se défier, renouer avec les mathématiques et revoir les notions à son rythme.",
    "Les cours proposés pour les classes de 6e, 5e, Seconde et Première sont conformes aux nouveaux programmes.",
    "Pour les classes de 4e et de 3e, les nouveaux programmes entreront respectivement en vigueur à la rentrée 2027 et à la rentrée 2028.",
    "Choisis ta classe, puis ouvre la ressource qui t’intéresse. Les activités interactives sont accessibles sans compte élève."
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
  { nom: "Première", court: "1re", couleur: 45 },
  { nom: "Terminale", court: "Tle", couleur: 190 },
  { nom: "Divers", court: "★", couleur: 285 }
];

const COURS = [
  {
    classe: "4e",
    titre: "Mathématiques en 4e — classe 416",
    chapitre: "Cours et exercices interactifs",
    type: "Site de classe",
    description: "Chapitres, rappels de cours, exercices interactifs et automatismes.",
    lien: "maths-4e-416.html",
    nouveau: true
  },
  {
    classe: "3e",
    titre: "Mathématiques en 3e prépa-métiers — classe 306",
    chapitre: "Cours, automatismes et entraînement",
    type: "Site de classe",
    description: "Cours interactifs, chapitres, QCM et préparation aux évaluations.",
    lien: "maths-3e-306.html",
    nouveau: true
  },
  {
    classe: "3e",
    titre: "Mathématiques en 3e — classe 312",
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
    titre: "Scratch pas à pas — apprendre en programmant",
    chapitre: "Programmation et mathématiques",
    type: "Activité interactive",
    description: "Découvre les blocs Scratch, construis des scripts et teste tes idées dans une activité guidée et interactive.",
    lien: "scratch-pas-a-pas.html",
    nouveau: true
  }
];
