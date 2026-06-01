/**
 * Elapsed Time Bar plugin for Reveal.js 4+
 * Adapted from https://github.com/tkrkt/reveal.js-elapsed-time-bar
 *
 * Shows a progress bar that fills over your allotted presentation time.
 *
 * Config options (set in Reveal.initialize):
 *   allottedTime:      total time in ms (required), e.g. 15 * 60 * 1000
 *   progressBarHeight: bar height in px (default: 4)
 *   barColor:          CSS color while running (default: 'rgb(200,0,0)')
 *   pausedBarColor:    CSS color when paused (default: 'rgba(200,0,0,.6)')
 */
const ElapsedTimeBar = (() => {
  let deck;
  let barColor;
  let pausedBarColor;
  let allottedTime;
  let progressBarHeight;
  let timeProgressBar;
  let startTime = null;
  let pauseTime = null;
  let pauseTimeDuration = 0;
  let isPaused = false;
  let isFinished = false;
  let rafId = null;

  function createBar() {
    const bar = document.createElement('div');
    bar.style.cssText = [
      'position: fixed',
      'bottom: 0',
      'left: 0',
      'width: 0%',
      `height: ${progressBarHeight}px`,
      `background: ${barColor}`,
      'z-index: 9999',
      'transition: none',
    ].join(';');
    document.body.appendChild(bar);
    return bar;
  }

  function update() {
    if (isPaused || isFinished) return;

    const now = Date.now();
    const elapsed = now - startTime - pauseTimeDuration;
    const pct = Math.min(elapsed / allottedTime, 1);

    timeProgressBar.style.width = `${pct * 100}%`;

    if (pct >= 1) {
      isFinished = true;
      timeProgressBar.style.background = barColor;
      return;
    }

    rafId = requestAnimationFrame(update);
  }

  function start() {
    startTime = Date.now();
    pauseTimeDuration = 0;
    isPaused = false;
    isFinished = false;
    timeProgressBar.style.width = '0%';
    timeProgressBar.style.background = barColor;
    update();
  }

  function pause() {
    if (isPaused || isFinished) return;
    isPaused = true;
    pauseTime = Date.now();
    cancelAnimationFrame(rafId);
    timeProgressBar.style.background = pausedBarColor;
  }

  function resume() {
    if (!isPaused || isFinished) return;
    pauseTimeDuration += Date.now() - pauseTime;
    isPaused = false;
    timeProgressBar.style.background = barColor;
    update();
  }

  function reset() {
    cancelAnimationFrame(rafId);
    start();
  }

  function togglePause() {
    isPaused ? resume() : pause();
  }

  return {
    id: 'elapsed-time-bar',
    init: (revealDeck) => {
      deck = revealDeck;
      const config = deck.getConfig();

      allottedTime = config.allottedTime;
      if (!allottedTime) {
        console.warn('ElapsedTimeBar: set "allottedTime" in Reveal config (ms).');
        return;
      }

      barColor = config.barColor || 'rgb(200,0,0)';
      pausedBarColor = config.pausedBarColor || 'rgba(200,0,0,.6)';
      progressBarHeight = config.progressBarHeight || 4;

      timeProgressBar = createBar();
      start();

      // Keyboard: Enter to pause/resume, R to reset
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') togglePause();
        if (e.key === 'r' || e.key === 'R') {
          // Only reset if not typing in an input
          if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            reset();
          }
        }
      });
    },
    pause,
    resume,
    reset,
    togglePause,
    get isPaused() { return isPaused; },
    get isFinished() { return isFinished; },
  };
})();
