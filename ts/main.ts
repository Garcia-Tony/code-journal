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
})
};
