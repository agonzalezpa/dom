document.addEventListener('DOMContentLoaded', function() {
    const testimonialsDataEs = [
        {
            quote: "Con DOM, redujimos un 35% los tiempos de entrega gracias a su software de gestión personalizado.",
            author: "Carlos Méndez",
            position: "CIO",
            company: "LogísticaTech"
        },
        {
            quote: "La implementación de Odoo ERP transformó nuestra gestión de inventario, ahorrando hasta un 40% en costos operativos.",
            author: "María González",
            position: "Gerente de Operaciones",
            company: "RetailPro"
        },
        {
            quote: "Su consultoría tecnológica nos ayudó a definir un roadmap claro para nuestra transformación digital, generando resultados desde el primer trimestre.",
            author: "Alejandro Duarte",
            position: "CEO",
            company: "IndustriaTech"
        },
        {
            quote: "La aplicación multiplataforma desarrollada por DOM SRL mejoró la comunicación con nuestros clientes y redujo el tiempo de respuesta en un 60%.",
            author: "Laura Sánchez",
            position: "Directora de Marketing",
            company: "EnergySolutions"
        }
    ];

    const testimonialsDataEn = [
        {
            quote: "With DOM, we reduced delivery times by 35% thanks to their custom management software.",
            author: "Carlos Méndez",
            position: "CIO",
            company: "LogísticaTech"
        },
        {
            quote: "The implementation of Odoo ERP transformed our inventory management, saving up to 40% in operational costs.",
            author: "María González",
            position: "Operations Manager",
            company: "RetailPro"
        },
        {
            quote: "Their technology consulting helped us define a clear roadmap for our digital transformation, generating results from the first quarter.",
            author: "Alejandro Duarte",
            position: "CEO",
            company: "IndustriaTech"
        },
        {
            quote: "The cross-platform application developed by DOM SRL improved communication with our customers and reduced response time by 60%.",
            author: "Laura Sánchez",
            position: "Marketing Director",
            company: "EnergySolutions"
        }
    ];

    let currentLanguage = 'es';
    let testimonials = testimonialsDataEs;
    const deviceScreen = document.querySelector('.device-screen');
    let testimonialSlides = [];
    let currentTestimonialIndex = 0;
    let intervalId;


    function initTestimonials() {
        if (!deviceScreen) {
            console.error('Device screen element not found');
            return; // Exit if deviceScreen is null
        }
        deviceScreen.innerHTML = '';
        testimonialSlides = [];

        testimonials.forEach((testimonial, index) => {
            const slide = document.createElement('div');
            slide.classList.add('testimonial-item');
            if (index === 0) slide.classList.add('active');

            slide.innerHTML = `
                <p class="testimonial-quote">"${testimonial.quote}"</p>
                <div class="testimonial-author">
                    <div class="client-logo">
                        <svg viewBox="0 0 50 25" fill="none">
                            <rect width="50" height="25" rx="2" fill="#1A1A1A"/>
                            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Poppins" font-size="10" fill="#FFFFFF">${testimonial.company.substring(0, 2)}</text>
                        </svg>
                    </div>
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.position}, ${testimonial.company}</p>
                    </div>
                </div>
            `;
            deviceScreen.appendChild(slide);
            testimonialSlides.push(slide);
        });

        // Add navigation buttons
        const navContainer = document.createElement('div');
        navContainer.className = 'testimonial-navigation';
        
        const prevButton = document.createElement('button');
        prevButton.className = 'testimonial-nav-button prev-button';
        prevButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        prevButton.addEventListener('click', prevSlide);
        
        const nextButton = document.createElement('button');
        nextButton.className = 'testimonial-nav-button next-button';
        nextButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        nextButton.addEventListener('click', nextSlide);
        
        navContainer.appendChild(prevButton);
        navContainer.appendChild(nextButton);
        
        const testimonialContainer = document.querySelector('.testimonial-device');
        testimonialContainer.appendChild(navContainer);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    function changeLanguage(language) {
        currentLanguage = language;
        testimonials = language === 'en' ? testimonialsDataEn : testimonialsDataEs;
        initTestimonials();
        goToSlide(0); // Reset to the first slide
        resetInterval(); // Restart interval for new language
    }

    function goToSlide(index) {
        testimonialSlides[currentTestimonialIndex]?.classList.remove('active');
        currentTestimonialIndex = index;
        testimonialSlides[currentTestimonialIndex].classList.add('active');
    }

    function nextSlide() {
        let nextIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
        goToSlide(nextIndex);
        resetInterval(); // Reset the interval when manually navigating
    }
    
    function prevSlide() {
        let prevIndex = (currentTestimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
        goToSlide(prevIndex);
        resetInterval(); // Reset the interval when manually navigating
    }

    function startInterval() {
        intervalId = setInterval(nextSlide, 8000);
    }

    initTestimonials();
    startInterval();

    // Language change handler
    window.addEventListener('languageChanged', function(e) {
        changeLanguage(e.detail.language);
    });
});