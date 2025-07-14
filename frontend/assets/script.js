const addBtn = document.getElementById('addBtn');

const updateNote = () => {
    const notes = [];
    const noteCards = document.querySelectorAll('.note');
    noteCards.forEach((note) => {
        const titleInput = note.querySelector('.noteTitleInput').value.trim();
        const contentInput = note.querySelector('.noteContentInput').value.trim();
        if (titleInput || contentInput) {
            notes.push({ title: titleInput, content: contentInput });
        }
    });
    localStorage.setItem('notes', JSON.stringify(notes));
};

const addNewNote = (noteData = { title: '', content: '' }) => {
    const notesContainer = document.getElementById('notesContainer');

    const note = document.createElement('div');
    note.className = 'note bg-white rounded shadow-md border p-4 flex flex-col justify-between hover:shadow-xl transition';

    const htmlData = `
    <div class="noteView">
      <h3 class="noteTitleView text-lg font-semibold mb-1 text-gray-800">${noteData.title || 'Untitled Note'}</h3>
      <p class="noteContentView text-gray-700">${noteData.content || 'Click edit to add details...'}</p>
    </div>

    <div class="noteEdit hidden flex flex-col gap-2">
      <input
        type="text"
        class="noteTitleInput border rounded p-1 text-gray-800 bg-gray-100 outline-none focus:outline-none focus:ring-0"
        placeholder="Title"
        value="${noteData.title || ''}"
      >
      <textarea
        rows="4"
        class="noteContentInput border rounded p-1 text-gray-800 resize-none bg-gray-100 outline-none focus:outline-none focus:ring-0"
        placeholder="Take a note..."
      >${noteData.content || ''}</textarea>
    </div>

    <div class="flex justify-end gap-2 mt-4">
      <button class="material-icons-round edit bg-green-500 text-white p-1 rounded hover:bg-green-600">edit</button>
      <button class="material-icons-round done hidden bg-blue-500 text-white p-1 rounded hover:bg-blue-600">done</button>
      <button class="material-icons-round delete bg-red-600 text-white p-1 rounded hover:bg-red-700">delete</button>
    </div>
  `;

    note.innerHTML = htmlData;
    notesContainer.appendChild(note);

    const noteView = note.querySelector('.noteView');
    const noteEdit = note.querySelector('.noteEdit');
    const titleView = note.querySelector('.noteTitleView');
    const contentView = note.querySelector('.noteContentView');
    const titleInput = note.querySelector('.noteTitleInput');
    const contentInput = note.querySelector('.noteContentInput');

    const editBtn = note.querySelector('.edit');
    const doneBtn = note.querySelector('.done');
    const deleteBtn = note.querySelector('.delete');

    editBtn.addEventListener('click', () => {
        noteView.classList.add('hidden');
        noteEdit.classList.remove('hidden');
        editBtn.classList.add('hidden');
        doneBtn.classList.remove('hidden');
    });

    doneBtn.addEventListener('click', () => {
        titleView.textContent = titleInput.value.trim() || 'Untitled Note';
        contentView.textContent = contentInput.value.trim() || 'Click edit to add details...';
        noteView.classList.remove('hidden');
        noteEdit.classList.add('hidden');
        editBtn.classList.remove('hidden');
        doneBtn.classList.add('hidden');
        updateNote();
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateNote();
    });

    titleInput.addEventListener('blur', updateNote);
    contentInput.addEventListener('blur', updateNote);
};

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach((noteData) => addNewNote(noteData));
}

addBtn.addEventListener('click', () => addNewNote());