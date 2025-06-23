/**
 * Tamir Sida Portfolio - Modern JS
 * Handles animations, interactions and dynamic elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  });

  // Prevent body scroll when mobile menu is open
  const body = document.body;
  const originalStyle = window.getComputedStyle(body).overflow;
  
  hamburger?.addEventListener('click', function() {
    if (this.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = originalStyle;
    }
  });

  // Mobile touch improvements for project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    let touchStartY = 0;
    let touchEndY = 0;
    
    card.addEventListener('touchstart', (e) => {
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    card.addEventListener('touchend', (e) => {
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > swipeThreshold) {
        // Add visual feedback for swipe
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
          card.style.transform = '';
        }, 150);
      }
    }
  });

  // Mobile-optimized scroll animations
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Reduced margin for mobile
  });
  
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });

  // Active navigation highlighting based on scroll position
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // Mobile-specific smooth scrolling
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Mobile performance optimizations
  let ticking = false;
  
  function updateOnScroll() {
    // Any scroll-based updates can go here
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });

  // Mobile viewport height fix for iOS Safari
  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);

  // Count-up animation for metrics
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + (target === 100 ? '%' : '+');
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + (target === 100 ? '%' : '+');
      }
    }
    
    updateCounter();
  }

  // Trigger count-up animation when metrics come into view
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const metricNumbers = entry.target.querySelectorAll('.metric-number');
        metricNumbers.forEach(metric => {
          const text = metric.textContent;
          const number = parseInt(text.replace(/[^0-9]/g, ''));
          animateCounter(metric, number);
        });
        metricsObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  const heroMetrics = document.querySelector('.hero-metrics');
  if (heroMetrics) {
    metricsObserver.observe(heroMetrics);
  }

  // About section read more/less functionality
  window.toggleAboutText = function() {
    const aboutTextFull = document.querySelector('.about-text-full');
    const readMoreText = document.querySelector('.read-more-text');
    const readLessText = document.querySelector('.read-less-text');
    const readMoreIcon = document.querySelector('.read-more-icon');
    const readLessIcon = document.querySelector('.read-less-icon');
    
    if (aboutTextFull.style.display === 'none') {
      // Show full text
      aboutTextFull.style.display = 'block';
      readMoreText.style.display = 'none';
      readLessText.style.display = 'inline';
      readMoreIcon.style.display = 'none';
      readLessIcon.style.display = 'inline';
      
      // Smooth scroll to show the new content
      setTimeout(() => {
        aboutTextFull.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }, 100);
    } else {
      // Hide full text
      aboutTextFull.style.display = 'none';
      readMoreText.style.display = 'inline';
      readLessText.style.display = 'none';
      readMoreIcon.style.display = 'inline';
      readLessIcon.style.display = 'none';
    }
  };

  // Project cards read more/less functionality
  window.toggleProjectDescription = function(button) {
    const projectCard = button.closest('.project-card');
    const descriptionFull = projectCard.querySelector('.project-description-full');
    const readMoreText = button.querySelector('.read-more-text');
    const readLessText = button.querySelector('.read-less-text');
    const readMoreIcon = button.querySelector('.read-more-icon');
    const readLessIcon = button.querySelector('.read-less-icon');
    
    if (descriptionFull.style.display === 'none') {
      // Show full text
      descriptionFull.style.display = 'block';
      readMoreText.style.display = 'none';
      readLessText.style.display = 'inline';
      readMoreIcon.style.display = 'none';
      readLessIcon.style.display = 'inline';
      
      // Smooth scroll to show the new content
      setTimeout(() => {
        descriptionFull.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }, 100);
    } else {
      // Hide full text
      descriptionFull.style.display = 'none';
      readMoreText.style.display = 'inline';
      readLessText.style.display = 'none';
      readMoreIcon.style.display = 'inline';
      readLessIcon.style.display = 'none';
    }
  };

  // Particles background for hero section
  const particlesContainer = document.getElementById('particles-js');
  
  if (particlesContainer && typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#3b82f6'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#3b82f6',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }

  // Form submission handling with validation
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      // Clear previous error states
      const formControls = contactForm.querySelectorAll('.form-control');
      formControls.forEach(control => {
        control.classList.remove('error');
      });
      
      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        isValid = false;
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        emailInput.classList.add('error');
        isValid = false;
      }
      
      if (!messageInput.value.trim()) {
        messageInput.classList.add('error');
        isValid = false;
      }
      
      if (isValid) {
        // Simulate form submission - replace with actual form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate API call with timeout
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          contactForm.reset();
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }, 3000);
        }, 1500);
      }
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  // Gallery image lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').getAttribute('src');
      const caption = this.querySelector('.gallery-caption').textContent;
      
      // Create lightbox elements
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close"><i class="fas fa-times"></i></button>
          <img src="${imgSrc}" alt="${caption}">
          <div class="lightbox-caption">${caption}</div>
        </div>
      `;
      
      // Add to DOM
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      // Fade in effect
      setTimeout(() => {
        lightbox.classList.add('active');
      }, 10);
      
      // Close button event
      lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.classList.remove('active');
        
        setTimeout(() => {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        }, 300);
      });
      
      // Click outside to close
      lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
          lightbox.classList.remove('active');
          
          setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
          }, 300);
        }
      });
    });
  });

  // Type effect for hero section (if using)
  const typeElement = document.querySelector('.type-effect');
  
  if (typeElement && typeof Typed !== 'undefined') {
    new Typed(typeElement, {
      strings: [
        'Building defense technology.',
        'Creating secure systems.',
        'Innovating for the future.'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 500,
      loop: true
    });
  }
}); 