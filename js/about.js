/* Форма зворотного зв’язку на сторінці «Про нас» */
(function () {
  const form = document.querySelector("[data-contact]");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const err = form.querySelector("[data-form-error]");
    const name = form.elements.name.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || !message) {
      if (err) {
        err.textContent = "Вкажіть ім’я та текст повідомлення.";
        err.classList.add("is-on");
      }
      return;
    }
    form.hidden = true;
    const ok = document.querySelector("[data-contact-ok]");
    if (ok) ok.hidden = false;
  });
})();
