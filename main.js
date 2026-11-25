/* Спільна логіка шапки, тостів і форм */
(function () {
  function updateBadge() {
    const badge = document.querySelector("[data-cart-badge]");
    if (!badge) return;
    const n = Cart.count();
    badge.textContent = n;
    badge.classList.toggle("is-on", n > 0);
  }

  function showToast(message) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("is-on");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      el.classList.remove("is-on");
    }, 2200);
  }

  function bindAddButtons(root) {
    (root || document).querySelectorAll(".js-add").forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", function () {
        Cart.add(btn.dataset.id, 1);
        showToast("Товар додано до кошика");
      });
    });
  }

  function initHeader() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");
    if (burger && nav) {
      burger.addEventListener("click", function () {
        const open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    const path = (location.pathname.split("/").pop() || "index.html");
    document.querySelectorAll(".nav a").forEach(function (a) {
      const href = a.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) a.classList.add("is-active");
    });
  }

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".js-add");
    if (!btn || btn.dataset.skipGlobal) return;
    // delegated fallback if a card is rendered later
    if (!btn.dataset.bound) {
      Cart.add(btn.dataset.id, 1);
      showToast("Товар додано до кошика");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    updateBadge();
    bindAddButtons(document);
    Cart.onChange(updateBadge);
  });

  window.UI = {
    showToast: showToast,
    bindAddButtons: bindAddButtons,
    updateBadge: updateBadge
  };
})();
