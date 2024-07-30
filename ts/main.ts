/* global Data */
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface Entry {
entryId: number;
title: string;
photoUrl: string;
notes: string;
}

const $photoUrlInput = document.getElementById('URL') as HTMLInputElement;
const $photoPreview = document.getElementById('image') as HTMLImageElement;


if ($photoUrlInput) {
  $photoUrlInput.addEventListener('input', () => {
    const values = $photoUrlInput.value;
    $photoPreview.src = values;
  });
}

const $entryForm = document.getElementById('entryForm') as HTMLFormElement;

if ($entryForm) {
  $entryForm.addEventListener('submit', (event) => {
event.preventDefault();

const title = document.querySelector('#title') as HTMLInputElement;
if (!title) throw new Error('title does not exist');

const photoURL = document.querySelector('#URL') as HTMLInputElement;
if (!photoURL) throw new Error('photoUrl does not exist');

const notes = document.querySelector('#notes') as HTMLTextAreaElement;
if (!notes) throw new Error('notes does not exist');

const $form = $entryForm.elements as FormElements;

const values: Entry = {
entryId: data.nextEntryId,
title: $form.title.value,
photoUrl: $form.photoUrl.value,
notes: $form.notes.value,
};

if (data.editing === null) {
  data.entries.unshift(values);
  data.nextEntryId++;
  entryList?.prepend(renderEntry(values));
} else {
    values.entryId = data.editing.entryId;
for (let i = 0; i < data.entries.length; i++) {
  if (data.entries[i].entryId === data.editing.entryId) {
  data.entries[i] = values;
const newEntry = renderEntry(values);
   const oldEntry = document.querySelector(`[data-entry-id="${values.entryId}"]`);
if (oldEntry) {
entryList?.prepend(newEntry);
  oldEntry.remove();
}
break;
 }
 }
data.editing = null;
}

const entryFormTitle = document.getElementById('entry-form-title') as HTMLElement;
if (entryFormTitle) {
entryFormTitle.textContent = 'New Entry';
}

$photoPreview.src = 'images/placeholder-image-square.jpg';
$entryForm.reset();
writeData();
toggleNoEntries();
viewSwap('entries');
});
}



function renderEntry (entry: Entry): HTMLElement {
const li = document.createElement('li');
li.className= 'entry';
li.setAttribute('data-entry-id', entry.entryId.toString());

const line = document.createElement('div');
line.className='line';
li.appendChild(line);

const column = document.createElement('div');
column.className='column-split';
line.appendChild(column);

const dummy = document.createElement('div');
dummy.className='dummy';
column.appendChild(dummy);

const img = document.createElement('img');
img.src = entry.photoUrl;
dummy.appendChild(img);

const content = document.createElement('div');
content.className='column-split';
line.appendChild(content);

const entryContent = document.createElement('div');
entryContent.className='entry-content';
content.appendChild(entryContent);


const pencil = document.createElement('i');
pencil.className = 'title-container';
entryContent.appendChild(pencil);

const pencilIcon = document.createElement('i');
pencilIcon.className = 'fa-solid fa-pencil';
  pencilIcon.setAttribute('data-entry-id', entry.entryId.toString());
pencil.appendChild(pencilIcon);

const title = document.createElement('h3');
title.textContent= entry.title;
entryContent.appendChild(title);

const notes = document.createElement('p');
notes.textContent= entry.notes;
entryContent.appendChild(notes);


return li;
}

const entryList = document.querySelector('.entry-list');

document.addEventListener('DOMContentLoaded', (event: Event) => {
if (!entryList) {
  throw new Error('entryList is null');
}
for (let i = 0; i < data.entries.length; i++) {
  const entry = data.entries[i];
  entryList.append(renderEntry(entry));
}

entryList.addEventListener('click', (event) => {
const target = event.target as HTMLElement;
if (target.className === 'fa-solid fa-pencil') {

const entryId = target.getAttribute('data-entry-id');
if (entryId) {
  for (let i = 0; i < data.entries.length; i++) {
  if (data.entries[i].entryId.toString() === entryId) {
  data.editing = data.entries[i];
break;
  }
}
if (data.editing) {
pop(data.editing);
viewSwap('entry-form');
   }
  }
 }
});

const currentView = data.view;
viewSwap(currentView);
toggleNoEntries();


const newButton = document.querySelector('.new-entry-button');
if (newButton) {
  newButton.addEventListener('click', (event: Event) => {
event.preventDefault();
viewSwap('entry-form');
  });
} else {
  throw new Error ('newButton is null');
}

const navItem = document.querySelector('.nav-item');

if (!navItem) throw new Error('navItem is null');

navItem.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLElement;
  const viewName = $eventTarget.dataset.view;
  if (viewName === 'entries' || viewName === 'entry-form') {
    viewSwap(viewName);
  }
});
});

const noEntriesText = document.querySelector('.no-entries-text');


function toggleNoEntries(): void {
  if (!noEntriesText) {
  throw new Error('noEntriesText is null');
  }

if (data.entries.length) {
  noEntriesText.classList.add('hidden');
} else {
  noEntriesText.classList.remove('hidden');
}
}


function viewSwap(viewName: 'entries' | 'entry-form'): void {
const entriesView = document.querySelector('.entries-wrapper');
const entryFormView = document.querySelector('.entry-form-wrapper');
  const entryFormTitle = document.getElementById('entry-form-title') as HTMLElement;


  if (!entryFormView || !entriesView) {
    throw new Error('entryFormView or entriesView is null');
  }
  if (viewName === 'entries') {
    entriesView.classList.remove('hidden');
    entryFormView.classList.add('hidden');
  } else if (viewName === 'entry-form') {
    entryFormView.classList.remove('hidden');
    entriesView.classList.add('hidden');
     if (data.editing) {
      entryFormTitle.textContent = 'Edit Entry';
    } else {
      entryFormTitle.textContent = 'New Entry';
    }
    }
  data.view = viewName;
}

function pop(entry: Entry): void {
   if (entry === null) return;

  const titleInput = document.getElementById('title') as HTMLInputElement;
  const photoUrlInput = document.getElementById('URL') as HTMLInputElement;
  const notesInput = document.getElementById('notes') as HTMLTextAreaElement;
  const photoPreview = document.getElementById('image') as HTMLImageElement;

  if (titleInput) titleInput.value = entry.title;
  if (photoUrlInput) photoUrlInput.value = entry.photoUrl;
  if (notesInput) notesInput.value = entry.notes;
  if (photoPreview) photoPreview.src = entry.photoUrl;
}
