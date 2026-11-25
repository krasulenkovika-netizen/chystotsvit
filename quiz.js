/* Квіз «Підібрати набір для прибирання» */
(function () {
  const root = document.querySelector("[data-quiz]");
  if (!root) return;

  const answers = {
    rooms: [],
    kids: false,
    pets: false,
    priority: "balance",
    frequency: "4"
  };
  let step = 1;

  function paint() {
    root.querySelectorAll("[data-step]").forEach(function (el) {
      el.hidden = Number(el.dataset.step) !== step;
    });
    const bar = root.querySelector("[data-progress]");
    if (bar) bar.style.width = step * 25 + "%";
    const label = root.querySelector("[data-progress-label]");
    if (label) label.textContent = "Крок " + Math.min(step, 4) + " з 4";
  }

  root.addEventListener("click", function (e) {
    const choice = e.target.closest("[data-choice]");
    if (choice) {
      const group = choice.dataset.group;
      const value = choice.dataset.choice;
      if (group === "rooms") {
        const i = answers.rooms.indexOf(value);
        if (i === -1) answers.rooms.push(value);
        else answers.rooms.splice(i, 1);
        root.querySelectorAll('[data-group="rooms"]').forEach(function (btn) {
          btn.classList.toggle("is-on", answers.rooms.indexOf(btn.dataset.choice) !== -1);
        });
      } else if (group === "family") {
        if (value === "kids") answers.kids = !answers.kids;
        if (value === "pets") answers.pets = !answers.pets;
        if (value === "none") {
          answers.kids = false;
          answers.pets = false;
        }
        root.querySelectorAll('[data-group="family"]').forEach(function (btn) {
          const v = btn.dataset.choice;
          const on = (v === "kids" && answers.kids) || (v === "pets" && answers.pets) || (v === "none" && !answers.kids && !answers.pets);
          btn.classList.toggle("is-on", on);
        });
      } else if (group === "priority") {
        answers.priority = value;
        root.querySelectorAll('[data-group="priority"]').forEach(function (btn) {
          btn.classList.toggle("is-on", btn.dataset.choice === value);
        });
      } else if (group === "frequency") {
        answers.frequency = value;
        root.querySelectorAll('[data-group="frequency"]').forEach(function (btn) {
          btn.classList.toggle("is-on", btn.dataset.choice === value);
        });
      }
    }

    if (e.target.closest("[data-next]")) {
      if (step === 1 && !answers.rooms.length) {
        UI.showToast("Оберіть хоча б одне приміщення");
        return;
      }
      if (step < 4) {
        step += 1;
        paint();
      } else {
        step = 5;
        renderResult();
        paint();
        root.querySelector("[data-progress-label]").textContent = "Готово";
        const bar = root.querySelector("[data-progress]");
        if (bar) bar.style.width = "100%";
      }
    }
    if (e.target.closest("[data-back]")) {
      if (step > 1 && step <= 5) {
        step -= 1;
        if (step === 4) {
          // leave result hidden
        }
        paint();
      }
    }
    if (e.target.closest("[data-restart]")) {
      answers.rooms = [];
      answers.kids = false;
      answers.pets = false;
      answers.priority = "balance";
      answers.frequency = "4";
      step = 1;
      root.querySelectorAll(".choice").forEach(function (b) { b.classList.remove("is-on"); });
      paint();
    }
    if (e.target.closest("[data-add-bundle]")) {
      const bundle = Shop.pickBundle(answers);
      Cart.addMany(bundle.productIds);
      if (e.target.closest("[data-add-bundle]").dataset.subscribe === "1") {
        Cart.setSubscribe(true, answers.frequency);
      }
      UI.showToast("Набір додано до кошика");
      setTimeout(function () { location.href = "cart.html"; }, 400);
    }
  });

  function renderResult() {
    const box = root.querySelector("[data-result]");
    const bundle = Shop.pickBundle(answers);
    const sub = answers.frequency !== "0";
    const prices = Shop.bundleTotal(bundle, sub);
    const items = Shop.bundleProducts(bundle)
      .map(function (p) {
        return "<li><span>" + p.name + "</span><strong>" + Shop.formatPrice(p.price) + "</strong></li>";
      })
      .join("");
    const why = [];
    if (answers.kids) why.push("у домі є діти, тож у наборі гіпоалергенні та позначені як безпечні засоби");
    if (answers.pets) why.push("враховано наявність тварин");
    if (answers.priority === "eco") why.push("пріоритет — екологічність");
    if (answers.priority === "power") why.push("зроблено акцент на ефективне прибирання");
    const freqText = { "2": "кожні 2 тижні", "4": "щомісяця", "8": "кожні 8 тижнів" }[answers.frequency];

    box.innerHTML =
      '<div class="bundle-result">' +
        "<h2>Вам підійде " + bundle.name + "</h2>" +
        "<p class=\"muted\">" + bundle.hint + (why.length ? " Ми врахували, що " + why.join("; ") + "." : "") + "</p>" +
        '<ul class="bundle-items">' + items + "</ul>" +
        '<p>Звичайна сума: <s>' + Shop.formatPrice(prices.sum) + "</s></p>" +
        "<p><strong>Ціна набору: " + Shop.formatPrice(Math.round(prices.sum * (1 - Shop.BUNDLE_DISCOUNT))) + "</strong> (знижка " + Math.round(Shop.BUNDLE_DISCOUNT * 100) + "%)</p>" +
        (sub
          ? "<p>З підпискою " + freqText + ": <strong>" + Shop.formatPrice(Shop.bundleTotal(bundle, true).total) + "</strong> (−" + Math.round(Shop.SUB_DISCOUNT * 100) + "%). Підписку можна вимкнути в кошику.</p>"
          : "<p>Регулярну доставку ви не обрали — у кошику її можна увімкнути пізніше.</p>") +
        '<div class="hero__actions">' +
          '<button type="button" class="btn btn--primary" data-add-bundle>Додати набір до кошика</button>' +
          (sub
            ? '<button type="button" class="btn btn--accent" data-add-bundle data-subscribe="1">Додати з підпискою −15%</button>'
            : "") +
          '<button type="button" class="btn btn--ghost" data-restart>Пройти ще раз</button>' +
        "</div>" +
      "</div>";
  }

  paint();
})();
