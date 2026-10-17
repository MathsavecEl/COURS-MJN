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
    "Les cours proposés pour les classes de 6e, 5e et Seconde sont conformes aux nouveaux programmes. En Première et en Terminale, les ressources concernent les spécialités mathématiques.",
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
  { nom: "Première", label: "Première spécialité", court: "1re spé", couleur: 45 },
  { nom: "Terminale", label: "Terminale spécialité", court: "Tle spé", couleur: 190 },
  { nom: "Divers", court: "★", couleur: 285 }
];

const COURS = [
  {
    classe: "6e",
    titre: "Mathématiques en 6e",
    chapitre: "Cours, exercices et automatismes",
    type: "Site de cours interactif",
    description: "Cours illustrés, exercices corrigés et automatismes pour les élèves de 6e.",
    lien: "maths-6e.html",
    nouveau: true
  },
  {
    classe: "5e",
    titre: "Mathématiques en 5e NLS",
    chapitre: "Cours, remise à niveau et automatismes",
    type: "Site de cours interactif",
    description: "Ressources de mathématiques destinées aux élèves de 5e NLS.",
    lien: "maths-5e-nls.html",
    nouveau: true
  },

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
    classe: "Seconde",
    titre: "SNT — Sciences numériques et technologie",
    chapitre: "SNT",
    type: "Espace à compléter",
    description: "Espace réservé aux ressources de SNT. Le contenu sera ajouté ultérieurement.",
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
  }
];
