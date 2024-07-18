"use strict";
const $photoUrlInput = document.getElementById('URL');
const $photoPreview = document.getElementById('image');
if ($photoUrlInput) {
    $photoUrlInput.addEventListener('input', () => {
        const values = $photoUrlInput.value;
        $photoPreview.src = values;
    });
}
const $entryForm = document.getElementById('entryForm');
if ($entryForm) {
    $entryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.querySelector('#title');
        if (!title)
            throw new Error('title does not exist');
        const photoURL = document.querySelector('#URL');
        if (!photoURL)
            throw new Error('photoUrl does not exist');
        const notes = document.querySelector('#notes');
        if (!notes)
            throw new Error('notes does not exist');
        const $form = $entryForm.elements;
        const values = {
            entryId: data.nextEntryId,
            title: $form.title.value,
            photoUrl: $form.photoUrl.value,
            notes: $form.notes.value,
        };
        console.log('values:', values);
        data.nextEntryId++;
        data.entries.unshift(values);
        $photoPreview.src = 'images/placeholder-image-square.jpg';
        $entryForm.reset();
        writeData();
    });
}
;
function renderEntry(entry) {
    const li = document.createElement('li');
    li.className = 'entry';
    const line = document.createElement('div');
    line.className = 'line';
    li.appendChild(line);
    const column = document.createElement('div');
    column.className = 'column-split';
    line.appendChild(column);
    const dummy = document.createElement('div');
    dummy.className = 'dummy';
    column.appendChild(dummy);
    const img = document.createElement('img');
    img.src = entry.photoUrl;
    dummy.appendChild(img);
    const content = document.createElement('div');
    content.className = 'column-split';
    line.appendChild(content);
    const entryContent = document.createElement('div');
    entryContent.className = 'entry-content';
    content.appendChild(entryContent);
    const title = document.createElement('h3');
    title.textContent = entry.title;
    entryContent.appendChild(title);
    const notes = document.createElement('p');
    notes.textContent = entry.notes;
    entryContent.appendChild(notes);
    return li;
}
