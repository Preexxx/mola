(() => {
  const form = document.getElementById('lead-form');
  const success = document.getElementById('form-success');
  if (!form || !success) return;

  if (new URLSearchParams(location.search).get('sent') === '1') {
    form.classList.add('is-hidden');
    success.classList.add('is-visible');
  }

  const fileInput = form.querySelector('input[type="file"]');
  const fileLabel = form.querySelector('.file-field span');
  if (fileInput && fileLabel) {
    const defaultLabel = fileLabel.textContent;
    fileInput.addEventListener('change', () => {
      fileLabel.textContent = fileInput.files[0] ? fileInput.files[0].name : defaultLabel;
    });
  }
})();
