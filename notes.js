let notes = [];

function sauvegarderNote() {
  const zoneDeTexte = document.getElementById("noteInput");
  const texteNote = zoneDeTexte.value.trim();
  if (texteNote === "") return;

  notes.push(texteNote);
  zoneDeTexte.value = "";
  afficherNotes();
}

function afficherNotes() {
  const listeNotes = document.getElementById("noteList");
  listeNotes.innerHTML = "";

  notes.forEach((note) => {  
    const item = document.createElement("li"); 
     item.textContent = note;   
   listeNotes.appendChild(item);
  });
}

