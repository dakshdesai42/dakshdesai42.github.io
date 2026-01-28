// =========================================
// DAKSH DESAI PORTFOLIO - MODERN EDITION
// =========================================

// Utility: Check for reduced motion preference
const prefersReducedMotion = () => 
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// =========================================
// LOADING SCREEN
// =========================================

const initLoader = () => {
  const loader = document.getElementById('loader');
  const pageWrapper = document.getElementById('page-wrapper');
  
  if (!loader || !pageWrapper) return;
  
  // Create floating particles for loader
  createParticles();
  
  // Reduced minimum load time for better UX
  const minLoadTime = prefersReducedMotion() ? 0 : 1200;
  const startTime = Date.now();
  
  const hideLoader = () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minLoadTime - elapsed);
    
    setTimeout(() => {
      loader.classList.add('hidden');
      pageWrapper.classList.add('visible');
      
      // Remove loader from DOM after transition
      setTimeout(() => {
        loader.remove();
      }, 600);
    }, remaining);
  };
  
  // Hide loader when page is fully loaded
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
};

// Create floating particles for loader background
const createParticles = () => {
  const container = document.getElementById('particles');
  if (!container || prefersReducedMotion()) return;
  
  const particleCount = 15;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    particle.style.animationDuration = `${2 + Math.random() * 2}s`;
    container.appendChild(particle);
  }
};

// =========================================
// FOOTER YEAR
// =========================================

const initYear = () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
};

// =========================================
// CARD SPOTLIGHT EFFECT
// =========================================

const initCardSpotlight = () => {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });
};

// =========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =========================================

const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        
        // Close mobile menu if open
        const nav = document.getElementById('nav-menu');
        const toggle = document.querySelector('.mobile-toggle');
        if (nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          toggle.classList.remove('active');
          document.body.style.overflow = '';
        }

        target.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// =========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// =========================================

const initScrollAnimations = () => {
  if (prefersReducedMotion()) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Only observe sections (cards now have CSS animations)
  document.querySelectorAll('[data-section]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
  
  // Add CSS for in-view state
  const style = document.createElement('style');
  style.textContent = `
    .in-view {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
};

// =========================================
// HEADER SCROLL BEHAVIOR
// =========================================

const initHeaderScroll = () => {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScroll = 0;
  let ticking = false;
  
  const updateHeader = () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.background = 'rgba(3, 6, 15, 0.92)';
      header.style.backdropFilter = 'blur(20px)';
    } else {
      header.style.background = 'transparent';
      header.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
};

// =========================================
// CURSOR GLOW EFFECT
// =========================================

const initCursorGlow = () => {
  if (prefersReducedMotion()) return;
  
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(25, 103, 210, 0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glow);
  
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
  
  const animate = () => {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(animate);
  };
  
  animate();
};

// =========================================
// PARALLAX STARFIELD - FIXED VERSION
// =========================================

const initParallaxStarfield = () => {
  if (prefersReducedMotion()) return;

  const starfield = document.querySelector('.starfield');
  const nebula = document.querySelector('.nebula');
  
  // Check if at least one element exists
  if (!starfield && !nebula) return;

  const root = document.documentElement;
  const maxOffset = 25; // Maximum parallax offset in pixels

  // Track mouse position
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;
  let isRunning = false;

  // Calculate normalized mouse position and set target
  const onMouseMove = (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Normalize to -1 to 1 range
    const normalizedX = (e.clientX - centerX) / centerX;
    const normalizedY = (e.clientY - centerY) / centerY;
    
    // Calculate target offset
    targetX = normalizedX * maxOffset;
    targetY = normalizedY * maxOffset;

    // Start animation loop if not already running
    if (!isRunning) {
      isRunning = true;
      rafId = requestAnimationFrame(animateParallax);
    }
  };

  // Smooth animation loop with lerping
  const animateParallax = () => {
    // Lerp towards target (easing factor 0.08 for smooth movement)
    const easing = 0.08;
    currentX += (targetX - currentX) * easing;
    currentY += (targetY - currentY) * easing;

    // Update CSS custom properties
    root.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`);
    root.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`);

    // Continue animation if there's still movement needed
    const deltaX = Math.abs(targetX - currentX);
    const deltaY = Math.abs(targetY - currentY);
    
    if (deltaX > 0.01 || deltaY > 0.01) {
      rafId = requestAnimationFrame(animateParallax);
    } else {
      isRunning = false;
    }
  };

  // Reset parallax when mouse leaves window
  const onMouseLeave = () => {
    targetX = 0;
    targetY = 0;
    
    if (!isRunning) {
      isRunning = true;
      rafId = requestAnimationFrame(animateParallax);
    }
  };

  // Pause animation when tab is not visible
  const onVisibilityChange = () => {
    if (document.hidden) {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
        isRunning = false;
      }
    }
  };

  // Event listeners
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('visibilitychange', onVisibilityChange);

  // Initial setup - ensure CSS variables exist
  root.style.setProperty('--parallax-x', '0px');
  root.style.setProperty('--parallax-y', '0px');
};

// =========================================
// MOBILE MENU TOGGLE
// =========================================

const initMobileMenu = () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.getElementById('nav-menu');
  
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('active');
    
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    document.body.style.overflow = isOpen ? '' : 'hidden';
    
    // Accessibility
    toggle.setAttribute('aria-expanded', !isOpen);
  });
};

// =========================================
// COPY EMAIL TO CLIPBOARD
// =========================================

const initCopyEmail = () => {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = 'ddesai35@asu.edu';
    
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('Failed to copy email.');
    }
  });
};

const showToast = (message) => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
};

// =========================================
// INITIALIZE ALL
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initYear();
  initCardSpotlight();
  initSmoothScroll();
  initScrollAnimations();
  initHeaderScroll();
  initCursorGlow();
  initParallaxStarfield();
  initMobileMenu();
  initCopyEmail();
});

// Handle page visibility changes (now handled in parallax function)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // Resume animations if needed
  }
});