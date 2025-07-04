document.addEventListener('DOMContentLoaded', function() {
    // Add language translations for team section
// Obtener el idioma del navegador (puede ser en formato 'es', 'es-ES', 'en-US', etc.)
const browserLanguage = navigator.language || navigator.userLanguage;

// Normalizar el idioma (tomar solo los primeros 2 caracteres para comparar)
const languageCode = browserLanguage.split('-')[0].toLowerCase();

// Asignar el idioma según la detección (solo soportamos 'es' y 'en')
let currentLanguage = 'es'; // Por defecto español


    const teamTranslations = {
        'es': {
            'team-title': 'Nuestro Equipo Directivo',
            'commercial-director': 'Director Comercial',
            'ID-director': 'Director I+D',
            'marketing-director': 'Directora Marketing',
            'director-negocio': 'Director de Negocios'
        },
        'en': {
            'team-title': 'Our Executive Team',
            'commercial-director': 'Commercial Director',
            'ID-director': 'I+D Director',
            'marketing-director': 'Marketing Director',
            'director-negocio': 'Business Director '
        }
    };
    if (languageCode !== 'es') {
        currentLanguage = 'en'; // Español si el navegador está en español
        updateTeamTranslations(currentLanguage)
    }
    
    // Function to update translations (reused from main.js but focused on team section)
    function updateTeamTranslations(language) {
        document.querySelectorAll('#equipo [data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (teamTranslations[language] && teamTranslations[language][key]) {
                element.textContent = teamTranslations[language][key];
            }
        });
    }
    
    // Listen for language change events
    window.addEventListener('languageChanged', function(e) {
        updateTeamTranslations(e.detail.language);
    });
    
    // Optional: Add interactive features for team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            // Future interactive features can be added here
        });
    });
});