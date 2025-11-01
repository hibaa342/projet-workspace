window.onload = function () {
  loadNotes();
};

function saveNote() {
  const noteText = document.getElementById("noteInput").value.trim();
  if (noteText === "") return;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(noteText);
  localStorage.setItem("notes", JSON.stringify(notes));

  document.getElementById("noteInput").value = "";
  loadNotes();
}

function loadNotes() {
  const noteList = document.getElementById("noteList");
  const noteCount = document.getElementById("noteCount");
  noteList.innerHTML = "";

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (notes.length === 0) {
    noteList.innerHTML = "<li>Aucune note pour le moment<br><em>Créez votre première note !</em></li>";
  } else {
    notes.forEach((note, index) => {
      const li = document.createElement("li");

      const noteText = document.createElement("span");
      noteText.textContent = note;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑 Supprimer";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => deleteNote(index);

      li.appendChild(noteText);
      li.appendChild(deleteBtn);
      noteList.appendChild(li);
    });
  }

  noteCount.textContent = notes.length;
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}
