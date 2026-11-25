/* Дані каталогу Чистоцвіт (навчальний проєкт) */
(function (global) {
  const CATEGORIES = [
    { id: "prannya", name: "Прання", short: "Гелі, капсули, плямовивідники" },
    { id: "posud", name: "Посуд", short: "Для ручного миття та посудомийки" },
    { id: "prybyrannya", name: "Прибирання", short: "Підлога, скло, кухня" },
    { id: "vanna", name: "Ванна та сантехніка", short: "Унітаз, наліт, цвіль" },
    { id: "eko", name: "Екозасоби", short: "Рослинні формули" },
    { id: "tekstyl", name: "Текстиль і повітря", short: "Кондиціонер, освіжувачі" }
  ];

  const LABEL_META = {
    eco: { className: "badge--eco", text: "Еко" },
    hypo: { className: "badge--hypo", text: "Гіпоалергенний" },
    kids: { className: "badge--kids", text: "Безпечно для дітей" },
    pets: { className: "badge--pets", text: "Безпечно для тварин" }
  };

  const PRODUCTS = [
    {
      id: "gel-prannya-3l",
      name: "Гель для прання універсальний 3 л",
      category: "prannya",
      price: 219,
      volume: "3 л",
      unit: "до 60 прань",
      labels: ["hypo"],
      shape: "jug",
      tone: "#7ec8c3",
      popular: true,
      desc: "Концентрований гель для білих і кольорових тканин. Добре розчиняється у холодній воді та підходить для машинного й ручного прання.",
      composition: "Аніонні та неіонні ПАР, ензими, пом’якшувач води, аромат «свіжа бавовна»."
    },
    {
      id: "gel-dytyachyi",
      name: "Гель для прання дитячих речей 1,5 л",
      category: "prannya",
      price: 189,
      volume: "1,5 л",
      unit: "до 30 прань",
      labels: ["hypo", "kids", "eco"],
      shape: "jug",
      tone: "#f3d9a4",
      popular: true,
      desc: "М’яка формула без оптичних відбілювачів і барвників. Підходить для речей немовлят і людей із чутливою шкірою.",
      composition: "М’які ПАР рослинного походження, гліцерин, ензими, без фосфатів."
    },
    {
      id: "kapsuly-30",
      name: "Капсули для прання концентровані 30 шт",
      category: "prannya",
      price: 249,
      volume: "30 шт",
      unit: "1 капсула — 1 прання",
      labels: [],
      shape: "box",
      tone: "#8fbae3",
      popular: true,
      desc: "Водорозчинні капсули з гелем і плямовивідником. Зручно дозувати: одна капсула в барабан перед білизною.",
      composition: "Концентровані ПАР, ензими, водорозчинна плівка, ароматизатор."
    },
    {
      id: "plyamovyvidnyk",
      name: "Плямовивідник кисневий 750 мл",
      category: "prannya",
      price: 89,
      volume: "750 мл",
      unit: "передпрання або в барабан",
      labels: [],
      shape: "bottle",
      tone: "#b7d8f0",
      desc: "Киснева формула для плям від кави, трави, ягід і соку. Підходить для білих і стійких кольорових тканин, без хлору.",
      composition: "Активний кисень, ПАР, стабілізатори, без хлору."
    },
    {
      id: "kondytsioner-len",
      name: "Кондиціонер для білизни «Свіжість льону» 2 л",
      category: "prannya",
      price: 129,
      volume: "2 л",
      unit: "до 40 полоскань",
      labels: ["hypo"],
      shape: "jug",
      tone: "#c9e4c9",
      desc: "Змікшує тканини, зменшує електризацію і залишає легкий аромат свіжого льону. Підходить для щоденного прання.",
      composition: "Катіонні ПАР, пом’якшувачі, аромат льону."
    },
    {
      id: "balzam-posud-lymon",
      name: "Бальзам для миття посуду «Лимон» 1 л",
      category: "posud",
      price: 69,
      volume: "1 л",
      unit: "концентрат",
      labels: [],
      shape: "pump",
      tone: "#e8e07a",
      popular: true,
      desc: "Густий бальзам добре збиває жир навіть у прохолодній воді. Аромат лимона, зручний дозатор.",
      composition: "Аніонні ПАР, гліцерин, лимонна кислота, ароматизатор."
    },
    {
      id: "gel-posud-hypo",
      name: "Гель для посуду гіпоалергенний 1 л",
      category: "posud",
      price: 79,
      volume: "1 л",
      unit: "без барвників",
      labels: ["hypo", "kids"],
      shape: "pump",
      tone: "#d7eef2",
      desc: "Нейтральний аромат і м’яка формула для чутливої шкіри рук. Підходить для дитячого посуду.",
      composition: "М’які ПАР, гліцерин, пантенол, без барвників."
    },
    {
      id: "tabletky-pdm",
      name: "Таблетки для посудомийної машини 40 шт",
      category: "posud",
      price: 199,
      volume: "40 шт",
      unit: "all-in-one",
      labels: [],
      shape: "box",
      tone: "#9fd0c8",
      popular: true,
      desc: "Комплексні таблетки: миття, сіль і ополіскувач в одній капсулі. Для всіх стандартних посудомийних машин.",
      composition: "Кисневий відбілювач, ензими, сіль, ополіскувач, водорозчинна оболонка."
    },
    {
      id: "opolis-pdm",
      name: "Ополіскувач для посудомийки 500 мл",
      category: "posud",
      price: 85,
      volume: "500 мл",
      unit: "блиск без розводів",
      labels: [],
      shape: "bottle",
      tone: "#cfe8f5",
      desc: "Допомагає посуду швидше сохнути і не залишає патьоків на склі. Заливається в окремий відсік машини.",
      composition: "Неіонні ПАР, лимонна кислота, блискоутворювачі."
    },
    {
      id: "pidloga-1l",
      name: "Універсальний засіб для підлоги 1 л",
      category: "prybyrannya",
      price: 99,
      volume: "1 л",
      unit: "ламінат, плитка, лінолеум",
      labels: [],
      shape: "jug",
      tone: "#8fcea8",
      popular: true,
      desc: "Миє без розводів і липкого шару. Підходить для ламінату, плитки, каменю та лінолеуму. Легкий трав’яний аромат.",
      composition: "Неіонні ПАР, догляд за покриттям, аромат лугових трав."
    },
    {
      id: "sklo-sprei",
      name: "Спрей для скла та дзеркал 750 мл",
      category: "prybyrannya",
      price: 75,
      volume: "750 мл",
      unit: "тригер",
      labels: [],
      shape: "spray",
      tone: "#9ad4e6",
      desc: "Швидко знімає пил і відбитки пальців, не залишає розводів. Зручний розпилювач для вікон, дзеркал і скляних фасадів.",
      composition: "Спирти, ПАР, антистатик, без аміаку."
    },
    {
      id: "antyzhyr",
      name: "Засіб для кухні антижир 750 мл",
      category: "prybyrannya",
      price: 109,
      volume: "750 мл",
      unit: "плита, духовка, витяжка",
      labels: [],
      shape: "spray",
      tone: "#f0b27a",
      popular: true,
      desc: "Розчиняє пригорілий жир на плиті, у духовці та на кахлі. Нанесіть, зачекайте кілька хвилин і зітріть.",
      composition: "Лужні компоненти, ПАР, розчинники жиру."
    },
    {
      id: "servetky-50",
      name: "Серветки для прибирання універсальні 50 шт",
      category: "prybyrannya",
      price: 59,
      volume: "50 шт",
      unit: "готові до використання",
      labels: [],
      shape: "wipes",
      tone: "#d8e7c8",
      desc: "Вологі серветки для швидкого прибирання стільниць, дверцят і побутової техніки. Велика пачка на щодень.",
      composition: "Неткане полотно, м’який мийний розчин, лимонна кислота."
    },
    {
      id: "unitaz-gel",
      name: "Гель для чищення унітаза 750 мл",
      category: "vanna",
      price: 72,
      volume: "750 мл",
      unit: "густий гель",
      labels: [],
      shape: "bottle",
      tone: "#7ec3b0",
      desc: "Густий гель обволікає обід унітаза, прибирає наліт і освіжає. Зручний носик для точного нанесення під обід.",
      composition: "Органічні кислоти, загусник, ПАР, аромат морської свіжості."
    },
    {
      id: "naplit-sprei",
      name: "Спрей проти вапняного нальоту 500 мл",
      category: "vanna",
      price: 95,
      volume: "500 мл",
      unit: "змішувачі, душ, кахлі",
      labels: [],
      shape: "spray",
      tone: "#b9d0ea",
      desc: "Прибирає вапняний наліт зі змішувачів, душових лійок і плитки. Не дряпає хром і скло.",
      composition: "Органічні кислоти, ПАР, інгібітори корозії."
    },
    {
      id: "proty-tsvil",
      name: "Засіб проти цвілі 500 мл",
      category: "vanna",
      price: 119,
      volume: "500 мл",
      unit: "шви, кути, завіса",
      labels: [],
      shape: "spray",
      tone: "#9bb8d4",
      desc: "Для швів, кутів душової та віконних укосів, де з’являється цвіль. Добре провітрюйте приміщення під час використання.",
      composition: "Активні протигрибкові компоненти, ПАР. Використовувати за інструкцією, берегти від дітей."
    },
    {
      id: "pina-dush",
      name: "Піна для душових кабін 500 мл",
      category: "vanna",
      price: 89,
      volume: "500 мл",
      unit: "скло та акрил",
      labels: [],
      shape: "spray",
      tone: "#cde8ef",
      desc: "Ніжна піна для скла й акрилу душової кабіни. Змиває мильні сліди і допомагає довше зберігати прозорість скла.",
      composition: "М’які ПАР, антиналіт, догляд за акрилом."
    },
    {
      id: "eko-gel-prannya",
      name: "Екогель для прання на рослинній основі 1,5 л",
      category: "eko",
      price: 229,
      volume: "1,5 л",
      unit: "без фосфатів",
      labels: ["eco", "hypo", "kids", "pets"],
      shape: "jug",
      tone: "#8fce8f",
      popular: true,
      desc: "Рослинна формула, що біологічно розкладається. Без фосфатів, барвників і різкого аромату. Для всієї родини, зокрема з тваринами в домі.",
      composition: "ПАР рослинного походження, ензими, гліцерин, ефірна олія бергамоту в мінімальній кількості."
    },
    {
      id: "eko-posud",
      name: "Екозасіб для миття посуду 1 л",
      category: "eko",
      price: 96,
      volume: "1 л",
      unit: "рослинні ПАР",
      labels: ["eco", "hypo"],
      shape: "pump",
      tone: "#b6d98a",
      popular: true,
      desc: "Миє посуд і дитячі пляшечки, легко змивається. Формула на рослинних ПАР, флакон придатний до переробки.",
      composition: "Рослинні ПАР, гліцерин, екстракт алое, без фосфатів."
    },
    {
      id: "eko-sprei",
      name: "Екоспрей для всіх поверхонь 500 мл",
      category: "eko",
      price: 119,
      volume: "500 мл",
      unit: "меблі, стіни, двері",
      labels: ["eco", "pets", "kids"],
      shape: "spray",
      tone: "#a8d4a0",
      desc: "Універсальний спрей для щоденного прибирання в оселі, де є діти або тварини. Без хлору та агресивної лужності.",
      composition: "Рослинні ПАР, лимонна кислота, екстракт м’яти."
    },
    {
      id: "soda-1kg",
      name: "Сода кальцинована для прибирання 1 кг",
      category: "eko",
      price: 49,
      volume: "1 кг",
      unit: "універсальний порошок",
      labels: ["eco"],
      shape: "box",
      tone: "#e8e4d4",
      desc: "Класичний багатоцільовий порошок: посилює прання, допомагає відмивати кухню та розчиняти жир. Без ароматизаторів.",
      composition: "Карбонат натрію 99 %."
    },
    {
      id: "osvizhuvach-myata",
      name: "Освіжувач повітря «М’ята та евкаліпт» 300 мл",
      category: "tekstyl",
      price: 79,
      volume: "300 мл",
      unit: "аерозоль",
      labels: [],
      shape: "spray",
      tone: "#7ecfb0",
      desc: "Легкий прохолодний аромат м’яти й евкаліпта для вітальні, передпокою чи робочого місця. Розпилювати на повітря, не на тканину зблизька.",
      composition: "Спиртова основа, ароматичні компоненти м’яти та евкаліпта."
    },
    {
      id: "sprei-tkanyny",
      name: "Спрей для тканин «Бавовна» 400 мл",
      category: "tekstyl",
      price: 89,
      volume: "400 мл",
      unit: "штори, диван, одяг",
      labels: ["hypo"],
      shape: "spray",
      tone: "#e8dcc8",
      desc: "Освіжає штори, пледи та одяг між праннями. М’який аромат чистої бавовни, формула для чутливих до запахів.",
      composition: "Водний розчин, м’які ПАР, аромат бавовни."
    },
    {
      id: "kylym-750",
      name: "Засіб для миття килимів 750 мл",
      category: "tekstyl",
      price: 139,
      volume: "750 мл",
      unit: "килим, диван, авто",
      labels: [],
      shape: "jug",
      tone: "#d4b48a",
      desc: "Піднімає бруд із ворсу килима та оббивки. Можна використовувати з щіткою або пилососом для вологого прибирання.",
      composition: "ПАР, піногасник, догляд за волокнами."
    }
  ];

  const BUNDLES = [
    {
      id: "bundle-kitchen",
      name: "Набір «Чиста кухня»",
      hint: "Для тих, хто хоче швидко зібрати все для миття посуду і робочих поверхонь.",
      productIds: ["balzam-posud-lymon", "antyzhyr", "sklo-sprei", "servetky-50"],
      rooms: ["kitchen"],
      preferEco: false
    },
    {
      id: "bundle-bath",
      name: "Набір «Ванна без нальоту»",
      hint: "Базовий комплект для сантехніки, душової та унітаза.",
      productIds: ["unitaz-gel", "naplit-sprei", "pina-dush", "proty-tsvil"],
      rooms: ["bath"],
      preferEco: false
    },
    {
      id: "bundle-weekly",
      name: "Набір «Щотижневе прибирання»",
      hint: "Універсальний комплект на всю квартиру: підлога, скло, кухня і текстиль.",
      productIds: ["pidloga-1l", "sklo-sprei", "antyzhyr", "servetky-50", "sprei-tkanyny"],
      rooms: ["all"],
      preferEco: false
    },
    {
      id: "bundle-eco",
      name: "Набір «Еко-дім»",
      hint: "Рослинні формули для дому, де важлива безпека й дбайливе ставлення до середовища.",
      productIds: ["eko-gel-prannya", "eko-posud", "eko-sprei", "soda-1kg"],
      rooms: ["all", "kitchen"],
      preferEco: true
    },
    {
      id: "bundle-kids",
      name: "Набір «Дбайлива оселя»",
      hint: "Гіпоалергенні та позначені як безпечні для дітей і тварин засоби.",
      productIds: ["gel-dytyachyi", "gel-posud-hypo", "eko-sprei", "sprei-tkanyny"],
      rooms: ["kids", "all"],
      preferEco: true
    }
  ];

  const SUB_DISCOUNT = 0.15;
  const BUNDLE_DISCOUNT = 0.1;

  function byId(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  function formatPrice(n) {
    const rounded = Math.round(n);
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") + "\u00a0грн";
  }

  function categoryName(id) {
    const c = CATEGORIES.find((x) => x.id === id);
    return c ? c.name : id;
  }

  function badgeHTML(labels) {
    return (labels || [])
      .map((key) => {
        const meta = LABEL_META[key];
        if (!meta) return "";
        return '<span class="badge ' + meta.className + '">' + meta.text + "</span>";
      })
      .join("");
  }

  function productArt(product, height) {
    const h = height || 150;
    const w = Math.round(h * 0.8);
    const tone = product.tone || "#9fd0c8";
    const cap = shade(tone, -35);
    const body = tone;
    const shine = "rgba(255,255,255,0.45)";
    const shapes = {
      jug: jugSVG(body, cap, shine),
      bottle: bottleSVG(body, cap, shine),
      pump: pumpSVG(body, cap, shine),
      spray: spraySVG(body, cap, shine),
      box: boxSVG(body, cap),
      wipes: wipesSVG(body, cap)
    };
    const inner = shapes[product.shape] || bottleSVG(body, cap, shine);
    return (
      '<svg viewBox="0 0 160 200" width="' +
      w +
      '" height="' +
      h +
      '" aria-hidden="true">' +
      inner +
      "</svg>"
    );
  }

  function shade(hex, amt) {
    const c = hex.replace("#", "");
    const num = parseInt(c, 16);
    let r = (num >> 16) + amt;
    let g = ((num >> 8) & 0xff) + amt;
    let b = (num & 0xff) + amt;
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function jugSVG(body, cap, shine) {
    return (
      '<rect x="58" y="18" width="44" height="16" rx="3" fill="' + cap + '"/>' +
      '<rect x="68" y="34" width="24" height="12" fill="' + cap + '"/>' +
      '<path d="M46 50h68l8 118c0 10-10 18-22 18H60c-12 0-22-8-22-18l8-118z" fill="' + body + '"/>' +
      '<path d="M58 62c2 40 2 80 0 110" stroke="' + shine + '" stroke-width="6" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="80" cy="50" rx="34" ry="6" fill="' + shade(body, 20) + '"/>'
    );
  }

  function bottleSVG(body, cap, shine) {
    return (
      '<rect x="66" y="16" width="28" height="22" rx="4" fill="' + cap + '"/>' +
      '<path d="M58 40h44l10 14v112c0 10-8 18-18 18H66c-10 0-18-8-18-18V54l10-14z" fill="' + body + '"/>' +
      '<path d="M70 70c1 36 1 70 0 98" stroke="' + shine + '" stroke-width="5" fill="none" stroke-linecap="round"/>'
    );
  }

  function pumpSVG(body, cap, shine) {
    return (
      '<rect x="90" y="10" width="28" height="8" rx="3" fill="' + cap + '"/>' +
      '<rect x="74" y="18" width="14" height="22" rx="3" fill="' + shade(cap, -15) + '"/>' +
      '<rect x="64" y="40" width="32" height="12" rx="3" fill="' + cap + '"/>' +
      '<path d="M48 56h64c6 0 10 5 10 11v103c0 10-8 16-18 16H56c-10 0-18-6-18-16V67c0-6 4-11 10-11z" fill="' + body + '"/>' +
      '<path d="M64 80c1 40 1 70 0 96" stroke="' + shine + '" stroke-width="6" fill="none" stroke-linecap="round"/>'
    );
  }

  function spraySVG(body, cap, shine) {
    return (
      '<path d="M78 22h20l16-12" stroke="' + cap + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<rect x="70" y="18" width="28" height="16" rx="4" fill="' + cap + '"/>' +
      '<rect x="76" y="34" width="16" height="14" fill="' + shade(cap, -20) + '"/>' +
      '<path d="M58 50h44c8 0 14 6 14 14v104c0 10-8 16-18 16H62c-10 0-18-6-18-16V64c0-8 6-14 14-14z" fill="' + body + '"/>' +
      '<path d="M70 74c1 40 1 72 0 100" stroke="' + shine + '" stroke-width="5" fill="none" stroke-linecap="round"/>'
    );
  }

  function boxSVG(body, cap) {
    return (
      '<rect x="30" y="44" width="100" height="132" rx="8" fill="' + body + '"/>' +
      '<rect x="30" y="44" width="100" height="28" rx="8" fill="' + cap + '"/>' +
      '<rect x="30" y="64" width="100" height="8" fill="' + cap + '"/>' +
      '<rect x="48" y="88" width="64" height="10" rx="5" fill="rgba(255,255,255,0.5)"/>' +
      '<rect x="56" y="108" width="48" height="8" rx="4" fill="rgba(255,255,255,0.35)"/>'
    );
  }

  function wipesSVG(body, cap) {
    return (
      '<rect x="40" y="50" width="80" height="120" rx="16" fill="' + body + '"/>' +
      '<ellipse cx="80" cy="50" rx="40" ry="16" fill="' + cap + '"/>' +
      '<rect x="70" y="38" width="20" height="14" rx="4" fill="' + shade(cap, -25) + '"/>' +
      '<path d="M74 52c8 10 16 8 22-2" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>'
    );
  }

  function artBackground(product) {
    const map = {
      prannya: "linear-gradient(180deg,#e7f4f7,#d4ecec)",
      posud: "linear-gradient(180deg,#f7f6de,#efe9b8)",
      prybyrannya: "linear-gradient(180deg,#e8f6ec,#d3ead6)",
      vanna: "linear-gradient(180deg,#e7f1f8,#d2e3f0)",
      eko: "linear-gradient(180deg,#e8f6e4,#d0e8c8)",
      tekstyl: "linear-gradient(180deg,#f6efe6,#eadccb)"
    };
    return map[product.category] || "linear-gradient(180deg,#edf8f6,#d4f1ed)";
  }

  function cardHTML(product, opts) {
    opts = opts || {};
    const href = "product.html?id=" + encodeURIComponent(product.id);
    return (
      '<article class="card" data-id="' + product.id + '">' +
        '<a class="card__art" href="' + href + '" style="background:' + artBackground(product) + '">' +
          productArt(product, 150) +
        "</a>" +
        '<div class="card__badges">' + badgeHTML(product.labels) + "</div>" +
        "<h3><a href=\"" + href + "\">" + product.name + "</a></h3>" +
        '<div class="card__meta">' + categoryName(product.category) + " · " + product.volume + "</div>" +
        '<div class="card__row">' +
          '<div class="price">' + formatPrice(product.price) + "</div>" +
          (opts.hideButton ? "" : '<button type="button" class="btn btn--primary btn--sm js-add" data-id="' + product.id + '">У кошик</button>') +
        "</div>" +
      "</article>"
    );
  }

  function bundleProducts(bundle) {
    return bundle.productIds.map(byId).filter(Boolean);
  }

  function bundleTotal(bundle, subscribed) {
    const sum = bundleProducts(bundle).reduce((s, p) => s + p.price, 0);
    const rate = subscribed ? SUB_DISCOUNT : BUNDLE_DISCOUNT;
    return { sum: sum, total: Math.round(sum * (1 - rate)), rate: rate };
  }

  function pickBundle(answers) {
    const rooms = answers.rooms || [];
    const eco = answers.priority === "eco" || answers.kids || answers.pets;
    if (answers.kids || answers.pets) {
      if (answers.priority === "eco" || answers.kids) return BUNDLES.find((b) => b.id === "bundle-kids");
    }
    if (answers.priority === "eco") return BUNDLES.find((b) => b.id === "bundle-eco");
    if (rooms.length === 1 && rooms[0] === "kitchen") return BUNDLES.find((b) => b.id === "bundle-kitchen");
    if (rooms.length === 1 && rooms[0] === "bath") return BUNDLES.find((b) => b.id === "bundle-bath");
    if (rooms.indexOf("kids") !== -1) return BUNDLES.find((b) => b.id === "bundle-kids");
    if (rooms.indexOf("all") !== -1 || rooms.length > 1) return BUNDLES.find((b) => b.id === "bundle-weekly");
    if (eco) return BUNDLES.find((b) => b.id === "bundle-eco");
    return BUNDLES.find((b) => b.id === "bundle-weekly");
  }

  global.Shop = {
    CATEGORIES: CATEGORIES,
    PRODUCTS: PRODUCTS,
    BUNDLES: BUNDLES,
    LABEL_META: LABEL_META,
    SUB_DISCOUNT: SUB_DISCOUNT,
    BUNDLE_DISCOUNT: BUNDLE_DISCOUNT,
    byId: byId,
    formatPrice: formatPrice,
    categoryName: categoryName,
    badgeHTML: badgeHTML,
    productArt: productArt,
    artBackground: artBackground,
    cardHTML: cardHTML,
    bundleProducts: bundleProducts,
    bundleTotal: bundleTotal,
    pickBundle: pickBundle
  };
})(window);
