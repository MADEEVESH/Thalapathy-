function setActiveNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".navlinks a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    a.classList.toggle("active", href === path);
  });
}

function initCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((wrap) => {
    const track = wrap.querySelector(".carousel-track");
    const prev = wrap.querySelector("[data-prev]");
    const next = wrap.querySelector("[data-next]");

    const scrollByAmount = () => {
      const item = track.querySelector(".carousel-item");
      if (!item) return 300;
      const style = getComputedStyle(track);
      const gap = parseInt(style.columnGap || style.gap || "12", 10);
      return item.getBoundingClientRect().width + gap;
    };

    prev?.addEventListener("click", () => track.scrollBy({ left: -scrollByAmount(), behavior: "smooth" }));
    next?.addEventListener("click", () => track.scrollBy({ left: scrollByAmount(), behavior: "smooth" }));

    // Keyboard accessibility
    wrap.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") track.scrollBy({ left: -scrollByAmount(), behavior: "smooth" });
      if (e.key === "ArrowRight") track.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initCarousels();
});
