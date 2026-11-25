/* Кошик і підписка на регулярну доставку (localStorage) */
(function (global) {
  const KEY = "chystotsvit_cart_v1";
  const listeners = [];

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { items: [], subscribe: false, frequency: "4" };
      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.items)) return { items: [], subscribe: false, frequency: "4" };
      return {
        items: data.items.filter((it) => it && it.id && Shop.byId(it.id)),
        subscribe: !!data.subscribe,
        frequency: data.frequency || "4"
      };
    } catch (e) {
      return { items: [], subscribe: false, frequency: "4" };
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
    listeners.forEach((fn) => fn(state));
  }

  function get() {
    return load();
  }

  function add(id, qty) {
    const product = Shop.byId(id);
    if (!product) return;
    const state = load();
    const n = Math.max(1, qty || 1);
    const found = state.items.find((it) => it.id === id);
    if (found) found.qty += n;
    else state.items.push({ id: id, qty: n });
    save(state);
  }

  function remove(id) {
    const state = load();
    state.items = state.items.filter((it) => it.id !== id);
    save(state);
  }

  function setQty(id, qty) {
    const state = load();
    const found = state.items.find((it) => it.id === id);
    if (!found) return;
    found.qty = Math.max(1, Math.min(99, qty | 0));
    save(state);
  }

  function setSubscribe(on, frequency) {
    const state = load();
    state.subscribe = !!on;
    if (frequency) state.frequency = frequency;
    save(state);
  }

  function addMany(ids) {
    ids.forEach((id) => add(id, 1));
  }

  function clear() {
    save({ items: [], subscribe: false, frequency: "4" });
  }

  function count() {
    return load().items.reduce((s, it) => s + it.qty, 0);
  }

  function lines() {
    const state = load();
    return state.items.map((it) => {
      const product = Shop.byId(it.id);
      const unit = state.subscribe
        ? Math.round(product.price * (1 - Shop.SUB_DISCOUNT))
        : product.price;
      return {
        product: product,
        qty: it.qty,
        unit: unit,
        line: unit * it.qty,
        old: product.price * it.qty
      };
    });
  }

  function totals() {
    const list = lines();
    const subtotal = list.reduce((s, l) => s + l.old, 0);
    const total = list.reduce((s, l) => s + l.line, 0);
    const state = load();
    return {
      subtotal: subtotal,
      total: total,
      discount: subtotal - total,
      subscribe: state.subscribe,
      frequency: state.frequency,
      count: count()
    };
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  global.Cart = {
    get: get,
    add: add,
    addMany: addMany,
    remove: remove,
    setQty: setQty,
    setSubscribe: setSubscribe,
    clear: clear,
    count: count,
    lines: lines,
    totals: totals,
    onChange: onChange
  };
})(window);
