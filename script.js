document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  // ==== Sticky Header ====
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    });
  }

  // ==== Mobile Navigation (Burger Menu) ====
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isNavOpen = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isNavOpen);
    });

    // Close menu when a link is clicked
    navMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ==== Hero Slider ====
  const hero = document.querySelector(".hero");
  if (hero) {
    const slides = document.querySelectorAll(".hero-slide");
    const nextBtn = document.querySelector(".hero-nav-btn.next");
    const prevBtn = document.querySelector(".hero-nav-btn.prev");
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(slideIndex) {
      if (slides.length === 0) return;
      slides[currentSlide].classList.remove("active");
      currentSlide = (slideIndex + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
    }

    function startSlideShow() {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    }

    function stopSlideShow() {
      clearInterval(slideInterval);
    }

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener("click", () => {
        goToSlide(currentSlide + 1);

        startSlideShow();
      });

      prevBtn.addEventListener("click", () => {
        goToSlide(currentSlide - 1);

        startSlideShow();
      });
    }

    hero.addEventListener("mouseenter", stopSlideShow);
    hero.addEventListener("mouseleave", startSlideShow);

    startSlideShow();
  }

  // ==== Services Accordion ====
  const serviceItems = document.querySelectorAll(".service-item");
  serviceItems.forEach((item) => {
    const header = item.querySelector(".service-header");
    if (header) {
      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        serviceItems.forEach((i) => {
          if (i !== item) {
            i.classList.remove("active");
            i.querySelector(".service-header").setAttribute(
              "aria-expanded",
              "false"
            );
          }
        });

        item.classList.toggle("active");
        header.setAttribute("aria-expanded", !isOpen);
      });
    }
  });

  // ==== Fade / Zoom‑in on Scroll =====
  const animSections = document.querySelectorAll(".fade-in-section, .zoom-in");

  function animateOnScroll(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => entry.target.classList.add("visible"));
        observer.unobserve(entry.target);
      }
    });
  }

  const io = new IntersectionObserver(animateOnScroll, {
    rootMargin: "0px",
    threshold: 0.1,
  });
  animSections.forEach((el) => io.observe(el));

  // ==== Separate Animation for Review Box ====
  const reviewBox = document.querySelector(".review-box");
  if (reviewBox) {
    const reviewBoxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            reviewBoxObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    reviewBoxObserver.observe(reviewBox);
  }

  // ==== Form Validation: Disable/Enable Submit Button ====
  const bookingForm = document.querySelector(".booking-form");
  if (bookingForm) {
    const consentCheckbox = bookingForm.querySelector(
      '.consent input[type="checkbox"]'
    );
    const submitButton = bookingForm.querySelector(".btn-send");

    if (consentCheckbox && submitButton) {
      submitButton.disabled = !consentCheckbox.checked;

      consentCheckbox.addEventListener("change", () => {
        submitButton.disabled = !consentCheckbox.checked;
      });
    }
  }
});
