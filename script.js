const IDIOM_DATA = window.IDIOM_BANK;

if (!IDIOM_DATA) {
  if (window.__bootLog) {
    window.__bootLog("[boot] IDIOM_BANK missing before script bootstrap");
  }
  throw new Error("IDIOM_BANK is not loaded. Please include idiom-bank.js before script.js.");
}

const DEFAULT_CONFIG = {
  roundSize: 8,
  countdownMs: 10000,
  features: {
    enableFunnyOption: true,
    showIdiomImage: false
  }
};

const APP_CONFIG = resolveGameConfig(window.GAME_CONFIG);

const LEVEL_LABEL = {
  basic: "基礎",
  advanced: "進階",
  master: "高級"
};

const SINGLE_KEYS = ["A", "S", "D", "F"];
const DUEL_KEYS_P1 = ["A", "S", "D", "F"];
const DUEL_KEYS_P2 = ["J", "K", "L", ";"];

const state = {
  screen: "home",
  mode: "single",
  level: "basic",
  questions: [],
  index: 0,
  roundSize: APP_CONFIG.roundSize,
  countdownMs: APP_CONFIG.countdownMs,
  deadline: 0,
  timerId: null,
  lastSecond: null,
  pendingResolve: false,
  resolving: false,
  selections: { p1: null, p2: null },
  players: {
    p1: createPlayerState(),
    p2: createPlayerState()
  }
};

const dom = {
  screens: {
    home: document.querySelector("#screen-home"),
    game: document.querySelector("#screen-game"),
    result: document.querySelector("#screen-result"),
    review: document.querySelector("#screen-review")
  },
  modeButtons: Array.from(document.querySelectorAll(".mode-btn")),
  levelButtons: Array.from(document.querySelectorAll(".level-btn")),
  startBtn: document.querySelector("#start-btn"),
  roundLabel: document.querySelector("#round-label"),
  idiomText: document.querySelector("#idiom-text"),
  questionHint: document.querySelector("#question-hint"),
  idiomImageWrap: document.querySelector("#idiom-image-wrap"),
  idiomImage: document.querySelector("#idiom-image"),
  timerBar: document.querySelector("#timer-bar"),
  timeValue: document.querySelector("#time-value"),
  optionsZone: document.querySelector("#options-zone"),
  chipP1: document.querySelector("#chip-p1"),
  chipP2: document.querySelector("#chip-p2"),
  scoreP1: document.querySelector("#score-p1"),
  scoreP2: document.querySelector("#score-p2"),
  syncBanner: document.querySelector("#sync-banner"),
  resultTitle: document.querySelector("#result-title"),
  resultSubtitle: document.querySelector("#result-subtitle"),
  resultBoard: document.querySelector("#result-board"),
  resultItemP1: document.querySelector("#result-item-p1"),
  resultLabelScoreP1: document.querySelector("#result-label-score-p1"),
  resultLabelScoreP2: document.querySelector("#result-label-score-p2"),
  resultLabelCorrectP1: document.querySelector("#result-label-correct-p1"),
  resultLabelCorrectP2: document.querySelector("#result-label-correct-p2"),
  resultScoreP1: document.querySelector("#result-score-p1"),
  resultScoreP2: document.querySelector("#result-score-p2"),
  resultCorrectP1: document.querySelector("#result-correct-p1"),
  resultCorrectP2: document.querySelector("#result-correct-p2"),
  resultCorrectItemP1: document.querySelector("#result-correct-item-p1"),
  resultItemP2: document.querySelector("#result-item-p2"),
  resultCorrectItemP2: document.querySelector("#result-correct-item-p2"),
  reviewList: document.querySelector("#review-list"),
  mistakeRanking: document.querySelector("#mistake-ranking"),
  btnReview: document.querySelector("#btn-review"),
  btnReplay: document.querySelector("#btn-replay"),
  btnHome: document.querySelector("#btn-home"),
  btnReviewReplay: document.querySelector("#btn-review-replay"),
  btnReviewHome: document.querySelector("#btn-review-home")
};

let audioContext = null;

bootstrap();
if (window.__bootLog) {
  window.__bootLog("[boot] script bootstrap done");
}

function bootstrap() {
  document.body.dataset.screen = state.screen;
  bindHomeEvents();
  bindResultEvents();
  document.addEventListener("keydown", onKeydown);
  renderHomeSelection();
  updateScoreboard();
  reportIdiomBankDiagnostics();
}

function createPlayerState() {
  return {
    score: 0,
    correct: 0,
    mistakes: []
  };
}

function reportIdiomBankDiagnostics() {
  const diagnostics = window.IDIOM_BANK_DIAGNOSTICS;
  if (!diagnostics) {
    return;
  }

  const duplicateSummary = diagnostics.duplicateIdioms.length
    ? diagnostics.duplicateIdioms
        .map((item) => `${item.idiom} x${item.count}`)
        .join(", ")
    : "none";
  const summary = `[bank] total=${diagnostics.total}, legacyFunny=${diagnostics.legacyFunnyMeaningCount}, missingWrongMeanings=${diagnostics.missingWrongMeaningsCount}, duplicateIdioms=${duplicateSummary}`;

  if (window.__bootLog) {
    window.__bootLog(summary);
  }

  if (
    diagnostics.legacyFunnyMeaningCount > 0 ||
    diagnostics.missingWrongMeaningsCount > 0 ||
    diagnostics.duplicateIdioms.length > 0
  ) {
    console.warn("IDIOM_BANK diagnostics", diagnostics);
  }
}

function bindHomeEvents() {
  dom.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      ensureAudio();
      setMode(button.dataset.mode);
    });
  });

  dom.levelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      ensureAudio();
      setLevel(button.dataset.level);
    });
  });

  dom.startBtn.addEventListener("click", () => {
    ensureAudio();
    startGame();
  });
}

function bindResultEvents() {
  dom.btnReview.addEventListener("click", () => {
    ensureAudio();
    showReview();
  });
  dom.btnReplay.addEventListener("click", () => {
    ensureAudio();
    startGame();
  });
  dom.btnHome.addEventListener("click", () => {
    ensureAudio();
    goHome();
  });
  dom.btnReviewReplay.addEventListener("click", () => {
    ensureAudio();
    startGame();
  });
  dom.btnReviewHome.addEventListener("click", () => {
    ensureAudio();
    goHome();
  });
}

function setMode(mode) {
  state.mode = mode;
  playSfx("select");
  vibrate(12);
  renderHomeSelection();
}

function setLevel(level) {
  state.level = level;
  playSfx("select");
  vibrate(10);
  renderHomeSelection();
}

function renderHomeSelection() {
  dom.modeButtons.forEach((button) => {
    button.classList.toggle("selected", button.dataset.mode === state.mode);
  });
  dom.levelButtons.forEach((button) => {
    button.classList.toggle("selected", button.dataset.level === state.level);
  });
  dom.startBtn.disabled = !(state.mode && state.level);
}

function startGame() {
  stopTimer();
  state.questions = buildRoundQuestions(state.level, state.roundSize, state.mode);
  state.index = 0;
  state.players.p1 = createPlayerState();
  state.players.p2 = createPlayerState();
  state.pendingResolve = false;
  state.resolving = false;
  updateScoreboard();

  dom.chipP2.style.visibility = state.mode === "duel" ? "visible" : "hidden";
  switchScreen("game");
  renderQuestion();
}

function buildRoundQuestions(level, count, mode) {
  const levelBank = IDIOM_DATA[level];
  const shuffled = shuffle([...levelBank]);
  const selected = [];

  while (selected.length < count) {
    selected.push(shuffled[selected.length % shuffled.length]);
  }

  return selected.map((item) => {
    const baseOptions = buildOptions(levelBank, item);
    if (mode === "duel") {
      const p1Options = shuffle([...baseOptions]);
      const p2Options = shuffle([...baseOptions]);
      return {
        idiom: item.idiom,
        meaning: item.meaning,
        hint: item.hint,
        image: item.image,
        imageAlt: item.imageAlt,
        optionsByPlayer: { p1: p1Options, p2: p2Options },
        correctIndexByPlayer: {
          p1: p1Options.findIndex((option) => option === item.meaning),
          p2: p2Options.findIndex((option) => option === item.meaning)
        }
      };
    }
    return {
      idiom: item.idiom,
      meaning: item.meaning,
      hint: item.hint,
      image: item.image,
      imageAlt: item.imageAlt,
      options: baseOptions,
      correctIndex: baseOptions.findIndex((option) => option === item.meaning)
    };
  });
}

function buildOptions(levelBank, item) {
  const correctMeaning = item.meaning;
  const configuredWrong = Array.isArray(item.wrongMeanings)
    ? item.wrongMeanings.filter(
        (meaning) =>
          typeof meaning === "string" && meaning.trim() && meaning.trim() !== correctMeaning
      )
    : [];

  let distractorPool = dedupeMeanings(configuredWrong);

  if (distractorPool.length < 3) {
    const fallbackPool = shuffle(
      levelBank
        .map((entry) => entry.meaning)
        .filter(
          (meaning) => meaning !== correctMeaning && !distractorPool.includes(meaning)
        )
    );
    distractorPool = [...distractorPool, ...fallbackPool].slice(0, 3);
  }

  if (!APP_CONFIG.features.enableFunnyOption) {
    return shuffle([correctMeaning, ...distractorPool.slice(0, 3)]);
  }

  const funnyOption = getFunnyOptionFromItem(item, [correctMeaning, ...distractorPool]);
  const options = [correctMeaning];

  for (const meaning of distractorPool) {
    if (options.length >= 3) {
      break;
    }
    if (meaning !== funnyOption && !options.includes(meaning)) {
      options.push(meaning);
    }
  }

  options.push(funnyOption);

  while (options.length < 4) {
    const fallback = distractorPool.find((meaning) => !options.includes(meaning));
    if (!fallback) {
      break;
    }
    options.push(fallback);
  }

  return shuffle(options.slice(0, 4));
}

function dedupeMeanings(list) {
  const seen = new Set();
  const result = [];
  list.forEach((item) => {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  });
  return result;
}

function getFunnyOptionFromItem(item, existingOptions) {
  const funny = typeof item.funnyMeaning === "string" ? item.funnyMeaning.trim() : "";
  if (funny && !existingOptions.includes(funny)) {
    return funny;
  }
  return `把「${item.idiom}」寫進便當菜單再交作業`;
}

function renderQuestionImage(question) {
  if (!dom.idiomImageWrap || !dom.idiomImage) {
    return;
  }

  const shouldShowImage = APP_CONFIG.features.showIdiomImage && Boolean(question.image);
  if (!shouldShowImage) {
    dom.idiomImageWrap.classList.add("hidden");
    dom.idiomImageWrap.setAttribute("aria-hidden", "true");
    dom.idiomImage.removeAttribute("src");
    dom.idiomImage.alt = "";
    return;
  }

  dom.idiomImageWrap.classList.remove("hidden");
  dom.idiomImageWrap.setAttribute("aria-hidden", "false");
  dom.idiomImage.src = question.image;
  dom.idiomImage.alt = question.imageAlt || `${question.idiom} 插圖`;
}

function resolveGameConfig(userConfig) {
  const source = userConfig || {};
  const featureSource = source.features || {};
  return {
    roundSize:
      typeof source.roundSize === "number" && source.roundSize > 0
        ? Math.floor(source.roundSize)
        : DEFAULT_CONFIG.roundSize,
    countdownMs:
      typeof source.countdownMs === "number" && source.countdownMs >= 3000
        ? Math.floor(source.countdownMs)
        : DEFAULT_CONFIG.countdownMs,
    features: {
      enableFunnyOption:
        typeof featureSource.enableFunnyOption === "boolean"
          ? featureSource.enableFunnyOption
          : DEFAULT_CONFIG.features.enableFunnyOption,
      showIdiomImage:
        typeof featureSource.showIdiomImage === "boolean"
          ? featureSource.showIdiomImage
          : DEFAULT_CONFIG.features.showIdiomImage
    }
  };
}

function renderQuestion() {
  const question = state.questions[state.index];
  state.selections = { p1: null, p2: null };
  state.pendingResolve = false;
  state.resolving = false;

  dom.roundLabel.textContent = `第 ${state.index + 1} 題（共 ${state.questions.length} 題）`;
  dom.idiomText.textContent = question.idiom;
  dom.questionHint.textContent = `提示：${question.hint}`;
  renderQuestionImage(question);
  dom.syncBanner.classList.remove("show");
  dom.syncBanner.textContent = "Perfect Sync!";

  renderOptions(question);
  startCountdown();
}

function renderOptions(question) {
  dom.optionsZone.innerHTML = "";

  if (state.mode === "single") {
    const wrap = document.createElement("div");
    wrap.className = "single-options";
    question.options.forEach((optionText, index) => {
      const button = createOptionButton(optionText, index, "p1", SINGLE_KEYS[index]);
      wrap.appendChild(button);
    });
    dom.optionsZone.appendChild(wrap);
    return;
  }

  const duelWrap = document.createElement("div");
  duelWrap.className = "duel-options";
  duelWrap.appendChild(
    createPlayerOptionColumn("p1", "Player 1", DUEL_KEYS_P1, question.optionsByPlayer.p1)
  );
  duelWrap.appendChild(
    createPlayerOptionColumn("p2", "Player 2", DUEL_KEYS_P2, question.optionsByPlayer.p2)
  );
  dom.optionsZone.appendChild(duelWrap);
  updateDuelSelectionStatus("p1");
  updateDuelSelectionStatus("p2");
}

function createPlayerOptionColumn(playerId, title, keys, options) {
  const side = document.createElement("section");
  side.className = "player-side";
  side.id = `side-${playerId}`;

  const titleElement = document.createElement("h3");
  titleElement.textContent = title;
  side.appendChild(titleElement);

  const status = document.createElement("p");
  status.className = "player-select-status";
  status.id = `status-${playerId}`;
  status.textContent = "尚未選擇";
  side.appendChild(status);

  options.forEach((optionText, index) => {
    side.appendChild(createOptionButton(optionText, index, playerId, keys[index]));
  });

  return side;
}

function createOptionButton(text, optionIndex, playerId, keyLabel) {
  const button = document.createElement("button");
  button.className = "option-btn";
  button.dataset.optionIndex = String(optionIndex);
  button.dataset.player = playerId;
  button.type = "button";
  button.innerHTML = `<span class="hotkey">${keyLabel}</span>${text}`;
  button.addEventListener("click", () => {
    ensureAudio();
    selectAnswer(playerId, optionIndex);
  });
  return button;
}

function startCountdown() {
  stopTimer();
  state.deadline = Date.now() + state.countdownMs;
  state.lastSecond = null;
  updateTimerVisual(state.countdownMs);
  state.timerId = window.setInterval(updateCountdownFrame, 100);
}

function updateCountdownFrame() {
  const remaining = Math.max(0, state.deadline - Date.now());
  const seconds = Math.ceil(remaining / 1000);

  if (seconds !== state.lastSecond) {
    if (state.lastSecond !== null && seconds > 0) {
      playSfx(seconds <= 3 ? "tickFast" : "tick");
    }
    state.lastSecond = seconds;
  }

  updateTimerVisual(remaining);

  if (remaining <= 0) {
    stopTimer();
    playSfx("gong");
    resolveQuestion();
  }
}

function updateTimerVisual(remainingMs) {
  const ratio = Math.max(0, Math.min(1, remainingMs / state.countdownMs));
  dom.timerBar.style.width = `${ratio * 100}%`;
  dom.timeValue.textContent = String(Math.ceil(remainingMs / 1000));
}

function stopTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function selectAnswer(playerId, optionIndex) {
  if (state.screen !== "game" || state.resolving || state.pendingResolve) {
    return;
  }

  if (state.mode === "single" && playerId !== "p1") {
    return;
  }

  if (state.mode === "single" && state.selections[playerId] !== null) {
    return;
  }

  state.selections[playerId] = optionIndex;
  playSfx("select");
  vibrate(12);
  updateSelectionUI(playerId, optionIndex);

  if (state.mode === "single") {
    window.setTimeout(resolveQuestion, 320);
    return;
  }

  if (state.selections.p1 !== null && state.selections.p2 !== null) {
    state.pendingResolve = true;
    updateDuelSelectionStatus("p1", true);
    updateDuelSelectionStatus("p2", true);
    window.setTimeout(() => {
      state.pendingResolve = false;
      resolveQuestion();
    }, 220);
  }
}

function updateSelectionUI(playerId, optionIndex) {
  if (state.mode === "duel") {
    updateDuelSelectionStatus(playerId);
    return;
  }

  const buttons = Array.from(
    document.querySelectorAll(`.option-btn[data-player="${playerId}"]`)
  );
  buttons.forEach((button) => {
    const isSelected = Number(button.dataset.optionIndex) === optionIndex;
    button.classList.toggle("locked", isSelected);
  });
}

function updateDuelSelectionStatus(playerId, confirming) {
  const status = document.querySelector(`#status-${playerId}`);
  if (!status) {
    return;
  }

  status.classList.remove("ready", "confirming");

  if (confirming) {
    status.classList.add("confirming");
    status.textContent = "答案確認中...";
    return;
  }

  if (state.selections[playerId] === null) {
    status.textContent = "尚未選擇";
    return;
  }

  status.classList.add("ready");
  status.textContent = "已選擇，可更換";
}

function resolveQuestion() {
  if (state.resolving || state.screen !== "game") {
    return;
  }
  state.pendingResolve = false;
  state.resolving = true;
  stopTimer();

  const question = state.questions[state.index];
  const p1Correct = evaluatePlayer("p1", question);
  let p2Correct = false;

  if (state.mode === "duel") {
    p2Correct = evaluatePlayer("p2", question);
  }

  revealCorrectness(question);
  updateScoreboard();

  if (state.mode === "duel" && p1Correct && p2Correct) {
    dom.syncBanner.classList.add("show");
    dom.syncBanner.textContent = "Perfect Sync!";
    playSfx("perfect");
  } else {
    playSfx("reveal");
  }

  window.setTimeout(() => {
    state.resolving = false;
    if (state.index < state.questions.length - 1) {
      state.index += 1;
      renderQuestion();
    } else {
      showResult();
    }
  }, 1200);
}

function evaluatePlayer(playerId, question) {
  if (state.mode === "single" && playerId === "p2") {
    return false;
  }

  const selection = state.selections[playerId];
  const correctIndex =
    state.mode === "duel" ? question.correctIndexByPlayer[playerId] : question.correctIndex;
  const options = state.mode === "duel" ? question.optionsByPlayer[playerId] : question.options;
  const isCorrect = selection === correctIndex;

  if (isCorrect) {
    state.players[playerId].score += 1;
    state.players[playerId].correct += 1;
  } else {
    state.players[playerId].mistakes.push({
      player: playerId,
      idiom: question.idiom,
      hint: question.hint,
      options,
      selectedIndex: selection,
      correctIndex
    });
  }

  flashJudge(playerId, isCorrect);
  return isCorrect;
}

function revealCorrectness(question) {
  const buttons = Array.from(document.querySelectorAll(".option-btn"));
  buttons.forEach((button) => {
    const optionIndex = Number(button.dataset.optionIndex);
    const player = button.dataset.player;
    const selectedIndex = state.selections[player];
    const correctIndex =
      state.mode === "duel" ? question.correctIndexByPlayer[player] : question.correctIndex;

    if (optionIndex === correctIndex) {
      button.classList.add("correct");
    }

    if (selectedIndex === optionIndex && optionIndex !== correctIndex) {
      button.classList.add("wrong");
    }
  });
}

function flashJudge(playerId, isCorrect) {
  const target =
    state.mode === "duel"
      ? document.querySelector(`#side-${playerId}`)
      : document.querySelector(`#chip-${playerId}`);

  if (!target) {
    return;
  }

  const className = isCorrect ? "correct-flash" : "wrong-flash";
  target.classList.remove("correct-flash", "wrong-flash");
  target.classList.add(className);
}

function updateScoreboard() {
  dom.scoreP1.textContent = `${state.players.p1.score} 分`;
  dom.scoreP2.textContent = `${state.players.p2.score} 分`;
}

function showResult() {
  switchScreen("result");

  const p1 = state.players.p1;
  const p2 = state.players.p2;

  dom.resultBoard.classList.remove("single-mode");
  dom.resultItemP1.style.display = "block";
  dom.resultCorrectItemP1.style.display = "block";
  dom.resultItemP2.style.display = "block";
  dom.resultCorrectItemP2.style.display = "block";
  dom.resultLabelScoreP1.textContent = "Player 1 分數";
  dom.resultLabelScoreP2.textContent = "Player 2 分數";
  dom.resultLabelCorrectP1.textContent = "Player 1 答對";
  dom.resultLabelCorrectP2.textContent = "Player 2 答對";

  animateNumber(dom.resultScoreP1, p1.score);
  animateNumber(dom.resultCorrectP1, p1.correct);

  if (state.mode === "single") {
    dom.resultBoard.classList.add("single-mode");
    dom.resultTitle.textContent = "挑戰完成！";
    dom.resultSubtitle.textContent = `難度：${LEVEL_LABEL[state.level]}，答對 ${p1.correct} / ${state.questions.length}`;
    dom.resultLabelScoreP1.textContent = "本局得分";
    dom.resultItemP1.style.display = "block";
    dom.resultCorrectItemP1.style.display = "none";
    dom.resultItemP2.style.display = "none";
    dom.resultCorrectItemP2.style.display = "none";
  } else {
    animateNumber(dom.resultScoreP2, p2.score);
    animateNumber(dom.resultCorrectP2, p2.correct);

    if (p1.score > p2.score) {
      dom.resultTitle.textContent = "Player 1 勝出！";
      dom.resultSubtitle.textContent = "左側放光！";
    } else if (p2.score > p1.score) {
      dom.resultTitle.textContent = "Player 2 勝出！";
      dom.resultSubtitle.textContent = "右側閃耀！";
    } else {
      dom.resultTitle.textContent = "平手！";
      dom.resultSubtitle.textContent = "兩位都很厲害，來一場加賽吧！";
    }
  }
}

function showReview() {
  switchScreen("review");
  dom.reviewList.innerHTML = "";
  dom.mistakeRanking.innerHTML = "";

  const mistakes =
    state.mode === "single"
      ? state.players.p1.mistakes
      : [...state.players.p1.mistakes, ...state.players.p2.mistakes];

  if (mistakes.length === 0) {
    const noMistake = document.createElement("div");
    noMistake.className = "review-card";
    noMistake.innerHTML = "<h4>太強了！</h4><p class='review-meta'>這一局沒有錯題，直接再挑戰更高難度吧。</p>";
    dom.reviewList.appendChild(noMistake);
    return;
  }

  renderMistakeRanking(mistakes);

  mistakes.forEach((mistake, index) => {
    const card = document.createElement("article");
    card.className = "review-card";

    const playerLabel = mistake.player === "p1" ? "Player 1" : "Player 2";
    card.innerHTML = `
      <h4>${index + 1}. ${mistake.idiom}</h4>
      <p class="review-meta">提示：${mistake.hint}</p>
      <p class="review-meta">${state.mode === "duel" ? `${playerLabel} 的作答` : "你的作答"}：${
      mistake.selectedIndex === null ? "未作答" : mistake.options[mistake.selectedIndex]
    }</p>
      <p class="review-meta">正解：${mistake.options[mistake.correctIndex]}</p>
    `;

    const optionsList = document.createElement("div");
    optionsList.className = "review-options";
    mistake.options.forEach((optionText, optionIndex) => {
      const option = document.createElement("div");
      option.className = "review-option";
      if (optionIndex === mistake.correctIndex) {
        option.classList.add("correct");
      }
      if (optionIndex === mistake.selectedIndex) {
        option.classList.add("selected");
      }
      option.textContent = optionText;
      optionsList.appendChild(option);
    });
    card.appendChild(optionsList);
    dom.reviewList.appendChild(card);
  });
}

function renderMistakeRanking(mistakes) {
  const counter = {};
  mistakes.forEach((item) => {
    counter[item.idiom] = (counter[item.idiom] || 0) + 1;
  });

  const sorted = Object.entries(counter).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const rankBox = document.createElement("div");
  rankBox.className = "mistake-box";

  if (sorted.length === 0) {
    rankBox.textContent = "本局無錯題。";
    dom.mistakeRanking.appendChild(rankBox);
    return;
  }

  const lines = sorted
    .map(([idiom, count], idx) => `${idx + 1}. ${idiom}（錯誤 ${count} 次）`)
    .join(" / ");
  rankBox.textContent = `錯誤率排行榜：${lines}`;
  dom.mistakeRanking.appendChild(rankBox);
}

function animateNumber(element, target) {
  const start = performance.now();
  const duration = 450;
  const from = 0;

  function frame(now) {
    const progress = Math.min(1, (now - start) / duration);
    const value = Math.round(from + (target - from) * progress);
    element.textContent = String(value);
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}

function goHome() {
  stopTimer();
  switchScreen("home");
  renderHomeSelection();
}

function switchScreen(nextScreen) {
  state.screen = nextScreen;
  document.body.dataset.screen = nextScreen;
  Object.entries(dom.screens).forEach(([name, node]) => {
    node.classList.toggle("active", name === nextScreen);
  });
}

function onKeydown(event) {
  const key = event.key.toLowerCase();

  if (state.screen === "home") {
    if (key === "s") {
      ensureAudio();
      setMode("single");
      return;
    }
    if (key === "d") {
      ensureAudio();
      setMode("duel");
      return;
    }
    if (["1", "2", "3"].includes(key)) {
      ensureAudio();
      setLevel(key === "1" ? "basic" : key === "2" ? "advanced" : "master");
      return;
    }
    if (event.key === "Enter") {
      ensureAudio();
      startGame();
    }
    return;
  }

  if (state.screen === "game") {
    if (state.mode === "single") {
      const idx = SINGLE_KEYS.map((k) => k.toLowerCase()).indexOf(key);
      if (idx >= 0) {
        ensureAudio();
        selectAnswer("p1", idx);
      }
      return;
    }

    const idxP1 = DUEL_KEYS_P1.map((k) => k.toLowerCase()).indexOf(key);
    const keyForP2 = key === ":" || key === "；" ? ";" : key;
    let idxP2 = DUEL_KEYS_P2.map((k) => k.toLowerCase()).indexOf(keyForP2);
    if (idxP2 < 0 && event.code === "Semicolon") {
      idxP2 = 3;
    }
    if (idxP1 >= 0) {
      ensureAudio();
      selectAnswer("p1", idxP1);
      return;
    }
    if (idxP2 >= 0) {
      ensureAudio();
      selectAnswer("p2", idxP2);
    }
    return;
  }

  if ((state.screen === "result" || state.screen === "review") && event.code === "Space") {
    event.preventDefault();
    goHome();
  }
}

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function ensureAudio() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      return;
    }
    audioContext = new AudioCtx();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playSfx(type) {
  if (!audioContext) {
    return;
  }

  const profile = {
    select: { f: 520, t: 0.07, v: 0.04, wave: "square" },
    tick: { f: 680, t: 0.045, v: 0.03, wave: "triangle" },
    tickFast: { f: 880, t: 0.035, v: 0.036, wave: "triangle" },
    gong: { f: 280, t: 0.26, v: 0.055, wave: "sine" },
    reveal: { f: 560, t: 0.085, v: 0.035, wave: "sawtooth" },
    perfect: { f: 920, t: 0.12, v: 0.04, wave: "sine" }
  }[type];

  if (!profile) {
    return;
  }

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = profile.wave;
  oscillator.frequency.value = profile.f;
  gain.gain.value = profile.v;

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  const now = audioContext.currentTime;
  gain.gain.setValueAtTime(profile.v, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + profile.t);
  oscillator.start(now);
  oscillator.stop(now + profile.t);
}

function vibrate(durationMs) {
  if ("vibrate" in navigator) {
    navigator.vibrate(durationMs);
  }
}
