/*
 * 24Support julekalender 2026 – logik
 * ===================================
 *
 * Filen gør fire ting:
 *   1. Tegner baggrunden (himmel, fire huse, lygter, sne) som SVG.
 *   2. Placerer 24 låger præcist over husenes vinduer.
 *   3. Bruger fiktive eksempelspørgsmål i den statiske portfolio-demo.
 *   4. Husker i brugerens browser (localStorage), hvilke låger der er åbnet,
 *      og viser det med en åben skodde, varmt lys og en guldstjerne.
 *
 * Hele kompositionen er tegnet i et koordinatsystem på 1600 × 900 (16:9).
 * Lågerne placeres i procent af det, så de altid flugter med baggrunden.
 */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------- */
  /* Konfiguration                                                           */
  /* ---------------------------------------------------------------------- */

  const YEAR = 2026;
  const STORAGE_KEY = `24support-julekalender-demo-${YEAR}-aabnet`;
  const DEMO_QUESTIONS = {
    1: 'Hvad er din yndlingstradition i december?',
    2: 'Hvilken julesang kommer du altid i godt humør af?',
    3: 'Hvilken julegodte vælger du først?',
    4: 'Hvad er den hyggeligste måde at holde en vinteraften på?',
    5: 'Hvem vil du gerne glæde med en lille overraskelse?',
    6: 'Hvilken film forbinder du mest med jul?',
    7: 'Foretrækker du juletræ eller julelys?',
    8: 'Hvad er din favoritduft i juletiden?',
    9: 'Hvilken varm drik vælger du på en kold dag?',
    10: 'Hvad gør en arbejdsdag ekstra hyggelig?',
    11: 'Hvilket vintereventyr ville du helst besøge?',
    12: 'Hvad er en lille ting, du er taknemmelig for?',
    13: 'Hvad er dit bedste tip til en hyggelig december?',
    14: 'Hvilken farve passer bedst til din jul?',
    15: 'Hvad vil du gerne lære i det nye år?',
    16: 'Hvem fortjener et ekstra tak i dag?',
    17: 'Hvilken ret hører hjemme på dit julebord?',
    18: 'Hvad er din foretrukne vinteraktivitet?',
    19: 'Hvilket spil eller hvilken leg samler jer?',
    20: 'Hvad er det bedste ved at hjælpe andre?',
    21: 'Hvilken lille tradition ville du gerne starte?',
    22: 'Hvad får dig til at smile på en travl dag?',
    23: 'Hvad glæder du dig mest til i ferien?',
    24: 'Hvad vil du gerne tage med dig ind i det nye år?',
  };

  const VIEW_W = 1600;
  const VIEW_H = 900;

  /*
   * Husene fra venstre mod højre. "style" er gavltypen:
   *   "gable"   = almindelig spids gavl med tag
   *   "stepped" = trappegavl (klassisk dansk købstadshus)
   */
  const HOUSES = [
    { color: 'red',  style: 'stepped' },
    { color: 'blue', style: 'gable' },
    { color: 'red',  style: 'gable' },
    { color: 'blue', style: 'stepped' },
  ];

  const HOUSE = {
    firstX: 110,   // venstre kant af første hus
    width: 300,
    spacing: 360,  // afstand mellem husenes venstre kanter
    top: 250,      // facadens top (under gavlen)
    bottom: 830,
  };

  const WINDOW = {
    width: 90,
    height: 120,
    colOffsets: [40, 170], // x i forhold til husets venstre kant
    rows: [300, 470, 640], // y for de tre etager
  };

  /*
   * Lågernes numre i vinduesrækkefølge: hus for hus, etage for etage,
   * venstre før højre. Numrene er spredt som på en klassisk kalender.
   * Byt rundt her, hvis I ønsker en anden fordeling.
   */
  const DOOR_ORDER = [
    7, 18, 3, 22, 12, 1,
    15, 9, 24, 5, 20, 11,
    2, 16, 10, 21, 6, 13,
    19, 4, 14, 8, 23, 17,
  ];

  const COLORS = {
    red:      { facade: '#9C2A33', roof: '#6A1B23', plinth: '#5E1920' },
    blue:     { facade: '#2A5A92', roof: '#1A3D6B', plinth: '#173559' },
    cream:    '#F4ECDD',
    snow:     '#F3F7FC',
    snowShade:'#C9D6EA',
    warm:     '#FFC56A',
    night:    '#0E1B33',
    tree:     '#123C33',
  };

  /* ---------------------------------------------------------------------- */
  /* Tilstand                                                                */
  /* ---------------------------------------------------------------------- */

  const state = {
    today: 24,             // Alle låger er åbne i den statiske portfolio-demo
    questions: DEMO_QUESTIONS,
    opened: loadOpened(),  // Set med numre på låger brugeren har åbnet
    lastFocus: null,       // låge der skal have fokus igen, når kortet lukkes
  };

  const $ = (id) => document.getElementById(id);
  const scenery = $('scenery');
  const doorsLayer = $('doors');
  const cardLayer = $('cardLayer');
  const doorEls = new Map(); // dag -> <button>

  /* ---------------------------------------------------------------------- */
  /* Hukommelse i browseren                                                  */
  /* ---------------------------------------------------------------------- */

  function loadOpened() {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return new Set(list.filter((n) => Number.isInteger(n) && n >= 1 && n <= 24));
    } catch {
      return new Set(); // fx hvis browseren blokerer lagring
    }
  }

  function saveOpened() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.opened]));
    } catch {
      /* Lagring er ikke kritisk – kalenderen virker stadig. */
    }
  }

  /* ---------------------------------------------------------------------- */
  /* SVG-hjælpere                                                            */
  /* ---------------------------------------------------------------------- */

  const SVG_NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, parent) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attrs || {})) node.setAttribute(key, value);
    if (parent) parent.appendChild(node);
    return node;
  }

  /** Lille deterministisk tilfældighedsgenerator, så stjernerne altid står ens. */
  function seededRandom(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const points = (list) => list.map((p) => p.join(',')).join(' ');

  /* ---------------------------------------------------------------------- */
  /* 1. Baggrund                                                             */
  /* ---------------------------------------------------------------------- */

  function drawScenery() {
    const defs = el('defs', {}, scenery);

    // Himmel
    const sky = el('linearGradient', { id: 'sky', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el('stop', { offset: '0', 'stop-color': '#0A1733' }, sky);
    el('stop', { offset: '1', 'stop-color': '#1D3A6B' }, sky);

    // Varmt lys i vinduerne
    const glow = el('radialGradient', { id: 'windowGlow', cx: '50%', cy: '60%', r: '75%' }, defs);
    el('stop', { offset: '0', 'stop-color': '#FFE3A8' }, glow);
    el('stop', { offset: '0.6', 'stop-color': COLORS.warm }, glow);
    el('stop', { offset: '1', 'stop-color': '#E08A3A' }, glow);

    // Lysskær omkring lygter og måne
    const halo = el('radialGradient', { id: 'halo' }, defs);
    el('stop', { offset: '0', 'stop-color': COLORS.warm, 'stop-opacity': '0.45' }, halo);
    el('stop', { offset: '1', 'stop-color': COLORS.warm, 'stop-opacity': '0' }, halo);

    const moonHalo = el('radialGradient', { id: 'moonHalo' }, defs);
    el('stop', { offset: '0', 'stop-color': '#F6EFD9', 'stop-opacity': '0.35' }, moonHalo);
    el('stop', { offset: '1', 'stop-color': '#F6EFD9', 'stop-opacity': '0' }, moonHalo);

    // Let skygge nederst på facaderne
    const shade = el('linearGradient', { id: 'facadeShade', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el('stop', { offset: '0', 'stop-color': '#000', 'stop-opacity': '0' }, shade);
    el('stop', { offset: '1', 'stop-color': '#000', 'stop-opacity': '0.28' }, shade);

    el('rect', { width: VIEW_W, height: VIEW_H, fill: 'url(#sky)' }, scenery);

    // Stjerner
    const rand = seededRandom(24);
    const stars = el('g', { fill: '#FFFFFF' }, scenery);
    for (let i = 0; i < 70; i += 1) {
      el('circle', {
        cx: (rand() * VIEW_W).toFixed(1),
        cy: (rand() * 380).toFixed(1),
        r: (0.6 + rand() * 1.4).toFixed(2),
        opacity: (0.25 + rand() * 0.55).toFixed(2),
      }, stars);
    }

    // Måne
    el('circle', { cx: 1470, cy: 105, r: 130, fill: 'url(#moonHalo)' }, scenery);
    el('circle', { cx: 1470, cy: 105, r: 36, fill: '#F6EFD9' }, scenery);

    // Fjerne tage i silhuet
    el('path', {
      d: 'M0 560 L60 520 L120 560 L120 500 L200 450 L280 500 L280 540 L340 540 L340 470 '
       + 'L420 430 L500 470 L560 470 L620 420 L700 470 L700 520 L780 480 L860 520 L940 460 '
       + 'L1020 500 L1080 440 L1160 500 L1240 470 L1320 510 L1320 450 L1400 410 L1480 450 '
       + 'L1540 500 L1600 470 L1600 900 L0 900 Z',
      fill: '#152E57',
    }, scenery);

    HOUSES.forEach((house, i) => drawHouse(house, HOUSE.firstX + i * HOUSE.spacing));

    // Lygter i mellemrummene
    for (let i = 0; i < HOUSES.length - 1; i += 1) {
      drawLamp(HOUSE.firstX + HOUSE.width + (HOUSE.spacing - HOUSE.width) / 2 + i * HOUSE.spacing);
    }

    // Grantræer i kanterne
    drawTree(55, 832);
    drawTree(1545, 832);

    // Sne på jorden
    el('path', {
      d: 'M0 808 Q 200 790 400 806 T 800 804 T 1200 806 T 1600 800 L1600 900 L0 900 Z',
      fill: COLORS.snow,
    }, scenery);
    el('path', {
      d: 'M0 862 Q 300 846 620 860 T 1200 856 T 1600 858 L1600 900 L0 900 Z',
      fill: COLORS.snowShade,
      opacity: 0.6,
    }, scenery);
  }

  function drawHouse(house, x) {
    const c = COLORS[house.color];
    const w = HOUSE.width;
    const g = el('g', {}, scenery);

    // Gavl
    if (house.style === 'stepped') {
      const steps = [];
      const stepW = 30;
      const stepH = 26;
      let px = x;
      let py = HOUSE.top + 2;
      steps.push([px, py]);
      for (let s = 0; s < 4; s += 1) {
        py -= stepH; steps.push([px, py]);
        px += stepW; steps.push([px, py]);
      }
      py -= stepH; steps.push([px, py]);
      const peakRight = x + w - (px - x);
      steps.push([peakRight, py]);
      px = peakRight;
      for (let s = 0; s < 4; s += 1) {
        py += stepH; steps.push([px, py]);
        px += stepW; steps.push([px, py]);
      }
      steps.push([px, HOUSE.top + 2]);
      el('polygon', { points: points(steps), fill: c.facade }, g);

      // Sne på hvert trin (de vandrette stykker)
      const snowG = el('g', { stroke: COLORS.snow, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
      for (let k = 1; k < steps.length - 1; k += 1) {
        const [ax, ay] = steps[k];
        const [bx, by] = steps[k + 1];
        if (ay === by && bx !== ax) {
          el('line', { x1: ax + 2, y1: ay - 2, x2: bx - 2, y2: by - 2 }, snowG);
        }
      }
      drawRoundWindow(g, x + w / 2, 176, 18);
    } else {
      const peak = [x + w / 2, 112];
      el('polygon', {
        points: points([[x - 16, HOUSE.top + 12], peak, [x + w + 16, HOUSE.top + 12]]),
        fill: c.roof,
      }, g);
      el('polyline', {
        points: points([[x - 16, HOUSE.top + 7], [peak[0], peak[1] - 5], [x + w + 16, HOUSE.top + 7]]),
        fill: 'none', stroke: COLORS.snow, 'stroke-width': 9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      }, g);
      drawRoundWindow(g, x + w / 2, 200, 20);
    }

    // Facade, skygge og sokkel
    el('rect', { x, y: HOUSE.top, width: w, height: HOUSE.bottom - HOUSE.top, fill: c.facade }, g);
    el('rect', { x, y: HOUSE.top, width: w, height: HOUSE.bottom - HOUSE.top, fill: 'url(#facadeShade)' }, g);
    el('rect', { x, y: HOUSE.bottom - 36, width: w, height: 36, fill: c.plinth }, g);

    // Gesims
    el('rect', { x: x - 6, y: HOUSE.top, width: w + 12, height: 11, fill: COLORS.cream }, g);

    // Lyskæde under gesimsen
    drawLights(g, x + 14, x + w - 14, HOUSE.top + 20);

    // Vinduer (lågerne lægges ovenpå som HTML)
    WINDOW.rows.forEach((wy) => {
      WINDOW.colOffsets.forEach((dx) => drawWindow(g, x + dx, wy));
    });
  }

  function drawWindow(parent, wx, wy) {
    const { width: ww, height: wh } = WINDOW;
    el('rect', { x: wx - 7, y: wy - 7, width: ww + 14, height: wh + 14, rx: 3, fill: COLORS.cream }, parent);
    el('rect', { x: wx, y: wy, width: ww, height: wh, fill: 'url(#windowGlow)' }, parent);
    // Sprosser
    const bars = el('g', { stroke: '#8A5424', 'stroke-width': 3, opacity: 0.55 }, parent);
    el('line', { x1: wx + ww / 2, y1: wy, x2: wx + ww / 2, y2: wy + wh }, bars);
    el('line', { x1: wx, y1: wy + wh * 0.42, x2: wx + ww, y2: wy + wh * 0.42 }, bars);
    // Karm med sne
    el('rect', { x: wx - 12, y: wy + wh + 6, width: ww + 24, height: 8, rx: 2, fill: COLORS.cream }, parent);
    el('rect', { x: wx - 10, y: wy + wh + 2, width: ww + 20, height: 6, rx: 3, fill: COLORS.snow }, parent);
  }

  function drawRoundWindow(parent, cx, cy, r) {
    el('circle', { cx, cy, r: r + 5, fill: COLORS.cream }, parent);
    el('circle', { cx, cy, r, fill: 'url(#windowGlow)' }, parent);
    const bars = el('g', { stroke: '#8A5424', 'stroke-width': 2, opacity: 0.55 }, parent);
    el('line', { x1: cx - r, y1: cy, x2: cx + r, y2: cy }, bars);
    el('line', { x1: cx, y1: cy - r, x2: cx, y2: cy + r }, bars);
  }

  /** Lyskæde der hænger i små buer. */
  function drawLights(parent, x1, x2, y) {
    const spans = 5;
    const spanW = (x2 - x1) / spans;
    let d = `M${x1} ${y}`;
    for (let s = 0; s < spans; s += 1) {
      const sx = x1 + s * spanW;
      d += ` Q ${sx + spanW / 2} ${y + 12} ${sx + spanW} ${y}`;
    }
    el('path', { d, fill: 'none', stroke: '#2B1F14', 'stroke-width': 1.5, opacity: 0.7 }, parent);

    // Pærer: tre pr. bue, placeret på kurven
    for (let s = 0; s < spans; s += 1) {
      for (let k = 1; k <= 3; k += 1) {
        const t = k / 4;
        const bx = x1 + (s + t) * spanW;
        const by = y + 2 * t * (1 - t) * 12 + 3;
        el('circle', { cx: bx, cy: by, r: 8, fill: 'url(#halo)' }, parent);
        el('circle', { cx: bx, cy: by, r: 3, fill: COLORS.warm }, parent);
      }
    }
  }

  function drawLamp(cx) {
    const g = el('g', {}, scenery);
    el('circle', { cx, cy: 634, r: 80, fill: 'url(#halo)' }, g);
    el('rect', { x: cx - 3, y: 650, width: 6, height: 170, fill: COLORS.night }, g);
    el('rect', { x: cx - 9, y: 812, width: 18, height: 10, fill: COLORS.night }, g);
    el('polygon', { points: points([[cx - 14, 616], [cx + 14, 616], [cx + 10, 652], [cx - 10, 652]]), fill: COLORS.night }, g);
    el('rect', { x: cx - 8, y: 622, width: 16, height: 26, fill: COLORS.warm }, g);
    el('polygon', { points: points([[cx - 17, 616], [cx, 602], [cx + 17, 616]]), fill: COLORS.night }, g);
    el('line', { x1: cx - 17, y1: 613, x2: cx + 17, y2: 613, stroke: COLORS.snow, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
  }

  function drawTree(cx, baseY) {
    const g = el('g', {}, scenery);
    el('rect', { x: cx - 5, y: baseY - 30, width: 10, height: 30, fill: '#2B1D14' }, g);
    const tiers = [
      { w: 80, y: baseY - 30, h: 80 },
      { w: 64, y: baseY - 80, h: 70 },
      { w: 46, y: baseY - 125, h: 65 },
    ];
    tiers.forEach((t) => {
      el('polygon', {
        points: points([[cx - t.w / 2, t.y], [cx, t.y - t.h], [cx + t.w / 2, t.y]]),
        fill: COLORS.tree,
      }, g);
      // Snehætte på toppen af hvert lag
      const capH = t.h * 0.3;
      const capW = (t.w / 2) * 0.3;
      el('path', {
        d: `M${cx - capW} ${t.y - t.h + capH} L${cx} ${t.y - t.h} L${cx + capW} ${t.y - t.h + capH} `
         + `Q${cx} ${t.y - t.h + capH * 0.7} ${cx - capW} ${t.y - t.h + capH} Z`,
        fill: COLORS.snow,
      }, g);
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 2. Låger                                                                */
  /* ---------------------------------------------------------------------- */

  const pct = (value, total) => `${(value / total) * 100}%`;

  function buildDoors() {
    HOUSES.forEach((house, h) => {
      const houseX = HOUSE.firstX + h * HOUSE.spacing;
      WINDOW.rows.forEach((wy, r) => {
        WINDOW.colOffsets.forEach((dx, c) => {
          const day = DOOR_ORDER[h * 6 + r * 2 + c];
          const door = document.createElement('button');
          door.type = 'button';
          door.className = 'door';
          door.dataset.day = String(day);
          door.dataset.house = house.color;
          door.style.left = pct(houseX + dx, VIEW_W);
          door.style.top = pct(wy, VIEW_H);
          door.style.width = pct(WINDOW.width, VIEW_W);
          door.style.height = pct(WINDOW.height, VIEW_H);
          door.innerHTML =
            `<span class="opened-num" aria-hidden="true">${day}</span>` +
            `<span class="shutter" aria-hidden="true"><span class="num">${day}</span></span>` +
            '<span class="opened-mark" aria-hidden="true"></span>';
          door.addEventListener('click', () => onDoorClick(day, door));
          doorsLayer.appendChild(door);
          doorEls.set(day, door);
        });
      });
    });
  }

  /** Opdaterer alle lågers tilstand ud fra dato og hvad brugeren har åbnet. */
  function applyDoorStates() {
    doorEls.forEach((door, day) => {
      const unlocked = day <= state.today;
      const opened = unlocked && state.opened.has(day);
      door.classList.toggle('is-locked', !unlocked);
      door.classList.toggle('is-today', unlocked && day === state.today && state.today <= 24 && !opened);
      door.classList.toggle('is-opened', opened);
      door.setAttribute('aria-disabled', String(!unlocked));

      // Skærmlæsere får status med (vises ikke som tekst).
      let label = `Låge ${day}`;
      if (!unlocked) label += ', låst';
      else if (opened) label += ', åbnet';
      door.setAttribute('aria-label', label);
    });
  }

  function onDoorClick(day, door) {
    if (day > state.today) {
      // Låst: ryst lågen let.
      door.classList.remove('shake');
      void door.offsetWidth; // genstart animationen
      door.classList.add('shake');
      return;
    }

    state.lastFocus = door;

    if (state.opened.has(day)) {
      showCard(day);
      return;
    }

    state.opened.add(day);
    saveOpened();
    applyDoorStates();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => showCard(day), reduced ? 0 : 750);
  }

  /* ---------------------------------------------------------------------- */
  /* Spørgsmålskort                                                          */
  /* ---------------------------------------------------------------------- */

  function showCard(day) {
    $('cardNumber').textContent = String(day);
    // textContent (ikke innerHTML), så tekst fra admin aldrig tolkes som kode.
    $('cardQuestion').textContent = state.questions[day] || '';
    cardLayer.hidden = false;
    $('cardClose').focus();
  }

  function hideCard() {
    if (cardLayer.hidden) return;
    cardLayer.hidden = true;
    if (state.lastFocus) state.lastFocus.focus();
  }

  $('cardClose').addEventListener('click', hideCard);
  cardLayer.addEventListener('click', (e) => {
    if (e.target === cardLayer) hideCard(); // klik uden for kortet
  });
  document.addEventListener('keydown', (e) => {
    if (cardLayer.hidden) return;
    if (e.key === 'Escape') hideCard();
    if (e.key === 'Tab') {
      e.preventDefault(); // hold fokus i kortet
      $('cardClose').focus();
    }
  });

  /* ---------------------------------------------------------------------- */
  /* Snefald                                                                 */
  /* ---------------------------------------------------------------------- */

  function makeSnow() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const layer = $('snow');
    const rand = seededRandom(1224);
    for (let i = 0; i < 36; i += 1) {
      const flake = document.createElement('span');
      const size = 0.18 + rand() * 0.32; // i cqw
      flake.className = 'flake';
      flake.style.width = `${size}cqw`;
      flake.style.height = `${size}cqw`;
      flake.style.left = `${rand() * 100}%`;
      flake.style.opacity = (0.25 + rand() * 0.4).toFixed(2);
      flake.style.animationDuration = `${12 + rand() * 14}s`;
      flake.style.animationDelay = `${-rand() * 26}s`;
      flake.style.setProperty('--drift', `${(rand() * 4 - 2).toFixed(2)}cqw`);
      layer.appendChild(flake);
    }
  }

  /* ---------------------------------------------------------------------- */
  /* 3. Eksempelindhold til den statiske portfolio-demo                     */
  /* ---------------------------------------------------------------------- */

  /* ---------------------------------------------------------------------- */
  /* Start                                                                   */
  /* ---------------------------------------------------------------------- */

  drawScenery();
  buildDoors();
  applyDoorStates();
  makeSnow();
})();
