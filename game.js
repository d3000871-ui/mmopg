/* ==========================================================================
   SO'NMAS AFSUNA: MMORPG - GAME ENGINE & SYSTEM CORE
   ========================================================================== */

// --- 1. WEB AUDIO SYNTHESIZER (No external sound dependencies) ---
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
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
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
      osc.frequency.exponentialRampToValueAtTime(success ? 1760 : 80, this.ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
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
      const notes = [523.25, 659.25, 783.99, 1046.50];
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

// --- 2. GAME STATE DATA ---
const defaultHeroGear = [
  { id: 'wep1', type: 'weapon', name: 'Alvon Po\'lat Qilich', icon: '⚔️', level: 0, baseStat: 120, statName: 'ATK', equipped: true },
  { id: 'helm1', type: 'helmet', name: 'Samarqand Bahodir Dubulg\'asi', icon: '🪖', level: 0, baseStat: 60, statName: 'DEF', equipped: true },
  { id: 'armor1', type: 'armor', name: 'Zulmat Qoplon Sovuti', icon: '🛡️', level: 0, baseStat: 95, statName: 'DEF', equipped: true },
  { id: 'gloves1', type: 'gloves', name: 'Temir Jangchi Qo\'lqoplari', icon: '🧤', level: 0, baseStat: 45, statName: 'ATK', equipped: true },
  { id: 'boots1', type: 'boots', name: 'Shamol Tezlik Etiklari', icon: '🥾', level: 0, baseStat: 40, statName: 'DEF', equipped: true }
];

let gameState = {
  player: {
    name: 'DIYORBEK BAHODIR',
    class: 'warrior', // warrior, mage, archer
    level: 1,
    exp: 0,
    maxExp: 100,
    gold: 5000,
    diamonds: 100,
    hp: 1000,
    maxHp: 1000,
    mp: 300,
    maxMp: 300,
    baseAtk: 120,
    baseDef: 80,
    critRate: 15,
    speed: 1.2
  },
  stones: {
    common: 20,   // Enhancement Stone (+1 to +5)
    crimson: 8,   // Crimson Stone (+6 to +10)
    mythic: 3     // Mythic Gem (+11 to +15)
  },
  gear: [...defaultHeroGear],
  selectedForgeItemId: 'wep1',
  selectedStoneType: 'common',
  dailyRewards: [
    { day: 1, name: '10,000 Oltin', icon: '🪙', gold: 10000, dia: 0, stones: 0 },
    { day: 2, name: '500 Olmos', icon: '💎', gold: 0, dia: 500, stones: 0 },
    { day: 3, name: '15 ta Kuchaytirish Toshi', icon: '🔮', gold: 0, dia: 0, stones: 15 },
    { day: 4, name: 'Epik Samarqand Sovuti', icon: '🛡️', gold: 20000, dia: 200, stones: 10 },
    { day: 5, name: '1,500 Olmos + Oltin', icon: '👑', gold: 50000, dia: 1500, stones: 0 },
    { day: 6, name: '10 ta Alvon Tosh', icon: '✨', gold: 0, dia: 0, crimson: 10 },
    { day: 7, name: 'AFSONAVIY ZULMAT JAVOHIRI X5', icon: '🌟', gold: 200000, dia: 5000, mythic: 5 }
  ],
  claimedDays: [],
  promoClaimed: false,
  currentDungeon: 1
};

// --- DUNGEONS & MONSTERS DATA ---
const dungeonData = {
  1: { name: "Zulmat O'rmoni", mName: "Yovvoyi Goblin", mHp: 650, mAtk: 45, mExp: 40, mGold: 120, icon: "👺", color: "#4ade80" },
  2: { name: "Samarqand Yerosti Qal'asi", mName: "Zulmat Ritsari", mHp: 1600, mAtk: 110, mExp: 110, mGold: 350, icon: "👹", color: "#60a5fa" },
  3: { name: "Alvon Lava G'ori", mName: "Olovli Demon", mHp: 3800, mAtk: 240, mExp: 350, mGold: 950, icon: "🔥", color: "#f87171" },
  4: { name: "Zulmat Taxti", mName: "QADIMIY AJDAR BOSS", mHp: 12000, mAtk: 550, mExp: 1500, mGold: 4500, icon: "🐉", color: "#c084fc", isBoss: true }
};

let currentMonster = {
  name: "Yovvoyi Goblin",
  hp: 650,
  maxHp: 650,
  atk: 45,
  icon: "👺",
  color: "#4ade80"
};

// Skill Cooldowns State
let skillCooldowns = { 1: 0, 2: 0, 3: 0, 4: 0 };

// --- 3. SKILLS DEFINITION FOR HERO CLASSES ---
const classSkillSets = {
  warrior: [
    { id: 1, name: "Qilich Bo'roni", icon: "🌪️", cost: 30, cd: 3, mult: 2.2, desc: "Aylanma kuchli qilich zarbasi" },
    { id: 2, name: "Qalqon Zarbi", icon: "🛡️", cost: 25, cd: 5, mult: 1.8, desc: "Gangituvchi po'lat zarba" },
    { id: 3, name: "Berserk G'azabi", icon: "🩸", cost: 45, cd: 9, mult: 3.5, desc: "Qonli qudrat bilan 3.5x zarar" },
    { id: 4, name: "Yer Yurar Yoriq", icon: "⚡", cost: 80, cd: 14, mult: 6.5, desc: "Halokatli Ultimate qilich zarbasi" }
  ],
  mage: [
    { id: 1, name: "Olovli Meteor", icon: "☄️", cost: 35, cd: 3, mult: 2.5, desc: "Osmondan olovli tosh tushadi" },
    { id: 2, name: "Muzli Bo'ron", icon: "❄️", cost: 30, cd: 5, mult: 2.0, desc: "Muzlatuvchi bo'ron zarbasi" },
    { id: 3, name: "Sehrli Plazma", icon: "🔮", cost: 50, cd: 8, mult: 3.8, desc: "Konsentrlangan nur portlashi" },
    { id: 4, name: "Zulmat Supernovasi", icon: "🌌", cost: 90, cd: 15, mult: 7.2, desc: "Ekranni qoplovchi ulkan sehr" }
  ],
  archer: [
    { id: 1, name: "O'qlar Yomg'iri", icon: "🏹", cost: 30, cd: 3, mult: 2.3, desc: "Hududga yuzlab o'q yog'dirish" },
    { id: 2, name: "Mergan O'qi", icon: "🎯", cost: 25, cd: 5, mult: 3.0, desc: "Aniq va 100% kritik o'q" },
    { id: 3, name: "Soyali Nayza", icon: "🗡️", cost: 40, cd: 7, mult: 3.6, desc: "Zulmat o'qi bilan teshib o'tish" },
    { id: 4, name: "Feniks O'qi", icon: "🦅", cost: 85, cd: 13, mult: 6.8, desc: "Olovli afsonaviy Feniks qushi zarbasi" }
  ]
};

// --- 4. LOCAL STORAGE SAVE / LOAD ---
function saveGame() {
  try {
    localStorage.setItem('sonmas_afsuna_mmorpg_save', JSON.stringify(gameState));
  } catch (e) {}
}

function loadGame() {
  try {
    const saved = localStorage.getItem('sonmas_afsuna_mmorpg_save');
    if (saved) {
      const parsed = JSON.parse(saved);
      gameState = { ...gameState, ...parsed };
    }
  } catch (e) {}
}

// --- 5. INITIALIZATION & LOADING SCREEN FLOW ---
window.addEventListener('DOMContentLoaded', () => {
  loadGame();
  runLoadingScreen();
  setupCanvas();
  renderAllUI();

  // Cooldown & Monster attack interval
  setInterval(gameTick, 1000);
});

function runLoadingScreen() {
  const loadingBar = document.getElementById('loadingBar');
  const loadingStatus = document.getElementById('loadingStatus');
  const btnEnter = document.getElementById('btnEnterGame');
  const loadingTip = document.getElementById('loadingTip');

  const tips = [
    "Maslahat: DIYORBEK promokodini ishlatib darhol 100-daraja va TOP sovutlarga ega bo'ling!",
    "Maslahat: Alvon toshlar va Zulmat javohirlari qurollarni +15 gacha kuchaytiradi!",
    "Maslahat: Kamonchilar yuqori kritik zarbaga ega, Jodugarlar esa maydonli sehrlar sohibi!",
    "Maslahat: Har kuni o'yinga kirib 7 kunlik mukofotlarni olishni unutmang!"
  ];

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 14) + 6;
    if (progress > 100) progress = 100;

    loadingBar.style.width = progress + '%';
    loadingStatus.textContent = `O'yin resurslari yuklanmoqda... ${progress}%`;
    loadingTip.textContent = tips[Math.floor((progress / 30)) % tips.length];

    if (progress === 100) {
      clearInterval(interval);
      loadingStatus.textContent = "Server bilan aloqa o'rnatildi! O'yinga kirishga tayyor.";
      btnEnter.style.display = 'inline-block';
    }
  }, 120);
}

function startGameFlow() {
  sounds.init();
  sounds.playSwordSlash();

  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.add('hidden');

  // Check if first time or show story
  const storyScreen = document.getElementById('story-screen');
  storyScreen.classList.remove('hidden');
}

function enterGameAfterStory() {
  sounds.playMagicBlast();
  document.getElementById('story-screen').classList.add('hidden');
  document.getElementById('main-game').style.display = 'flex';
  spawnMonster(gameState.currentDungeon);
  renderAllUI();
  showToast("⚔️ Qahramon, maydonga xush kelibsiz! Zulmat kuchlariga qarshi jangga kiring!");
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

  // Highlight tab
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(btn => {
    if (btn.getAttribute('onclick')?.includes(viewName)) {
      btn.classList.add('active');
    }
  });

  if (viewName === 'forge') {
    renderForgeView();
  } else if (viewName === 'inventory') {
    renderInventoryView();
  } else if (viewName === 'daily') {
    renderDailyRewardsGrid();
  }
}

// --- 7. HERO CLASS SWITCHING ---
function changeHeroClass(newClass) {
  sounds.init();
  gameState.player.class = newClass;
  sounds.playMagicBlast();

  document.querySelectorAll('.class-btn').forEach(btn => btn.classList.remove('active'));
  if (newClass === 'warrior') {
    document.getElementById('btnClassWarrior').classList.add('active');
    document.getElementById('heroClassDisplay').textContent = "Ekshn Jangchi";
    document.getElementById('heroAvatarImg').src = "assets/main_hero.jpg";
    gameState.player.baseAtk = 120;
    gameState.player.baseDef = 80;
  } else if (newClass === 'mage') {
    document.getElementById('btnClassMage').classList.add('active');
    document.getElementById('heroClassDisplay').textContent = "Qudratli Jodugar";
    document.getElementById('heroAvatarImg').src = "assets/images (1).jpg";
    gameState.player.baseAtk = 160;
    gameState.player.baseDef = 55;
  } else if (newClass === 'archer') {
    document.getElementById('btnClassArcher').classList.add('active');
    document.getElementById('heroClassDisplay').textContent = "Mohir Kamonchi";
    document.getElementById('heroAvatarImg').src = "assets/images (2).jpg";
    gameState.player.baseAtk = 140;
    gameState.player.baseDef = 65;
  }

  calculatePlayerTotalStats();
  renderSkillsBar();
  renderHeroStats();
  saveGame();
  showToast(`Sinf almashtirildi: ${document.getElementById('heroClassDisplay').textContent}`);
}

// --- 8. STATS CALCULATION ---
function calculatePlayerTotalStats() {
  let bonusAtk = 0;
  let bonusDef = 0;

  gameState.gear.forEach(item => {
    if (item.equipped) {
      const enhanceMultiplier = 1 + (item.level * 0.25);
      const val = Math.round(item.baseStat * enhanceMultiplier);
      if (item.statName === 'ATK') bonusAtk += val;
      if (item.statName === 'DEF') bonusDef += val;
    }
  });

  gameState.player.totalAtk = gameState.player.baseAtk + (gameState.player.level * 25) + bonusAtk;
  gameState.player.totalDef = gameState.player.baseDef + (gameState.player.level * 15) + bonusDef;
  gameState.player.maxHp = 1000 + (gameState.player.level * 200) + (bonusDef * 8);
  gameState.player.maxMp = 300 + (gameState.player.level * 40);

  if (gameState.player.hp > gameState.player.maxHp) gameState.player.hp = gameState.player.maxHp;
  if (gameState.player.mp > gameState.player.maxMp) gameState.player.mp = gameState.player.maxMp;
}

// --- 9. RENDER FUNCTIONS ---
function renderAllUI() {
  calculatePlayerTotalStats();
  renderHeroStats();
  renderTopNav();
  renderSkillsBar();
  renderForgeView();
  renderInventoryView();
  renderDailyRewardsGrid();
}

function renderTopNav() {
  document.getElementById('navPlayerLevel').textContent = `LV. ${gameState.player.level}`;
  document.getElementById('navPlayerGold').textContent = gameState.player.gold.toLocaleString();
  document.getElementById('navPlayerDiamonds').textContent = gameState.player.diamonds.toLocaleString();
}

function renderHeroStats() {
  document.getElementById('heroNameDisplay').textContent = gameState.player.name;
  document.getElementById('heroLevelBadge').textContent = `LV. ${gameState.player.level}`;

  document.getElementById('heroHpText').textContent = `${gameState.player.hp} / ${gameState.player.maxHp}`;
  const hpPercent = Math.max(0, Math.min(100, (gameState.player.hp / gameState.player.maxHp) * 100));
  document.getElementById('heroHpBar').style.width = `${hpPercent}%`;

  document.getElementById('heroMpText').textContent = `${gameState.player.mp} / ${gameState.player.maxMp}`;
  const mpPercent = Math.max(0, Math.min(100, (gameState.player.mp / gameState.player.maxMp) * 100));
  document.getElementById('heroMpBar').style.width = `${mpPercent}%`;

  document.getElementById('heroExpText').textContent = `${gameState.player.exp} / ${gameState.player.maxExp}`;
  const expPercent = Math.max(0, Math.min(100, (gameState.player.exp / gameState.player.maxExp) * 100));
  document.getElementById('heroExpBar').style.width = `${expPercent}%`;

  document.getElementById('heroAtkStat').textContent = gameState.player.totalAtk;
  document.getElementById('heroDefStat').textContent = gameState.player.totalDef;
  document.getElementById('heroCritStat').textContent = `${gameState.player.critRate}%`;
  document.getElementById('heroSpeedStat').textContent = `${gameState.player.speed}x`;
}

function renderSkillsBar() {
  const container = document.getElementById('skillsContainer');
  container.innerHTML = '';

  const skills = classSkillSets[gameState.player.class];

  // Normal Attack button
  const normalBtn = document.createElement('button');
  normalBtn.className = 'skill-slot-btn';
  normalBtn.onclick = () => executeNormalAttack();
  normalBtn.innerHTML = `
    <div class="skill-icon">🗡️</div>
    <div class="skill-name">Zarba (Oddiy)</div>
    <div class="skill-cost">0 MP</div>
  `;
  container.appendChild(normalBtn);

  // Class 4 Skills
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

// --- 10. COMBAT SYSTEM & CANVAS ---
let canvas, ctx;
let combatParticles = [];

function setupCanvas() {
  canvas = document.getElementById('combatCanvas');
  if (canvas) {
    ctx = canvas.getContext('2d');
    requestAnimationFrame(renderCombatCanvas);
  }
}

function onSelectDungeon(dungId) {
  gameState.currentDungeon = parseInt(dungId);
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
  if (gameState.player.class === 'warrior') sounds.playSwordSlash();
  else if (gameState.player.class === 'mage') sounds.playMagicBlast();
  else sounds.playBowShot();

  // Attack Monster
  const isCrit = Math.random() * 100 < gameState.player.critRate;
  let dmg = Math.round(gameState.player.totalAtk * (isCrit ? 2.0 : 1.0) * (0.9 + Math.random() * 0.2));

  applyDamageToMonster(dmg, isCrit, "Oddiy Zarba");
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

  // Deduct mana
  gameState.player.mp -= skill.cost;
  skillCooldowns[skill.id] = skill.cd;

  if (gameState.player.class === 'mage') sounds.playMagicBlast();
  else if (gameState.player.class === 'archer') sounds.playBowShot();
  else sounds.playSwordSlash();

  const isCrit = Math.random() * 100 < gameState.player.critRate;
  let dmg = Math.round(gameState.player.totalAtk * skill.mult * (isCrit ? 2.2 : 1.0));

  createParticleBurst(canvas.width * 0.7, canvas.height * 0.5, skill.id === 4 ? 40 : 20);
  applyDamageToMonster(dmg, isCrit, skill.name);
  renderHeroStats();
  renderSkillsBar();
}

function applyDamageToMonster(dmg, isCrit, skillName) {
  currentMonster.hp -= dmg;
  if (currentMonster.hp < 0) currentMonster.hp = 0;

  spawnFloatingDamage(dmg, isCrit, false);
  addBattleLog(`⚔️ ${gameState.player.name} [${skillName}] orqali ${currentMonster.name}ga ${dmg} zarar yetkazdi! ${isCrit ? '💥 KRITIK!' : ''}`);

  if (currentMonster.hp === 0) {
    handleMonsterDefeat();
  }
}

function handleMonsterDefeat() {
  const dung = dungeonData[gameState.currentDungeon];
  const goldReward = Math.round(dung.mGold * (1 + Math.random() * 0.3));
  const expReward = dung.mExp;

  gameState.player.gold += goldReward;
  gameState.player.exp += expReward;
  sounds.playCoinSound();

  addBattleLog(`🎉 G'alaba! ${currentMonster.name} mag'lub etildi! +${goldReward} Oltin, +${expReward} EXP`);

  // Drop stones chance!
  const roll = Math.random();
  if (roll < 0.6) {
    gameState.stones.common += 2;
    addBattleLog(`💎 O'lja: +2 ta Oddiy Kuchaytirish Toshi tushdi!`, 'drop');
  }
  if (roll < 0.25) {
    gameState.stones.crimson += 1;
    addBattleLog(`🔮 Qimmatbaho O'lja: +1 ta Alvon Tosh tushdi!`, 'drop');
  }
  if (dung.isBoss && roll < 0.5) {
    gameState.stones.mythic += 1;
    addBattleLog(`🌟 AFSONAVIY O'LJA: +1 ta Zulmat Javohiri tushdi!`, 'drop');
  }

  // Level up check
  checkLevelUp();
  renderTopNav();
  renderHeroStats();
  saveGame();

  // Respawn monster
  setTimeout(() => {
    spawnMonster(gameState.currentDungeon);
  }, 1000);
}

function checkLevelUp() {
  while (gameState.player.exp >= gameState.player.maxExp && gameState.player.level < 100) {
    gameState.player.exp -= gameState.player.maxExp;
    gameState.player.level += 1;
    gameState.player.maxExp = Math.round(gameState.player.maxExp * 1.35);
    gameState.player.hp = gameState.player.maxHp;
    gameState.player.mp = gameState.player.maxMp;

    sounds.playGodModeFanfare();
    showToast(`🌟 TABRIKLAYMIZ! Siz ${gameState.player.level}-darajaga yetdingiz! Barcha parametrlar kuchaytirildi!`);
    addBattleLog(`🌟 LEVEL UP! Qahramon ${gameState.player.level}-darajaga ko'tarildi!`);
  }
}

function gameTick() {
  // Cooldown countdown
  let changed = false;
  for (let s in skillCooldowns) {
    if (skillCooldowns[s] > 0) {
      skillCooldowns[s]--;
      changed = true;
    }
  }
  if (changed) renderSkillsBar();

  // Natural Mana & HP recovery
  if (gameState.player.hp < gameState.player.maxHp) {
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + Math.round(gameState.player.maxHp * 0.02));
  }
  if (gameState.player.mp < gameState.player.maxMp) {
    gameState.player.mp = Math.min(gameState.player.maxMp, gameState.player.mp + Math.round(gameState.player.maxMp * 0.05));
  }
  renderHeroStats();

  // Monster attacks hero if alive
  if (currentMonster.hp > 0 && Math.random() < 0.45) {
    let mDmg = Math.max(10, Math.round(currentMonster.atk * (100 / (100 + gameState.player.totalDef))));
    gameState.player.hp -= mDmg;
    if (gameState.player.hp <= 0) {
      gameState.player.hp = gameState.player.maxHp;
      showToast("💀 Qahramon jarohatlandi va qayta jonlandi!");
      addBattleLog(`💀 ${currentMonster.name} sizga ${mDmg} zarba berdi. Qahramon qayta tiklandi.`);
    } else {
      spawnFloatingDamage(mDmg, false, true);
    }
    renderHeroStats();
  }
}

// Canvas Visual Loop
function renderCombatCanvas() {
  if (!ctx || !canvas) return;

  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background effects
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "rgba(10, 14, 25, 0.4)");
  gradient.addColorStop(1, "rgba(5, 7, 12, 0.85)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Floor Line
  ctx.strokeStyle = "rgba(255, 183, 3, 0.35)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height * 0.8);
  ctx.lineTo(canvas.width, canvas.height * 0.8);
  ctx.stroke();

  // Draw Hero (Left Side)
  const heroX = canvas.width * 0.22;
  const heroY = canvas.height * 0.72;

  // Hero Glow
  ctx.save();
  ctx.shadowColor = gameState.player.level >= 100 ? "#ffd166" : "#00f2fe";
  ctx.shadowBlur = 25;
  ctx.font = "75px serif";
  ctx.textAlign = "center";
  const heroIcon = gameState.player.class === 'warrior' ? '⚔️' : (gameState.player.class === 'mage' ? '🔮' : '🏹');
  ctx.fillText(heroIcon, heroX, heroY);
  ctx.restore();

  // Hero Name tag
  ctx.fillStyle = "#ffd166";
  ctx.font = "bold 15px Rajdhani";
  ctx.textAlign = "center";
  ctx.fillText(`LV.${gameState.player.level} ${gameState.player.name}`, heroX, heroY - 70);

  // Draw Monster (Right Side)
  const monX = canvas.width * 0.75;
  const monY = canvas.height * 0.72;

  if (currentMonster.hp > 0) {
    ctx.save();
    ctx.shadowColor = currentMonster.color;
    ctx.shadowBlur = currentMonster.isBoss ? 35 : 18;
    ctx.font = currentMonster.isBoss ? "95px serif" : "75px serif";
    ctx.textAlign = "center";
    ctx.fillText(currentMonster.icon, monX, monY);
    ctx.restore();

    // Monster HP Bar over head
    const barW = 120;
    const barH = 10;
    const barX = monX - barW / 2;
    const barY = monY - (currentMonster.isBoss ? 95 : 75);

    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(barX, barY, barW, barH);
    const mHpRatio = Math.max(0, currentMonster.hp / currentMonster.maxHp);
    ctx.fillStyle = currentMonster.isBoss ? "#ff0055" : "#e63946";
    ctx.fillRect(barX, barY, barW * mHpRatio, barH);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(barX, barY, barW, barH);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Rajdhani";
    ctx.fillText(currentMonster.name, monX, barY - 6);
  }

  // Draw Particles
  for (let i = combatParticles.length - 1; i >= 0; i--) {
    const p = combatParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.025;
    if (p.alpha <= 0) {
      combatParticles.splice(i, 1);
      continue;
    }
    ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(renderCombatCanvas);
}

function createParticleBurst(x, y, count = 25) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    combatParticles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 4 + 2,
      r: Math.floor(Math.random() * 155) + 100,
      g: Math.floor(Math.random() * 100) + 155,
      b: 255,
      alpha: 1
    });
  }
}

function spawnFloatingDamage(dmg, isCrit, isPlayer) {
  const wrapper = document.getElementById('arenaWrapper');
  if (!wrapper) return;

  const floater = document.createElement('div');
  floater.className = `damage-number ${isPlayer ? 'damage-player' : (isCrit ? 'damage-crit' : 'damage-normal')}`;
  floater.textContent = (isCrit ? '💥 ' : '') + dmg;

  floater.style.left = isPlayer ? '28%' : '72%';
  floater.style.top = '50%';

  wrapper.appendChild(floater);
  setTimeout(() => floater.remove(), 800);
}

function addBattleLog(msg, type = 'normal') {
  const logs = document.getElementById('battleLogs');
  if (!logs) return;
  const entry = document.createElement('div');
  entry.className = `log-entry ${type === 'drop' ? 'log-drop' : (type === 'crit' ? 'log-crit' : '')}`;
  entry.innerHTML = msg;
  logs.insertBefore(entry, logs.firstChild);
  if (logs.children.length > 20) logs.removeChild(logs.lastChild);
}

// --- 11. FORGE & ITEM UPGRADE SYSTEM (MAXSUS TOSHLAR YORDAMIDA KUCHAYTIRISH) ---
function renderForgeView() {
  document.getElementById('countCommonStones').textContent = `${gameState.stones.common} dona`;
  document.getElementById('countCrimsonStones').textContent = `${gameState.stones.crimson} dona`;
  document.getElementById('countMythicStones').textContent = `${gameState.stones.mythic} dona`;

  const gearListContainer = document.getElementById('forgeGearList');
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
    document.getElementById('forgeItemBadge').textContent = `+${selectedItem.level} DARAJA`;

    const nextStat = Math.round(selectedItem.baseStat * (1 + (selectedItem.level + 1) * 0.25));
    document.getElementById('forgeItemStats').textContent = `${selectedItem.statName}: +${Math.round(selectedItem.baseStat * (1 + selectedItem.level * 0.25))} ➔ Keyingi daraja: +${nextStat}`;

    // Success rate & cost
    let rate = 90 - (selectedItem.level * 5);
    if (selectedItem.level >= 10) rate = 35 - (selectedItem.level - 10) * 5;
    if (rate < 15) rate = 15;

    document.getElementById('forgeSuccessRate').textContent = `${rate}%`;
    const cost = (selectedItem.level + 1) * 600;
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

  if (item.level >= 15) {
    showToast("🌟 Ushbu ashyo MAKSIMAL +15 (MYTHIC GODLY) darajasiga yetgan!");
    return;
  }

  // Check Stone requirements
  let stoneReq = 'common';
  if (item.level >= 5 && item.level < 10) stoneReq = 'crimson';
  if (item.level >= 10) stoneReq = 'mythic';

  if (gameState.selectedStoneType !== stoneReq) {
    showToast(`⚠️ Ushbu +${item.level} daraja uchun [${stoneReq.toUpperCase()} TOSH] kerak!`);
    selectStoneType(stoneReq);
    return;
  }

  if (gameState.stones[stoneReq] <= 0) {
    showToast(`⚠️ Sizda yetarli ${stoneReq} tosh mavjud emas! Janglarda maxluqlarni yengib tosh to'plang.`);
    return;
  }

  const cost = (item.level + 1) * 600;
  if (gameState.player.gold < cost) {
    showToast("⚠️ Yetarli Oltin tanga yo'q!");
    return;
  }

  // Deduct
  gameState.player.gold -= cost;
  gameState.stones[stoneReq] -= 1;

  // Rate check
  let rate = 90 - (item.level * 5);
  if (item.level >= 10) rate = 35 - (item.level - 10) * 5;
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

// --- 12. INVENTORY VIEW ---
function renderInventoryView() {
  const equippedGrid = document.getElementById('equippedGrid');
  const allGrid = document.getElementById('allInventoryGrid');
  if (!equippedGrid || !allGrid) return;

  equippedGrid.innerHTML = '';
  allGrid.innerHTML = '';

  gameState.gear.forEach(item => {
    const card = document.createElement('div');
    card.className = `item-slot-card ${item.equipped ? 'equipped' : ''} ${item.level >= 15 ? 'mythic' : ''}`;
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

// --- 13. PROMO CODE "DIYORBEK" - GOD MODE ACTIVATION ---
function redeemPromoCode() {
  sounds.init();
  const input = document.getElementById('promoInput');
  const code = input.value.trim().toUpperCase();

  if (code === 'DIYORBEK') {
    // FUL PUL, LEVEL 100, TOP SOVUTLAR & QUROLLAR!
    gameState.player.level = 100;
    gameState.player.exp = 0;
    gameState.player.maxExp = 9999999;
    gameState.player.gold = 999999999;
    gameState.player.diamonds = 999999;

    // Stones 9999
    gameState.stones.common = 9999;
    gameState.stones.crimson = 9999;
    gameState.stones.mythic = 9999;

    // Top +15 Godly Gear
    gameState.gear = [
      { id: 'diyor_wep', type: 'weapon', name: 'DIYORBEK Xudolar Qilichi (+15 Afsonaviy)', icon: '⚔️', level: 15, baseStat: 15000, statName: 'ATK', equipped: true },
      { id: 'diyor_bow', type: 'weapon', name: 'DIYORBEK Bo\'ron Kamoni (+15 Afsonaviy)', icon: '🏹', level: 15, baseStat: 14500, statName: 'ATK', equipped: false },
      { id: 'diyor_staff', type: 'weapon', name: 'DIYORBEK Zulmat Hassasi (+15 Afsonaviy)', icon: '🔮', level: 15, baseStat: 16000, statName: 'ATK', equipped: false },
      { id: 'diyor_helm', type: 'helmet', name: 'DIYORBEK Imperator Dubulg\'asi (+15)', icon: '👑', level: 15, baseStat: 9500, statName: 'DEF', equipped: true },
      { id: 'diyor_armor', type: 'armor', name: 'DIYORBEK Ajdar Ko\'krak Sovuti (+15)', icon: '🛡️', level: 15, baseStat: 12000, statName: 'DEF', equipped: true },
      { id: 'diyor_gloves', type: 'gloves', name: 'DIYORBEK Oltin Qo\'lqoplari (+15)', icon: '🧤', level: 15, baseStat: 8000, statName: 'ATK', equipped: true },
      { id: 'diyor_boots', type: 'boots', name: 'DIYORBEK Shamol Etiklari (+15)', icon: '🥾', level: 15, baseStat: 7500, statName: 'DEF', equipped: true }
    ];

    gameState.promoClaimed = true;
    sounds.playGodModeFanfare();

    showToast("👑 DIYORBEK GOD-MODE PROMOKODI FAOLLASHTIRILDI! LEVEL 100, 999,999,999 OLTIN VA ENG TOP AFSONAVIY SOVUTLAR BERILDI!");
    addBattleLog("👑 [DIYORBEK] Promokodi ishlatildi: O'yinchi 100-darajaga yetdi va Xudo qurollariga ega bo'ldi!", 'crit');

    renderAllUI();
    saveGame();
    input.value = '';
  } else {
    showToast("❌ Noto'g'ri promokod! 'DIYORBEK' promokodini kiritib ko'ring.");
  }
}

// --- 14. SHOP & PAYMENT SIMULATOR (UZB SO'MDA) ---
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
  // Grant rewards
  gameState.player.diamonds += pendingPack.dia;
  gameState.player.gold += pendingPack.gold;
  gameState.stones.common += pendingPack.stones;
  gameState.stones.crimson += pendingPack.crimson;
  gameState.stones.mythic += pendingPack.mythic;

  showToast(`✅ To'lov muvaffaqiyatli amalga oshirildi (${currentPayProvider} orqali)! +${pendingPack.dia} Olmos, +${pendingPack.gold.toLocaleString()} Oltin hisobingizga qo'shildi!`);
  addBattleLog(`💳 Xarid: ${currentPayProvider} orqali ${pendingPack.priceSom.toLocaleString()} so'mlik ${pendingPack.title} sotib olindi.`);

  closePaymentModal();
  renderTopNav();
  renderForgeView();
  saveGame();
}

// --- 15. DAILY REWARDS ---
function renderDailyRewardsGrid() {
  const grid = document.getElementById('dailyRewardsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  gameState.dailyRewards.forEach((r, idx) => {
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

// --- 16. TOAST NOTIFICATION UTILITY ---
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'game-toast';
  toast.textContent = msg;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}
