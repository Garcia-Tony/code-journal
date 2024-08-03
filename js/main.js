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
        data.nextEntryId++;
        data.entries.unshift(values);
        entryList?.prepend(renderEntry(values));
        $photoPreview.src = 'images/placeholder-image-square.jpg';
        $entryForm.reset();
        writeData();
        toggleNoEntries();
        viewSwap('entries');
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
const entryList = document.querySelector('.entry-list');
document.addEventListener('DOMContentLoaded', (event) => {
    if (!entryList) {
        throw new Error('entryList is null');
    }
    for (let i = 0; i < data.entries.length; i++) {
        const entry = data.entries[i];
        entryList.append(renderEntry(entry));
    }
    const currentView = data.view;
    viewSwap(currentView);
    toggleNoEntries();
    const newButton = document.querySelector('.new-entry-button');
    if (newButton) {
        newButton.addEventListener('click', (event) => {
            event.preventDefault();
            viewSwap('entry-form');
        });
    }
    else {
        throw new Error('newButton is null');
    }
});
const noEntriesText = document.querySelector('.no-entries-text');
function toggleNoEntries() {
    if (!noEntriesText) {
        throw new Error('noEntriesText is null');
    }
    if (data.entries.length) {
        noEntriesText.classList.add('hidden');
    }
    else {
        noEntriesText.classList.remove('hidden');
    }
}
function viewSwap(viewName) {
    const entriesView = document.querySelector('.entries-wrapper');
    const entryFormView = document.querySelector('.entry-form-wrapper');
    if (!entryFormView || !entriesView) {
        throw new Error('entryFormView or entriesView is null');
    }
    if (viewName === 'entries') {
        entriesView.classList.remove('hidden');
        entryFormView.classList.add('hidden');
    }
    else if (viewName === 'entry-form') {
        entryFormView.classList.remove('hidden');
        entriesView.classList.add('hidden');
    }
    data.view = viewName;
}
const navItem = document.querySelector('.nav-item');
if (!navItem)
    throw new Error('navItem is null');
navItem.addEventListener('click', (event) => {
    const $eventTarget = event.target;
    const viewName = $eventTarget.dataset.view;
    if (viewName === 'entries' || viewName === 'entry-form') {
        viewSwap(viewName);
    }
});
