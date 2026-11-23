/* ==========================================================================
   SO'NMAS AFSUNA: MMORPG - GAME ENGINE & SYSTEM CORE
   ========================================================================== */

// --- 1. WEB AUDIO SYNTHESIZER ---
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playSwordSlash() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (e) {}
  }

  playBloodSplatter() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playMagicBlast() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }

  playBowShot() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playAnvilStrike(success = true) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(success ? 880 : 200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(success ? 1760 : 70, this.ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }

  playWheelTick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playCoinSound() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }

  playGodModeFanfare() {
    if (!this.enabled || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.35, this.ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.12 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.12);
        osc.stop(this.ctx.currentTime + idx * 0.12 + 0.45);
      });
    } catch (e) {}
  }
}

const sounds = new SoundSystem();

// --- 2. 100 TA QAHRAMON VA UNVONLAR RO'YXATI (ENG OLIY: ALIY SARKARDA) ---
const HERO_RANKS_100 = [
  { rank: 1, title: "Oddiy Navkar", desc: "Boshlang'ich safdagi jangchi", avatar: "🛡️" },
  { rank: 2, title: "Yengil Kamonchi", desc: "Dastlabki nishon ustalari", avatar: "🏹" },
  { rank: 3, title: "Qalqondor Soqchi", desc: "Qal'a eshigi qo'riqchisi", avatar: "🗡️" },
  { rank: 5, title: "O'nlikboshi", desc: "O'n nafar jangchini boshqaruvchi", avatar: "⚔️" },
  { rank: 10, title: "Samarqand Qoravuli", desc: "Shaharni kechasi qo'riqlovchi sarboz", avatar: "🪖" },
  { rank: 15, title: "Buxoro Mohir Mergani", desc: "Uzoq masofali halokatli o'qchi", avatar: "🏹" },
  { rank: 20, title: "Yuzboshi Bahodir", desc: "Yuz kishilik otliq qo'shin boshlig'i", avatar: "🏇" },
  { rank: 25, title: "Po'lat Zirhli Ritsar", desc: "To'liq og'ir sovut kiygan pahlavon", avatar: "🛡️" },
  { rank: 30, title: "Turon Shonli Qilichbozi", desc: "Ikkala qo'lida Damashq qilichini o'ynatuvchi", avatar: "⚔️" },
  { rank: 40, title: "Qadimiy Olov Sehrgari", desc: "Olov bilan shahar devorlarini erituvchi", avatar: "🔮" },
  { rank: 50, title: "Mingboshi Jasur", desc: "Ming nafar askarning dovyurak yetakchisi", avatar: "👑" },
  { rank: 60, title: "Alvon Qon Botiri", desc: "Jang maydonida yuzlab dushmanni yenggan botir", avatar: "🩸" },
  { rank: 70, title: "Qal'a Bosh Qo'mondoni", desc: "Poytaxt istehkomlari himoyachisi", avatar: "🏰" },
  { rank: 80, title: "Afsonaviy Amir Bahodir", desc: "Shohlikning suyukli sarkardasi", avatar: "🎖️" },
  { rank: 90, title: "Zulmatni Yenguvchi Pahlavon", desc: "Iblislar ajdarini yakkama-yakka yenggan qahramon", avatar: "⚡" },
  { rank: 95, title: "Oliy Muzaffar Amir", desc: "Barcha viloyatlar qo'shinlari sardori", avatar: "🌟" },
  { rank: 99, title: "Turon Xalq Qahramoni", desc: "Ming yillik dostonlar bosh qahramoni", avatar: "🏆" },
  { rank: 100, title: "ALIY SARKARDA", desc: "ENG OLIY UNVON: Bosh Bosh Qo'mondon, Yengilmas Shohlik Qo'mondoni!", avatar: "👑" }
];

// Fill all 100 ranks seamlessly
function getRankInfoByLevel(level) {
  // Rank 1 to 100 calculated from Level (1 to 1000)
  let rankNum = Math.min(100, Math.max(1, Math.floor(level / 10) + 1));
  if (level >= 1000) rankNum = 100;

  if (rankNum === 100) {
    return { rank: 100, title: "ALIY SARKARDA", desc: "ENG OLIY MARTABA! Barcha qo'shinlar Oliy Bosh Qo'mondoni!", avatar: "👑" };
  }
  const found = HERO_RANKS_100.find(r => r.rank === rankNum);
  if (found) return found;

  return {
    rank: rankNum,
    title: `${rankNum}-Darajali Samarqand Sardori`,
    desc: `Shonli mamlakatning ${rankNum}-bosqichli pahlavoni`,
    avatar: rankNum > 50 ? "🎖️" : "⚔️"
  };
}

// --- 3. SOVUTLAR (MAX LEVEL: 100) ---
const defaultHeroGear = [
  { id: 'wep1', type: 'weapon', name: 'Damashq Po\'lat Qilichi', icon: '⚔️', level: 0, baseStat: 150, statName: 'ATK', equipped: true },
  { id: 'helm1', type: 'helmet', name: 'Samarqand Bahodir Dubulg\'asi', icon: '🪖', level: 0, baseStat: 80, statName: 'DEF', equipped: true },
  { id: 'armor1', type: 'armor', name: 'Po\'lat Ritsar Ko\'krak Sovuti', icon: '🛡️', level: 0, baseStat: 120, statName: 'DEF', equipped: true },
  { id: 'gloves1', type: 'gloves', name: 'Zanjirli Po\'lat Qo\'lqoplar', icon: '🧤', level: 0, baseStat: 60, statName: 'ATK', equipped: true },
  { id: 'boots1', type: 'boots', name: 'Pahlavon Temir Etiklari', icon: '🥾', level: 0, baseStat: 55, statName: 'DEF', equipped: true }
];

let gameState = {
  player: {
    name: 'DIYORBEK BAHODIR',
    class: 'warrior',
    level: 1, // Max: 1000
    exp: 0,
    maxExp: 100,
    gold: 10000,
    diamonds: 200,
    hp: 1200,
    maxHp: 1200,
    mp: 350,
    maxMp: 350,
    baseAtk: 140,
    baseDef: 90,
    critRate: 15,
    speed: 1.2
  },
  stones: {
    common: 25,   // +1 to +30
    crimson: 10,  // +31 to +70
    mythic: 5     // +71 to +100
  },
  gear: [...defaultHeroGear],
  selectedForgeItemId: 'wep1',
  selectedStoneType: 'common',
  dailyRewards: [
    { day: 1, name: '25,000 Oltin', icon: '🪙', gold: 25000, dia: 0, stones: 0 },
    { day: 2, name: '1,000 Olmos', icon: '💎', gold: 0, dia: 1000, stones: 0 },
    { day: 3, name: '30 ta Kuchaytirish Toshi', icon: '🔮', gold: 0, dia: 0, stones: 30 },
    { day: 4, name: 'Samarqand Zirhli Sovuti', icon: '🛡️', gold: 50000, dia: 500, stones: 20 },
    { day: 5, name: '3,000 Olmos + Oltin', icon: '👑', gold: 100000, dia: 3000, stones: 0 },
    { day: 6, name: '25 ta Alvon Tosh', icon: '✨', gold: 0, dia: 0, crimson: 25 },
    { day: 7, name: 'ALIY SARKARDA JAVOHIRLARI X10', icon: '🌟', gold: 500000, dia: 10000, mythic: 10 }
  ],
  claimedDays: [],
  promoClaimed: false,
  currentDungeon: 1
};

// Dungeons with Blood & Monster data
const dungeonData = {
  1: { name: "Qonli O'rmon", mName: "Yirtqich Goblin", mHp: 800, mAtk: 55, mExp: 50, mGold: 160, icon: "👺", color: "#4ade80" },
  2: { name: "Samarqand Yerosti Labirinti", mName: "Zulmat Qorovuli", mHp: 2200, mAtk: 140, mExp: 140, mGold: 450, icon: "👹", color: "#60a5fa" },
  3: { name: "Alvon Lava G'ori", mName: "Qonli Demon", mHp: 5200, mAtk: 320, mExp: 450, mGold: 1300, icon: "🔥", color: "#f87171" },
  4: { name: "Zulmat Taxti", mName: "GIGANT QONXO'R AJDAR", mHp: 18000, mAtk: 750, mExp: 2200, mGold: 6500, icon: "🐉", color: "#c084fc", isBoss: true }
};

let currentMonster = {
  name: "Yirtqich Goblin",
  hp: 800,
  maxHp: 800,
  atk: 55,
  icon: "👺",
  color: "#4ade80",
  isBoss: false
};

let skillCooldowns = { 1: 0, 2: 0, 3: 0, 4: 0 };

const classSkillSets = {
  warrior: [
    { id: 1, name: "Qilich Bo'roni", icon: "🌪️", cost: 30, cd: 3, mult: 2.2 },
    { id: 2, name: "Qalqon Zarbi", icon: "🛡️", cost: 25, cd: 5, mult: 1.8 },
    { id: 3, name: "Berserk Qoni", icon: "🩸", cost: 45, cd: 9, mult: 3.5 },
    { id: 4, name: "Yer Yurar Yoriq", icon: "⚡", cost: 80, cd: 14, mult: 6.5 }
  ],
  mage: [
    { id: 1, name: "Olovli Meteor", icon: "☄️", cost: 35, cd: 3, mult: 2.5 },
    { id: 2, name: "Muzli Bo'ron", icon: "❄️", cost: 30, cd: 5, mult: 2.0 },
    { id: 3, name: "Sehrli Plazma", icon: "🔮", cost: 50, cd: 8, mult: 3.8 },
    { id: 4, name: "Zulmat Supernovasi", icon: "🌌", cost: 90, cd: 15, mult: 7.2 }
  ],
  archer: [
    { id: 1, name: "O'qlar Yomg'iri", icon: "🏹", cost: 30, cd: 3, mult: 2.3 },
    { id: 2, name: "Mergan O'qi", icon: "🎯", cost: 25, cd: 5, mult: 3.0 },
    { id: 3, name: "Soyali Nayza", icon: "🗡️", cost: 40, cd: 7, mult: 3.6 },
    { id: 4, name: "Feniks O'qi", icon: "🦅", cost: 85, cd: 13, mult: 6.8 }
  ]
};

// --- 4. LOCAL STORAGE ---
function saveGame() {
  try {
    localStorage.setItem('sonmas_afsuna_mmorpg_save_v2', JSON.stringify(gameState));
  } catch (e) {}
}

function loadGame() {
  try {
    const saved = localStorage.getItem('sonmas_afsuna_mmorpg_save_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      gameState = { ...gameState, ...parsed };
    }
  } catch (e) {}
}

// --- 5. INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
  loadGame();
  runLoadingScreen();
  setupCanvas();
  setupLuckyWheel();
  renderAllUI();

  setInterval(gameTick, 1000);
});

function runLoadingScreen() {
  const loadingBar = document.getElementById('loadingBar');
  const loadingStatus = document.getElementById('loadingStatus');
  const btnEnter = document.getElementById('btnEnterGame');
  const loadingTip = document.getElementById('loadingTip');

  const tips = [
    "Maslahat: Sovutlar +100 gacha kuchayadi! Har bir daraja po'lat mudofaani oshiradi.",
    "Maslahat: Donat to'lovlari rasmiy 9860080186988947 kartasiga o'tkaziladi.",
    "Maslahat: DIYORBEK promokodi bilan darhol 100-daraja va +100 Aliy Sarkarda sovutlariga ega bo'lasiz!",
    "Maslahat: 100-darajadan keyin 1000-darajagacha ko'tarilish haqiqiy qahramonlik sinovidir!"
  ];

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 6;
    if (progress > 100) progress = 100;

    loadingBar.style.width = progress + '%';
    loadingStatus.textContent = `Mamlakat qal'alari va resurslari yuklanmoqda... ${progress}%`;
    loadingTip.textContent = tips[Math.floor((progress / 28)) % tips.length];

    if (progress === 100) {
      clearInterval(interval);
      loadingStatus.textContent = "Server bilan aloqa o'rnatildi! Samarqandga kirishga tayyor.";
      btnEnter.style.display = 'inline-block';
    }
  }, 110);
}

function startGameFlow() {
  sounds.init();
  sounds.playSwordSlash();
  document.getElementById('loading-screen').classList.add('hidden');
  document.getElementById('story-screen').classList.remove('hidden');
}

function enterGameAfterStory() {
  sounds.playMagicBlast();
  document.getElementById('story-screen').classList.add('hidden');
  document.getElementById('main-game').style.display = 'flex';
  spawnMonster(gameState.currentDungeon);
  renderAllUI();
  showToast("⚔️ Mamlakatga xush kelibsiz! Aliy Sarkarda tojini qo'lga kiritish uchun jangga kiring!");
}

function openStoryModal() {
  document.getElementById('story-screen').classList.remove('hidden');
}

// --- 6. NAVIGATION & TABS ---
function switchView(viewName) {
  sounds.playSwordSlash();
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.game-view').forEach(view => view.classList.remove('active'));

  const viewEl = document.getElementById(`view-${viewName}`);
  if (viewEl) viewEl.classList.add('active');

  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(btn => {
    if (btn.getAttribute('onclick')?.includes(viewName)) {
      btn.classList.add('active');
    }
  });

  if (viewName === 'forge') renderForgeView();
  else if (viewName === 'inventory') renderInventoryView();
  else if (viewName === 'heroes') render100HeroesView();
  else if (viewName === 'daily') renderDailyRewardsGrid();
  else if (viewName === 'wheel') drawWheel();
}

// --- 7. HERO CLASS SWITCHING ---
function changeHeroClass(newClass) {
  sounds.init();
  gameState.player.class = newClass;
  sounds.playMagicBlast();

  document.querySelectorAll('.class-btn').forEach(btn => btn.classList.remove('active'));
  if (newClass === 'warrior') {
    document.getElementById('btnClassWarrior').classList.add('active');
    document.getElementById('heroClassDisplay').textContent = "Po'lat Jangchi";
    document.getElementById('heroAvatarImg').src = "assets/main_hero.jpg";
    gameState.player.baseAtk = 150;
    gameState.player.baseDef = 95;
  } else if (newClass === 'mage') {
    document.getElementById('btnClassMage').classList.add('active');
    document.getElementById('heroClassDisplay').textContent = "Qadimiy Jodugar";
    document.getElementById('heroAvatarImg').src = "assets/images (1).jpg";
    gameState.player.baseAtk = 190;
    gameState.player.baseDef = 65;
  } else if (newClass === 'archer') {
    document.getElementById('btnClassArcher').classList.add('active');
    document.getElementById('heroClassDisplay').textContent = "Mergan Kamonchi";
    document.getElementById('heroAvatarImg').src = "assets/images (2).jpg";
    gameState.player.baseAtk = 170;
    gameState.player.baseDef = 75;
  }

  calculatePlayerTotalStats();
  renderSkillsBar();
  renderHeroStats();
  saveGame();
  showToast(`Sinf almashtirildi: ${document.getElementById('heroClassDisplay').textContent}`);
}

// --- 8. STATS CALCULATION WITH HARDCORE LEVEL (1 - 1000) ---
function calculatePlayerTotalStats() {
  let bonusAtk = 0;
  let bonusDef = 0;

  // Gear bonus up to +100
  gameState.gear.forEach(item => {
    if (item.equipped) {
      const enhanceMultiplier = 1 + (item.level * 0.25);
      const val = Math.round(item.baseStat * enhanceMultiplier);
      if (item.statName === 'ATK') bonusAtk += val;
      if (item.statName === 'DEF') bonusDef += val;
    }
  });

  // Level stats scaling: Level 1 - 1000
  const lvl = gameState.player.level;
  gameState.player.totalAtk = gameState.player.baseAtk + (lvl * 30) + bonusAtk;
  gameState.player.totalDef = gameState.player.baseDef + (lvl * 20) + bonusDef;
  gameState.player.maxHp = 1200 + (lvl * 250) + (bonusDef * 10);
  gameState.player.maxMp = 350 + (lvl * 50);

  if (gameState.player.hp > gameState.player.maxHp) gameState.player.hp = gameState.player.maxHp;
  if (gameState.player.mp > gameState.player.maxMp) gameState.player.mp = gameState.player.maxMp;
}

// --- 9. RENDER ALL UI ---
function renderAllUI() {
  calculatePlayerTotalStats();
  renderHeroStats();
  renderTopNav();
  renderSkillsBar();
  renderForgeView();
  renderInventoryView();
  render100HeroesView();
  renderDailyRewardsGrid();
  drawWheel();
}

function renderTopNav() {
  const lvl = gameState.player.level;
  document.getElementById('navPlayerLevel').textContent = `LV. ${lvl}`;
  document.getElementById('navPlayerGold').textContent = gameState.player.gold.toLocaleString();
  document.getElementById('navPlayerDiamonds').textContent = gameState.player.diamonds.toLocaleString();

  const rankInfo = getRankInfoByLevel(lvl);
  document.getElementById('navTitleText').textContent = rankInfo.title;

  const badgeEl = document.getElementById('navTitleBadge');
  if (rankInfo.rank === 100) {
    badgeEl.style.background = 'linear-gradient(135deg, #ffd166, #ff0055)';
    badgeEl.style.boxShadow = '0 0 20px rgba(255, 209, 102, 1)';
  }
}

function renderHeroStats() {
  const lvl = gameState.player.level;
  document.getElementById('heroNameDisplay').textContent = gameState.player.name;
  document.getElementById('heroLevelBadge').textContent = `LV. ${lvl}`;

  const rankInfo = getRankInfoByLevel(lvl);
  document.getElementById('heroRankTitle').textContent = `Unvon: ${rankInfo.title}`;

  document.getElementById('heroHpText').textContent = `${gameState.player.hp} / ${gameState.player.maxHp}`;
  const hpPercent = Math.max(0, Math.min(100, (gameState.player.hp / gameState.player.maxHp) * 100));
  document.getElementById('heroHpBar').style.width = `${hpPercent}%`;

  document.getElementById('heroMpText').textContent = `${gameState.player.mp} / ${gameState.player.maxMp}`;
  const mpPercent = Math.max(0, Math.min(100, (gameState.player.mp / gameState.player.maxMp) * 100));
  document.getElementById('heroMpBar').style.width = `${mpPercent}%`;

  document.getElementById('heroExpText').textContent = `${gameState.player.exp} / ${gameState.player.maxExp}`;
  const expPercent = Math.max(0, Math.min(100, (gameState.player.exp / gameState.player.maxExp) * 100));
  document.getElementById('heroExpBar').style.width = `${expPercent}%`;

  document.getElementById('heroAtkStat').textContent = gameState.player.totalAtk.toLocaleString();
  document.getElementById('heroDefStat').textContent = gameState.player.totalDef.toLocaleString();
  document.getElementById('heroCritStat').textContent = `${gameState.player.critRate}%`;
  document.getElementById('heroSpeedStat').textContent = `${gameState.player.speed}x`;
}

function renderSkillsBar() {
  const container = document.getElementById('skillsContainer');
  container.innerHTML = '';

  const skills = classSkillSets[gameState.player.class];

  // Normal Attack
  const normalBtn = document.createElement('button');
  normalBtn.className = 'skill-slot-btn';
  normalBtn.onclick = () => executeNormalAttack();
  normalBtn.innerHTML = `
    <div class="skill-icon">🗡️</div>
    <div class="skill-name">Zarba (Oddiy)</div>
    <div class="skill-cost">0 MP</div>
  `;
  container.appendChild(normalBtn);

  // 4 Skills
  skills.forEach(skill => {
    const btn = document.createElement('button');
    btn.className = `skill-slot-btn ${skillCooldowns[skill.id] > 0 ? 'on-cd' : ''}`;
    btn.id = `skillBtn_${skill.id}`;
    btn.onclick = () => executeSkillAttack(skill);

    btn.innerHTML = `
      <div class="skill-icon">${skill.icon}</div>
      <div class="skill-name">${skill.name}</div>
      <div class="skill-cost">${skill.cost} MP</div>
      <div class="skill-cd-overlay" id="skillCd_${skill.id}">${skillCooldowns[skill.id]}s</div>
    `;
    container.appendChild(btn);
  });
}

// --- 10. REALISTIC COMBAT & REAL BLOOD SYSTEM (CANVAS) ---
let combatCanvas, combatCtx;
let bloodParticles = [];
let bloodPuddles = [];

function setupCanvas() {
  combatCanvas = document.getElementById('combatCanvas');
  if (combatCanvas) {
    combatCtx = combatCanvas.getContext('2d');
    requestAnimationFrame(renderCombatLoop);
  }
}

function onSelectDungeon(dungId) {
  gameState.currentDungeon = parseInt(dungId);
  bloodPuddles = []; // Clear old blood on dungeon change
  spawnMonster(gameState.currentDungeon);
  saveGame();
}

function spawnMonster(dungId) {
  const data = dungeonData[dungId] || dungeonData[1];
  currentMonster = {
    name: data.mName,
    hp: data.mHp,
    maxHp: data.mHp,
    atk: data.mAtk,
    icon: data.icon,
    color: data.color,
    isBoss: !!data.isBoss
  };
  addBattleLog(`🛡️ Maydonga yangi dushman chiqdi: [${currentMonster.name}] (HP: ${currentMonster.maxHp})`);
}

function executeNormalAttack() {
  sounds.init();
  sounds.playSwordSlash();
  sounds.playBloodSplatter();

  const isCrit = Math.random() * 100 < gameState.player.critRate;
  let dmg = Math.round(gameState.player.totalAtk * (isCrit ? 2.0 : 1.0) * (0.9 + Math.random() * 0.2));

  // Blood splatter on monster location
  createBloodSplatter(combatCanvas.width * 0.75, combatCanvas.height * 0.65, isCrit ? 35 : 20);
  applyDamageToMonster(dmg, isCrit, "Qilich Zarbi");
}

function executeSkillAttack(skill) {
  sounds.init();
  if (skillCooldowns[skill.id] > 0) {
    showToast(`⏳ Mahorat sovumoqda: ${skillCooldowns[skill.id]}s`);
    return;
  }
  if (gameState.player.mp < skill.cost) {
    showToast("⚠️ Yetarli Mana yo'q!");
    return;
  }

  gameState.player.mp -= skill.cost;
  skillCooldowns[skill.id] = skill.cd;

  if (gameState.player.class === 'mage') sounds.playMagicBlast();
  else if (gameState.player.class === 'archer') sounds.playBowShot();
  else sounds.playSwordSlash();

  sounds.playBloodSplatter();

  const isCrit = Math.random() * 100 < gameState.player.critRate;
  let dmg = Math.round(gameState.player.totalAtk * skill.mult * (isCrit ? 2.2 : 1.0));

  // Heavy blood spray for skills
  createBloodSplatter(combatCanvas.width * 0.75, combatCanvas.height * 0.65, skill.id === 4 ? 60 : 35);
  applyDamageToMonster(dmg, isCrit, skill.name);
  renderHeroStats();
  renderSkillsBar();
}

function applyDamageToMonster(dmg, isCrit, skillName) {
  currentMonster.hp -= dmg;
  if (currentMonster.hp < 0) currentMonster.hp = 0;

  spawnFloatingDamage(dmg, isCrit, false);
  addBattleLog(`🩸 ${gameState.player.name} [${skillName}] bilan ${currentMonster.name}ga og'ir jarohat berdi (-${dmg} HP)!`, 'blood');

  if (currentMonster.hp === 0) {
    handleMonsterDefeat();
  }
}

function handleMonsterDefeat() {
  const dung = dungeonData[gameState.currentDungeon];
  const goldReward = Math.round(dung.mGold * (1 + Math.random() * 0.35));
  const expReward = dung.mExp;

  gameState.player.gold += goldReward;
  gameState.player.exp += expReward;
  sounds.playCoinSound();

  addBattleLog(`🎉 G'ALABA! ${currentMonster.name} qonga belanib yer tishladi! +${goldReward} Oltin, +${expReward} EXP`);

  // Drop stones
  const roll = Math.random();
  if (roll < 0.65) {
    gameState.stones.common += 3;
    addBattleLog(`💎 O'lja: +3 ta Kuchaytirish Toshi tushdi!`, 'drop');
  }
  if (roll < 0.3) {
    gameState.stones.crimson += 2;
    addBattleLog(`🔮 Qimmatbaho O'lja: +2 ta Alvon Tosh tushdi!`, 'drop');
  }
  if (dung.isBoss && roll < 0.6) {
    gameState.stones.mythic += 1;
    addBattleLog(`🌟 AFSONAVIY O'LJA: +1 ta Zulmat Javohiri tushdi!`, 'drop');
  }

  checkLevelUp();
  renderTopNav();
  renderHeroStats();
  saveGame();

  setTimeout(() => {
    spawnMonster(gameState.currentDungeon);
  }, 1000);
}

// 1000-DARAJA TIZIMI: 1-100 O'RTACHA, 101-1000 JUDA QIYIN (HARDCORE EXP)
function checkLevelUp() {
  while (gameState.player.exp >= gameState.player.maxExp && gameState.player.level < 1000) {
    gameState.player.exp -= gameState.player.maxExp;
    gameState.player.level += 1;

    // Hardcore exponential EXP after level 100
    if (gameState.player.level <= 100) {
      gameState.player.maxExp = Math.round(gameState.player.maxExp * 1.35);
    } else {
      // 100 dan yuqoriga ko'tarilish keskin qiyinlashadi!
      gameState.player.maxExp = Math.round(gameState.player.maxExp * 1.85) + (gameState.player.level * 500);
    }

    gameState.player.hp = gameState.player.maxHp;
    gameState.player.mp = gameState.player.maxMp;

    sounds.playGodModeFanfare();
    const rank = getRankInfoByLevel(gameState.player.level);
    showToast(`🌟 TABRIKLAYMIZ! Siz ${gameState.player.level}-darajaga yetdingiz! Yangi unvon: [${rank.title}]`);
    addBattleLog(`🌟 DARAXA OSHDI! Qahramon ${gameState.player.level}-darajaga ko'tarildi! Unvon: ${rank.title}`, 'crit');
  }
}

function gameTick() {
  // Cooldown timer
  let changed = false;
  for (let s in skillCooldowns) {
    if (skillCooldowns[s] > 0) {
      skillCooldowns[s]--;
      changed = true;
    }
  }
  if (changed) renderSkillsBar();

  // Natural recovery
  if (gameState.player.hp < gameState.player.maxHp) {
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + Math.round(gameState.player.maxHp * 0.02));
  }
  if (gameState.player.mp < gameState.player.maxMp) {
    gameState.player.mp = Math.min(gameState.player.maxMp, gameState.player.mp + Math.round(gameState.player.maxMp * 0.05));
  }
  renderHeroStats();

  // Monster attack with blood effect on Hero
  if (currentMonster.hp > 0 && Math.random() < 0.45) {
    let mDmg = Math.max(15, Math.round(currentMonster.atk * (120 / (120 + gameState.player.totalDef))));
    gameState.player.hp -= mDmg;

    // Blood screen overlay flash
    triggerBloodScreenFlash();
    sounds.playBloodSplatter();
    createBloodSplatter(combatCanvas.width * 0.25, combatCanvas.height * 0.65, 18);

    if (gameState.player.hp <= 0) {
      gameState.player.hp = gameState.player.maxHp;
      showToast("💀 Qahramon og'ir jarohat oldi va pahlavonlar qonuni bilan qayta jonlandi!");
      addBattleLog(`💀 ${currentMonster.name} jarohat yetkazdi. Qahramon qayta tiklandi.`);
    } else {
      spawnFloatingDamage(mDmg, false, true);
    }
    renderHeroStats();
  }
}

function triggerBloodScreenFlash() {
  const overlay = document.getElementById('blood-screen-overlay');
  if (overlay) {
    overlay.classList.add('bleeding');
    setTimeout(() => overlay.classList.remove('bleeding'), 350);
  }
}

// REALISTIC BLOOD PHYSICS & DROPLETS
function createBloodSplatter(x, y, count = 25) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 3;
    bloodParticles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2, // Slight upward arc
      gravity: 0.35,
      size: Math.random() * 5 + 2,
      color: Math.random() > 0.3 ? '#8a0303' : '#ba0000',
      alpha: 1
    });
  }

  // Create puddle on floor
  if (bloodPuddles.length < 50) {
    bloodPuddles.push({
      x: x + (Math.random() * 40 - 20),
      y: combatCanvas.height * 0.82 + (Math.random() * 15 - 5),
      rx: Math.random() * 16 + 8,
      ry: Math.random() * 6 + 3,
      alpha: 0.75
    });
  }
}

// COMBAT RENDERING LOOP (REALISTIC HUMAN WARRIOR & BLOOD)
function renderCombatLoop() {
  if (!combatCtx || !combatCanvas) return;

  combatCtx.clearRect(0, 0, combatCanvas.width, combatCanvas.height);

  // Background Mamlakat Qal'asi
  const gradient = combatCtx.createLinearGradient(0, 0, 0, combatCanvas.height);
  gradient.addColorStop(0, "rgba(20, 10, 25, 0.5)");
  gradient.addColorStop(1, "rgba(5, 7, 12, 0.9)");
  combatCtx.fillStyle = gradient;
  combatCtx.fillRect(0, 0, combatCanvas.width, combatCanvas.height);

  // Ground Line
  const floorY = combatCanvas.height * 0.82;
  combatCtx.strokeStyle = "rgba(255, 183, 3, 0.4)";
  combatCtx.lineWidth = 3;
  combatCtx.beginPath();
  combatCtx.moveTo(0, floorY);
  combatCtx.lineTo(combatCanvas.width, floorY);
  combatCtx.stroke();

  // Draw Blood Puddles on Floor
  bloodPuddles.forEach(p => {
    combatCtx.save();
    combatCtx.fillStyle = `rgba(138, 3, 3, ${p.alpha})`;
    combatCtx.beginPath();
    combatCtx.ellipse(p.x, p.y, p.rx, p.ry, 0, 0, Math.PI * 2);
    combatCtx.fill();
    combatCtx.restore();
  });

  // DRAW REAL HUMAN WARRIOR FIGURE (ODAM SHAKLIDAGI JANGCHI VA SOVUTLAR)
  const heroX = combatCanvas.width * 0.25;
  const heroY = floorY - 20;

  drawHumanWarrior(combatCtx, heroX, heroY, gameState.player.class, gameState.player.level);

  // DRAW MONSTER FIGURE
  const monX = combatCanvas.width * 0.75;
  const monY = floorY - 30;

  if (currentMonster.hp > 0) {
    combatCtx.save();
    combatCtx.shadowColor = currentMonster.color;
    combatCtx.shadowBlur = currentMonster.isBoss ? 40 : 20;
    combatCtx.font = currentMonster.isBoss ? "105px serif" : "80px serif";
    combatCtx.textAlign = "center";
    combatCtx.fillText(currentMonster.icon, monX, monY);
    combatCtx.restore();

    // Monster HP Bar & Name
    const barW = 140;
    const barH = 12;
    const barX = monX - barW / 2;
    const barY = monY - (currentMonster.isBoss ? 100 : 80);

    combatCtx.fillStyle = "rgba(0,0,0,0.75)";
    combatCtx.fillRect(barX, barY, barW, barH);
    const mHpRatio = Math.max(0, currentMonster.hp / currentMonster.maxHp);
    combatCtx.fillStyle = currentMonster.isBoss ? "#ba0000" : "#ff0055";
    combatCtx.fillRect(barX, barY, barW * mHpRatio, barH);
    combatCtx.strokeStyle = "#ffd166";
    combatCtx.strokeRect(barX, barY, barW, barH);

    combatCtx.fillStyle = "#fff";
    combatCtx.font = "bold 15px Rajdhani";
    combatCtx.fillText(currentMonster.name, monX, barY - 6);
  }

  // DRAW FLYING BLOOD DROPLETS
  for (let i = bloodParticles.length - 1; i >= 0; i--) {
    const p = bloodParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.alpha -= 0.02;

    if (p.alpha <= 0 || p.y >= floorY + 10) {
      bloodParticles.splice(i, 1);
      continue;
    }

    combatCtx.save();
    combatCtx.fillStyle = p.color;
    combatCtx.beginPath();
    combatCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    combatCtx.fill();
    combatCtx.restore();
  }

  requestAnimationFrame(renderCombatLoop);
}

// ODAM SHAKLIDAGI REALISTIK JANGCHI CHIZISH (HEAD, ARMOR, SWORD/BOW)
function drawHumanWarrior(ctx, x, y, heroClass, level) {
  ctx.save();

  // Head / Helmet
  ctx.fillStyle = level >= 100 ? "#ffd166" : "#cbd5e1";
  ctx.beginPath();
  ctx.arc(x, y - 90, 18, 0, Math.PI * 2);
  ctx.fill();

  // Dubulg'a qosh qismi / Zirh
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(x - 12, y - 96, 24, 8);

  // Ko'krak Po'lat Sovuti (Torso Armor)
  ctx.fillStyle = level >= 100 ? "#b45309" : "#475569";
  ctx.fillRect(x - 20, y - 72, 40, 48);

  // Oltin/Kumush naqshlar
  ctx.strokeStyle = level >= 100 ? "#ffd166" : "#94a3b8";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 18, y - 70, 36, 44);

  // Oyoqlar va Temir Etiklar
  ctx.fillStyle = "#334155";
  ctx.fillRect(x - 18, y - 24, 14, 28);
  ctx.fillRect(x + 4, y - 24, 14, 28);

  // Qo'llar va Qurol
  ctx.fillStyle = "#64748b";
  ctx.fillRect(x - 28, y - 68, 10, 35);
  ctx.fillRect(x + 18, y - 68, 10, 35);

  // Qurol: Qilich / Hassa / Kamon
  if (heroClass === 'warrior') {
    // Qilich
    ctx.strokeStyle = level >= 100 ? "#ff0055" : "#e2e8f0";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x + 22, y - 35);
    ctx.lineTo(x + 48, y - 85);
    ctx.stroke();

    // Dasta
    ctx.fillStyle = "#ffd166";
    ctx.fillRect(x + 16, y - 40, 12, 12);
  } else if (heroClass === 'archer') {
    // Kamon
    ctx.strokeStyle = "#ffd166";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x + 30, y - 55, 30, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
  } else {
    // Jodugarlik Hassasi
    ctx.strokeStyle = "#9d4edd";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x + 24, y - 20);
    ctx.lineTo(x + 30, y - 105);
    ctx.stroke();
    // Shisha nur
    ctx.fillStyle = "#00f2fe";
    ctx.beginPath();
    ctx.arc(x + 30, y - 108, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // Name and Rank
  ctx.fillStyle = level >= 100 ? "#ffd166" : "#fff";
  ctx.font = "bold 15px Rajdhani";
  ctx.textAlign = "center";
  const rank = getRankInfoByLevel(level);
  ctx.fillText(`LV.${level} ${rank.title}`, x, y - 120);

  ctx.restore();
}

function spawnFloatingDamage(dmg, isCrit, isPlayer) {
  const wrapper = document.getElementById('arenaWrapper');
  if (!wrapper) return;

  const floater = document.createElement('div');
  floater.className = `damage-number ${isPlayer ? 'damage-player' : (isCrit ? 'damage-crit' : 'damage-normal')}`;
  floater.textContent = (isCrit ? '💥 ' : '') + dmg.toLocaleString();

  floater.style.left = isPlayer ? '26%' : '74%';
  floater.style.top = '50%';

  wrapper.appendChild(floater);
  setTimeout(() => floater.remove(), 800);
}

function addBattleLog(msg, type = 'normal') {
  const logs = document.getElementById('battleLogs');
  if (!logs) return;
  const entry = document.createElement('div');
  entry.className = `log-entry ${type === 'drop' ? 'log-drop' : (type === 'crit' ? 'log-crit' : (type === 'blood' ? 'log-blood' : ''))}`;
  entry.innerHTML = msg;
  logs.insertBefore(entry, logs.firstChild);
  if (logs.children.length > 25) logs.removeChild(logs.lastChild);
}

// --- 11. AYLANADIGAN BARABAN (LUCKY FORTUNE WHEEL) ---
let wheelCanvas, wheelCtx;
let wheelAngle = 0;
let isSpinning = false;

const WHEEL_SECTORS = [
  { text: "50,000 🪙", type: "gold", val: 50000, color: "#1e293b" },
  { text: "15 ta Tosh 💎", type: "stone", val: 15, color: "#0f766e" },
  { text: "500 💎 Olmos", type: "dia", val: 500, color: "#7c3aed" },
  { text: "100,000 🪙", type: "gold", val: 100000, color: "#1e293b" },
  { text: "10 ta Alvon 🔮", type: "crimson", val: 10, color: "#be123c" },
  { text: "1,500 💎 Olmos", type: "dia", val: 1500, color: "#9333ea" },
  { text: "250,000 🪙", type: "gold", val: 250000, color: "#1e293b" },
  { text: "ALIY SARKARDA 👑", type: "mythic", val: 3, color: "#b45309" }
];

function setupLuckyWheel() {
  wheelCanvas = document.getElementById('wheelCanvas');
  if (wheelCanvas) {
    wheelCtx = wheelCanvas.getContext('2d');
    drawWheel();
  }
}

function drawWheel() {
  if (!wheelCtx || !wheelCanvas) return;

  const numSectors = WHEEL_SECTORS.length;
  const arc = (Math.PI * 2) / numSectors;
  const cx = wheelCanvas.width / 2;
  const cy = wheelCanvas.height / 2;
  const r = cx - 10;

  wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

  for (let i = 0; i < numSectors; i++) {
    const angle = wheelAngle + i * arc;
    wheelCtx.save();
    wheelCtx.beginPath();
    wheelCtx.fillStyle = WHEEL_SECTORS[i].color;
    wheelCtx.moveTo(cx, cy);
    wheelCtx.arc(cx, cy, r, angle, angle + arc);
    wheelCtx.lineTo(cx, cy);
    wheelCtx.fill();
    wheelCtx.strokeStyle = "#ffd166";
    wheelCtx.lineWidth = 2;
    wheelCtx.stroke();

    // Text on slice
    wheelCtx.translate(cx, cy);
    wheelCtx.rotate(angle + arc / 2);
    wheelCtx.textAlign = "right";
    wheelCtx.fillStyle = "#fff";
    wheelCtx.font = "bold 13px Rajdhani";
    wheelCtx.fillText(WHEEL_SECTORS[i].text, r - 20, 5);
    wheelCtx.restore();
  }

  // Center gold pin
  wheelCtx.save();
  wheelCtx.beginPath();
  wheelCtx.arc(cx, cy, 28, 0, Math.PI * 2);
  wheelCtx.fillStyle = "#ffd166";
  wheelCtx.fill();
  wheelCtx.strokeStyle = "#fff";
  wheelCtx.lineWidth = 3;
  wheelCtx.stroke();
  wheelCtx.fillStyle = "#111";
  wheelCtx.font = "bold 12px Cinzel";
  wheelCtx.textAlign = "center";
  wheelCtx.fillText("OMAD", cx, cy + 4);
  wheelCtx.restore();
}

function spinLuckyWheel() {
  if (isSpinning) return;
  sounds.init();

  const cost = 1000;
  if (gameState.player.gold < cost) {
    showToast("⚠️ Barabanni aylantirish uchun kamida 1,000 Oltin kerak!");
    return;
  }

  gameState.player.gold -= cost;
  renderTopNav();

  isSpinning = true;
  document.getElementById('btnSpinWheel').disabled = true;

  const spinRounds = Math.floor(Math.random() * 4) + 5;
  const randomExtra = Math.random() * Math.PI * 2;
  const targetRotation = wheelAngle + (spinRounds * Math.PI * 2) + randomExtra;

  let startSpeed = 0.35;
  let currentSpeed = startSpeed;

  const spinInterval = setInterval(() => {
    wheelAngle += currentSpeed;
    drawWheel();
    sounds.playWheelTick();

    currentSpeed *= 0.985;
    if (currentSpeed < 0.005) {
      clearInterval(spinInterval);
      isSpinning = false;
      document.getElementById('btnSpinWheel').disabled = false;

      // Determine winning sector (pointer is at Top = 3*PI/2)
      const numSectors = WHEEL_SECTORS.length;
      const arc = (Math.PI * 2) / numSectors;
      // Normalizing angle
      let normalized = (Math.PI * 1.5 - (wheelAngle % (Math.PI * 2))) % (Math.PI * 2);
      if (normalized < 0) normalized += Math.PI * 2;
      const index = Math.floor(normalized / arc) % numSectors;

      giveWheelReward(WHEEL_SECTORS[index]);
    }
  }, 20);
}

function giveWheelReward(reward) {
  sounds.playGodModeFanfare();

  if (reward.type === 'gold') gameState.player.gold += reward.val;
  else if (reward.type === 'dia') gameState.player.diamonds += reward.val;
  else if (reward.type === 'stone') gameState.stones.common += reward.val;
  else if (reward.type === 'crimson') gameState.stones.crimson += reward.val;
  else if (reward.type === 'mythic') gameState.stones.mythic += reward.val;

  showToast(`🎉 OMAD KULIB BOQDI! Siz barabandan yutib oldingiz: [${reward.text}]!`);
  addBattleLog(`🎰 Omad Barabani: [${reward.text}] yutib olindi!`, 'drop');

  renderTopNav();
  saveGame();
}

// --- 12. 100 TA QAHRAMON VA UNVONLAR KO'RINISHI ---
function render100HeroesView() {
  const container = document.getElementById('heroes100Grid');
  if (!container) return;
  container.innerHTML = '';

  const playerLvl = gameState.player.level;

  for (let i = 1; i <= 100; i++) {
    const card = document.createElement('div');
    const isUnlocked = playerLvl >= i * 10 || (i === 1) || (i === 100 && playerLvl >= 1000);
    const isSupreme = i === 100;

    card.className = `hero-type-card ${isSupreme ? 'supreme' : (isUnlocked ? 'unlocked' : '')}`;

    let title = `${i}-Amir Navkar`;
    let desc = `Talab qilinadigan daraja: LV.${i * 10}`;
    let avatar = i > 70 ? "👑" : (i > 30 ? "⚔️" : "🛡️");

    if (i === 1) { title = "Oddiy Navkar"; desc = "Boshlang'ich jangchi"; avatar = "🛡️"; }
    else if (i === 100) { title = "ALIY SARKARDA"; desc = "ENG OLIY UNVON (LV. 1000)"; avatar = "👑"; }
    else {
      const match = HERO_RANKS_100.find(r => r.rank === i);
      if (match) {
        title = match.title;
        desc = match.desc;
        avatar = match.avatar;
      }
    }

    card.innerHTML = `
      <div class="hero-type-rank-num">#${i}</div>
      <div class="hero-type-avatar">${avatar}</div>
      <div class="hero-type-title" style="color:${isSupreme ? '#ffd166' : '#fff'};">${title}</div>
      <div class="hero-type-desc">${desc}</div>
      <div style="font-size:0.75rem; margin-top:8px; font-weight:bold; color:${isUnlocked ? '#06d6a0' : '#64748b'};">
        ${isUnlocked ? 'ERISHILDI ✓' : 'QULFLANGAN 🔒'}
      </div>
    `;

    container.appendChild(card);
  }
}

// --- 13. FORGE & ITEM UPGRADE SYSTEM (+100 GACHA KUCHAYTIRISH) ---
function renderForgeView() {
  document.getElementById('countCommonStones').textContent = `${gameState.stones.common} dona`;
  document.getElementById('countCrimsonStones').textContent = `${gameState.stones.crimson} dona`;
  document.getElementById('countMythicStones').textContent = `${gameState.stones.mythic} dona`;

  const gearListContainer = document.getElementById('forgeGearList');
  if (!gearListContainer) return;
  gearListContainer.innerHTML = '';

  gameState.gear.forEach(item => {
    const card = document.createElement('div');
    card.className = `gear-card ${gameState.selectedForgeItemId === item.id ? 'selected' : ''}`;
    card.onclick = () => selectGearForForge(item.id);

    card.innerHTML = `
      <div class="gear-card-level">+${item.level}</div>
      <div class="gear-card-icon">${item.icon}</div>
      <div class="gear-card-name">${item.name}</div>
      <div style="font-size:0.75rem; color:#ffd166;">${item.statName}: +${Math.round(item.baseStat * (1 + item.level * 0.25))}</div>
    `;
    gearListContainer.appendChild(card);
  });

  const selectedItem = gameState.gear.find(g => g.id === gameState.selectedForgeItemId) || gameState.gear[0];
  if (selectedItem) {
    document.getElementById('forgeItemIcon').textContent = selectedItem.icon;
    document.getElementById('forgeItemName').textContent = selectedItem.name;
    document.getElementById('forgeItemBadge').textContent = `+${selectedItem.level} / +100 DARAJA`;

    const nextStat = Math.round(selectedItem.baseStat * (1 + (selectedItem.level + 1) * 0.25));
    document.getElementById('forgeItemStats').textContent = `${selectedItem.statName}: +${Math.round(selectedItem.baseStat * (1 + selectedItem.level * 0.25))} ➔ Keyingi daraja (+${selectedItem.level + 1}): +${nextStat}`;

    let rate = 95 - Math.floor(selectedItem.level * 0.85);
    if (rate < 15) rate = 15;

    document.getElementById('forgeSuccessRate').textContent = `${rate}%`;
    const cost = (selectedItem.level + 1) * 800;
    document.getElementById('forgeCostGold').textContent = `${cost.toLocaleString()} 🪙`;
  }
}

function selectGearForForge(itemId) {
  sounds.playSwordSlash();
  gameState.selectedForgeItemId = itemId;
  renderForgeView();
}

function selectStoneType(type) {
  sounds.playSwordSlash();
  gameState.selectedStoneType = type;
  document.querySelectorAll('.stone-card').forEach(c => c.classList.remove('active'));
  if (type === 'common') document.getElementById('stoneCardCommon').classList.add('active');
  if (type === 'crimson') document.getElementById('stoneCardCrimson').classList.add('active');
  if (type === 'mythic') document.getElementById('stoneCardMythic').classList.add('active');
}

function performItemEnhance() {
  sounds.init();
  const item = gameState.gear.find(g => g.id === gameState.selectedForgeItemId);
  if (!item) return;

  if (item.level >= 100) {
    showToast("🌟 Ushbu ashyo MAKSIMAL +100 (ALIY SARKARDA GODLY) darajasiga yetgan!");
    return;
  }

  // Stone tier check up to 100
  let stoneReq = 'common';
  if (item.level >= 30 && item.level < 70) stoneReq = 'crimson';
  if (item.level >= 70) stoneReq = 'mythic';

  if (gameState.selectedStoneType !== stoneReq) {
    showToast(`⚠️ Ushbu +${item.level} daraja uchun [${stoneReq.toUpperCase()} TOSH] kerak!`);
    selectStoneType(stoneReq);
    return;
  }

  if (gameState.stones[stoneReq] <= 0) {
    showToast(`⚠️ Sizda yetarli ${stoneReq} tosh mavjud emas! Omad Barabani yoki Janglarda tosh to'plang.`);
    return;
  }

  const cost = (item.level + 1) * 800;
  if (gameState.player.gold < cost) {
    showToast("⚠️ Yetarli Oltin tanga yo'q!");
    return;
  }

  gameState.player.gold -= cost;
  gameState.stones[stoneReq] -= 1;

  let rate = 95 - Math.floor(item.level * 0.85);
  if (rate < 15) rate = 15;

  const roll = Math.random() * 100;
  if (roll <= rate) {
    item.level += 1;
    sounds.playAnvilStrike(true);
    showToast(`🎉 MUVAFFAQIYAT! [${item.name}] endi +${item.level} darajaga ko'tarildi!`);
  } else {
    sounds.playAnvilStrike(false);
    showToast(`❌ OMADSIZLIK! Bolg'a zarbasi sirg'anib ketdi. Tosh yo'qotildi.`);
  }

  calculatePlayerTotalStats();
  renderTopNav();
  renderHeroStats();
  renderForgeView();
  saveGame();
}

// --- 14. INVENTORY VIEW ---
function renderInventoryView() {
  const equippedGrid = document.getElementById('equippedGrid');
  const allGrid = document.getElementById('allInventoryGrid');
  if (!equippedGrid || !allGrid) return;

  equippedGrid.innerHTML = '';
  allGrid.innerHTML = '';

  gameState.gear.forEach(item => {
    const card = document.createElement('div');
    card.className = `item-slot-card ${item.equipped ? 'equipped' : ''} ${item.level >= 100 ? 'mythic' : ''}`;
    const statVal = Math.round(item.baseStat * (1 + item.level * 0.25));

    card.innerHTML = `
      <div class="item-icon-lg">${item.icon}</div>
      <div class="item-title">${item.name} <span style="color:#ff0055;">+${item.level}</span></div>
      <div class="item-stat-txt">${item.statName}: +${statVal}</div>
      <div style="font-size:0.8rem; color:${item.equipped ? '#06d6a0' : '#8b9bb4'}; margin-top:8px;">
        ${item.equipped ? 'KIYILGAN ✓' : 'ZAXIRADA'}
      </div>
    `;

    if (item.equipped) {
      equippedGrid.appendChild(card);
    } else {
      allGrid.appendChild(card);
    }
  });
}

// --- 15. PROMO CODE "DIYORBEK" - GOD MODE (LEVEL 100, FUL PUL & +100 SOVUTLAR) ---
function redeemPromoCode() {
  sounds.init();
  const input = document.getElementById('promoInput');
  const code = input.value.trim().toUpperCase();

  if (code === 'DIYORBEK') {
    gameState.player.level = 100;
    gameState.player.exp = 0;
    gameState.player.maxExp = 50000;
    gameState.player.gold = 999999999;
    gameState.player.diamonds = 999999;

    gameState.stones.common = 9999;
    gameState.stones.crimson = 9999;
    gameState.stones.mythic = 9999;

    // +100 ALIY SARKARDA GODLY SOVUTLARI
    gameState.gear = [
      { id: 'diyor_wep', type: 'weapon', name: 'ALIY SARKARDA Xudolar Qilichi (+100)', icon: '⚔️', level: 100, baseStat: 25000, statName: 'ATK', equipped: true },
      { id: 'diyor_bow', type: 'weapon', name: 'ALIY SARKARDA Feniks Kamoni (+100)', icon: '🏹', level: 100, baseStat: 24000, statName: 'ATK', equipped: false },
      { id: 'diyor_staff', type: 'weapon', name: 'ALIY SARKARDA Nur Hassasi (+100)', icon: '🔮', level: 100, baseStat: 26000, statName: 'ATK', equipped: false },
      { id: 'diyor_helm', type: 'helmet', name: 'ALIY SARKARDA Oltin Toj Dubulg\'asi (+100)', icon: '👑', level: 100, baseStat: 15000, statName: 'DEF', equipped: true },
      { id: 'diyor_armor', type: 'armor', name: 'ALIY SARKARDA Ritsar Zirhi (+100)', icon: '🛡️', level: 100, baseStat: 20000, statName: 'DEF', equipped: true },
      { id: 'diyor_gloves', type: 'gloves', name: 'ALIY SARKARDA Po\'lat Qo\'lqoplari (+100)', icon: '🧤', level: 100, baseStat: 12000, statName: 'ATK', equipped: true },
      { id: 'diyor_boots', type: 'boots', name: 'ALIY SARKARDA Pahlavon Etiklari (+100)', icon: '🥾', level: 100, baseStat: 11000, statName: 'DEF', equipped: true }
    ];

    gameState.promoClaimed = true;
    sounds.playGodModeFanfare();

    showToast("👑 DIYORBEK GOD-MODE KODI FAOLLASHTIRILDI! LEVEL 100, 999,999,999 OLTIN VA +100 ALIY SARKARDA SOVUTLARI BERILDI!");
    addBattleLog("👑 [DIYORBEK] Promokodi ishlatildi: O'yinchi 100-darajaga yetdi va +100 Aliy Sarkarda qurollari bilan qurollandi!", 'crit');

    renderAllUI();
    saveGame();
    input.value = '';
  } else {
    showToast("❌ Noto'g'ri promokod! 'DIYORBEK' promokodini kiritib ko'ring.");
  }
}

// --- 16. DONATE CARD NUSXALASH VA TO'LOV (KARTA: 9860080186988947) ---
function copyDonateCardNumber() {
  const cardNum = "9860080186988947";
  if (navigator.clipboard) {
    navigator.clipboard.writeText(cardNum).then(() => {
      showToast("📋 Donat karta raqami (9860080186988947) buferga nusxalandi!");
    }).catch(() => {
      fallbackCopyText(cardNum);
    });
  } else {
    fallbackCopyText(cardNum);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  showToast("📋 Donat karta raqami (9860080186988947) buferga nusxalandi!");
}

let pendingPack = null;
let currentPayProvider = 'Payme';

function openPaymentModal(title, priceSom, dia, gold, stones, crimson = 0, mythic = 0) {
  pendingPack = { title, priceSom, dia, gold, stones, crimson, mythic };
  document.getElementById('modalPackTitle').textContent = `Paket: ${title}`;
  document.getElementById('modalPackPrice').textContent = `${priceSom.toLocaleString()} SO'M`;
  document.getElementById('paymentModal').classList.remove('hidden');
}

function closePaymentModal() {
  document.getElementById('paymentModal').classList.add('hidden');
  pendingPack = null;
}

function selectPayProvider(name) {
  currentPayProvider = name;
  document.querySelectorAll('.pay-provider-btn').forEach(btn => btn.classList.remove('active'));
  if (name === 'Payme') document.getElementById('btnPayme').classList.add('active');
  if (name === 'Click') document.getElementById('btnClick').classList.add('active');
  if (name === 'Uzum Bank') document.getElementById('btnUzum').classList.add('active');
}

function confirmPaymentProcess() {
  if (!pendingPack) return;

  sounds.playCoinSound();
  gameState.player.diamonds += pendingPack.dia;
  gameState.player.gold += pendingPack.gold;
  gameState.stones.common += pendingPack.stones;
  gameState.stones.crimson += pendingPack.crimson;
  gameState.stones.mythic += pendingPack.mythic;

  showToast(`✅ To'lov 9860080186988947 kartaga tasdiqlandi (${currentPayProvider})! +${pendingPack.dia} Olmos, +${pendingPack.gold.toLocaleString()} Oltin qo'shildi!`);
  addBattleLog(`💳 Donat: 9860080186988947 kartasiga ${pendingPack.priceSom.toLocaleString()} so'mlik ${pendingPack.title} sotib olindi.`);

  closePaymentModal();
  renderTopNav();
  renderForgeView();
  saveGame();
}

// --- 17. DAILY REWARDS ---
function renderDailyRewardsGrid() {
  const grid = document.getElementById('dailyRewardsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  gameState.dailyRewards.forEach((r) => {
    const isClaimed = gameState.claimedDays.includes(r.day);
    const card = document.createElement('div');
    card.className = `daily-day-card ${isClaimed ? 'claimed' : 'available'}`;

    card.innerHTML = `
      <div class="day-badge">${r.day}-KUN</div>
      <div class="day-reward-icon">${r.icon}</div>
      <div class="day-reward-name">${r.name}</div>
    `;
    grid.appendChild(card);
  });

  const btnClaim = document.getElementById('btnClaimDaily');
  if (gameState.claimedDays.length >= 7) {
    btnClaim.disabled = true;
    btnClaim.textContent = "BARCHA 7 KUNLIK SOVG'ALAR OLINDI ✓";
  } else {
    btnClaim.disabled = false;
    btnClaim.textContent = `${gameState.claimedDays.length + 1}-KUNLIK SOVG'ANI OLISH 🎁`;
  }
}

function claimDailyReward() {
  sounds.init();
  const nextDay = gameState.claimedDays.length + 1;
  if (nextDay > 7) {
    showToast("Siz barcha kunlik sovg'alarni olgansiz!");
    return;
  }

  const reward = gameState.dailyRewards[nextDay - 1];
  gameState.claimedDays.push(nextDay);

  if (reward.gold) gameState.player.gold += reward.gold;
  if (reward.dia) gameState.player.diamonds += reward.dia;
  if (reward.stones) gameState.stones.common += reward.stones;
  if (reward.crimson) gameState.stones.crimson += reward.crimson;
  if (reward.mythic) gameState.stones.mythic += reward.mythic;

  sounds.playCoinSound();
  showToast(`🎁 ${nextDay}-kun sovg'asi qabul qilindi: ${reward.name}!`);
  addBattleLog(`🎁 Kunlik Sovg'a: ${reward.name} qo'lga kiritildi!`);

  renderAllUI();
  saveGame();
}

// --- 18. TOAST NOTIFICATION UTILITY ---
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'game-toast';
  toast.textContent = msg;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4500);
}
