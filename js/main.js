'use strict';
/* global data */
const $photoUrlInput = document.getElementById('URL');
const $photoPreview = document.getElementById('photoURL');
if ($photoUrlInput) {
  $photoUrlInput.addEventListener('input', () => {
    const values = $photoUrlInput.value;
    $photoPreview.src = values;
  });
}
