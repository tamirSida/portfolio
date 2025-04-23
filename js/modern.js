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

  // Scroll animations with Intersection Observer
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
    rootMargin: '0px 0px -100px 0px'
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

  // Smooth scroll polyfill
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
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