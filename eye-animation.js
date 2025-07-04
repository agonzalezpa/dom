document.addEventListener('DOMContentLoaded', function() {
  // Create the 3D eye container
  const eyeContainer = document.createElement('div');
  eyeContainer.className = 'eye-container';

  // Create the eye parts (sclera, iris, pupil, eyelids) and hover text
  eyeContainer.innerHTML = `
    <div class="eye">
      <div class="sclera">
        <div class="iris">
          <div class="pupil"></div>
          <div class="highlight"></div>
        </div>
      </div>
      <div class="eyelid top"></div>
      <div class="eyelid bottom"></div>
      <div class="eye-hover-text" data-lang="eye-hover-text">Viendo más allá</div>
    </div>
  `;

  document.getElementById('hero').appendChild(eyeContainer);

  // Get hover text element
  const hoverText = eyeContainer.querySelector('.eye-hover-text');

  // Add event listeners for hover effect
  eyeContainer.addEventListener('mouseover', () => {
    // Example: You can add more actions on hover start if needed
  });

  eyeContainer.addEventListener('mouseout', () => {
    // Example: Revert any changes made on mouseout if needed
  });

  // Create a typing animation for the hero title
  const heroTitle = document.querySelector('#hero h1');
  const originalTitleHTML = heroTitle.innerHTML;

  // Store the title content instead of clearing it
  // Temporarily clear the title for the typing effect
  // heroTitle.innerHTML = ''; <-- Removed this line that was causing issues

  // Set up the typing animation
  let titleParts = [
    '<span data-lang="hero-title-1">Redefiniendo los límites:</span>',
    '<span class="highlight" data-lang="hero-title-2">Software que Potencia y Transforma</span>'
  ];

  // Clear existing title content and build with data-lang attributes from titleParts
  heroTitle.innerHTML = ''; // Clear existing content
  titleParts.forEach(partHTML => {
    heroTitle.innerHTML += partHTML; // Append each part
  });

  // Start eye animation - blink occasionally
  setTimeout(blinkEye, 1000);

  // Track mouse for eye movement
  document.addEventListener('mousemove', trackEyeMovement);

  // Functions for eye animation
  function blinkEye() {
    const topLid = document.querySelector('.eyelid.top');
    const bottomLid = document.querySelector('.eyelid.bottom');

    // Close eye
    topLid.style.transform = 'translateY(50%)';
    bottomLid.style.transform = 'translateY(-50%)';

    // Open eye after a short delay
    setTimeout(() => {
      topLid.style.transform = 'translateY(-100%)';
      bottomLid.style.transform = 'translateY(100%)';

      // Schedule next blink
      setTimeout(blinkEye, Math.random() * 5000 + 1000);
    }, 150);
  }

  function trackEyeMovement(e) {
    const iris = document.querySelector('.iris');
    const eyeRect = document.querySelector('.eye').getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    // Calculate angle to mouse
    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);

    // Limit eye movement range
    const distance = Math.min(10, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 15);

    // Move iris
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    iris.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }

  // Language change handler to update hover text
  window.addEventListener('languageChanged', function(e) {
    const language = e.detail.language;
    const translations = {
      es: {
        'eye-hover-text': 'Vemos más allá'
      },
      en: {
        'eye-hover-text': 'We see beyond'
      }
    };
    if (translations[language] && translations[language]['eye-hover-text']) {
      hoverText.textContent = translations[language]['eye-hover-text'];
    }
  });
});