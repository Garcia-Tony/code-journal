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

console.log('values:', values);

data.nextEntryId++;

data.entries.unshift(values);

$photoPreview.src = 'images/placeholder-image-square.jpg';

$entryForm.reset();

writeData();
toggleNoEntries();

})
};



function renderEntry (entry: Entry) {
const li = document.createElement('li');
li.className= 'entry';

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
toggleNoEntries();
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

  if (!entryFormView || !entriesView) {
    throw new Error('entryFormView or entriesView is null');
  }
  if (viewName === 'entries') {
    entriesView.classList.remove('hidden');
    entryFormView.classList.add('hidden');
  } else if (viewName === 'entry-form') {
    entryFormView.classList.remove('hidden');
    entriesView.classList.add('hidden');
  }
  data.view = viewName;
}
