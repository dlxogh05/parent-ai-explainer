/**
 * Deck controller — keyboard, hash, fullscreen, showcase image fallbacks
 */
(function () {
  "use strict";

  const deck = document.getElementById("deck");
  if (!deck) return;

  const slides = Array.from(deck.querySelectorAll(".slide"));
  const posEl = document.getElementById("pos");
  const barEl = document.getElementById("bar");
  const liveEl = document.getElementById("live");
  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");
  const btnFs = document.getElementById("fs");

  let index = 0;
  let motionFrame = null;
  let touchX = null;
  let idleTimer = null;

  function clampIndex(n) {
    return Math.max(0, Math.min(slides.length - 1, n));
  }

  function updateChrome() {
    const total = slides.length;
    const current = index + 1;
    if (posEl) posEl.textContent = current + " / " + total;
    if (barEl) barEl.style.transform = "scaleX(" + current / total + ")";
    if (btnPrev) btnPrev.disabled = index === 0;
    if (btnNext) btnNext.disabled = index === total - 1;
    const title = slides[index].dataset.title || "슬라이드";
    document.title = title + " · AI에게 일을 맡기는 법";
    if (liveEl) liveEl.textContent = title + ", " + current + "번째 슬라이드";
    if (location.hash !== "#" + current) history.replaceState(null, "", "#" + current);
  }

  function show(n) {
    index = clampIndex(n);
    slides.forEach((slide, i) => {
      const on = i === index;
      slide.classList.toggle("is-active", on);
      slide.setAttribute("aria-hidden", on ? "false" : "true");
      if (on) slide.scrollTop = 0;
    });
    playMotion(slides[index]);
    updateChrome();
  }

  // Timed scenes: elements with data-at="ms" switch on at that moment; counters and a clock follow.
  function renderMotion(slide, t, dur) {
    slide.querySelectorAll("[data-at]").forEach((el) => {
      el.classList.toggle("on", t >= Number(el.dataset.at));
    });
    slide.querySelectorAll("[data-count-to]").forEach((el) => {
      const from = Number(el.dataset.countFrom) || 0;
      const span = Number(el.dataset.countDur) || 1;
      const k = Math.max(0, Math.min(1, (t - from) / span));
      el.textContent = String(Math.round(Number(el.dataset.countTo) * k));
    });
    const clock = slide.querySelector("[data-clock]");
    if (clock) clock.textContent = (Math.min(t, dur) / 1000).toFixed(1);
    const bar = slide.querySelector(".race__bar");
    if (bar) bar.style.transform = "scaleX(" + Math.min(1, t / dur) + ")";
  }

  function playMotion(slide) {
    cancelAnimationFrame(motionFrame);
    const dur = Number(slide.dataset.motion);
    if (!dur) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return renderMotion(slide, dur, dur);
    renderMotion(slide, 0, dur);
    const t0 = performance.now();
    const tick = (now) => {
      const t = now - t0;
      renderMotion(slide, t, dur);
      if (t < dur) motionFrame = requestAnimationFrame(tick);
    };
    motionFrame = requestAnimationFrame(tick);
  }

  deck.querySelectorAll("[data-replay]").forEach((btn) => {
    btn.addEventListener("click", () => playMotion(btn.closest(".slide")));
  });

  const next = () => show(index + 1);
  const prev = () => show(index - 1);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  }

  // In fullscreen, hide the controls after a few still seconds so the TV shows only the slide.
  function wake() {
    document.body.classList.remove("is-idle");
    clearTimeout(idleTimer);
    if (document.fullscreenElement) {
      idleTimer = setTimeout(() => document.body.classList.add("is-idle"), 2500);
    }
  }

  btnNext?.addEventListener("click", next);
  btnPrev?.addEventListener("click", prev);
  btnFs?.addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", wake);
  window.addEventListener("mousemove", wake, { passive: true });

  window.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (tag === "BUTTON" && (e.key === " " || e.key === "Enter")) return;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
      case " ":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        e.preventDefault();
        prev();
        break;
      case "Home":
        e.preventDefault();
        show(0);
        break;
      case "End":
        e.preventDefault();
        show(slides.length - 1);
        break;
      case "f":
      case "F":
        e.preventDefault();
        toggleFullscreen();
        break;
      default:
        return;
    }
    wake();
  });

  window.addEventListener("touchstart", (e) => {
    touchX = e.changedTouches[0].screenX;
  }, { passive: true });

  window.addEventListener("touchend", (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].screenX - touchX;
    if (Math.abs(dx) > 56) (dx < 0 ? next : prev)();
    touchX = null;
  }, { passive: true });

  window.addEventListener("hashchange", () => {
    const n = parseInt(location.hash.slice(1), 10);
    if (Number.isFinite(n) && n - 1 !== index) show(n - 1);
  });

  // Showcase images live in assets/showcase (see scripts/). Until they are downloaded,
  // each frame shows its written description instead of a broken image.
  deck.querySelectorAll(".shot img").forEach((img) => {
    const shot = img.closest(".shot");
    const missing = () => shot.classList.add("is-missing");
    if (img.complete && img.naturalWidth === 0) missing();
    else img.addEventListener("error", missing, { once: true });
  });

  // Usage dots: one mark per file allowed.
  deck.querySelectorAll(".dots[data-n]").forEach((el) => {
    const n = Number(el.dataset.n) || 0;
    el.innerHTML = "<span></span>".repeat(n);
  });

  const fromHash = parseInt(String(location.hash || "").slice(1), 10);
  show(Number.isFinite(fromHash) && fromHash >= 1 ? fromHash - 1 : 0);
})();
