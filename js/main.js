// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-nav');
    document.body.classList.toggle('no-scroll');
    
    // Transform hamburger into X
    hamburger.classList.toggle('active');
  });
}

// Close mobile nav when clicking a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('mobile-nav')) {
      navLinks.classList.remove('mobile-nav');
      hamburger.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
});

// Add mobile nav styles dynamically
const style = document.createElement('style');
style.innerHTML = `
  .mobile-nav {
    display: flex !important;
    flex-direction: column;
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: var(--bg-dark);
    padding: 2rem;
    z-index: 99;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  
  .mobile-nav a {
    color: var(--text-white);
    font-size: 1.25rem;
  }
  
  .no-scroll {
    overflow: hidden;
  }
  
  .hamburger.active span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
    background-color: var(--primary);
  }
  
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
    background-color: var(--primary);
  }
  
  .accent {
    color: var(--accent);
  }
  
  .gradient-text {
    background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .section-subtitle {
    color: var(--primary);
    font-size: 1.1rem;
    margin-top: -1.5rem;
    font-weight: 500;
  }
  
  .tech-stats {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    text-align: center;
  }
  
  .stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--gray-600);
    font-weight: 500;
  }
  
  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .project-icon {
    width: 40px;
    height: 40px;
    background-color: rgba(0, 80, 255, 0.1);
    color: var(--primary);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
  }
  
  .timeline-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .timeline-tech span {
    background-color: rgba(0, 80, 255, 0.1);
    color: var(--primary);
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .talk-date {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--primary);
  }
  
  .availability {
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: rgba(0, 80, 255, 0.05);
    border-left: 3px solid var(--primary);
  }
  
  .availability-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  .status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--success);
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .footer-nav {
    display: flex;
    gap: 1.5rem;
  }
  
  .footer-nav a {
    color: var(--gray-400);
    transition: var(--transition);
  }
  
  .footer-nav a:hover {
    color: var(--text-white);
  }
  
  .footer-social {
    display: flex;
    gap: 1rem;
  }
  
  .footer-social a {
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--text-white);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--transition);
  }
  
  .footer-social a:hover {
    background-color: var(--primary);
    transform: translateY(-3px);
  }
  
  .scroll-down {
    margin-top: 3rem;
    color: var(--gray-300);
    font-size: 0.875rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: pulse 2s infinite;
  }
  
  .scroll-down i {
    margin-top: 0.5rem;
    font-size: 1.25rem;
  }
  
  @keyframes pulse {
    0% { transform: translateY(0); opacity: 1; }
    50% { transform: translateY(10px); opacity: 0.7; }
    100% { transform: translateY(0); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Initialize particles.js
if (document.getElementById('particles-js')) {
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
        value: '#0050ff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        },
      },
      opacity: {
        value: 0.3,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#0050ff',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
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
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
}

// Add scroll animation for navbar
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.style.boxShadow = 'var(--shadow-lg)';
    navbar.style.padding = '0.75rem 0';
    navbar.style.backdropFilter = 'blur(10px)';
    navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
  } else {
    navbar.style.boxShadow = 'var(--shadow)';
    navbar.style.padding = '1rem 0';
    navbar.style.backdropFilter = 'blur(5px)';
    navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
  }
  
  lastScrollTop = scrollTop;
  
  // Fade in elements on scroll
  fadeInElements();
});

// Fade in elements when they enter the viewport
function fadeInElements() {
  const elements = document.querySelectorAll('.fade-in');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Add fade-in class to elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section:not(.hero)');
  
  sections.forEach(section => {
    section.classList.add('fade-in');
  });
  
  // Add appropriate styles
  const fadeStyle = document.createElement('style');
  fadeStyle.innerHTML = `
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.active {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(fadeStyle);
  
  // Initial check for elements in viewport
  fadeInElements();
  
  // Handle project card clicks for locked and under development projects
  const lockedProjects = document.querySelectorAll('.project-card:not(a)');
  lockedProjects.forEach(card => {
    card.addEventListener('click', function() {
      // Determine message based on card class
      let message = '';
      let icon = '';
      
      if (card.classList.contains('under-dev-card')) {
        message = 'This project is currently under development';
        icon = 'fa-code-branch';
      } else {
        message = 'This project is classified';
        icon = 'fa-lock';
      }
      
      // Create a notification that appears briefly
      const notification = document.createElement('div');
      notification.className = 'project-notification';
      notification.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
      
      // Add notification styles
      const notificationStyle = document.createElement('style');
      notificationStyle.innerHTML = `
        .project-notification {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--bg-dark);
          color: var(--text-white);
          padding: 0.75rem 1.5rem;
          border-radius: 2rem;
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: slideUp 0.3s ease, slideDown 0.3s ease 2.7s forwards;
        }
        
        @keyframes slideUp {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translate(-50%, 0); opacity: 1; }
          to { transform: translate(-50%, 100%); opacity: 0; }
        }
      `;
      document.head.appendChild(notificationStyle);
      
      document.body.appendChild(notification);
      
      // Add cursor style to indicate clickable card
      document.head.appendChild(document.createElement('style')).textContent = `
        .project-card:not(a) {
          cursor: pointer;
        }
      `;
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    });
  });
});

// Initialize form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real implementation, you would send the form data to your backend
    // For now, simulate a successful submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
      this.reset();
      submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      
      // Add success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Your message has been sent successfully! I'll get back to you soon.</p>
      `;
      
      // Add success message styles
      const successStyle = document.createElement('style');
      successStyle.innerHTML = `
        .success-message {
          margin-top: 1rem;
          padding: 1rem;
          background-color: rgba(16, 185, 129, 0.1);
          border-left: 3px solid var(--success);
          display: flex;
          align-items: center;
          border-radius: 0.25rem;
          animation: fadeIn 0.5s ease;
        }
        
        .success-message i {
          color: var(--success);
          font-size: 1.5rem;
          margin-right: 1rem;
        }
        
        .success-message p {
          margin: 0;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(successStyle);
      
      contactForm.appendChild(successMessage);
      
      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          if (contactForm.contains(successMessage)) {
            contactForm.removeChild(successMessage);
          }
        }, 5000);
      }, 3000);
    }, 1500);
  });
}

// Gallery item click handler for project page
const galleryItems = document.querySelectorAll('.gallery-item');
if (galleryItems.length > 0) {
  // Simple lightbox effect
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const caption = this.querySelector('.gallery-caption').textContent;
      
      // Create lightbox elements
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      
      const lightboxContent = document.createElement('div');
      lightboxContent.className = 'lightbox-content';
      
      const img = document.createElement('img');
      img.src = imgSrc;
      
      const lightboxCaption = document.createElement('div');
      lightboxCaption.className = 'lightbox-caption';
      lightboxCaption.textContent = caption;
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'lightbox-close';
      closeBtn.innerHTML = '&times;';
      
      // Assemble and append to body
      lightboxContent.appendChild(img);
      lightboxContent.appendChild(lightboxCaption);
      lightboxContent.appendChild(closeBtn);
      lightbox.appendChild(lightboxContent);
      document.body.appendChild(lightbox);
      
      // Prevent scrolling
      document.body.classList.add('no-scroll');
      
      // Add lightbox styles
      const lightboxStyle = document.createElement('style');
      lightboxStyle.innerHTML = `
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }
        
        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
          animation: zoomIn 0.3s ease;
        }
        
        .lightbox-content img {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 0.25rem;
          box-shadow: 0 0 30px rgba(0, 80, 255, 0.3);
        }
        
        .lightbox-caption {
          color: white;
          padding: 1rem 0;
          text-align: center;
        }
        
        .lightbox-close {
          position: absolute;
          top: -2rem;
          right: -2rem;
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        
        .lightbox-close:hover {
          color: var(--primary);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(lightboxStyle);
      
      // Close lightbox
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(lightbox);
        document.body.classList.remove('no-scroll');
      });
      
      // Close on click outside image
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          document.body.removeChild(lightbox);
          document.body.classList.remove('no-scroll');
        }
      });
    });
  });
}

// Initialize particle.js for tech background effect if available
document.addEventListener('DOMContentLoaded', function() {
    // Existing functionality
    
    // Project Cards Animation
    initProjectCards();
});

// Initialize project cards with 3D hover effects and staggered animation
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Set animation delay based on card index
    projectCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
        
        // Add 3D hover effect
        if (card.classList.contains('card-3d-effect')) {
            // Mouse movement 3D effect
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the card
                const y = e.clientY - rect.top; // y position within the card
                
                // Calculate rotation based on mouse position
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Limit rotation to a small range (5 degrees)
                const rotateY = ((x - centerX) / centerX) * 5;
                const rotateX = ((centerY - y) / centerY) * 5;
                
                // Apply the rotation transform
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Add depth to inner elements
                const projectImage = this.querySelector('.project-image');
                const projectInfo = this.querySelector('.project-info');
                
                if (projectImage) {
                    projectImage.style.transform = `translateZ(20px)`;
                }
                
                if (projectInfo) {
                    projectInfo.style.transform = `translateZ(10px)`;
                }
            });
            
            // Reset on mouse leave
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                
                const projectImage = this.querySelector('.project-image');
                const projectInfo = this.querySelector('.project-info');
                
                if (projectImage) {
                    projectImage.style.transform = 'translateZ(0)';
                }
                
                if (projectInfo) {
                    projectInfo.style.transform = 'translateZ(0)';
                }
            });
        }
    });
}

// Fix for the duplicate CSS for project cards in the main CSS file
document.addEventListener('DOMContentLoaded', function() {
    // Remove duplicate animation property from project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Ensure proper animation stacking
        card.style.animationDelay = `${parseFloat(card.style.animationDelay || 0) + (0.1 * Array.from(projectCards).indexOf(card))}s`;
    });
}); 