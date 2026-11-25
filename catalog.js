/* Фільтри, пошук і сітка каталогу */
(function () {
  const grid = document.querySelector("[data-catalog]");
  if (!grid) return;

  const searchInput = document.querySelector("[data-search]");
  const countEl = document.querySelector("[data-count]");
  const catBox = document.querySelector("[data-cats]");
  const labelBox = document.querySelector("[data-labels]");

  const state = { category: "all", labels: [], query: "" };

  const params = new URLSearchParams(location.search);
  if (params.get("cat")) state.category = params.get("cat");
  if (params.get("q")) state.query = params.get("q");
  if (params.get("label")) state.labels = params.get("label").split(",").filter(Boolean);

  function renderChips() {
    if (catBox) {
      const all = [{ id: "all", name: "Усі категорії" }].concat(Shop.CATEGORIES);
      catBox.innerHTML = all
        .map(function (c) {
          return (
            '<button type="button" class="chip' +
            (state.category === c.id ? " is-on" : "") +
            '" data-cat="' +
            c.id +
            '">' +
            c.name +
            "</button>"
          );
        })
        .join("");
    }
    if (labelBox) {
      const keys = [
        ["eco", "Еко"],
        ["hypo", "Гіпоалергенний"],
        ["kids", "Для дітей"],
        ["pets", "Для тварин"]
      ];
      labelBox.innerHTML = keys
        .map(function (pair) {
          const on = state.labels.indexOf(pair[0]) !== -1;
          return (
            '<button type="button" class="chip chip--' +
            pair[0] +
            (on ? " is-on" : "") +
            '" data-label="' +
            pair[0] +
            '">' +
            pair[1] +
            "</button>"
          );
        })
        .join("");
    }
  }

  function filtered() {
    const q = state.query.trim().toLowerCase();
    return Shop.PRODUCTS.filter(function (p) {
      if (state.category !== "all" && p.category !== state.category) return false;
      if (state.labels.length && !state.labels.every(function (l) { return p.labels.indexOf(l) !== -1; })) return false;
      if (q) {
        const hay = (p.name + " " + p.desc + " " + Shop.categoryName(p.category)).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function render() {
    const list = filtered();
    if (countEl) {
      countEl.textContent = list.length
        ? "Знайдено товарів: " + list.length
        : "Нічого не знайдено. Спробуйте змінити фільтр або запит.";
    }
    if (!list.length) {
      grid.innerHTML = '<div class="empty">За цим запитом товарів немає. Очистіть пошук або оберіть іншу категорію.</div>';
      return;
    }
    grid.innerHTML = list.map(function (p) { return Shop.cardHTML(p); }).join("");
    UI.bindAddButtons(grid);
  }

  if (catBox) {
    catBox.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      state.category = btn.dataset.cat;
      renderChips();
      render();
    });
  }
  if (labelBox) {
    labelBox.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-label]");
      if (!btn) return;
      const key = btn.dataset.label;
      const i = state.labels.indexOf(key);
      if (i === -1) state.labels.push(key);
      else state.labels.splice(i, 1);
      renderChips();
      render();
    });
  }
  if (searchInput) {
    searchInput.value = state.query;
    searchInput.addEventListener("input", function () {
      state.query = searchInput.value;
      render();
    });
  }

  renderChips();
  render();
})();
