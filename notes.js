// Quand la page se charge, on affiche les notes déjà sauvegardées
window.onload = function () {
  afficherNotes();
};

// Fonction pour sauvegarder une nouvelle note
function sauvegarderNote() {
  const zoneDeTexte = document.getElementById("noteInput");
  const texteNote = zoneDeTexte.value.trim();

  // Si la note est vide, on ne fait rien
  if (texteNote === "") return;

  // On récupère les notes existantes ou on crée une liste vide
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // On ajoute la nouvelle note
  notes.push(texteNote);

  // On sauvegarde la liste mise à jour dans le stockage local
  localStorage.setItem("notes", JSON.stringify(notes));

  // On vide la zone de texte
  zoneDeTexte.value = "";

  // On met à jour l'affichage
  afficherNotes();
}

// Fonction pour afficher toutes les notes sauvegardées
function afficherNotes() {
  const listeNotes = document.getElementById("noteList");
  const compteur = document.getElementById("noteCount");

  // On vide la liste actuelle
  listeNotes.innerHTML = "";

  // On récupère les notes depuis le stockage local
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Si aucune note, on affiche un message
  if (notes.length === 0) {
    listeNotes.innerHTML = "<li>Aucune note pour le moment<br><em>Créez votre première note !</em></li>";
  } else {
    // Sinon, on affiche chaque note dans une liste
    notes.forEach((note) => {
      const item = document.createElement("li");
      item.textContent = note;
      listeNotes.appendChild(item);
    });
  }

  // On met à jour le compteur de notes
  compteur.textContent = notes.length;
}
