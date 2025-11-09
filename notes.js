/* créer une variable */
let notes = [];
function sauvegarderNote() {
  const zoneDeTexte = document.getElementById("noteInput");
  /*Récupère le texte écrit dans l'input */
  const texteNote = zoneDeTexte.value.trim();
  if (texteNote === "") return;
/*Méthode qui ajoute un élément à la fin du tableau*/
  notes.push(texteNote);
  zoneDeTexte.value = "";
  afficherNotes();
}
/* transformer le tableau en éléments HTML visibles*/
function afficherNotes() {
  const listeNotes = document.getElementById("noteList");
  listeNotes.innerHTML = "";
/*parcourt chaque élément du tableau*/
  notes.forEach((note) => {  
    const item = document.createElement("li"); 
    /* Propriété pour écrire du texte dans un élément*/
     item.textContent = note;   
     /* Ajoute l'élément */
   listeNotes.appendChild(item);
  });
}

