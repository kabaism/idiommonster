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
  endlessLives: 3,
  features: {
    enableFunnyOption: true,
    showIdiomImage: false
  }
};

const APP_CONFIG = resolveGameConfig(window.GAME_CONFIG);

const LEVEL_LABEL = {
  basic: "輕而易舉",
  advanced: "登堂入室",
  master: "捫參歷井"
};

const PROMPT_TYPE = {
  idiomToMeaning: "idiom-to-meaning"
};

const STORAGE_KEYS = {
  audioEnabled: "idiom-monster.audioEnabled",
  endlessLeaderboard: "idiom-monster.endlessLeaderboard"
};

const SINGLE_KEYS = ["A", "S", "D", "F"];
const DUEL_KEYS_P1 = ["A", "S", "D", "F"];
const DUEL_KEYS_P2 = ["J", "K", "L", ";"];

const state = {
  screen: "home",
  mode: "single",
  level: "basic",
  audioEnabled: loadAudioEnabledSetting(),
  levelBank: [],
  questions: [],
  index: 0,
  roundSize: APP_CONFIG.roundSize,
  countdownMs: APP_CONFIG.countdownMs,
  lives: DEFAULT_CONFIG.endlessLives,
  endlessLeaderboard: loadEndlessLeaderboard(),
  endlessRunSaved: false,
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
  levelSelect: document.querySelector("#level-select"),
  audioToggleButtons: Array.from(document.querySelectorAll(".audio-toggle-btn")),
  leaderboardPanel: document.querySelector("#leaderboard-panel"),
  leaderboardList: document.querySelector("#leaderboard-list"),
  startBtn: document.querySelector("#start-btn"),
  controlsHintText: document.querySelector("#controls-hint-text"),
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
  gameHeader: document.querySelector(".game-header"),
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
  resultMistakesP1: document.querySelector("#result-mistakes-p1"),
  resultMistakesP2: document.querySelector("#result-mistakes-p2"),
  resultCelebration: document.querySelector("#result-celebration"),
  reviewList: document.querySelector("#review-list"),
  mistakeRanking: document.querySelector("#mistake-ranking"),
  btnReview: document.querySelector("#btn-review"),
  btnReplay: document.querySelector("#btn-replay"),
  btnHome: document.querySelector("#btn-home"),
  btnGameHome: document.querySelector("#btn-game-home"),
  btnReviewReplay: document.querySelector("#btn-review-replay"),
  btnReviewHome: document.querySelector("#btn-review-home")
};

let audioContext = null;
let speechTimeoutId = null;

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
  renderLeaderboard();
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

  dom.audioToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      ensureAudio();
      setAudioEnabled(button.dataset.audioEnabled === "true");
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
  dom.btnGameHome.addEventListener("click", () => {
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

function setAudioEnabled(enabled) {
  state.audioEnabled = enabled;
  saveSetting(STORAGE_KEYS.audioEnabled, enabled ? "true" : "false");
  playSfx("select");
  vibrate(8);
  renderHomeSelection();
}

function renderHomeSelection() {
  dom.modeButtons.forEach((button) => {
    button.classList.toggle("selected", button.dataset.mode === state.mode);
  });
  dom.levelButtons.forEach((button) => {
    button.classList.toggle("selected", button.dataset.level === state.level);
  });
  dom.audioToggleButtons.forEach((button) => {
    button.classList.toggle(
      "selected",
      String(state.audioEnabled) === button.dataset.audioEnabled
    );
  });
  dom.levelSelect.classList.toggle("hidden", state.mode !== "duel");
  dom.leaderboardPanel.classList.toggle("hidden", state.mode !== "leaderboard");
  dom.startBtn.disabled = !(state.mode && (state.mode !== "duel" || state.level));
  dom.startBtn.hidden = state.mode === "leaderboard";
  dom.startBtn.textContent = state.mode === "duel" ? "開始對戰" : "開始闖關";
  dom.controlsHintText.innerHTML =
    state.mode === "duel"
      ? '鍵盤：<kbd>S</kbd>/<kbd>D</kbd>/<kbd>L</kbd> 切模式、<kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd> 難度、<kbd>Enter</kbd> 開始'
      : '鍵盤：<kbd>S</kbd>/<kbd>D</kbd>/<kbd>L</kbd> 切模式、<kbd>Enter</kbd> 開始';
}

function startGame() {
  if (state.mode === "leaderboard") {
    return;
  }
  stopTimer();
  stopIdiomSpeech();
  state.levelBank = IDIOM_DATA[state.level];
  state.questions = buildRoundQuestions(
    state.levelBank,
    state.roundSize,
    state.mode,
    isSingleMode()
  );
  state.index = 0;
  state.lives = DEFAULT_CONFIG.endlessLives;
  state.players.p1 = createPlayerState();
  state.players.p2 = createPlayerState();
  state.endlessRunSaved = false;
  state.pendingResolve = false;
  state.resolving = false;
  updateScoreboard();
  syncGameHeaderMode();
  switchScreen("game");
  renderQuestion();
}

function buildRoundQuestions(levelBank, count, mode, endlessMode) {
  const shuffled = shuffle([...levelBank]);
  const selected = [];

  const targetCount = endlessMode ? 1 : count;
  while (selected.length < targetCount) {
    selected.push(shuffled[selected.length % shuffled.length]);
  }

  return selected.map((item) => buildQuestion(levelBank, item, mode));
}

function buildQuestion(levelBank, item, mode) {
  return buildIdiomToMeaningQuestion(levelBank, item, mode);
}

function buildIdiomToMeaningQuestion(levelBank, item, mode) {
  const baseOptions = buildMeaningOptions(levelBank, item);
  if (mode === "duel") {
    const p1Options = shuffle([...baseOptions]);
    const p2Options = shuffle([...baseOptions]);
    return {
      idiom: item.idiom,
      meaning: item.meaning,
      hint: item.hint,
      image: item.image,
      imageAlt: item.imageAlt,
      promptType: PROMPT_TYPE.idiomToMeaning,
      promptText: item.idiom,
      speechText: item.idiom,
      helperText: "請搶答正確意思",
      optionsByPlayer: { p1: p1Options, p2: p2Options },
      correctIndexByPlayer: {
        p1: p1Options.findIndex((option) => option === item.meaning),
        p2: p2Options.findIndex((option) => option === item.meaning)
      },
      correctValue: item.meaning
    };
  }
  return {
    idiom: item.idiom,
    meaning: item.meaning,
    hint: item.hint,
    image: item.image,
    imageAlt: item.imageAlt,
    promptType: PROMPT_TYPE.idiomToMeaning,
    promptText: item.idiom,
    speechText: item.idiom,
    helperText: "請選出正確意思",
    options: baseOptions,
    correctIndex: baseOptions.findIndex((option) => option === item.meaning),
    correctValue: item.meaning
  };
}

function buildMeaningOptions(levelBank, item) {
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

  dom.roundLabel.textContent = getRoundLabelText();
  dom.idiomText.textContent = question.promptText;
  dom.questionHint.innerHTML = `<span class="question-helper">${question.helperText}</span><span class="question-tip">提示：${question.hint}</span>`;
  renderQuestionImage(question);
  queueIdiomSpeech(question.speechText);
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

function queueIdiomSpeech(idiom) {
  stopIdiomSpeech();
  if (!state.audioEnabled) {
    return;
  }
  if (!idiom) {
    return;
  }
  if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
    return;
  }
  speechTimeoutId = window.setTimeout(() => {
    const utterance = new window.SpeechSynthesisUtterance(idiom);
    utterance.lang = "zh-TW";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    const zhVoice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang && voice.lang.toLowerCase().startsWith("zh"));
    if (zhVoice) {
      utterance.voice = zhVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    speechTimeoutId = null;
  }, 140);
}

function stopIdiomSpeech() {
  if (speechTimeoutId) {
    window.clearTimeout(speechTimeoutId);
    speechTimeoutId = null;
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
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
    if (isSingleMode()) {
      if (state.lives <= 0) {
        showResult();
        return;
      }
      state.index += 1;
      state.questions.push(buildQuestion(state.levelBank, getRandomItem(state.levelBank), state.mode));
      renderQuestion();
      return;
    }

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
    if (playerId === "p1" && isSingleMode()) {
      state.lives = Math.max(0, state.lives - 1);
    }
    state.players[playerId].mistakes.push({
      player: playerId,
      idiom: question.idiom,
      promptText: question.promptText,
      helperText: question.helperText,
      hint: question.hint,
      options,
      selectedIndex: selection,
      correctIndex,
      promptType: question.promptType
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

function syncGameHeaderMode() {
  const singleMode = state.mode === "single";
  dom.chipP2.hidden = singleMode;
  dom.chipP2.setAttribute("aria-hidden", singleMode ? "true" : "false");
  dom.gameHeader.classList.toggle("single-mode", singleMode);
}

function showResult() {
  stopIdiomSpeech();
  switchScreen("result");

  const p1 = state.players.p1;
  const p2 = state.players.p2;

  clearCelebration();
  dom.resultBoard.classList.remove("single-mode");
  dom.resultItemP1.style.display = "block";
  dom.resultCorrectItemP1.style.display = "block";
  dom.resultItemP2.style.display = "block";
  dom.resultCorrectItemP2.style.display = "block";
  dom.resultLabelScoreP1.textContent = "Player 1 分數";
  dom.resultLabelScoreP2.textContent = "Player 2 分數";
  dom.resultLabelCorrectP1.textContent = "Player 1 答錯成語";
  dom.resultLabelCorrectP2.textContent = "Player 2 答錯成語";

  animateNumber(dom.resultScoreP1, p1.score);
  renderMistakeSummary(dom.resultMistakesP1, p1.mistakes);

  if (state.mode === "single") {
    dom.resultBoard.classList.add("single-mode");
    dom.resultTitle.textContent = "單人闖關結束！";
    dom.resultSubtitle.textContent = `撐到第 ${state.index + 1} 題，用完 3 命`;
    dom.resultLabelScoreP1.textContent = "本局得分";
    dom.resultItemP1.style.display = "block";
    dom.resultCorrectItemP1.style.display = "block";
    dom.resultItemP2.style.display = "none";
    dom.resultCorrectItemP2.style.display = "none";
    maybeRecordEndlessLeaderboard();
  } else {
    animateNumber(dom.resultScoreP2, p2.score);
    renderMistakeSummary(dom.resultMistakesP2, p2.mistakes);

    if (p1.score > p2.score) {
      dom.resultTitle.textContent = "Player 1 勝出！";
      dom.resultSubtitle.textContent = "本局由 Player 1 拿下勝利。";
      launchCelebration("p1");
    } else if (p2.score > p1.score) {
      dom.resultTitle.textContent = "Player 2 勝出！";
      dom.resultSubtitle.textContent = "本局由 Player 2 拿下勝利。";
      launchCelebration("p2");
    } else {
      dom.resultTitle.textContent = "平手！";
      dom.resultSubtitle.textContent = "兩位都很厲害，來一場加賽吧！";
    }
  }
}

function showReview() {
  stopIdiomSpeech();
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
      <p class="review-meta">題型：看成語選意思</p>
      <p class="review-meta">題目：${mistake.promptText}</p>
      <p class="review-meta">提示：${mistake.hint}</p>
      <p class="review-meta">${state.mode === "duel" ? `選擇玩家：${playerLabel}` : "作答玩家：你"}</p>
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
      if (state.mode === "duel" && optionIndex === mistake.selectedIndex) {
        const badge = document.createElement("span");
        badge.className = "review-option-badge";
        badge.textContent = `${playerLabel} 選擇`;
        option.appendChild(badge);
      }
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
  if (!element) {
    return;
  }
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

function renderMistakeSummary(container, mistakes) {
  if (!container) {
    return;
  }
  container.innerHTML = "";

  if (!mistakes || mistakes.length === 0) {
    const empty = document.createElement("span");
    empty.className = "result-mistake-empty";
    empty.textContent = "本局零失誤";
    container.appendChild(empty);
    return;
  }

  mistakes.forEach((mistake) => {
    const chip = document.createElement("span");
    chip.className = "result-mistake-chip";
    chip.textContent = mistake.idiom;
    container.appendChild(chip);
  });
}

function clearCelebration() {
  if (!dom.resultCelebration) {
    return;
  }
  dom.resultCelebration.innerHTML = "";
  dom.resultCelebration.classList.remove("show", "winner-p1", "winner-p2");
}

function launchCelebration(winner) {
  if (!dom.resultCelebration) {
    return;
  }
  clearCelebration();
  dom.resultCelebration.classList.add("show", winner === "p1" ? "winner-p1" : "winner-p2");

  const bursts = [
    { left: "18%", top: "18%", delay: "0s" },
    { left: "50%", top: "10%", delay: "0.18s" },
    { left: "82%", top: "18%", delay: "0.36s" }
  ];

  bursts.forEach((burstConfig, burstIndex) => {
    const burst = document.createElement("div");
    burst.className = "celebration-burst";
    burst.style.left = burstConfig.left;
    burst.style.top = burstConfig.top;
    burst.style.animationDelay = burstConfig.delay;

    for (let i = 0; i < 10; i += 1) {
      const spark = document.createElement("span");
      spark.className = "celebration-spark";
      spark.style.setProperty("--spark-angle", `${i * 36}deg`);
      spark.style.setProperty("--spark-delay", `${burstIndex * 0.18 + i * 0.03}s`);
      burst.appendChild(spark);
    }

    dom.resultCelebration.appendChild(burst);
  });
}

function goHome() {
  stopTimer();
  stopIdiomSpeech();
  clearCelebration();
  switchScreen("home");
  renderHomeSelection();
}

function getRoundLabelText() {
  if (isSingleMode()) {
    return `單人闖關 · 第 ${state.index + 1} 題 · 剩 ${state.lives} 命`;
  }
  return `第 ${state.index + 1} 題（共 ${state.questions.length} 題）`;
}

function isSingleMode() {
  return state.mode === "single";
}

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function maybeRecordEndlessLeaderboard() {
  if (!isSingleMode() || state.endlessRunSaved) {
    return;
  }
  state.endlessRunSaved = true;
  const entry = {
    name: "",
    score: state.players.p1.score,
    rounds: state.index + 1,
    date: new Date().toISOString()
  };

  const ranked = [...state.endlessLeaderboard, entry].sort(compareLeaderboardEntries).slice(0, 10);
  const qualifies = ranked.includes(entry);
  if (!qualifies) {
    renderLeaderboard();
    return;
  }

  const suggestedName = "玩家";
  const input =
    typeof window.prompt === "function"
      ? window.prompt("恭喜進入無盡排行榜，請輸入暱稱：", suggestedName)
      : suggestedName;
  entry.name = sanitizePlayerName(input) || suggestedName;
  state.endlessLeaderboard = [...state.endlessLeaderboard, entry]
    .sort(compareLeaderboardEntries)
    .slice(0, 10);
  saveEndlessLeaderboard();
  renderLeaderboard();
}

function renderLeaderboard() {
  if (!dom.leaderboardList) {
    return;
  }
  dom.leaderboardList.innerHTML = "";

  if (!state.endlessLeaderboard.length) {
    const empty = document.createElement("div");
    empty.className = "leaderboard-empty";
    empty.textContent = "還沒有無盡紀錄，來成為第一名吧。";
    dom.leaderboardList.appendChild(empty);
    return;
  }

  state.endlessLeaderboard.forEach((entry, index) => {
    const row = document.createElement("div");
    row.className = "leaderboard-entry";
    row.innerHTML = `
      <span class="leaderboard-rank">#${index + 1}</span>
      <div>
        <div class="leaderboard-name">${entry.name}</div>
        <div class="leaderboard-meta">第 ${entry.rounds} 題出局 · ${formatLeaderboardDate(entry.date)}</div>
      </div>
      <span class="leaderboard-score">${entry.score}</span>
    `;
    dom.leaderboardList.appendChild(row);
  });
}

function compareLeaderboardEntries(a, b) {
  if (b.score !== a.score) {
    return b.score - a.score;
  }
  if (b.rounds !== a.rounds) {
    return b.rounds - a.rounds;
  }
  return String(b.date).localeCompare(String(a.date));
}

function sanitizePlayerName(input) {
  return typeof input === "string" ? input.trim().slice(0, 16) : "";
}

function loadEndlessLeaderboard() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.endlessLeaderboard);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter(
        (entry) =>
          entry &&
          typeof entry.name === "string" &&
          typeof entry.score === "number" &&
          typeof entry.rounds === "number" &&
          typeof entry.date === "string"
      )
      .sort(compareLeaderboardEntries)
      .slice(0, 10);
  } catch (error) {
    return [];
  }
}

function saveEndlessLeaderboard() {
  saveSetting(STORAGE_KEYS.endlessLeaderboard, JSON.stringify(state.endlessLeaderboard));
}

function formatLeaderboardDate(dateText) {
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) {
    return "剛剛";
  }
  return new Intl.DateTimeFormat("zh-TW", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
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
    if (key === "l") {
      ensureAudio();
      setMode("leaderboard");
      return;
    }
    if (["1", "2", "3"].includes(key)) {
      if (state.mode !== "duel") {
        return;
      }
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

function loadAudioEnabledSetting() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEYS.audioEnabled);
    if (value !== null) {
      return value !== "false";
    }
    const legacyVoiceValue = window.localStorage.getItem("idiom-monster.voiceEnabled");
    return legacyVoiceValue !== "false";
  } catch (error) {
    return true;
  }
}

function saveSetting(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    if (window.__bootLog) {
      window.__bootLog(`[warn] unable to persist setting ${key}`);
    }
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
  if (!state.audioEnabled) {
    return;
  }
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
  if (!state.audioEnabled) {
    return;
  }
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
