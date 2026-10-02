/**
 * Deck controller — keyboard, hash, fullscreen, speaker notes, image ratios
 */
(function () {
  "use strict";

  const deck = document.getElementById("deck");
  if (!deck) return;

  const slides = Array.from(deck.querySelectorAll(".slide"));
  const posEl = document.getElementById("pos");
  const barEl = document.getElementById("bar");
  const liveEl = document.getElementById("live");
  const notesEl = document.getElementById("notes");
  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");
  const btnNote = document.getElementById("note");
  const btnFs = document.getElementById("fs");

  let index = 0;
  let notesOn = false;
  let touchX = null;
  let idleTimer = null;

  function clampIndex(n) {
    return Math.max(0, Math.min(slides.length - 1, n));
  }

  function updateNotes() {
    if (!notesEl) return;
    const src = slides[index].querySelector(".notes");
    const text = src ? src.textContent.trim() : "";
    notesEl.textContent = text;
    notesEl.hidden = !notesOn || !text;
    btnNote?.setAttribute("aria-pressed", notesOn ? "true" : "false");
  }

  function updateChrome() {
    const total = slides.length;
    const current = index + 1;
    if (posEl) posEl.textContent = current + " / " + total;
    if (barEl) barEl.style.transform = "scaleX(" + current / total + ")";
    if (btnPrev) btnPrev.disabled = index === 0;
    if (btnNext) btnNext.disabled = index === total - 1;
    const title = slides[index].dataset.title || "슬라이드";
    document.title = title + " · 부모님께 설명하는 AI";
    if (liveEl) liveEl.textContent = title + ", " + current + "번째 슬라이드";
    if (location.hash !== "#" + current) history.replaceState(null, "", "#" + current);
    updateNotes();
  }

  function show(n) {
    index = clampIndex(n);
    slides.forEach((slide, i) => {
      const on = i === index;
      slide.classList.toggle("is-active", on);
      slide.setAttribute("aria-hidden", on ? "false" : "true");
      if (on) slide.scrollTop = 0;
    });
    updateChrome();
  }

  function next() {
    show(index + 1);
  }
  function prev() {
    show(index - 1);
  }

  function toggleNotes() {
    notesOn = !notesOn;
    updateNotes();
  }

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
  btnNote?.addEventListener("click", toggleNotes);
  btnFs?.addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", wake);
  window.addEventListener("mousemove", wake, { passive: true });

  window.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    // let Space/Enter activate a focused control button instead of paging twice
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
      case "n":
      case "N":
        e.preventDefault();
        toggleNotes();
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

  window.addEventListener("hashchange", () => {
    const n = parseInt(location.hash.slice(1), 10);
    if (Number.isFinite(n) && n - 1 !== index) show(n - 1);
  });

  // Frames take each image's own ratio (from width/height), so nothing is cropped or letterboxed.
  deck.querySelectorAll(".figure__fit").forEach((fit) => {
    const img = fit.querySelector("img");
    if (!img) return;
    const w = Number(img.getAttribute("width"));
    const h = Number(img.getAttribute("height"));
    if (w > 0 && h > 0) fit.style.setProperty("--ar", String(w / h));

    const frame = img.closest(".figure__frame");
    if (!frame || img.complete) return;
    const done = () => frame.classList.remove("is-loading");
    frame.classList.add("is-loading");
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });

  const fromHash = parseInt(String(location.hash || "").slice(1), 10);
  show(Number.isFinite(fromHash) && fromHash >= 1 ? fromHash - 1 : 0);
})();
