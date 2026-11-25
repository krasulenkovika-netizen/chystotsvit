/* Головна: категорії, популярні товари, підписка на новини */
(function () {
  const cats = document.querySelector("[data-home-cats]");
  if (cats) {
    const icons = {
      prannya: "jug",
      posud: "pump",
      prybyrannya: "spray",
      vanna: "bottle",
      eko: "jug",
      tekstyl: "spray"
    };
    const tones = {
      prannya: { tone: "#7ec8c3", category: "prannya", shape: "jug" },
      posud: { tone: "#e8e07a", category: "posud", shape: "pump" },
      prybyrannya: { tone: "#8fcea8", category: "prybyrannya", shape: "spray" },
      vanna: { tone: "#9bb8d4", category: "vanna", shape: "bottle" },
      eko: { tone: "#8fce8f", category: "eko", shape: "jug" },
      tekstyl: { tone: "#7ecfb0", category: "tekstyl", shape: "spray" }
    };
    cats.innerHTML = Shop.CATEGORIES.map(function (c) {
      const p = Object.assign({ name: c.name }, tones[c.id]);
      return (
        '<a class="cat-card" href="catalog.html?cat=' + c.id + '">' +
          '<div class="cat-card__icon" style="background:' + Shop.artBackground(p) + '">' +
            Shop.productArt(p, 54) +
          "</div>" +
          "<strong>" + c.name + "</strong>" +
        "</a>"
      );
    }).join("");
  }

  const popular = document.querySelector("[data-popular]");
  if (popular) {
    const list = Shop.PRODUCTS.filter(function (p) { return p.popular; }).slice(0, 8);
    popular.innerHTML = list.map(function (p) { return Shop.cardHTML(p); }).join("");
    UI.bindAddButtons(popular);
  }

  const form = document.querySelector("[data-news-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = form.querySelector("input[type=email]");
      const note = form.parentElement.querySelector("[data-news-ok]");
      if (!email || !email.value.trim()) {
        email && email.focus();
        return;
      }
      form.hidden = true;
      if (note) {
        note.hidden = false;
        note.textContent = "Дякуємо! Ми зберегли вашу адресу в навчальному режимі. Реальна розсилка не надсилається.";
      }
    });
  }
})();
