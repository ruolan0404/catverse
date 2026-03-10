// ─── SOUND ENGINE (Web Audio API) ───────────────────────────────
const audio = new (window.AudioContext || window.webkitAudioContext)();

function playChop() {
  // Short sharp noise burst — knife on board
  const buffer = audio.createBuffer(1, audio.sampleRate * 0.08, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const src = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1800;
  filter.Q.value = 0.8;
  const gain = audio.createGain();
  gain.gain.setValueAtTime(0.5, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.08);
  src.buffer = buffer;
  src.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);
  src.start();
}

function playSizzle() {
  // Sizzle when ingredient hits pot
  const buffer = audio.createBuffer(1, audio.sampleRate * 0.6, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 1.5);
  }
  const src = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 3000;
  const gain = audio.createGain();
  gain.gain.setValueAtTime(0.4, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.6);
  src.buffer = buffer;
  src.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);
  src.start();
}

function playStir() {
  // Gentle rhythmic scraping tone
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, audio.currentTime);
  osc.frequency.linearRampToValueAtTime(260, audio.currentTime + 0.25);
  gain.gain.setValueAtTime(0.18, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + 0.3);
}

function playServe() {
  // Happy little ding ding
  [523, 659, 784].forEach((freq, i) => {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, audio.currentTime + i * 0.12);
    gain.gain.linearRampToValueAtTime(0.2, audio.currentTime + i * 0.12 + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + i * 0.12 + 0.35);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(audio.currentTime + i * 0.12);
    osc.stop(audio.currentTime + i * 0.12 + 0.4);
  });
}

// Resume audio context on first interaction (browser rule)
document.addEventListener('click', () => {
  if (audio.state === 'suspended') audio.resume();
}, { once: true });

// ─── DISHES DATA ────────────────────────────────────────────────
const DISHES = {
  biryani: {
    name: "Biryani 🍚", pot: "🫕",
    startFact: "Biryani came to South Asia with the Mughals in the 1500s — originally cooked for entire armies! 🏰",
    ingredients: [
      { emoji: "🍚", name: "basmati rice — soaked for 30 mins" },
      { emoji: "🐔", name: "chicken — marinated in yoghurt & spices" },
      { emoji: "🧅", name: "pyaz — fried golden brown in oil" },
      { emoji: "🌶️", name: "whole spices — zeera, elaichi, laung" },
      { emoji: "🌿", name: "dhania & pudina — for the dum" },
    ]
  },
  nihari: {
    name: "Nihari 🍖", pot: "🍲",
    startFact: "Nihari was slow-cooked overnight in Old Delhi mosques and served at Fajr prayer time — a 300 year old dish! 🕌",
    ingredients: [
      { emoji: "🍖", name: "beef shank — the slow-cook cut" },
      { emoji: "🧅", name: "fried onions — deep brown in oil" },
      { emoji: "🫚", name: "nihari masala — 10+ spices, ground fresh" },
      { emoji: "🌾", name: "atta — to thicken the beautiful broth" },
      { emoji: "🫙", name: "adrak lehsan paste — a generous spoonful" },
    ]
  },
  halwapuri: {
    name: "Halwa Puri 🫓", pot: "🥘",
    startFact: "Halwa Puri is the ultimate Pakistani Sunday breakfast — families queue at dhabas from 5am for it! ☀️",
    ingredients: [
      { emoji: "🫓", name: "maida dough — kneaded soft for puri" },
      { emoji: "🫚", name: "oil — deep fry until puffed & golden" },
      { emoji: "🟡", name: "sooji — base of the sweet halwa" },
      { emoji: "🍬", name: "sugar & ghee — the soul of halwa" },
      { emoji: "🫘", name: "channay — spiced chickpeas on the side" },
    ]
  },
  karahi: {
    name: "Karahi 🥘", pot: "🥘",
    startFact: "Karahi is named after the iron wok it's cooked in! The secret: high heat, fresh tomatoes, zero water. 🔥",
    ingredients: [
      { emoji: "🐔", name: "chicken — karahi cut pieces" },
      { emoji: "🍅", name: "fresh tomatoes — no water, just their juice" },
      { emoji: "🫙", name: "ginger julienne — be generous!" },
      { emoji: "🌶️", name: "green chillies — left whole for heat" },
      { emoji: "🧈", name: "makhan & cream — finish on top" },
    ]
  },
  bhindi: {
    name: "Bhindi Fry 🫑", pot: "🍳",
    startFact: "Bhindi (okra) came to South Asia from Africa! Drying it completely before frying removes all the sliminess. 🌍",
    ingredients: [
      { emoji: "🫑", name: "bhindi — washed and fully dried first!" },
      { emoji: "🧅", name: "onion — sliced thin" },
      { emoji: "🍅", name: "tomato — chopped small" },
      { emoji: "🌶️", name: "lal mirch & haldi — the basic masala" },
      { emoji: "🫚", name: "oil — shallow fry until crispy edges" },
    ]
  },
  mandi: {
    name: "Mandi 🍗", pot: "🫕",
    startFact: "Mandi is an ancient Yemeni dish — meat slow-cooked in a sealed pit over smouldering wood underground! 🏺",
    ingredients: [
      { emoji: "🍗", name: "whole chicken — smoked & slow roasted" },
      { emoji: "🍚", name: "long grain rice — cooked in the meat broth" },
      { emoji: "🌰", name: "mandi spice blend — bzar, loomi, turmeric" },
      { emoji: "🧅", name: "fried onions — layered generously on rice" },
      { emoji: "🌿", name: "fresh coriander & lemon — to finish" },
    ]
  }
};

const MID_FACTS = [
  "Cats knead with their paws when happy — just like kneading dough! 🫓",
  "A cat's sense of smell is 14x stronger than a human's. I can smell your karahi from next street. 🌶️",
  "Cats always land on their feet — called the righting reflex. Very useful near a hot stove.",
  "My whiskers are exactly the width of my body. I use them to check tight spaces. 📏",
  "Cats can make over 100 different sounds. Dogs manage only 10. Clearly I'm more expressive. 🎶",
  "I see perfectly in 1/6th the light humans need. Night cooking? No problem at all. 🌙",
  "Slow blinking at a cat means I love you in cat language. Try it. Do it right now. 😌",
  "A cat's heart beats twice as fast as a human's. Probably the excitement about biryani.",
];

const COOK_MSGS = [
  "Chop chop! Just like ammi does it.",
  "Slowly now... with love and patience.",
  "Mmmm that already smells amazing!",
  "The secret ingredient is always ghee.",
  "My nani made this every single Friday.",
  "Bilkul perfect, keep going! 👌",
];

// ─── GAME STATE ─────────────────────────────────────────────────
let currentDish = null;
let currentIngIndex = 0;
let chopCount = 0;
const CHOPS_NEEDED = 3;
let inPot = [];
let dishCount = 0;

// ─── START DISH ─────────────────────────────────────────────────
function startDish(key) {
  currentDish = DISHES[key];
  currentIngIndex = 0;
  inPot = [];
  chopCount = 0;

  showFact(currentDish.startFact);
  document.getElementById("dishSelect").style.display = "none";
  document.getElementById("ingArea").style.display = "flex";
  document.getElementById("serveBtn").style.display = "none";
  document.getElementById("potContents").textContent = "";
  document.getElementById("progressFill").style.width = "0%";
  setPotFill(0);

  setCat("wobble", "Bismillah! Let's make " + currentDish.name + " 🍳");
  loadIngredient();
}

// ─── LOAD INGREDIENT ────────────────────────────────────────────
function loadIngredient() {
  const ing = currentDish.ingredients[currentIngIndex];
  chopCount = 0;

  document.getElementById("ingEmoji").textContent = ing.emoji;
  document.getElementById("ingEmoji").className = "ing-emoji";
  document.getElementById("ingName").textContent = ing.name;
  document.getElementById("chopMarks").innerHTML = "";
  document.getElementById("cutBtn").disabled = false;
  document.getElementById("tossBtn").disabled = true;
  document.getElementById("stirBtn").disabled = true;
  document.getElementById("progressLabel").textContent =
    currentIngIndex + " of " + currentDish.ingredients.length + " in the pot";

  setCat("idle", "Next: " + ing.name + " — cut it first! 🔪");
}

// ─── STEP 1: CUT ────────────────────────────────────────────────
function cutIngredient() {
  chopCount++;
  playChop();

  // Chop animation on emoji
  const el = document.getElementById("ingEmoji");
  el.classList.remove("chop");
  void el.offsetWidth;
  el.classList.add("chop");

  // Add chop mark
  const mark = document.createElement("span");
  mark.className = "chop-mark";
  mark.textContent = "✂️";
  document.getElementById("chopMarks").appendChild(mark);

  if (chopCount < CHOPS_NEEDED) {
    setCat("idle", chopCount === 1 ? "Good! Keep cutting..." : "One more chop!");
  } else {
    document.getElementById("cutBtn").disabled = true;
    document.getElementById("tossBtn").disabled = false;
    setCat("happy", "Perfect! Now toss it in the pot 🤲");
  }
}

// ─── STEP 2: TOSS ───────────────────────────────────────────────
function tossIngredient() {
  const ing = currentDish.ingredients[currentIngIndex];

  // Fly animation
  const el = document.getElementById("ingEmoji");
  el.classList.add("fly");
  playSizzle();

  setTimeout(() => {
    inPot.push(ing.emoji);
    document.getElementById("potContents").textContent = inPot.join(" ");

    // Fill pot SVG
    const pct = inPot.length / currentDish.ingredients.length;
    setPotFill(pct);
    document.getElementById("progressFill").style.width = (pct * 100) + "%";

    // Bounce lid
    const lid = document.getElementById("lidTop");
    lid.style.transform = "translateY(-8px)";
    setTimeout(() => lid.style.transform = "", 300);

    document.getElementById("tossBtn").disabled = true;
    document.getElementById("stirBtn").disabled = false;
    setCat("stir", "In the pot! Give it a stir 🥄");
  }, 450);
}

// ─── STEP 3: STIR ───────────────────────────────────────────────
function stirPot() {
  playStir();
  document.getElementById("stirBtn").disabled = true;
  setCat("stir", COOK_MSGS[Math.floor(Math.random() * COOK_MSGS.length)]);

  currentIngIndex++;

  // Random mid fact 40% chance
  if (Math.random() < 0.4) {
    setTimeout(() => showFact("🐾 " + MID_FACTS[Math.floor(Math.random() * MID_FACTS.length)]), 600);
  }

  setTimeout(() => {
    if (currentIngIndex >= currentDish.ingredients.length) {
      document.getElementById("ingArea").style.display = "none";
      document.getElementById("serveBtn").style.display = "block";
      setCat("happy", currentDish.name + " is ready! Serve it up! 🍽️");
      showFact("Mashallah! " + currentDish.name + " looks absolutely perfect 🌟");
    } else {
      loadIngredient();
    }
  }, 700);
}

// ─── SERVE ──────────────────────────────────────────────────────
function serveDish() {
  playServe();
  dishCount++;
  document.getElementById("count").textContent = dishCount;
  setCat("happy", "Wah! Dish #" + dishCount + " served! Kya baat hai! 🎉");
  showFact("Zabardast! Pick the next dish 👇");

  document.getElementById("serveBtn").style.display = "none";
  document.getElementById("ingArea").style.display = "none";
  document.getElementById("dishSelect").style.display = "block";
  document.getElementById("potContents").textContent = "";
  setPotFill(0);
}

// ─── FILL POT SVG ───────────────────────────────────────────────
function setPotFill(pct) {
  // pot inner height is 55px (y from 40 to 95)
  const maxH = 55;
  const fillH = Math.round(pct * maxH);
  const fillEl = document.getElementById("potFill");
  fillEl.setAttribute("y", 95 - fillH);
  fillEl.setAttribute("height", fillH);
}

// ─── HELPERS ────────────────────────────────────────────────────
function setCat(anim, msg) {
  const svg = document.getElementById("catSvg");
  svg.className = "cat-svg";
  if (anim !== "idle") {
    void svg.offsetWidth;
    svg.classList.add(anim);
    if (anim !== "stir") {
      setTimeout(() => svg.classList.remove(anim), 600);
    }
  }
  document.getElementById("catMsg").textContent = msg;
}

function showFact(text) {
  const banner = document.getElementById("factBanner");
  document.getElementById("factText").textContent = text;
  // Re-trigger bubble pop animation
  banner.style.animation = "none";
  void banner.offsetWidth;
  banner.style.animation = "bubblePop 0.35s cubic-bezier(0.34,1.56,0.64,1)";
}
// ─── CUTTING BOARD ENGINE ───────────────────────────────────────
const canvas = document.getElementById("cuttingCanvas");
const ctx = canvas.getContext("2d");

let isSlicing = false;
let sliceStart = { x: 0, y: 0 };
let sliceCount = 0;
const SLICES_NEEDED = 3;
let slashLines = [];       // stores completed slash lines to redraw
let ingredientPieces = []; // pieces after cutting
let isCut = false;
let currentIngEmoji = "";

function initCuttingBoard(emoji) {
  currentIngEmoji = emoji;
  slashLines = [];
  ingredientPieces = [];
  sliceCount = 0;
  isCut = false;
  document.getElementById("tossBtn").style.display = "none";
  document.getElementById("cutStatus").textContent = "slice across it " + SLICES_NEEDED + " times!";
  drawBoard();
}

function drawBoard() {
  const W = canvas.width;
  const H = canvas.height;

  // Clear
  ctx.clearRect(0, 0, W, H);

  // Cutting board wood texture
  ctx.fillStyle = "#c8874a";
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 14);
  ctx.fill();

  // Wood grain lines
  ctx.strokeStyle = "rgba(0,0,0,0.07)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 20 + i * 22);
    ctx.lineTo(W, 18 + i * 22);
    ctx.stroke();
  }

  // Board edge shadow
  ctx.strokeStyle = "#a06030";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(2, 2, W - 4, H - 4, 12);
  ctx.stroke();

  if (!isCut) {
    // Draw whole ingredient emoji in center
    ctx.font = "72px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(currentIngEmoji, W / 2, H / 2);
  } else {
    // Draw cut pieces spread apart
    ingredientPieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.font = "36px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(currentIngEmoji, 0, 0);
      ctx.restore();
    });
  }

  // Draw all slash lines
  slashLines.forEach(line => drawSlashLine(line, false));
}

function drawSlashLine(line, isActive) {
  ctx.beginPath();
  ctx.moveTo(line.x1, line.y1);
  ctx.lineTo(line.x2, line.y2);
  ctx.strokeStyle = isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)";
  ctx.lineWidth = isActive ? 3 : 2;
  ctx.lineCap = "round";
  ctx.setLineDash(isActive ? [] : [6, 4]);
  ctx.stroke();
  ctx.setLineDash([]);
}

// ── Mouse events ──
canvas.addEventListener("mousedown", e => {
  if (isCut) return;
  isSlicing = true;
  const r = canvas.getBoundingClientRect();
  sliceStart = { x: e.clientX - r.left, y: e.clientY - r.top };
});

canvas.addEventListener("mousemove", e => {
  if (!isSlicing || isCut) return;
  const r = canvas.getBoundingClientRect();
  const current = { x: e.clientX - r.left, y: e.clientY - r.top };
  // Live preview
  drawBoard();
  drawSlashLine({ x1: sliceStart.x, y1: sliceStart.y, x2: current.x, y2: current.y }, true);
});

canvas.addEventListener("mouseup", e => {
  if (!isSlicing || isCut) return;
  isSlicing = false;
  const r = canvas.getBoundingClientRect();
  const end = { x: e.clientX - r.left, y: e.clientY - r.top };

  // Only count if they actually dragged (not just a click)
  const dist = Math.hypot(end.x - sliceStart.x, end.y - sliceStart.y);
  if (dist < 30) return;

  finishSlice(sliceStart, end);
});

// ── Touch events (mobile) ──
canvas.addEventListener("touchstart", e => {
  e.preventDefault();
  if (isCut) return;
  isSlicing = true;
  const r = canvas.getBoundingClientRect();
  const t = e.touches[0];
  sliceStart = { x: t.clientX - r.left, y: t.clientY - r.top };
});

canvas.addEventListener("touchmove", e => {
  e.preventDefault();
  if (!isSlicing || isCut) return;
  const r = canvas.getBoundingClientRect();
  const t = e.touches[0];
  const current = { x: t.clientX - r.left, y: t.clientY - r.top };
  drawBoard();
  drawSlashLine({ x1: sliceStart.x, y1: sliceStart.y, x2: current.x, y2: current.y }, true);
});

canvas.addEventListener("touchend", e => {
  e.preventDefault();
  if (!isSlicing || isCut) return;
  isSlicing = false;
  const r = canvas.getBoundingClientRect();
  const t = e.changedTouches[0];
  const end = { x: t.clientX - r.left, y: t.clientY - r.top };

  const dist = Math.hypot(end.x - sliceStart.x, end.y - sliceStart.y);
  if (dist < 30) return;

  finishSlice(sliceStart, end);
});

function finishSlice(start, end) {
  playChop();
  slashLines.push({ x1: start.x, y1: start.y, x2: end.x, y2: end.y });
  sliceCount++;

  const remaining = SLICES_NEEDED - sliceCount;
  if (remaining > 0) {
    document.getElementById("cutStatus").textContent =
      "good slice! " + remaining + " more cut" + (remaining > 1 ? "s" : "") + " to go...";
    drawBoard();
  } else {
    // Fully cut!
    splitIngredient();
  }
}

function splitIngredient() {
  isCut = true;
  const W = canvas.width;
  const H = canvas.height;

  // Create 4 scattered pieces
  ingredientPieces = [
    { x: W / 2 - 55, y: H / 2 - 30, rot: -0.4 },
    { x: W / 2 + 50, y: H / 2 - 25, rot:  0.5 },
    { x: W / 2 - 40, y: H / 2 + 35, rot:  0.3 },
    { x: W / 2 + 45, y: H / 2 + 30, rot: -0.3 },
  ];

  drawBoard();
  document.getElementById("cutStatus").textContent = "✅ nicely cut! toss it in!";
  document.getElementById("tossBtn").style.display = "inline-block";
  setCat("happy", "Shabash! Perfect cuts 👏 Now toss it in!");
}