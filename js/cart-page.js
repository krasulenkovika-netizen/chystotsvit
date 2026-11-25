/* Сторінка кошика та оформлення замовлення */
(function () {
  const listEl = document.querySelector("[data-cart-list]");
  if (!listEl) return;

  const summaryEl = document.querySelector("[data-cart-summary]");
  const formWrap = document.querySelector("[data-checkout-wrap]");
  const emptyEl = document.querySelector("[data-cart-empty]");
  const successEl = document.querySelector("[data-cart-success]");
  const form = document.querySelector("[data-checkout]");

  function render() {
    const lines = Cart.lines();
    const totals = Cart.totals();

    if (successEl && !successEl.hidden) return;

    const layout = document.querySelector("[data-cart-layout]");
    if (!lines.length) {
      listEl.innerHTML = "";
      if (layout) layout.hidden = true;
      if (summaryEl) summaryEl.hidden = true;
      if (formWrap) formWrap.hidden = true;
      if (emptyEl) emptyEl.hidden = false;
      return;
    }
    if (emptyEl) emptyEl.hidden = true;
    if (layout) layout.hidden = false;
    if (summaryEl) summaryEl.hidden = false;
    if (formWrap) formWrap.hidden = false;

    listEl.innerHTML = lines
      .map(function (l) {
        const p = l.product;
        return (
          '<article class="cart-item" data-id="' + p.id + '">' +
            '<div class="cart-item__art" style="background:' + Shop.artBackground(p) + '">' + Shop.productArt(p, 58) + "</div>" +
            "<div>" +
              "<h3><a href=\"product.html?id=" + p.id + "\">" + p.name + "</a></h3>" +
              '<div class="card__meta">' + p.volume + "</div>" +
              '<div class="qty">' +
                '<button type="button" data-qty="-1" aria-label="Зменшити">−</button>' +
                "<span>" + l.qty + "</span>" +
                '<button type="button" data-qty="1" aria-label="Збільшити">+</button>' +
              "</div>" +
              '<button type="button" class="remove" data-remove>Видалити</button>' +
            "</div>" +
            '<div class="cart-item__price">' +
              (totals.subscribe ? '<div class="price--old">' + Shop.formatPrice(l.old) + "</div>" : "") +
              Shop.formatPrice(l.line) +
            "</div>" +
          "</article>"
        );
      })
      .join("");

    const freq = Cart.get().frequency;
    summaryEl.innerHTML =
      '<h2>Разом</h2>' +
      '<div class="summary-row"><span>Товарів</span><span>' + totals.count + "</span></div>" +
      '<div class="summary-row"><span>Сума</span><span>' + Shop.formatPrice(totals.subtotal) + "</span></div>" +
      (totals.discount
        ? '<div class="summary-row"><span>Знижка за підписку</span><span>−' + Shop.formatPrice(totals.discount) + "</span></div>"
        : "") +
      '<div class="sub-box">' +
        "<label>" +
          '<input type="checkbox" data-sub-toggle ' + (totals.subscribe ? "checked" : "") + ">" +
          "<span>Підписка на регулярну доставку витратних засобів — знижка 15%. Скасувати можна перед наступним відправленням.</span>" +
        "</label>" +
        '<select data-sub-freq ' + (totals.subscribe ? "" : "disabled") + ">" +
          '<option value="2"' + (freq === "2" ? " selected" : "") + ">Кожні 2 тижні</option>" +
          '<option value="4"' + (freq === "4" ? " selected" : "") + ">Щомісяця</option>" +
          '<option value="8"' + (freq === "8" ? " selected" : "") + ">Кожні 8 тижнів</option>" +
        "</select>" +
      "</div>" +
      '<div class="summary-row summary-row--total"><span>До сплати</span><span>' + Shop.formatPrice(totals.total) + "</span></div>" +
      '<p class="muted">Доставку буде уточнено після підтвердження замовлення.</p>';
  }

  listEl.addEventListener("click", function (e) {
    const item = e.target.closest(".cart-item");
    if (!item) return;
    if (e.target.closest("[data-remove]")) Cart.remove(item.dataset.id);
    const qtyBtn = e.target.closest("[data-qty]");
    if (qtyBtn) {
      const line = Cart.get().items.find(function (it) { return it.id === item.dataset.id; });
      if (line) Cart.setQty(item.dataset.id, line.qty + Number(qtyBtn.dataset.qty));
    }
    render();
  });

  document.addEventListener("change", function (e) {
    if (e.target.matches("[data-sub-toggle]")) {
      Cart.setSubscribe(e.target.checked, (document.querySelector("[data-sub-freq]") || {}).value);
      render();
    }
    if (e.target.matches("[data-sub-freq]")) {
      Cart.setSubscribe(Cart.get().subscribe, e.target.value);
    }
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const err = form.querySelector("[data-form-error]");
      const name = form.elements.name.value.trim();
      const phone = form.elements.phone.value.trim();
      const city = form.elements.city.value.trim();
      const delivery = form.elements.delivery.value;
      const payment = form.elements.payment.value;
      if (!name || !phone || !city || !delivery || !payment) {
        if (err) {
          err.textContent = "Заповніть ім’я, телефон, місто, спосіб доставки та оплату.";
          err.classList.add("is-on");
        }
        return;
      }
      if (phone.replace(/\D/g, "").length < 10) {
        if (err) {
          err.textContent = "Вкажіть коректний номер телефону.";
          err.classList.add("is-on");
        }
        return;
      }
      if (err) err.classList.remove("is-on");
      const totals = Cart.totals();
      Cart.clear();
      document.querySelector("[data-cart-layout]").hidden = true;
      successEl.hidden = false;
      successEl.querySelector("[data-order-sum]").textContent = Shop.formatPrice(totals.total);
      successEl.querySelector("[data-order-name]").textContent = name;
    });
  }

  render();
  Cart.onChange(function () {
    if (!successEl || successEl.hidden) render();
  });
})();
