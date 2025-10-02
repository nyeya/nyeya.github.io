
(function() {
  "use strict";
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
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);


  if (typeof Waypoint !== 'undefined') {
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
  }

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
        if (initIsotope) {
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
        } else {
          console.warn('Isotope not initialized yet; filter ignored');
        }
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

(function(){
  'use strict';

  function el(sel, ctx){ return (ctx || document).querySelector(sel); }
  function show(form, sel){ el(sel, form)?.classList.add('d-block'); }
  function hide(form, sel){ el(sel, form)?.classList.remove('d-block'); }

  function handleResponse(response){
    if(!response.ok) return Promise.reject(new Error(response.status + ' ' + response.statusText));
    const ct = response.headers.get('content-type') || '';
    if(ct.indexOf('application/json') !== -1) return response.json();
    return response.text();
  }

  function submitForm(event){
    event.preventDefault();
    const form = event.currentTarget;
    const action = form.getAttribute('action');
    if(!action) { hide(form, '.loading'); show(form, '.error-message'); el('.error-message', form).textContent = 'Form action not set'; return; }

    hide(form, '.error-message'); hide(form, '.sent-message'); show(form, '.loading');

    fetch(action, { method: 'POST', body: new FormData(form), headers: {'X-Requested-With': 'XMLHttpRequest'} })
      .then(handleResponse)
      .then(data => {
        hide(form, '.loading');
        if(typeof data === 'object'){
          if(data.ok){ show(form, '.sent-message'); form.reset(); return; }
          const err = data.error || data.errors || JSON.stringify(data);
          throw new Error(err);
        }
        if(typeof data === 'string'){
          if(data.trim() === 'OK'){ show(form, '.sent-message'); form.reset(); return; }
          throw new Error(data || 'Unexpected response');
        }
        throw new Error('Unknown response');
      })
      .catch(err => {
        hide(form, '.loading');
        const em = el('.error-message', form);
        if(em){ em.textContent = err.message || err; em.classList.add('d-block'); }
      });
  }

  Array.from(document.querySelectorAll('.formspree-form')).forEach(f => f.removeEventListener('submit', submitForm));
  Array.from(document.querySelectorAll('.formspree-form')).forEach(f => f.addEventListener('submit', submitForm));
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