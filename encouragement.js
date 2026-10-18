/* Messages d’encouragement COURS MJN — minuteur robuste, y compris après un retour sur l’onglet. */
(function () {
  if (window.__mjnEncouragementInitialise) return;
  window.__mjnEncouragementInitialise = true;
  const messages = [
    "Tu as déjà passé 10 minutes à t’entraîner : bravo ! Continue, c’est comme ça que tu progresseras. M. AHA MAJANI t’encourage ! 💪📐",
    "Déjà 10 minutes de travail ! Chaque exercice te fait avancer. Continue à ton rythme, tu es capable d’y arriver ! — M. AHA MAJANI",
    "Bravo pour ta persévérance ! Les mathématiques deviennent plus claires avec de l’entraînement. Garde confiance en toi ! — M. AHA MAJANI",
    "Se tromper fait partie de l’apprentissage. Lis la correction, réessaie et tu progresseras ! M. AHA MAJANI croit en tes efforts. 🌟",
    "10 minutes de plus à apprendre, c’est un beau pas en avant ! Fais une petite pause si besoin, puis continue. Courage ! — M. AHA MAJANI",
    "Tu construis tes progrès exercice après exercice. Sois fier·ère de tes efforts et ne baisse pas les bras ! — M. AHA MAJANI"
  ];
  const style = document.createElement("style");
  style.textContent = `
    #mjn-encouragement{position:fixed;z-index:2147483000;right:18px;bottom:18px;width:min(390px,calc(100vw - 28px));padding:18px 48px 18px 18px;border:2px solid #16764a;border-radius:16px;background:#f0fbf5;color:#173d2e;box-shadow:0 12px 36px rgba(0,0,0,.25);font:600 15px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}
    #mjn-encouragement strong{display:block;margin-bottom:5px;font-size:16px}
    #mjn-encouragement button{position:absolute;top:8px;right:9px;width:32px;height:32px;border:0;border-radius:50%;background:#d8f1e3;color:#173d2e;font-size:22px;line-height:1;cursor:pointer}
    #mjn-encouragement button:focus-visible{outline:3px solid #176b55;outline-offset:2px}
    @keyframes mjn-arrive{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    #mjn-encouragement{animation:mjn-arrive .35s ease-out}
    @media(max-width:480px){#mjn-encouragement{right:10px;bottom:10px;width:calc(100vw - 20px)}}
    @media(prefers-reduced-motion:reduce){#mjn-encouragement{animation:none}}
  `;
  document.head.appendChild(style);
  let index=0, hideTimer=null, intervalTimer=null, lastShown=Date.now();
  function afficherMessage(){
    const ancien=document.getElementById("mjn-encouragement");
    if(ancien) ancien.remove();
    const boite=document.createElement("aside");
    boite.id="mjn-encouragement";
    boite.setAttribute("role","status"); boite.setAttribute("aria-live","polite");
    const titre=document.createElement("strong"); titre.textContent="👏 Un petit encouragement de M. AHA MAJANI";
    const texte=document.createElement("div"); texte.textContent=messages[index % messages.length];
    const fermer=document.createElement("button"); fermer.type="button";
    fermer.setAttribute("aria-label","Fermer le message d’encouragement"); fermer.textContent="×";
    fermer.addEventListener("click",()=>{boite.remove();window.clearTimeout(hideTimer);});
    boite.append(titre,texte,fermer);
    (document.body||document.documentElement).appendChild(boite);
    index++; lastShown=Date.now();
    window.clearTimeout(hideTimer); hideTimer=window.setTimeout(()=>boite.remove(),25000);
  }
  function verifier(){if(Date.now()-lastShown>=10*60*1000 && !document.hidden) afficherMessage();}
  window.setTimeout(()=>{afficherMessage();intervalTimer=window.setInterval(afficherMessage,10*60*1000);},10*60*1000);
  document.addEventListener("visibilitychange",verifier);
  window.addEventListener("focus",verifier);
})();