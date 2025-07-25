// New file for typing animation logic
document.addEventListener('DOMContentLoaded', function() {
  setupHeroTitle('es'); // Default language on load

  window.addEventListener('languageChanged', function(e) {
    setupHeroTitle(e.detail.language);
  });
});

function setupHeroTitle(language) {
  const heroTitle = document.querySelector('#hero h1');
  const translations = {
    es: {
      'hero-title-1': 'Desarrollo de Software',
      'hero-title-2': 'y paginas webs'
    },
    en: {
      'hero-title-1': 'Custom Software and',
      'hero-title-2': 'Website Development'
    }
  };

  const titleLines = [
    translations[language]['hero-title-1'],
    translations[language]['hero-title-2']
  ];

  // Clear existing title content
  heroTitle.innerHTML = '';

  // Create title structure
  titleLines.forEach((line, index) => {
    const lineDiv = document.createElement('div');
    lineDiv.className = `hero-title-line ${index === 0 ? 'first-line' : 'second-line'}`;

    const span = document.createElement('span');
    span.className = 'typing-part';
    span.style.opacity = '0';
    span.textContent = line;

    lineDiv.appendChild(span);
    heroTitle.appendChild(lineDiv);

    // Animate each line with delay
    setTimeout(() => {
      span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      span.style.opacity = '1';
      span.style.transform = 'translateY(0)';
    }, index * 300);
  });
}