// Open each new page at the top unless the link targets a section.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.addEventListener("load", () => {
  if (location.hash) return;
  window.scrollTo(0, 0);
  const top = document.querySelector(".top");
  if (top) top.scrollIntoView({ block: "start" });
});

// Click a screenshot to see it full size.
const box = document.getElementById("lightbox");
if (box && box.showModal) {
  const big = box.querySelector("img"), cap = box.querySelector(".lb-cap");
  document.querySelectorAll("img.shot").forEach((im) => {
    im.tabIndex = 0;
    im.setAttribute("role", "button");
    im.setAttribute("aria-label", "Enlarge: " + im.alt);
    const open = () => { big.src = im.currentSrc || im.src; big.alt = im.alt; cap.textContent = im.alt; box.showModal(); };
    im.addEventListener("click", open);
    im.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
  box.addEventListener("click", (e) => { if (e.target === box || e.target.closest(".lb-close")) box.close(); });
}

// Copy the email address.
document.querySelectorAll("button.copy").forEach((b) => {
  b.addEventListener("click", () => {
    const el = document.getElementById(b.dataset.copy);
    const done = () => { b.textContent = "Copied"; setTimeout(() => (b.textContent = "Copy"), 1600); };
    const pick = () => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
    if (navigator.clipboard) navigator.clipboard.writeText(el.textContent).then(done, pick); else pick();
  });
});

// Page views (GoatCounter). Only counts on the live site.
// Your own visits: open any page once with ?me=hide on each browser to stop counting it (?me=show undoes it).
(function () {
  if (location.hostname !== "sulhua.com" && location.hostname !== "www.sulhua.com") return;
  const me = new URLSearchParams(location.search).get("me");
  if (me === "show") document.cookie = "gc_skip=; path=/; max-age=0";
  if (me === "hide" || (me !== "show" && /(?:^|; )gc_skip=1/.test(document.cookie))) {
    document.cookie = "gc_skip=1; path=/; max-age=31536000; SameSite=Lax; Secure"; // re-set on each visit so Safari keeps it
    return;
  }
  const q = new URLSearchParams({
    p: location.pathname, t: document.title, r: document.referrer,
    q: location.search, s: [screen.width, screen.height, devicePixelRatio || 1].join(","), rnd: Math.random().toString(36).slice(2),
  });
  new Image().src = "https://soycold.goatcounter.com/count?" + q;
})();
