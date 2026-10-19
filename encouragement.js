/* Messages d’encouragement COURS MJN — durée cumulée réelle, par paliers de 10 minutes. */
(function () {
  if (window.__mjnEncouragementInitialise) return;
  window.__mjnEncouragementInitialise = true;

  const debut = Date.now();
  let dernierPalierAffiche = 0;
  let hideTimer = null;
  let boiteActuelle = null;

  const messages = [
    minutes => `Tu as déjà consacré ${minutes} minutes à t’entraîner : bravo ! Continue, chaque exercice te fait progresser. 💪📐`,
    minutes => `Déjà ${minutes} minutes de travail ! Tes efforts comptent. Continue à ton rythme, tu es capable d’y arriver !`,
    minutes => `Bravo pour ta persévérance : ${minutes} minutes d’entraînement ! Les progrès viennent avec la pratique. Garde confiance en toi !`,
    minutes => `Tu as travaillé ${minutes} minutes : c’est un bel effort. Les erreurs font partie de l’apprentissage ; continue !`,
    minutes => `${minutes} minutes d’apprentissage, un beau pas en avant ! Fais une petite pause si besoin, puis reprends avec confiance.`,
    minutes => `Tu construis tes progrès exercice après exercice. Déjà ${minutes} minutes : sois fier de tes efforts et ne baisse pas les bras !`
  ];

  const style = document.createElement("style");
  style.textContent = `
    #mjn-encouragement{position:fixed;z-index:2147483000;right:18px;bottom:18px;width:min(390px,calc(100vw - 28px));padding:18px 48px 18px 18px;border:1px solid #aeb5bf;border-radius:14px;background:#fff;color:#20242b;box-shadow:0 8px 28px rgba(0,0,0,.18);font:600 15px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}
    #mjn-encouragement strong{display:block;margin-bottom:5px;font-size:16px}
    #mjn-encouragement button{position:absolute;top:8px;right:9px;width:32px;height:32px;border:1px solid #d6d9de;border-radius:50%;background:#f1f2f4;color:#20242b;font-size:22px;line-height:1;cursor:pointer}
    #mjn-encouragement button:focus-visible{outline:2px solid #555;outline-offset:2px}
    @media(prefers-color-scheme:dark){#mjn-encouragement{background:#20242b;color:#f3f4f6;border-color:#555c67}#mjn-encouragement button{background:#303640;color:#f3f4f6;border-color:#555c67}}
    @media(max-width:480px){#mjn-encouragement{right:10px;bottom:10px;width:calc(100vw - 20px)}}
    @media(prefers-reduced-motion:reduce){#mjn-encouragement{animation:none}}
  `;
  document.head.appendChild(style);

  function afficherMessage(minutes) {
    if (boiteActuelle) boiteActuelle.remove();
    const boite = document.createElement("aside");
    boite.id = "mjn-encouragement";
    boite.setAttribute("role", "status");
    boite.setAttribute("aria-live", "polite");

    const titre = document.createElement("strong");
    titre.textContent = "👏 Un encouragement de M. AHA MAJANI";
    const texte = document.createElement("div");
    texte.textContent = messages[(Math.floor(minutes / 10) - 1) % messages.length](minutes);
    const fermer = document.createElement("button");
    fermer.type = "button";
    fermer.setAttribute("aria-label", "Fermer le message d’encouragement");
    fermer.textContent = "×";
    fermer.addEventListener("click", () => {
      boite.remove();
      if (boiteActuelle === boite) boiteActuelle = null;
      window.clearTimeout(hideTimer);
    });

    boite.append(titre, texte, fermer);
    (document.body || document.documentElement).appendChild(boite);
    boiteActuelle = boite;
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      boite.remove();
      if (boiteActuelle === boite) boiteActuelle = null;
    }, 25000);
  }

  function verifierTemps() {
    const minutesEcoulees = Math.floor((Date.now() - debut) / 60000);
    const palierAtteint = Math.floor(minutesEcoulees / 10) * 10;
    if (palierAtteint >= 10 && palierAtteint > dernierPalierAffiche && !document.hidden) {
      dernierPalierAffiche = palierAtteint;
      afficherMessage(palierAtteint);
    }
  }

  // Vérification fréquente pour rester juste même si l’onglet a été mis en arrière-plan.
  window.setInterval(verifierTemps, 15000);
  document.addEventListener("visibilitychange", verifierTemps);
  window.addEventListener("focus", verifierTemps);
})();
