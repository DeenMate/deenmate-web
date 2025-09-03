/*
  DeenMate — Coming Soon scripts
  - Countdown timer (optional)
  - Custom interactive cursor + sparkles
  - Lightweight, no dependencies
*/

(function () {
  "use strict";

  // ---------------------------
  // Helpers
  // ---------------------------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // ---------------------------
  // Footer year
  // ---------------------------
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---------------------------
  // Countdown (Optional)
  // Set your target date below. Set to null to hide.
  // ---------------------------
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30); // Launch in 30 days

  const countdownEl = $("#countdown");
  const dd = $("#dd");
  const hh = $("#hh");
  const mm = $("#mm");
  const ss = $("#ss");

  function startCountdown() {
    if (!countdownEl || !dd || !hh || !mm || !ss) return;
    countdownEl.hidden = false;

    const tick = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate.getTime() - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      dd.textContent = String(days).padStart(2, "0");
      hh.textContent = String(hours).padStart(2, "0");
      mm.textContent = String(minutes).padStart(2, "0");
      ss.textContent = String(seconds).padStart(2, "0");

      if (diff <= 0) {
        clearInterval(timer);
      }
    };

    tick();
    const timer = setInterval(tick, 1000);
  }

  startCountdown();

  // ---------------------------
  // Newsletter signup via Google Apps Script
  // ---------------------------
  const form = $("#signup");
  const email = $("#email");
  if (form && email) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const value = String(email.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        email.focus();
        email.setCustomValidity("Please enter a valid email address");
        email.reportValidity();
        setTimeout(() => email.setCustomValidity(""), 1000);
        return;
      }

      // TODO: Replace with your Google Apps Script Web App URL
      const endpoint = "https://script.google.com/macros/s/AKfycbyfhank3mWcEbM97i0aP5ey9yljXwEZ0Nk4pnTHlCXMwoJ91vrJ0Yc038YnPU2jcm3jag/exec";
      
      try {
        const url = `${endpoint}?email=${encodeURIComponent(value)}&source=deenmate-web`;
        const res = await fetch(url, { method: "GET" });

        if (!res.ok) throw new Error("Bad response");
        
        form.reset();
        alert("Thanks! You're on the list.");
      } catch (err) {
        console.error("Signup error:", err);
        alert("Sorry, something went wrong. Please try again later.");
      }
    });
  }

  // ---------------------------
  // Custom cursor + sparkle particles
  // ---------------------------
  const cursor = $("#cursor");
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let rafId = 0;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateCursor() {
    cursorX = lerp(cursorX, mouseX, 0.18);
    cursorY = lerp(cursorY, mouseY, 0.18);
    if (cursor) {
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    }
    rafId = requestAnimationFrame(animateCursor);
  }

  function showCursor() { if (cursor) cursor.style.opacity = "1"; }
  function hideCursor() { if (cursor) cursor.style.opacity = "0"; }

  function spawnSparkle(x, y) {
    const s = document.createElement("div");
    s.className = "sparkle";
    const size = 3 + Math.random() * 5;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;

    document.body.appendChild(s);

    const angle = Math.random() * Math.PI * 2;
    const speed = 30 + Math.random() * 60;
    const life = 350 + Math.random() * 350;
    const start = performance.now();

    function frame(now) {
      const t = Math.min(1, (now - start) / life);
      const dx = Math.cos(angle) * speed * (1 - t);
      const dy = Math.sin(angle) * speed * (1 - t);
      s.style.transform = `translate(${dx}px, ${dy}px)`;
      s.style.opacity = String(1 - t);
      if (t < 1) requestAnimationFrame(frame); else s.remove();
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    showCursor();
    if (Math.random() < 0.25) spawnSparkle(mouseX, mouseY);
  });
  window.addEventListener("mouseenter", showCursor);
  window.addEventListener("mouseleave", hideCursor);

  animateCursor();
})();


