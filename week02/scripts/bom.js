
document.addEventListener('DOMContentLoaded', () => {
  const input  = document.querySelector('#favchap');
  const button = document.querySelector('#addBtn');
  const list   = document.querySelector('#chaptersList');

  button.addEventListener('click', () => {
    const text = input.value.trim();

    if (text === '') {
      input.focus();
      return;
    }

    const li = document.createElement('li');
    li.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.setAttribute('aria-label', `Remover ${text}`);

    deleteBtn.addEventListener('click', () => {
      list.removeChild(li);
      input.focus();
    });

    li.append(deleteBtn);
    list.append(li);

    input.value = '';
    input.focus();
  });
});
