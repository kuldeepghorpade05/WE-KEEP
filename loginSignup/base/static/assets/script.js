//-------------------------------------------
// ✅ Get CSRF token from cookies
// Django requires this for POST, PUT, DELETE
//-------------------------------------------
function getCSRFToken() {
    const name = "csrftoken";
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.slice(name.length + 1));
        }
    }
    return '';
}

//-------------------------------------------
// ✅ Load all notes from the DRF API
// GET /api/notes/ (for authenticated user only)
//-------------------------------------------
async function loadNotes() {
    const response = await fetch('/api/notes/', {
        credentials: 'same-origin' // so Django knows who you are
    });

    if (response.ok) {
        const notes = await response.json();
        notes.forEach(note => addNewNote(note)); // render each note
    } else {
        console.error('Error loading notes:', response.status);
    }
}

//-------------------------------------------
// ✅ Create a new note on the backend
// POST /api/notes/
//-------------------------------------------
async function createNote(noteData, noteElement) {
    const response = await fetch('/api/notes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        credentials: 'same-origin',
        body: JSON.stringify(noteData),
    });

    if (response.ok) {
        const newNote = await response.json();
        // Save the note ID on the element for later updates/deletes
        noteElement.dataset.id = newNote.id;
    } else {
        console.error('Error creating note:', response.status);
    }
}

//-------------------------------------------
// ✅ Update an existing note on the backend
// PUT /api/notes/:id/
//-------------------------------------------
async function updateNote(noteId, noteData) {
    const response = await fetch(`/api/notes/${noteId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        credentials: 'same-origin',
        body: JSON.stringify(noteData),
    });

    if (!response.ok) {
        console.error('Error updating note:', response.status);
    }
}

//-------------------------------------------
// ✅ Delete a note on the backend
// DELETE /api/notes/:id/
//-------------------------------------------
async function deleteNote(noteId) {
    const response = await fetch(`/api/notes/${noteId}/`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCSRFToken()
        },
        credentials: 'same-origin',
    });

    if (!response.ok) {
        console.error('Error deleting note:', response.status);
    }
}

//-------------------------------------------
// ✅ Add a new note card to the page
// Uses noteData from API or blank defaults
//-------------------------------------------
const addBtn = document.getElementById('addBtn');

const addNewNote = (noteData = { id: null, title: '', content: '' }) => {
    const notesContainer = document.getElementById('notesContainer');

    const note = document.createElement('div');
    note.className = 'note bg-white rounded shadow-md border p-4 flex flex-col justify-between hover:shadow-xl transition';
    if (noteData.id) {
        note.dataset.id = noteData.id; // Save id for later
    }

    const htmlData = `
    <div class="noteView">
      <h3 class="noteTitleView text-lg font-semibold mb-1 text-gray-800">${noteData.title || 'Untitled Note'}</h3>
      <p class="noteContentView text-gray-700">${noteData.content || 'Click edit to add details...'}</p>
    </div>

    <div class="noteEdit hidden flex flex-col gap-2">
      <input
        type="text"
        class="noteTitleInput border rounded p-1 text-gray-800 bg-gray-100 outline-none focus:outline-none"
        placeholder="Title"
        value="${noteData.title || ''}"
      >
      <textarea
        rows="4"
        class="noteContentInput border rounded p-1 text-gray-800 resize-none bg-gray-100 outline-none"
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

    //-------------------------------------------
    // ✅ Get elements inside this note
    //-------------------------------------------
    const noteView = note.querySelector('.noteView');
    const noteEdit = note.querySelector('.noteEdit');
    const titleView = note.querySelector('.noteTitleView');
    const contentView = note.querySelector('.noteContentView');
    const titleInput = note.querySelector('.noteTitleInput');
    const contentInput = note.querySelector('.noteContentInput');

    const editBtn = note.querySelector('.edit');
    const doneBtn = note.querySelector('.done');
    const deleteBtn = note.querySelector('.delete');

    //-------------------------------------------
    // ✅ Edit note button → switch to edit mode
    //-------------------------------------------
    editBtn.addEventListener('click', () => {
        noteView.classList.add('hidden');
        noteEdit.classList.remove('hidden');
        editBtn.classList.add('hidden');
        doneBtn.classList.remove('hidden');
    });

    //-------------------------------------------
    // ✅ Done button → save changes
    //-------------------------------------------
    doneBtn.addEventListener('click', async() => {
        const updatedTitle = titleInput.value.trim();
        const updatedContent = contentInput.value.trim();

        titleView.textContent = updatedTitle || 'Untitled Note';
        contentView.textContent = updatedContent || 'Click edit to add details...';

        noteView.classList.remove('hidden');
        noteEdit.classList.add('hidden');
        editBtn.classList.remove('hidden');
        doneBtn.classList.add('hidden');

        const noteId = note.dataset.id;

        if (noteId) {
            // ✅ Update if existing
            await updateNote(noteId, { title: updatedTitle, content: updatedContent });
        } else {
            // ✅ Create if new
            await createNote({ title: updatedTitle, content: updatedContent }, note);
        }
    });

    //-------------------------------------------
    // ✅ Delete button → remove from DOM & backend
    //-------------------------------------------
    deleteBtn.addEventListener('click', async() => {
        const noteId = note.dataset.id;
        if (noteId) {
            await deleteNote(noteId);
        }
        note.remove();
    });
};

//-------------------------------------------
// ✅ Add new blank note on button click
//-------------------------------------------
addBtn.addEventListener('click', () => addNewNote());

//-------------------------------------------
// ✅ Load all notes on page load
//-------------------------------------------
loadNotes();