/* Correctif autonome du moteur de recherche COURS MJN. */
(function () {
  function normaliserRecherche(texte) {
    return String(texte || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function echapperRecherche(texte) {
    return String(texte == null ? '' : texte).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function installerRecherche() {
    var original = document.getElementById('recherche');
    var liste = document.getElementById('liste');
    if (!original || !liste) return;

    // Retire les anciens écouteurs de recherche, qui pouvaient entrer en conflit.
    var champ = original.cloneNode(true);
    original.parentNode.replaceChild(champ, original);
    var contenuInitial = liste.innerHTML;

    function chercher() {
      var terme = normaliserRecherche(champ.value).replace(/^(le|la|les|l)\s+/, '');
      if (!terme) {
        liste.innerHTML = contenuInitial;
        return;
      }

      var index = Array.isArray(window.INDEX_RECHERCHE) ? window.INDEX_RECHERCHE : [];
      if (!index.length) {
        liste.innerHTML = '<p class="vide">La recherche ne peut pas charger les chapitres. Recharge la page ou réessaie plus tard.</p>';
        return;
      }

      var resultats = index.filter(function (item) {
        var titre = normaliserRecherche(item.titre).replace(/^(le|la|les|l)\s+/, '');
        return titre.indexOf(terme) !== -1;
      });

      if (!resultats.length) {
        liste.innerHTML = '<p class="vide">Aucun chapitre ne porte exactement le titre « ' +
          echapperRecherche(champ.value) + ' ».</p>';
        return;
      }

      liste.innerHTML = '<section class="groupe"><h2>' +
        resultats.length + ' chapitre' + (resultats.length > 1 ? 's' : '') +
        ' trouvé' + (resultats.length > 1 ? 's' : '') +
        '</h2><div class="grille-resultats">' +
        resultats.map(function (item) {
          return '<a class="resultat-recherche" href="' + echapperRecherche(item.lien) + '">' +
            '<span class="resultat-classe">' + echapperRecherche(item.classe) + '</span>' +
            '<strong>' + echapperRecherche(item.titre) + '</strong>' +
            '<span class="resultat-description">' + echapperRecherche(item.description || 'Cours interactif') + '</span>' +
            '<span class="ouvrir">Ouvrir le chapitre →</span></a>';
        }).join('') + '</div></section>';
    }

    champ.addEventListener('input', chercher);
    champ.addEventListener('search', chercher);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installerRecherche);
  } else {
    installerRecherche();
  }
})();