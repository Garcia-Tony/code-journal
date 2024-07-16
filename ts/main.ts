/* global */
const $photoUrlInput = document.getElementById('URL') as HTMLInputElement;
const $photoPreview = document.getElementById('photoURL') as HTMLImageElement;

if ($photoUrlInput) {
  $photoUrlInput.addEventListener('input', () => {
    const values = $photoUrlInput.value;
    $photoPreview.src = values;
  });
}
