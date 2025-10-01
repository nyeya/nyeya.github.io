/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  // Removed legacy .header-toggle logic. Sidebar toggling is handled by #hamburger-btn below.

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        // This logic is no longer needed as .header-toggle is removed.
        // Keeping it for now in case it's re-introduced or if it's part of a larger refactor.
        // headerToggle(); 
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });


  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  // Removed duplicate Typed.js initialization. Only the DRY version at the bottom remains.

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  // Removed JS that programmatically scrolls to anchor links. CSS scroll-behavior: smooth will handle anchor navigation.

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// === BEGIN: Custom Scripts from index.html (with DRY/WET refactor) ===

// Theme toggler logic
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    function setTheme(dark) {
      if (dark) {
        body.classList.add('dark-theme');
        icon.classList.remove('bi-moon');
        icon.classList.add('bi-sun');
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
      } else {
        body.classList.remove('dark-theme');
        icon.classList.remove('bi-sun');
        icon.classList.add('bi-moon');
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
      }
    }
    const userPref = localStorage.getItem('theme');
    if (userPref === 'dark' || (!userPref && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme(true);
    } else {
      setTheme(false);
    }
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-theme');
      setTheme(isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
})();

// Sidebar toggle functionality (mobile nav)
(function() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const header = document.getElementById('header');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const body = document.body;
  if (hamburgerBtn && header && sidebarOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      header.classList.toggle('header-show');
      sidebarOverlay.classList.toggle('show');
      body.classList.toggle('sidebar-open');
    });
    sidebarOverlay.addEventListener('click', () => {
      header.classList.remove('header-show');
      sidebarOverlay.classList.remove('show');
      body.classList.remove('sidebar-open');
    });
    // Close sidebar when clicking a nav link on mobile
    document.querySelectorAll('.navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1200) {
          header.classList.remove('header-show');
          sidebarOverlay.classList.remove('show');
          body.classList.remove('sidebar-open');
        }
      });
    });
    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && window.innerWidth < 1200) {
        header.classList.remove('header-show');
        sidebarOverlay.classList.remove('show');
        body.classList.remove('sidebar-open');
      }
    });
    // Close sidebar when clicking the close button
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    if (sidebarCloseBtn) {
      sidebarCloseBtn.addEventListener('click', () => {
        header.classList.remove('header-show');
        sidebarOverlay.classList.remove('show');
        body.classList.remove('sidebar-open');
      });
    }
  }
})();

// Scroll progress bar (single implementation)
(function() {
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  if (scrollProgressBar) {
    function updateProgressBar() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgressBar.style.width = scrolled + '%';
    }
    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('resize', updateProgressBar);
    document.addEventListener('DOMContentLoaded', updateProgressBar);
    window.addEventListener('load', updateProgressBar);
  }
})();

// Animate progress bars in skills section (intersection observer + fallback)
(function() {
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress .progress-bar');
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('aria-valuenow') + '%';
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
    });
  }
  const skillsSection = document.querySelector('.skills-animation');
  if (skillsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateProgressBars();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    });
    observer.observe(skillsSection);
  } else {
    // Fallback: Animate progress bars on scroll
    let progressBarsAnimated = false;
    function checkProgressBarsOnScroll() {
      if (progressBarsAnimated) return;
      const skillsSection = document.querySelector('.skills-animation');
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          animateProgressBars();
          progressBarsAnimated = true;
          window.removeEventListener('scroll', checkProgressBarsOnScroll);
        }
      }
    }
    window.addEventListener('scroll', checkProgressBarsOnScroll);
    window.addEventListener('load', checkProgressBarsOnScroll);
  }
})();


// Typed.js initialization (with fallback)
(function() {
  try {
    if (document.querySelector('.typed')) {
      const typed = new Typed('.typed', {
        strings: ['Aspiring Data Scientist', 'Web Developer', 'Automation Enthusiast'],
        loop: true,
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  } catch (error) {
    console.warn('Typed.js initialization failed:', error);
  }
})();

// PureCounter initialization (with fallback)
(function() {
  try {
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }
  } catch (error) {
    console.warn('PureCounter initialization failed:', error);
  }
})();

// AOS initialization (with fallback)
(function() {
  try {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  } catch (error) {
    console.warn('AOS initialization failed:', error);
  }
})();

// Smooth scroll for scroll-to-top button
(function() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

// Custom Loader Typewriter for "De Nyeya"
(function() {
  const loaderTyped = document.getElementById('loader-typed');
  if (loaderTyped) {
    const text = "De Nyeya";
    let i = 0;
    function type() {
      if (i <= text.length) {
        loaderTyped.textContent = text.slice(0, i);
        i++;
        setTimeout(type, 120);
      } else {
        // Add shimmer effect after typing
        loaderTyped.innerHTML = `<span class="shimmer">${text}</span>`;
        // Fade in tagline
        setTimeout(() => {
          const tagline = document.querySelector('.loader-tagline');
          if (tagline) tagline.classList.add('visible');
        }, 400);
      }
    }
    type();
  }
})();