// =====================================================================
//  RÉGLAGES DU SITE : modifie librement les textes entre guillemets.
// =====================================================================

const SITE = {
  titre: "Mes cours interactifs",
  enseignant: "M. AHA MAJANI",
  matiere: "Mathématiques",
  etablissement: "",         // ex. "Collège Jean Moulin" (laisser vide pour ne rien afficher)
  email: "mathsclavie20@gmail.com",   // pour signaler une coquille
  presentation: "Retrouve ici tous les cours, exercices et activités interactives de ta classe. Choisis ta classe, puis ouvre le cours dont tu as besoin.",
  // Texte de la section « À propos » (chaque élément = un paragraphe).
  aPropos: [
    "Je suis enseignant de mathématiques et j'utilise les nouvelles technologies pour faire pratiquer les mathématiques à mes élèves.",
  ],
  signature: "Khalili",       // signature manuscrite sous « À propos »
  blague: "Un matheux n'urine pas, il fait π π.",
  // Mention sur l'utilisation des documents (affichée en bas de page).
  droits: "Ces documents restent ma propriété, mais toutes les personnes qui le souhaitent peuvent les utiliser librement.",
};

// Les classes, dans l'ordre d'affichage. "couleur" = teinte (0 à 360).
const CLASSES = [
  { nom: "3ème",         court: "3e",  couleur: 230 },
  { nom: "4ème",         court: "4e",  couleur: 190 },
  { nom: "Seconde",      court: "2de", couleur: 150 },
  { nom: "Première spé", court: "1re", couleur: 280 },
  { nom: "Divers",       court: "+",   couleur: 30  },
];

// =====================================================================
//  LISTE DES COURS
//  Pour ajouter un cours : copie un bloc { ... }, colle-le à la suite,
//  puis change les infos. "classe" doit être écrite comme dans CLASSES.
//  type : "Cours", "Exercices", "Quiz", "Activité", "Évaluation"...
//  nouveau: true affiche une pastille « Nouveau ».
// =====================================================================

const COURS = [
  {
    titre: "Maths en 3e (306)",
    classe: "3ème",
    chapitre: "Toute l'année",
    type: "Cours et exercices",
    description: "Chapitres, exercices interactifs, automatismes et entraînement à l'évaluation pour la 3e prépa métiers.",
    lien: "cours/3e-maths/index.html",
    nouveau: true
  },
  {
    titre: "Maths en 4e (416)",
    classe: "4ème",
    chapitre: "Toute l'année",
    type: "Cours et exercices",
    description: "Chapitres, fiches rappels, automatismes et exercices type brevet.",
    lien: "cours/4e-maths/index.html",
    nouveau: true
  },
  {
    titre: "Maths en Seconde",
    classe: "Seconde",
    chapitre: "Toute l'année",
    type: "Cours et exercices",
    description: "Rappels avec exemples, exercices corrigés et automatismes, chapitre par chapitre.",
    lien: "cours/seconde-maths/index.html",
    nouveau: true
  },
  {
    titre: "Maths en Première spécialité",
    classe: "Première spé",
    chapitre: "Toute l'année",
    type: "Cours et exercices",
    description: "Second degré, suites, dérivation, exponentielle… avec exercices corrigés et automatismes.",
    lien: "cours/premiere-spe-maths/index.html",
    nouveau: true
  },
  {
    titre: "Course aux nombres",
    classe: "Divers",
    chapitre: "Automatismes 3e",
    type: "Entraînement",
    description: "Séries chronométrées de calcul mental et d'automatismes, avec correction détaillée et suivi des scores.",
    lien: "cours/divers-course-aux-nombres-3e/index.html",
    nouveau: true
  },
  // {
  //   titre: "Théorème de Pythagore",
  //   classe: "4ème",
  //   chapitre: "Géométrie",
  //   type: "Cours",
  //   description: "Calculer une longueur dans un triangle rectangle.",
  //   lien: "cours/4e-pythagore/index.html"
  // },
];
