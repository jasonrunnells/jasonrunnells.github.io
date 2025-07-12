document.addEventListener("DOMContentLoaded", () => {
  // ======================
  // LIGHTBOX FUNCTIONALITY
  // ======================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");

  if (lightbox && lightboxImg && lightboxCaption) {
    document.querySelectorAll("img[data-lightbox], .lightbox-trigger").forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.dataset.caption || img.alt || "";
        lightbox.classList.add("show");
      });
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target === closeBtn) {
        lightbox.classList.remove("show");
        lightboxImg.src = "";
        lightboxCaption.textContent = "";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.classList.remove("show");
        lightboxImg.src = "";
        lightboxCaption.textContent = "";
      }
    });
  }

  // ======================
  // MOBILE NAVIGATION FUNCTIONALITY
  // ======================
  const hamburger = document.getElementById("hamburger");
  const siteNav = document.getElementById("site-nav");

  if (hamburger && siteNav) {
    const mobileNavOverlay = document.createElement("div");
    mobileNavOverlay.className = "mobile-nav-overlay";
    document.body.appendChild(mobileNavOverlay);

    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      siteNav.setAttribute("aria-hidden", isExpanded);
      mobileNavOverlay.classList.toggle("active", !isExpanded);
      document.body.style.overflow = isExpanded ? "" : "hidden";
    });

    mobileNavOverlay.addEventListener("click", () => {
      hamburger.setAttribute("aria-expanded", "false");
      siteNav.setAttribute("aria-hidden", "true");
      mobileNavOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });

    document.querySelectorAll(".site-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", "false");
        siteNav.setAttribute("aria-hidden", "true");
        mobileNavOverlay.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // ======================
  // SCROLL REVEAL ANIMATIONS
  // ======================
  function observeReveal(selector) {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    elements.forEach((el) => observer.observe(el));
  }

  observeReveal(".reveal");
  observeReveal(".reveal2");

  // ======================
  // SMOOTH SCROLLING FOR ANCHOR LINKS (100px offset)
  // ======================
  const OFFSET = 100;
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.href.includes("jasonrunnells.github.io")) return;
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const top = targetElement.getBoundingClientRect().top + window.pageYOffset - OFFSET;
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    });
  });
});
