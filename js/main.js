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
    background-color: white;
    padding: 2rem;
    z-index: 99;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  
  .no-scroll {
    overflow: hidden;
  }
  
  .hamburger.active span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
`;
document.head.appendChild(style);

// Add scroll animation for navbar
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.style.boxShadow = 'var(--shadow-lg)';
    navbar.style.padding = '0.75rem 0';
  } else {
    navbar.style.boxShadow = 'var(--shadow)';
    navbar.style.padding = '1rem 0';
  }
  
  lastScrollTop = scrollTop;
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
      
      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
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
        }
        
        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
        }
        
        .lightbox-content img {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 0.25rem;
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