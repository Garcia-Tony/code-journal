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
