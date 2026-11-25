/* Картка окремого товару */
(function () {
  const root = document.querySelector("[data-product]");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id");
  const product = Shop.byId(id);
  if (!product) {
    root.innerHTML = '<div class="empty"><p>Товар не знайдено.</p><p><a class="btn btn--primary" href="catalog.html">До каталогу</a></p></div>';
    return;
  }
  document.title = product.name + " — Чистоцвіт";
  root.innerHTML =
    '<div class="product-view__art" style="background:' + Shop.artBackground(product) + '">' +
      Shop.productArt(product, 260) +
    "</div>" +
    "<div>" +
      '<div class="card__badges">' + Shop.badgeHTML(product.labels) + "</div>" +
      "<h1>" + product.name + "</h1>" +
      '<p class="lead">' + product.desc + "</p>" +
      '<div class="price" style="font-size:1.6rem">' + Shop.formatPrice(product.price) + "</div>" +
      '<div class="product-view__actions">' +
        '<button type="button" class="btn btn--primary js-add" data-id="' + product.id + '">Додати до кошика</button>' +
        '<a class="btn btn--ghost" href="catalog.html?cat=' + product.category + '">Ще з категорії «' + Shop.categoryName(product.category) + '»</a>' +
      "</div>" +
      '<p class="muted">Підписку на регулярну доставку зі знижкою 15% можна увімкнути в кошику.</p>' +
      '<div class="specs">' +
        "<div><dt>Об’єм / кількість</dt><dd>" + product.volume + "</dd></div>" +
        "<div><dt>Категорія</dt><dd>" + Shop.categoryName(product.category) + "</dd></div>" +
        "<div><dt>Використання</dt><dd>" + product.unit + "</dd></div>" +
        "<div><dt>Склад</dt><dd>" + product.composition + "</dd></div>" +
      "</div>" +
    "</div>";
  UI.bindAddButtons(root);
})();
