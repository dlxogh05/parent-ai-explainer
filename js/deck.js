/**
 * Deck controller — keyboard, hash, fullscreen, image load states
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
  let touchX = null;

  function clampIndex(n) {
    const len = slides.length;
    return ((n % len) + len) % len;
  }

  function updateChrome() {
    const total = slides.length;
    const current = index + 1;
    if (posEl) posEl.textContent = current + " / " + total;
    if (barEl) barEl.style.transform = "scaleX(" + current / total + ")";
    const title = slides[index].dataset.title || "슬라이드";
    document.title = title + " · 부모님께 설명하는 AI";
    if (liveEl) liveEl.textContent = title + ", " + current + "번째 슬라이드";
    history.replaceState(null, "", "#" + current);
  }

  function show(n, dir) {
    const next = clampIndex(n);
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    slides.forEach((slide, i) => {
      const on = i === next;
      slide.classList.toggle("is-active", on);
      slide.setAttribute("aria-hidden", on ? "false" : "true");
      if (!reduce && on && dir) {
        slide.classList.remove("is-enter-from-left", "is-enter-from-right");
        // force reflow for re-trigger
        void slide.offsetWidth;
        slide.classList.add(
          dir < 0 ? "is-enter-from-left" : "is-enter-from-right"
        );
        window.requestAnimationFrame(() => {
          slide.classList.remove("is-enter-from-left", "is-enter-from-right");
        });
      }
    });

    index = next;
    updateChrome();
  }

  function next() {
    show(index + 1, 1);
  }
  function prev() {
    show(index - 1, -1);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  }

  btnNext?.addEventListener("click", next);
  btnPrev?.addEventListener("click", prev);
  btnFs?.addEventListener("click", toggleFullscreen);

  window.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
      case " ":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        prev();
        break;
      case "Home":
        e.preventDefault();
        show(0, -1);
        break;
      case "End":
        e.preventDefault();
        show(slides.length - 1, 1);
        break;
      case "f":
      case "F":
        e.preventDefault();
        toggleFullscreen();
        break;
      default:
        break;
    }
  });

  window.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchend",
    (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].screenX - touchX;
      if (Math.abs(dx) > 56) {
        if (dx < 0) next();
        else prev();
      }
      touchX = null;
    },
    { passive: true }
  );

  // Image load: keep natural ratio; mark frames while loading
  deck.querySelectorAll(".figure__frame img").forEach((img) => {
    const frame = img.closest(".figure__frame");
    if (!frame) return;
    const done = () => frame.classList.remove("is-loading");
    if (!img.complete) {
      frame.classList.add("is-loading");
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    }
  });

  // Boot from hash
  const fromHash = parseInt(String(location.hash || "").replace("#", ""), 10);
  const start =
    Number.isFinite(fromHash) && fromHash >= 1 ? fromHash - 1 : 0;
  show(start, 0);
})();
