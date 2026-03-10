
// ════════════════════════════════════
// CANVAS
// ════════════════════════════════════
const gc=document.getElementById('gc');
const ctx=gc.getContext('2d');
ctx.imageSmoothingEnabled=false;
const CW=480,CH=300;
gc.width=CW; gc.height=CH;
const PS=4;

// ════════════════════════════════════
// SPRITES
// ════════════════════════════════════
function spr(p,g){return{palette:p,grid:g};}
const SPR={
  rice:spr({B:'#5b8fa8',b:'#3d6b82',L:'#7ab8d4',W:'#fffff0',w:'#e8e8c8'},
    ['                ','   BBBBBBBBB    ','  BLLLlllLLBB   ','  BLwwwwwwLBB   ',
     '  BLwWWWwwLBB   ','  BLwWWWwwLBB   ','  BLwwwwwwLBB   ','   BBBBBBBBb    ',
     '    bbbbbbbb    ','   bbbBBBbbb    ','  bbbBBBBBbbb   ','   bbbbbbbbb    ',
     '                ','                ','                ','                ']),
  chicken:spr({R:'#c8604a',r:'#e8806a',L:'#f0a080',W:'#fff0e8',B:'#8b3a20'},
    ['                ','    RRRR        ','   RrrrRR       ','  RrllrrrR      ',
     '  RrlLLlrR      ','   RrllrR       ','    RRrRR       ','     RRR        ',
     '      RR        ','      RBB       ','      RBWB      ','      RBWWB     ',
     '       BWWB     ','        BB      ','                ','                ']),
  onion:spr({O:'#e8c078',o:'#d4a050',L:'#f0d898',l:'#ffe8a8',B:'#8b5010',G:'#5a8a20',g:'#3a6010'},
    ['                ','      GG        ','     GgGG       ','     gGg        ',
     '    OOoOO       ','   OOLlLOOO     ','  OOLlllLOOO    ','  OolllllloO    ',
     '  OolllllloO    ','  OOolllloOO    ','   OOOooOOO     ','    OOOOOOO     ',
     '     OoooO      ','      OOO       ','                ','                ']),
  tomato:spr({R:'#cc2200',r:'#ee4422',L:'#ff6644',l:'#ff8866',G:'#226600',g:'#448800'},
    ['                ','    GGgGG       ','   GgggggG      ','   RRRrRRR      ',
     '  RRLllLRRR     ','  RLlllllRR     ','  RlllllllR     ','  RLlllllrR     ',
     '  RRlllLRRR     ','   RRLrRRR      ','    RRRRR       ','     RRR        ',
     '                ','                ','                ','                ']),
  yoghurt:spr({B:'#5b8fa8',b:'#3d6b82',W:'#fffff5',Y:'#f0f0d8',r:'#cc3300'},
    ['                ','   BBBBBBB      ','   BbbbbbB      ','   BBBBBBB      ',
     '   BWWWWwB      ','   BWYYYwB      ','   BWrrrwB      ','   BWYYYwB      ',
     '   BWwwwwB      ','   BBBbBBB      ','   BWwwwwB      ','    BBBBB       ',
     '                ','                ','                ','                ']),
  garlic:spr({W:'#f5f0e8',w:'#e8e0d0',L:'#fffaf0',l:'#d8d0c0',B:'#c8a878',b:'#a88858',G:'#c8b890'},
    ['                ','    WWWWW       ','   WwLLwWW      ','  WWLLLLwWW     ',
     '  WLlllllWW     ','  WLlllllWW     ','  WWlllllWW     ','   WWwwwWW      ',
     '   bBBBBBb      ','   bBGGGBb      ','    bBBBb       ','     bbb        ',
     '                ','                ','                ','                ']),
  ginger:spr({G:'#c8a040',g:'#a88020',L:'#e8c060',l:'#f0d080',B:'#6a4010'},
    ['                ','   GGGGG        ','  GgLLgGG       ','  GgLllgG       ',
     '  GGlllGG       ','   GGgGG        ','    GGG  GGG    ','    GgG GgLG    ',
     '     GG GlLG    ','      GGGgG     ','       GGG      ','                ',
     '                ','                ','                ','                ']),
  spice:spr({R:'#cc2200',r:'#ee4422',B:'#3a3a5a',b:'#5a5a7a',W:'#e8d8c8',G:'#2a6010'},
    ['                ','     GGGGG      ','    GGgggG      ','    BBBBB       ',
     '   BBbbbBB      ','   BWWWWBB      ','   BWRrRwB      ','   BWRrRwB      ',
     '   BWRrRwB      ','   BWwwwwB      ','   BBbbbBB      ','    BBBBB       ',
     '                ','                ','                ','                ']),
  saffron:spr({Y:'#ffcc00',y:'#ddaa00',O:'#ff8800',B:'#2a2a3a',b:'#4a4a5a',W:'#fffaf0',L:'#ffe060'},
    ['                ','     YYYY       ','    YyyyY       ','    YYYYY       ',
     '   BWWWWB       ','   BWLlwB       ','   BWOOwB       ','   BWOOwB       ',
     '   BWLlwB       ','   BWwwwB       ','   BBbbbB       ','    BBBB        ',
     '                ','                ','                ','                ']),
  herbs:spr({G:'#2a7a20',g:'#4a9a40',L:'#6aba60',l:'#8aca80',B:'#5a3a10',b:'#3a2008'},
    ['                ','  G  G  G  G    ','  Gg GgGg Gg    ','  GlgLgLgLg     ',
     '  GllLlLllg     ','  GGllllLGG     ','   GGllGGG      ','    GGGGG       ',
     '     GGG        ','     BBB        ','     BbB        ','     BBB        ',
     '    bBBBb       ','    bbbbb       ','                ','                ']),
  oil:spr({Y:'#ddbb44',O:'#ffdd88',B:'#2a2a2a',b:'#4a4a4a',W:'#fffaf0',R:'#cc2200',L:'#ffee99'},
    ['                ','     RRRR       ','     RrrR       ','      YY        ',
     '     YYYY       ','    BWWWWB      ','    BWLlwB      ','    BWOOwB      ',
     '    BWOOwB      ','    BWOOwB      ','    BWwwwB      ','    BBbbBB      ',
     '   BBBbbBBB     ','    BBbbBB      ','                ','                ']),
  wholespice:spr({B:'#8b6340',b:'#6b4320',L:'#a88060',l:'#c8a080',W:'#f5f0e8',w:'#e8e0d0',Y:'#ddcc44',y:'#bbaa22'},
    ['                ','   BBBBBBB      ','  BbBBBBBbB     ','  BlWWWWWlB     ',
     '  BlWwwwWlB     ','  BlWYyYWlB     ','  BlWyyyWlB     ','  BlWYyYWlB     ',
     '  BlWwwwWlB     ','  BlLLLLLlB     ','   BbbbbbB      ','    BBBBB       ',
     '                ','                ','                ','                ']),
  salt:spr({W:'#f0f0f0',w:'#d8d8d8',B:'#3a3a5a',b:'#5a5a7a',L:'#ffffff'},
    ['                ','    BBBBB       ','   BbbbbbB      ','   BWWWWWB      ',
     '   BLllllB      ','   BLllllB      ','   BLllllB      ','   BLllllB      ',
     '   BWwwwwB      ','   BBBbBBB      ','   BWwwwwB      ','    BBBBB       ',
     '                ','                ','                ','                ']),
  lemon:spr({Y:'#f0e020',y:'#d0c010',L:'#ffff60',l:'#ffff90',G:'#448800'},
    ['                ','    YYYYY       ','   YyLLyYY      ','  YYLllLyYY     ',
     '  YLlllllYY     ','  YLlllllYY     ','  YYlllllYY     ','   YYyyyYY      ',
     '    YYYYY       ','     GG         ','                ','                ',
     '                ','                ','                ','                ']),
  flour:spr({W:'#f8f8f0',w:'#e8e8d8',B:'#c8a860',b:'#a88840',Y:'#ddbb44',y:'#bbaa22'},
    ['                ','   BBBBBBB      ','  BbBBBBBbB     ','  BbWWWWWbB     ',
     '  BbWwwwWbB     ','  BbWwwwWbB     ','  BbBBBBBbB     ','   BbbbbbB      ',
     '   BYYYYB       ','   ByyyyB       ','    BBBB        ','                ',
     '                ','                ','                ','                ']),
  ghee:spr({Y:'#ffdd88',y:'#ddbb44',G:'#ffee99',B:'#2a2a2a',b:'#4a4a4a',W:'#fffaf0'},
    ['                ','    YYYY        ','   YyyyyY       ','   BWWWWB       ',
     '   BWGGwB       ','   BWGGwB       ','   BWGGwB       ','   BWwwwB       ',
     '   BBbbBB       ','  BBBbbBBB      ','   BBbbBB       ','                ',
     '                ','                ','                ','                ']),
  okra:spr({G:'#2a8a20',g:'#4aaa40',L:'#6aca60',l:'#8aea80',B:'#1a5010',Y:'#aacc44'},
    ['                ','      G         ','     GG         ','    GgG         ',
     '   GgGGG        ','  GgLLGGG       ','  GLlllGG       ','  GLlllGG       ',
     '  GGllGGG       ','   GGlGG        ','    GGG         ','    GBB         ',
     '     BB         ','                ','                ','                ']),
  beef:spr({R:'#a84030',r:'#c86050',L:'#e08070',l:'#f0a090',W:'#ffe8e0',B:'#6a2010'},
    ['                ','   RRRRRR       ','  RrLLLrRR      ','  RrLllLrR      ',
     '  RLlllllR      ','  RLlllllR      ','  RrLllLrR      ','   RrrrrRR      ',
     '    RRRR        ','     RBB        ','     RBWB       ','      BWB       ',
     '                ','                ','                ','                ']),
  butter:spr({Y:'#ffdd88',y:'#ddbb44',G:'#228800',g:'#336600',W:'#fffaf0',B:'#2a1a00'},
    ['                ','   GGGGG        ','  GgggggG       ','  GYYYYG        ',
     '  GYyyyyG       ','  GYyyyyG       ','  GYyyyyG       ','  GYYYYG        ',
     '   GGGGG        ','                ','                ','                ',
     '                ','                ','                ','                ']),
};

// ════════════════════════════════════
// DISH DEFINITIONS — each with its own setup
// ════════════════════════════════════
const DISHES={
  biryani:{
    name:'BIRYANI',emoji:'🍚',
    station:'deg',        // which vessel to draw
    cookLabel:'🔥 DUM',  // button label
    cookColor:'#e8a840',  // soup/fill color
    cookSteps:3,
    stoveColor:'#ff4400',
    startFact:'BIRYANI CAME WITH THE MUGHALS IN 1526 — COOKED FOR ARMIES OF 10,000 SOLDIERS!',
    facts:[
      'DUM COOKING = SEALING THE POT WITH DOUGH SO NO STEAM ESCAPES!',
      'PROPER BIRYANI HAS LAYERS — RICE THEN MASALA THEN RICE AGAIN!',
      'LAHORI BIRYANI HAS MORE SPICE. KARACHI BIRYANI ADDS POTATOES!',
      'BASMATI MEANS FRAGRANT IN URDU — AGED RICE IS ALWAYS BETTER!',
    ],
    cookMsgs:['LAYERING THE DUM! 🍚','SEALING WITH DOUGH!','STEAM IS BUILDING!','ALMOST THERE!'],
    ingredients:[
      {id:'rice',       name:'CHAWAL',    desc:'Basmati Rice'},
      {id:'chicken',    name:'MURGH',     desc:'Chicken'},
      {id:'onion',      name:'PYAZ',      desc:'Fried Onion'},
      {id:'tomato',     name:'TAMATAR',   desc:'Tomato'},
      {id:'yoghurt',    name:'DAHI',      desc:'Yoghurt'},
      {id:'garlic',     name:'LEHSAN',    desc:'Garlic'},
      {id:'ginger',     name:'ADRAK',     desc:'Ginger'},
      {id:'spice',      name:'MIRCH',     desc:'Chilli'},
      {id:'saffron',    name:'ZAFRAN',    desc:'Saffron'},
      {id:'herbs',      name:'PUDINA',    desc:'Mint & Coriander'},
      {id:'oil',        name:'TEL',       desc:'Cooking Oil'},
      {id:'wholespice', name:'GARAM',     desc:'Whole Spices'},
    ]
  },
  nihari:{
    name:'NIHARI',emoji:'🍖',
    station:'deg',
    cookLabel:'🕐 SIMMER',
    cookColor:'#8b3a10',
    cookSteps:4,
    stoveColor:'#ff6600',
    startFact:'NIHARI WAS SLOW-COOKED OVERNIGHT IN DELHI MOSQUES — SERVED AT FAJR TIME 300 YEARS AGO!',
    facts:[
      'NIHARI MEANS NAHAR = MORNING IN ARABIC — IT\'S A DAWN BREAKFAST DISH!',
      'SLOW COOKING FOR 6-8 HOURS MAKES THE BEEF FALL OFF THE BONE!',
      'NIHARI MASALA HAS 12+ SPICES INCLUDING DRIED GINGER AND FENNEL!',
    ],
    cookMsgs:['SLOW COOKING...','HOURS OF PATIENCE!','THE BROTH DEEPENS!','ALMOST READY!'],
    ingredients:[
      {id:'beef',       name:'GOSHT',     desc:'Beef Shank'},
      {id:'onion',      name:'PYAZ',      desc:'Fried Onion'},
      {id:'wholespice', name:'MASALA',    desc:'Nihari Masala'},
      {id:'ginger',     name:'ADRAK',     desc:'Ginger'},
      {id:'garlic',     name:'LEHSAN',    desc:'Garlic Paste'},
      {id:'flour',      name:'ATTA',      desc:'Thickener'},
      {id:'oil',        name:'TEL',       desc:'Cooking Oil'},
      {id:'herbs',      name:'DHANIA',    desc:'Fresh Coriander'},
      {id:'salt',       name:'NAMAK',     desc:'Salt'},
      {id:'lemon',      name:'NIMBU',     desc:'Lemon'},
    ]
  },
  halwapuri:{
    name:'HALWA PURI',emoji:'🫓',
    station:'karahi',
    cookLabel:'🫓 FRY',
    cookColor:'#e8a820',
    cookSteps:3,
    stoveColor:'#ff8800',
    startFact:'PEOPLE QUEUE AT DHABAS FROM 5AM FOR HALWA PURI — THE ULTIMATE PAKISTANI SUNDAY BREAKFAST!',
    facts:[
      'PURI MUST BE KNEADED SOFT AND DEEP FRIED TILL GOLDEN AND PUFFED!',
      'SOOJI HALWA GETS SWEETER THE LONGER YOU STIR IT ON LOW HEAT!',
      'THE GHEE IN HALWA IS WHAT MAKES IT TASTE LIKE HOME — NEVER SKIP IT!',
    ],
    cookMsgs:['PURI IS PUFFING! 🫓','GOLDEN AND CRISPY!','HALWA IS SETTING!','SMELLS AMAZING!'],
    ingredients:[
      {id:'flour',      name:'MAIDA',     desc:'White Flour Dough'},
      {id:'oil',        name:'TEL',       desc:'Deep Fry Oil'},
      {id:'flour',      name:'SOOJI',     desc:'Semolina for Halwa'},
      {id:'ghee',       name:'GHEE',      desc:'Pure Ghee'},
      {id:'salt',       name:'CHEENI',    desc:'Sugar'},
      {id:'wholespice', name:'CHANNAY',   desc:'Spiced Chickpeas'},
      {id:'salt',       name:'NAMAK',     desc:'Salt'},
    ]
  },
  karahi:{
    name:'KARAHI',emoji:'🥘',
    station:'wok',
    cookLabel:'🔥 BHUNO',
    cookColor:'#cc3300',
    cookSteps:3,
    stoveColor:'#ff2200',
    startFact:'KARAHI IS NAMED AFTER ITS IRON WOK — HIGH FLAME, FRESH TOMATOES, ZERO WATER ADDED!',
    facts:[
      'KARAHI MUST COOK ON HIGH FLAME — NEVER LOWER THE HEAT!',
      'NO WATER IN KARAHI — ONLY THE TOMATO JUICE MAKES THE GRAVY!',
      'THE CHAR ON THE SIDES OF THE WOKE IS THE FLAVOUR — DON\'T WASH IT!',
      'BHUNO MEANS TO ROAST AND DRY OUT THE MASALA — KEY TO KARAHI!',
    ],
    cookMsgs:['BHUNO ON HIGH!','TOSSING THE MASALA!','SMOKE RISING!','ALMOST CHARRED!'],
    ingredients:[
      {id:'chicken',    name:'MURGH',     desc:'Chicken Pieces'},
      {id:'tomato',     name:'TAMATAR',   desc:'Fresh Tomatoes'},
      {id:'ginger',     name:'ADRAK',     desc:'Ginger Julienne'},
      {id:'spice',      name:'MIRCH',     desc:'Green Chillies'},
      {id:'butter',     name:'MAKHAN',    desc:'Butter & Cream'},
      {id:'garlic',     name:'LEHSAN',    desc:'Garlic'},
      {id:'oil',        name:'TEL',       desc:'Cooking Oil'},
      {id:'wholespice', name:'MASALA',    desc:'Karahi Masala'},
      {id:'salt',       name:'NAMAK',     desc:'Salt'},
    ]
  },
  bhindi:{
    name:'BHINDI FRY',emoji:'🫑',
    station:'tawa',
    cookLabel:'🍳 CRISP',
    cookColor:'#4a8820',
    cookSteps:2,
    stoveColor:'#ff6600',
    startFact:'BHINDI CAME TO SOUTH ASIA FROM AFRICA! DRY IT FULLY BEFORE FRYING — NEVER ADD WATER!',
    facts:[
      'BHINDI IS 90% WATER — DRY IT COMPLETELY BEFORE IT TOUCHES THE OIL!',
      'OKRA HAS BEEN EATEN IN AFRICA FOR OVER 3000 YEARS!',
      'CRISPY EDGES ON BHINDI MEANS PERFECTLY COOKED — NO SLIMINESS!',
    ],
    cookMsgs:['SIZZLING ON TAWA!','EDGES CRISPING!','COLOUR IS PERFECT!','CRISPY AND DONE!'],
    ingredients:[
      {id:'okra',       name:'BHINDI',    desc:'Lady Finger — DRY!'},
      {id:'onion',      name:'PYAZ',      desc:'Sliced Thin'},
      {id:'tomato',     name:'TAMATAR',   desc:'Chopped Small'},
      {id:'spice',      name:'MIRCH',     desc:'Red Chilli & Haldi'},
      {id:'oil',        name:'TEL',       desc:'Shallow Fry Oil'},
      {id:'salt',       name:'NAMAK',     desc:'Salt'},
    ]
  },
  mandi:{
    name:'MANDI',emoji:'🍗',
    station:'pit',
    cookLabel:'🔥 SMOKE',
    cookColor:'#aa6610',
    cookSteps:4,
    stoveColor:'#ff4400',
    startFact:'MANDI IS YEMENI — MEAT SEALED IN A CLAY PIT UNDERGROUND OVER SMOULDERING WOOD!',
    facts:[
      'MANDI GETS ITS SMOKY FLAVOUR FROM THE UNDERGROUND FIRE PIT — CALLED TANDOOR!',
      'LOOMI (DRIED LIME) IS THE SECRET SPICE IN AUTHENTIC MANDI!',
      'MANDI RICE IS COOKED IN MEAT BROTH — NEVER PLAIN WATER!',
      'TRUE MANDI COOKS FOR 3-4 HOURS IN A SEALED PIT — SLOW AND SMOKY!',
    ],
    cookMsgs:['SMOKE RISING! 🍗','PIT IS SEALING!','SLOW AND SMOKY!','ALMOST READY!'],
    ingredients:[
      {id:'chicken',    name:'MURGH',     desc:'Whole Chicken'},
      {id:'rice',       name:'CHAWAL',    desc:'Long Grain Rice'},
      {id:'wholespice', name:'BZAR',      desc:'Mandi Spice Mix'},
      {id:'onion',      name:'PYAZ',      desc:'Fried Onions'},
      {id:'butter',     name:'MAKHAN',    desc:'Butter'},
      {id:'lemon',      name:'NIMBU',     desc:'Lemon'},
      {id:'herbs',      name:'DHANIA',    desc:'Coriander'},
      {id:'salt',       name:'NAMAK',     desc:'Salt'},
    ]
  }
};

const CAT_MSGS=[
  'SHABASH! KEEP GOING! 👏',
  'BILKUL PERFECT! AMMI WOULD BE PROUD!',
  'OHO THE SMELL! MASHA\'ALLAH! ✨',
  'GOLDEN BROWN IS THE SECRET!',
  'SLOWLY — WITH LOVE AND PATIENCE! 💛',
  'THIS IS GOING TO BE AMAZING!',
  'MY WHISKERS ARE TWITCHING WITH JOY!',
  'WAH WAH! KEEP GOING! 🎉',
];

// ════════════════════════════════════
// GAME STATE
// ════════════════════════════════════
let added=0,cooked=0,dishes=0,facts=0;
let phase='picking'; // picking|adding|cooking|done
let potFill=0;
let particles=[],steam=[];
let pour=null;
let catAnim='idle',catT=0;
let currentDish=null;

// ════════════════════════════════════
// DRAW SPRITE
// ════════════════════════════════════
function drawSpr(c,spr,x,y,sc){
  const p=PS*(sc||1);
  spr.grid.forEach((row,gy)=>{
    for(let gx=0;gx<row.length;gx++){
      const ch=row[gx];
      if(!ch||ch===' ') continue;
      const col=spr.palette[ch];
      if(!col) continue;
      c.fillStyle=col; c.fillRect(x+gx*p,y+gy*p,p,p);
    }
  });
}

// ════════════════════════════════════
// DRAW BACKGROUND
// ════════════════════════════════════
// DAY / NIGHT
// ════════════════════════════════════
let isNight=true;

function toggleDayNight(){
  isNight=!isNight;
  const btn=document.getElementById('dntoggle');
  if(isNight){
    btn.textContent='🌙 NIGHT';
    btn.style.background='#1a1a2e';
    btn.style.color='#ffff99';
    btn.style.borderColor='#4a4a6a';
    document.getElementById('wrap').style.background='#0d0805';
    document.body.style.background='#0d0805';
  } else {
    btn.textContent='☀️ DAY';
    btn.style.background='#4a8a00';
    btn.style.color='#fffde0';
    btn.style.borderColor='#88cc00';
    document.getElementById('wrap').style.background='#e8d8a0';
    document.body.style.background='#e8d8a0';
  }
}

// ════════════════════════════════════
function drawBG(){
  if(isNight){
    // ── NIGHT ──
    ctx.fillStyle='#2d1b0e'; ctx.fillRect(0,0,CW,CH);
    for(let tx=0;tx<CW;tx+=32){
      for(let ty=0;ty<180;ty+=16){
        ctx.fillStyle=(Math.floor(tx/32)+Math.floor(ty/16))%2===0?'#381e10':'#2d1b0e';
        ctx.fillRect(tx,ty,32,16);
      }
    }
    ctx.fillStyle='#4a2a18';
    for(let tx=0;tx<CW;tx+=32) ctx.fillRect(tx,0,1,180);
    for(let ty=0;ty<180;ty+=16) ctx.fillRect(0,ty,CW,1);

    // Night window — dark blue with moon + stars
    ctx.fillStyle='#0a1a2e'; ctx.fillRect(330,8,110,76);
    ctx.fillStyle='#1a2a4a'; ctx.fillRect(333,11,104,70);
    ctx.fillStyle='#ffff99';
    [[348,24],[372,18],[395,30],[360,50],[380,44],[408,22],[355,35],[390,55]].forEach(([sx,sy])=>ctx.fillRect(sx,sy,3,3));
    // Moon
    ctx.fillStyle='#fff8c0'; ctx.beginPath(); ctx.arc(415,40,13,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#1a2a4a'; ctx.beginPath(); ctx.arc(421,36,9,0,Math.PI*2); ctx.fill();
    // Lantern glow on wall
    ctx.fillStyle='rgba(255,200,80,0.08)'; ctx.fillRect(0,0,CW,180);

  } else {
    // ── DAY ──
    ctx.fillStyle='#c8b880'; ctx.fillRect(0,0,CW,CH);
    for(let tx=0;tx<CW;tx+=32){
      for(let ty=0;ty<180;ty+=16){
        ctx.fillStyle=(Math.floor(tx/32)+Math.floor(ty/16))%2===0?'#c0aa70':'#c8b880';
        ctx.fillRect(tx,ty,32,16);
      }
    }
    ctx.fillStyle='#b09858';
    for(let tx=0;tx<CW;tx+=32) ctx.fillRect(tx,0,1,180);
    for(let ty=0;ty<180;ty+=16) ctx.fillRect(0,ty,CW,1);

    // Day window — bright sky, sun, clouds
    ctx.fillStyle='#88ccff'; ctx.fillRect(330,8,110,76);
    ctx.fillStyle='#aaddff'; ctx.fillRect(333,11,104,70);
    // Sun
    ctx.fillStyle='#ffdd00'; ctx.beginPath(); ctx.arc(410,28,14,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#ffee44'; ctx.beginPath(); ctx.arc(410,28,10,0,Math.PI*2); ctx.fill();
    // Sun rays (pixel style)
    ctx.fillStyle='#ffdd00';
    [[410,8,4,6],[410,42,4,6],[394,28,6,4],[420,28,6,4],[396,14,4,4],[422,14,4,4],[396,40,4,4],[422,40,4,4]].forEach(r=>ctx.fillRect(...r));
    // Clouds
    ctx.fillStyle='#ffffff';
    [[340,48,24,10],[356,42,20,10],[370,52,18,8]].forEach(([cx,cy,cw,ch2])=>ctx.fillRect(cx,cy,cw,ch2));
    // Day warmth tint
    ctx.fillStyle='rgba(255,220,120,0.1)'; ctx.fillRect(0,0,CW,180);
  }

  // Window frame (same for both)
  ctx.fillStyle='#8b5020';
  [[328,6,4,80],[438,6,4,80],[328,6,114,4],[328,78,114,4],[382,6,4,80],[328,42,114,4]].forEach(r=>ctx.fillRect(...r));

  // Shelf + jars (same for both, slightly lighter in day)
  ctx.fillStyle='#8b5020'; ctx.fillRect(18,52,150,8); ctx.fillRect(18,52,4,44); ctx.fillRect(164,52,4,44);
  ['#cc4400','#4488cc','#22aa44','#ddaa00','#aa2288','#2288aa'].forEach((c,i)=>{
    ctx.fillStyle=c; ctx.fillRect(26+i*22,34,14,20);
    ctx.fillStyle='#1a0a00'; ctx.fillRect(26+i*22,34,14,4);
    ctx.fillStyle='rgba(255,255,255,0.2)'; ctx.fillRect(28+i*22,40,4,8);
  });

  // Counter
  const counterCol=isNight?'#7a5030':'#9a7050';
  ctx.fillStyle=counterCol; ctx.fillRect(0,178,CW,22);
  ctx.fillStyle=isNight?'#9a7050':'#b89068'; ctx.fillRect(0,178,CW,3);
  ctx.fillStyle='#5a3818'; ctx.fillRect(0,196,CW,8);

  // Floor
  ctx.fillStyle=isNight?'#3a2208':'#6a5028'; ctx.fillRect(0,204,CW,CH-204);
  ctx.fillStyle=isNight?'#2a1808':'#5a4018';
  for(let fx=0;fx<CW;fx+=48) ctx.fillRect(fx,204,1,CH-204);
  for(let fy=204;fy<CH;fy+=20) ctx.fillRect(0,fy,CW,1);
}

// ════════════════════════════════════
// DRAW COOKING STATION
// ════════════════════════════════════
function drawStation(){
  if(!currentDish) return;
  const s=currentDish.station;
  const p=PS;

  // Stove/fire base
  const fireOn=added>0||cooked>0;

  if(s==='deg'){
    // Big Pakistani deg
    const dx=200,dy=80;
    ctx.fillStyle='#1a0e06'; ctx.fillRect(dx+2,dy+44,94,94);
    // Handles
    ctx.fillStyle='#5a3010'; ctx.fillRect(dx-16,dy+30,16,12); ctx.fillRect(dx+96,dy+30,16,12);
    // Body
    for(let bx=0;bx<88;bx+=p){
      for(let by=0;by<88;by+=p){
        const cx2=bx-44,cy2=by-44;
        if(cx2*cx2/44/44+cy2*cy2/44/44<1){
          ctx.fillStyle=bx<p*4||bx>p*18?'#2a4a6a':'#3a6a8a';
          ctx.fillRect(dx+4+bx,dy+44+by,p,p);
        }
      }
    }
    drawFill(dx+8,dy+44,80,88,44,currentDish.cookColor);
    // Rim + lid
    ctx.fillStyle='#4a3a2a'; ctx.fillRect(dx,dy+38,96,12);
    ctx.fillStyle='#5a4a38'; ctx.fillRect(dx,dy+34,96,8);
    ctx.fillStyle='#4a3a2a'; ctx.fillRect(dx-4,dy+22,104,16);
    ctx.fillStyle='#5a4a38'; ctx.fillRect(dx-2,dy+18,100,12);
    ctx.fillStyle='#3a2a18'; ctx.fillRect(dx+36,dy+12,28,10);
    if(added>0){ ctx.fillStyle='#8ab8d8'; ctx.fillRect(dx+70,dy+10,6,52); ctx.fillRect(dx+62,dy+10,20,12);}
    drawStove(dx+8,178,80,fireOn,currentDish.stoveColor);

  }else if(s==='wok'){
    // Iron karahi wok
    const wx=196,wy=100;
    ctx.fillStyle='#1a1a1a';
    for(let bx=0;bx<100;bx+=p){
      for(let by=0;by<70;by+=p){
        const cx2=bx-50,cy2=by-30;
        if(cx2*cx2/50/50+cy2*cy2/30/30<1 && cy2>-10){
          ctx.fillStyle=bx<p*5||bx>p*19?'#2a2a2a':'#3a3a3a';
          ctx.fillRect(wx+bx,wy+by,p,p);
        }
      }
    }
    // Wok handles
    ctx.fillStyle='#1a1a1a'; ctx.fillRect(wx-20,wy+20,20,8); ctx.fillRect(wx+100,wy+20,20,8);
    ctx.fillStyle='#333'; ctx.fillRect(wx-18,wy+22,16,4); ctx.fillRect(wx+102,wy+22,16,4);
    drawFill(wx+10,wy+30,80,40,50,currentDish.cookColor);
    // Char marks when cooking
    if(cooked>0){
      ctx.fillStyle='rgba(0,0,0,0.5)';
      ctx.fillRect(wx+5,wy+55,8,p); ctx.fillRect(wx+86,wy+55,8,p);
    }
    drawStove(wx+10,178,80,fireOn,currentDish.stoveColor);

  }else if(s==='tawa'){
    // Flat tawa pan
    const tx2=188,ty2=138;
    ctx.fillStyle='#2a2a2a'; ctx.fillRect(tx2-4,ty2+6,108,8);
    for(let bx=0;bx<100;bx+=p){
      ctx.fillStyle=bx<p*2||bx>p*23?'#2a2a2a':'#383838';
      ctx.fillRect(tx2+bx,ty2,p,p*2);
    }
    // Tawa handle
    ctx.fillStyle='#4a2a10'; ctx.fillRect(tx2+100,ty2-2,30,10);
    ctx.fillStyle='#6a4a28'; ctx.fillRect(tx2+102,ty2,26,6);
    // Sizzle fill
    if(potFill>0){
      const fw=Math.floor(potFill*92);
      ctx.fillStyle=currentDish.cookColor+'aa';
      ctx.fillRect(tx2+4,ty2-2,fw,p*2);
    }
    drawStove(tx2+10,178,80,fireOn,currentDish.stoveColor);

  }else if(s==='karahi'){
    // Same as wok for halwa puri but golden
    const kx=196,ky=105;
    for(let bx=0;bx<100;bx+=p){
      for(let by=0;by<60;by+=p){
        const cx2=bx-50,cy2=by-25;
        if(cx2*cx2/50/50+cy2*cy2/25/25<1 && cy2>-8){
          ctx.fillStyle='#3a3a4a'; ctx.fillRect(kx+bx,ky+by,p,p);
        }
      }
    }
    ctx.fillStyle='#2a2a3a'; ctx.fillRect(kx-18,ky+18,18,8); ctx.fillRect(kx+100,ky+18,18,8);
    drawFill(kx+10,ky+26,80,36,50,currentDish.cookColor);
    drawStove(kx+10,178,80,fireOn,currentDish.stoveColor);

  }else if(s==='pit'){
    // Mandi clay pit
    const px2=196,py2=100;
    // Pit opening
    ctx.fillStyle='#3a2210';
    for(let bx=0;bx<100;bx+=p){
      for(let by=0;by<80;by+=p){
        const cx2=bx-50,cy2=by-40;
        if(cx2*cx2/50/50+cy2*cy2/40/40<1){
          ctx.fillStyle=bx<p*5||bx>p*19?'#2a1808':'#3a2810';
          ctx.fillRect(px2+bx,py2+by,p,p);
        }
      }
    }
    // Pit rim
    ctx.fillStyle='#7a5a30'; ctx.fillRect(px2-4,py2+72,108,10);
    ctx.fillStyle='#9a7a50'; ctx.fillRect(px2-4,py2+68,108,6);
    // Fire in pit
    if(fireOn){
      [[220,145,'#ff6600'],[240,140,'#ff8800'],[255,148,'#ff4400'],[268,142,'#ffaa00']].forEach(([fx,fy,fc])=>{
        ctx.fillStyle=fc; ctx.fillRect(fx,fy,p*2,p*2);
      });
    }
    // Smoke
    drawFill(px2+10,py2+20,80,60,50,currentDish.cookColor);
    // Meat on spit
    if(added>4){
      ctx.fillStyle='#c86040'; ctx.fillRect(px2+20,py2+30,60,20);
      ctx.fillStyle='#e88060'; ctx.fillRect(px2+24,py2+34,52,12);
    }
  }

  // Steam particles
  steam.forEach(st=>{
    ctx.fillStyle=`rgba(255,255,255,${Math.max(0,st.a)})`;
    ctx.fillRect(st.x,st.y,p,p);
  });
}

function drawFill(x,y,w,h,radius,color){
  if(potFill<=0) return;
  const fillH=Math.floor(potFill*h*0.85);
  const fy=y+h-fillH;
  ctx.fillStyle=color;
  for(let bx=0;bx<w;bx+=PS){
    const cx2=bx-w/2;
    const maxH2=Math.sqrt(Math.max(0,1-cx2*cx2/(w/2)/(w/2)))*fillH;
    if(maxH2>0){ ctx.fillStyle=color; ctx.fillRect(x+bx,fy,PS,maxH2); }
  }
  ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.fillRect(x+4,fy,w-8,PS);
  if(catAnim==='stir'||catAnim==='cook'){
    ctx.fillStyle=color+'88';
    [x+8,x+w/2,x+w-16].forEach((bx,bi)=>{
      if((Date.now()/250+bi)%2<1) ctx.fillRect(bx,fy+PS,PS,PS);
    });
  }
}

function drawStove(x,y,w,on,col){
  ctx.fillStyle='#3a3a4a'; ctx.fillRect(x-6,y,w+12,10);
  ctx.fillStyle='#2a2a3a'; ctx.fillRect(x-2,y+2,w+4,6);
  if(on){
    ctx.fillStyle=col+'88'; ctx.fillRect(x,y-4,w,6);
    for(let fx=x+4;fx<x+w-4;fx+=10){
      ctx.fillStyle=col; ctx.fillRect(fx,y-3,6,3);
    }
  }
}

// ════════════════════════════════════
// DRAW CAT
// ════════════════════════════════════
function drawCat(){
  const cx=22,cy=100,p=PS*0.85;
  let oy=0;
  if(catAnim==='idle') oy=Math.sin(Date.now()*0.002)*2;
  if(catAnim==='happy'||catAnim==='cook') oy=Math.sin(catT*0.25)*5;

  const C={O:'#f5a840',o:'#d08020',L:'#f8c870',l:'#fce898',W:'#fff8f0',w:'#ffe8d8',
           P:'#e06888',p:'#c04868',B:'#2a1a08',H:'#f8f8f8',h:'#e8e8e8',R:'#cc3300'};
  [' HHHHHHHHH  ','HhhhhhhhhhH ','HhHHHHHHhH  ',
   'OO HhHHHHHHhH  ','oO  OOOOOOOOO  ','lO OOLLLLLLOO  ',
   'OO OLlllllLO   ','   OLlWwwlLO   ','   OLwBwBwLO   ',
   '   OLllPlLLO   ','   OLlpppLLO   ','   OOLlllLOO   ',
   '   OOOOOOOOO   ','  OOOOOOOOOOO  ','OOoOOOOOOoOO  ',
   'OoWOOHHHOWoO  ','  OOOHHHHHOOO  ','   OOHHHHHOOO  ',
   '   OOHHHHHOO   ','  OOO     OOO  ',
  ].forEach((row,gy)=>{
    for(let gx=0;gx<row.length;gx++){
      const ch=row[gx];
      if(!ch||ch===' ') continue;
      ctx.fillStyle=C[ch]||'#ff00ff';
      ctx.fillRect(cx+gx*p,cy+gy*p+oy,p,p);
    }
  });

  if(catAnim==='stir'||catAnim==='cook'){
    const sa=Math.sin(catT*0.15)*0.4;
    ctx.save(); ctx.translate(cx+15*p,cy+16*p); ctx.rotate(sa);
    ctx.fillStyle='#c87830'; ctx.fillRect(0,0,p,8*p);
    ctx.fillStyle='#a05820'; ctx.fillRect(-p,7*p,3*p,3*p);
    ctx.restore();
  }
}

// ════════════════════════════════════
// POUR ANIMATION
// ════════════════════════════════════
function drawPour(){
  if(!pour) return;
  const prog=pour.t/35;
  const ex=248,ey=148;
  const nx=pour.sx+(ex-pour.sx)*prog;
  const ny=pour.sy+(ey-pour.sy)*prog-Math.sin(prog*Math.PI)*80;
  const sc=0.55*(1-prog*0.4);
  const s=SPR[pour.ing.id];
  if(s) drawSpr(ctx,s,nx-8*PS*sc,ny-8*PS*sc,sc);
  if(pour.t%3===0){
    particles.push({x:nx,y:ny,vx:(Math.random()-.5)*1.5,vy:(Math.random()-.5)*1.5,
      life:12,maxLife:12,col:pour.col,sz:PS});
  }
  pour.t++;
  if(pour.t>=35){
    for(let i=0;i<10;i++){
      const a=(i/10)*Math.PI*2;
      particles.push({x:ex,y:ey,vx:Math.cos(a)*3,vy:Math.sin(a)*3-2,
        life:22,maxLife:22,col:pour.col,sz:PS});
    }
    for(let i=0;i<5;i++){
      steam.push({x:225+Math.random()*30,y:128+Math.random()*12,
        vy:-1-Math.random(),a:0.7,life:45});
    }
    pour=null;
  }
}

// ════════════════════════════════════
// PARTICLES
// ════════════════════════════════════
function tickParticles(){
  particles.forEach(p=>{
    ctx.fillStyle=p.col+(Math.floor((p.life/p.maxLife)*255).toString(16).padStart(2,'0'));
    ctx.fillRect(p.x,p.y,p.sz,p.sz);
    p.x+=p.vx; p.y+=p.vy; p.vy+=0.12; p.life--;
  });
  particles=particles.filter(p=>p.life>0);
  steam.forEach(s=>{s.y+=s.vy; s.a-=0.015; s.life--;});
  steam=steam.filter(s=>s.life>0&&s.a>0);
}

// ════════════════════════════════════
// GAME LOOP
// ════════════════════════════════════
function loop(){
  catT++;
  ctx.clearRect(0,0,CW,CH);
  drawBG();
  drawStation();
  drawCat();
  drawPour();
  tickParticles();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// ════════════════════════════════════
// PICK DISH
// ════════════════════════════════════
function pickDish(key){
  currentDish=DISHES[key];
  document.getElementById('dishscreen').style.display='none';
  document.getElementById('titleh1').textContent='🐱 '+currentDish.name;
  document.getElementById('proglbl').textContent=currentDish.name+' PROGRESS';
  document.getElementById('cookbtn').textContent=currentDish.cookLabel;
  added=0; cooked=0; phase='adding'; potFill=0;
  particles=[]; steam=[]; pour=null; catAnim='idle';
  clearMsgQueue();
  document.getElementById('progfill').style.width='0%';
  document.getElementById('cookbtn').disabled=true;
  document.getElementById('servebtn').style.display='none';
  setBubble('💡 '+currentDish.startFact,true);
  setTimeout(()=>setBubble('TAP INGREDIENTS TO ADD TO THE '+currentDish.name+'! '+currentDish.emoji,false),5000);
  buildTray();
}

// ════════════════════════════════════
// BUILD TRAY
// ════════════════════════════════════
function buildTray(){
  const tray=document.getElementById('tray');
  tray.innerHTML='';
  if(!currentDish) return;
  currentDish.ingredients.forEach((ing,i)=>{
    const slot=document.createElement('div');
    slot.className='slot'; slot.id='slot'+i;
    slot.onclick=()=>addIng(ing,i);

    const c=document.createElement('canvas');
    c.width=16*PS; c.height=16*PS;
    const cx2=c.getContext('2d');
    cx2.imageSmoothingEnabled=false;
    const s=SPR[ing.id];
    if(s){
      drawSpr(cx2,s,0,0,1);
    } else {
      // Fallback: colored square with first letter
      cx2.fillStyle='#3a6a8a';
      cx2.fillRect(8,8,48,48);
      cx2.fillStyle='#fff';
      cx2.font='bold 28px monospace';
      cx2.fillText(ing.name[0],18,46);
    }

    const lbl=document.createElement('span');
    lbl.textContent=ing.name;
    slot.appendChild(c); slot.appendChild(lbl);
    tray.appendChild(slot);
  });
}

// ════════════════════════════════════
// MESSAGE QUEUE — no more overlapping messages
// ════════════════════════════════════
let msgQueue=[];
let msgBusy=false;
let msgTimer=null;

function queueMsg(text, isFact, duration){
  msgQueue.push({text, isFact, duration});
  if(!msgBusy) processQueue();
}

function processQueue(){
  if(msgQueue.length===0){ msgBusy=false; return; }
  msgBusy=true;
  const msg=msgQueue.shift();
  setBubble(msg.text, msg.isFact);
  // Cat animation
  if(!msg.isFact){ catAnim='happy'; catT=0; setTimeout(()=>{ catAnim='idle'; },1100); }
  clearTimeout(msgTimer);
  msgTimer=setTimeout(()=>{ processQueue(); }, msg.duration);
}

function clearMsgQueue(){
  msgQueue=[];
  msgBusy=false;
  clearTimeout(msgTimer);
}

// ════════════════════════════════════
// ADD INGREDIENT
// ════════════════════════════════════
const pourCols={
  rice:'#e8e8b8',chicken:'#e89060',onion:'#e0b060',tomato:'#cc3300',
  yoghurt:'#f0f0d8',garlic:'#f0e8d0',ginger:'#d4aa40',spice:'#cc2200',
  saffron:'#ddaa00',herbs:'#44aa22',oil:'#ddbb44',wholespice:'#aa8844',
  salt:'#f0f0f0',lemon:'#f0e020',flour:'#e8e8d0',ghee:'#ffdd88',
  okra:'#44aa22',beef:'#a84030',butter:'#ffdd88',
};

function addIng(ing,idx){
  if(phase!=='adding') return;
  if(pour) return;
  const slot=document.getElementById('slot'+idx);
  if(!slot||slot.classList.contains('used')) return;
  slot.classList.add('used');

  const cr=gc.getBoundingClientRect();
  const sr=slot.getBoundingClientRect();
  const sx=(sr.left+24-cr.left)*(CW/cr.width);
  const sy=(sr.top+24-cr.top)*(CH/cr.height);
  pour={ing,sx,sy:Math.max(sy,-20),t:0,col:pourCols[ing.id]||'#ffaa44'};

  added++;
  potFill=Math.min(added/currentDish.ingredients.length,1);
  document.getElementById('progfill').style.width=(potFill*100)+'%';

  // Queue: shabash → fact → cat quote, each with its own display time
  const allFacts=[...currentDish.facts,
    'CATS SPEND 70% OF THEIR LIVES SLEEPING — LIVING THE DREAM! 😴',
    'A CAT\'S PURR VIBRATES AT 25-50 HZ — THE SAME FREQUENCY THAT HEALS BONES!',
    'CATS ONLY MEOW TO TALK TO HUMANS — NOT TO OTHER CATS! YOU\'RE SPECIAL!',
  ];
  const f=allFacts[Math.floor(Math.random()*allFacts.length)];
  const catMsg=CAT_MSGS[Math.floor(Math.random()*CAT_MSGS.length)];
  facts++; document.getElementById('sc_fact').textContent=facts;

  queueMsg('✅ SHABASH! '+ing.desc+' ADDED! 👏', false, 2500);
  queueMsg('💡 '+f, true, 6000);
  queueMsg(catMsg, false, 4000);

  if(added>=Math.ceil(currentDish.ingredients.length*0.5)){
    document.getElementById('cookbtn').disabled=false;
  }
  if(added>=currentDish.ingredients.length){
    phase='cooking';
    setTimeout(()=>setBubble('ALL INGREDIENTS IN! NOW '+currentDish.cookLabel+'! 🔥',false),1800);
  }
}

// ════════════════════════════════════
// COOK ACTION
// ════════════════════════════════════
function doCook(){
  cooked++;
  clearMsgQueue();
  const msg=currentDish.cookMsgs[Math.min(cooked-1,currentDish.cookMsgs.length-1)];
  queueMsg('🔥 '+msg, false, 3000);
  catAnim='cook'; catT=0;
  setTimeout(()=>{ catAnim='idle'; },1200);

  for(let i=0;i<8;i++){
    steam.push({x:220+Math.random()*40,y:128+Math.random()*12,vy:-1.5-Math.random(),a:0.75,life:55});
  }

  if(cooked>=currentDish.cookSteps && added>=currentDish.ingredients.length){
    phase='done';
    document.getElementById('cookbtn').disabled=true;
    document.getElementById('servebtn').style.display='block';
    clearMsgQueue();
    setTimeout(()=>queueMsg('🎉 '+currentDish.name+' IS READY! SERVE IT! 🍽',false,0),700);
  }
}

// ════════════════════════════════════
// SERVE
// ════════════════════════════════════
function doServe(){
  dishes++;
  document.getElementById('sc_dish').textContent=dishes;
  document.getElementById('servebtn').style.display='none';
  catAnim='happy';
  document.getElementById('dishnum').textContent='#'+dishes;
  document.getElementById('servetitle').textContent=currentDish.emoji+' '+currentDish.name+' SERVED!';
  document.getElementById('servescreen').style.display='flex';
  setTimeout(drawPlate,60);
  for(let i=0;i<30;i++){
    setTimeout(()=>{
      const ox=80+Math.random()*(CW-160),oy=30+Math.random()*150;
      const cols=['#ffcc44','#ff4444','#44ff88','#4488ff','#ff88ff','#fff'];
      for(let j=0;j<12;j++){
        const a=(j/12)*Math.PI*2;
        particles.push({x:ox,y:oy,
          vx:Math.cos(a)*4*(0.5+Math.random()),vy:Math.sin(a)*4*(0.5+Math.random())-1,
          life:45,maxLife:45,col:cols[Math.floor(Math.random()*cols.length)],sz:PS});
      }
    },i*100);
  }
}

function closeServe(){
  document.getElementById('servescreen').style.display='none';
  document.getElementById('dishscreen').style.display='flex';
  document.getElementById('ds_d').textContent=dishes;
  document.getElementById('ds_f').textContent=facts;
}

function goBack(){
  document.getElementById('dishscreen').style.display='flex';
  document.getElementById('ds_d').textContent=dishes;
  document.getElementById('ds_f').textContent=facts;
}

// ════════════════════════════════════
// DRAW PLATE (serve screen)
// ════════════════════════════════════
function drawPlate(){
  const pc=document.getElementById('platecanvas');
  const px=pc.getContext('2d');
  px.imageSmoothingEnabled=false;
  const W=160,H=120,P=4;
  px.clearRect(0,0,W,H);
  const col=currentDish.cookColor;

  // Plate
  for(let x=16;x<144;x+=P) for(let y=52;y<110;y+=P){
    const dx=x-80,dy=y-80;
    if(dx*dx/58/58+dy*dy/26/26<1){px.fillStyle='#cccccc';px.fillRect(x,y,P,P);}
  }
  for(let x=22;x<138;x+=P) for(let y=57;y<105;y+=P){
    const dx=x-80,dy=y-80;
    if(dx*dx/52/52+dy*dy/22/22<1){px.fillStyle='#f5f5f5';px.fillRect(x,y,P,P);}
  }

  // Food mound using dish color
  const c2=[col,col+'dd',col+'bb',col+'99'];
  for(let x=28;x<132;x+=P) for(let y=38;y<88;y+=P){
    const dx=x-80,dy=y-62;
    if(dx*dx/46/46+dy*dy/24/24<1){px.fillStyle=c2[((x+y)/P)%4];px.fillRect(x,y,P,P);}
  }

  // Toppings based on dish
  if(currentDish.name==='BIRYANI'||currentDish.name==='MANDI'){
    [[58,46],[86,42],[72,38],[100,48]].forEach(([cx,cy])=>{
      px.fillStyle='#c8604a';px.fillRect(cx,cy,12,10);
    });
    [[80,40],[92,44],[70,50]].forEach(([sx,sy])=>{px.fillStyle='#ff8800';px.fillRect(sx,sy,P,P);});
  }
  if(currentDish.name==='KARAHI'){
    [[60,44],[85,40],[100,46]].forEach(([cx,cy])=>{px.fillStyle='#c8604a';px.fillRect(cx,cy,10,8);});
    [[72,42],[90,38],[58,50]].forEach(([tx,ty])=>{px.fillStyle='#cc2200';px.fillRect(tx,ty,8,8);});
  }
  if(currentDish.name==='NIHARI'){
    [[55,44],[90,40],[72,36]].forEach(([bx,by])=>{px.fillStyle='#8b3a10';px.fillRect(bx,by,16,12);});
  }
  if(currentDish.name==='BHINDI FRY'){
    [[55,44],[70,40],[85,46],[100,42]].forEach(([ox,oy])=>{
      px.fillStyle='#2a7a20';px.fillRect(ox,oy,6,16);
      px.fillStyle='#4aaa40';px.fillRect(ox+P,oy,2,14);
    });
  }
  if(currentDish.name==='HALWA PURI'){
    // Puri circles
    [[60,50],[92,46]].forEach(([px2,py])=>{
      for(let x=px2-12;x<px2+12;x+=P) for(let y=py-8;y<py+8;y+=P){
        const d=(x-px2)*(x-px2)/144+(y-py)*(y-py)/64;
        if(d<1){px.fillStyle=d<0.5?'#f5e8a0':'#e0c870';px.fillRect(x,y,P,P);}
      }
    });
  }

  // Herbs on top
  [[50,42],[98,44],[74,38]].forEach(([gx,gy])=>{
    px.fillStyle='#44aa22';px.fillRect(gx,gy,8,P);
  });

  // Steam
  [64,80,96].forEach((sx,i)=>{
    px.fillStyle=`rgba(255,255,255,${0.4-i*0.05})`;
    px.fillRect(sx,18+i*4,P,18);px.fillRect(sx+P,12+i*4,P,14);
  });

  // Sparkles
  [[38,18],[122,14],[28,34],[132,28]].forEach(([sx,sy])=>{
    px.fillStyle='#ffcc44';
    px.fillRect(sx,sy,P,P);px.fillRect(sx-P,sy+P,P,P);px.fillRect(sx+P,sy+P,P,P);
  });
}

// ════════════════════════════════════
// BUBBLE HELPER
// ════════════════════════════════════
function setBubble(txt,isFact){
  document.getElementById('bubtxt').textContent=txt;
  const b=document.getElementById('bubwrap');
  b.className=isFact?'fact':'';
}

// ════════════════════════════════════
// INIT
// ════════════════════════════════════
document.getElementById('sc_dish').textContent=dishes;
document.getElementById('sc_fact').textContent=facts;