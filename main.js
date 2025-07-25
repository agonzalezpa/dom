document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS animations with direct script loading instead of dynamic import
    const aosScript = document.createElement('script');
    aosScript.src = 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js';
    aosScript.onload = function () {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    };
    document.head.appendChild(aosScript);

    // Initialize ScrollReveal
    const scrollRevealScript = document.createElement('script');
    scrollRevealScript.src = 'https://cdn.jsdelivr.net/npm/scrollreveal@4.0.9/dist/scrollreveal.min.js';
    scrollRevealScript.onload = function () {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '80px',
            duration: 1000,
            reset: false
        });

        sr.reveal('.section-header', { delay: 100 });
        sr.reveal('.service-card', { interval: 100 });
        sr.reveal('.industry-card', { interval: 100 });
    };
    document.head.appendChild(scrollRevealScript);

    // Initialize Particles.js for hero section
    if (document.getElementById('particles-js')) {
        // Direct script loading of particles.js
        const particlesScript = document.createElement('script');
        particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        particlesScript.onload = function () {
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
                        value: ["#00FF88", "#00F3FF", "#FFFFFF"]
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
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
                        color: "#00FF88",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        };
        document.head.appendChild(particlesScript);
    }

    // Initialize AOS for additional elements with custom settings
    document.addEventListener('aos:init', function () {
        // Elements that would have used ScrollReveal will now use AOS
        document.querySelectorAll('.section-header:not([data-aos])').forEach(el => {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', '100');
        });

        document.querySelectorAll('.service-card:not([data-aos])').forEach((el, index) => {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', (100 + (index * 100)).toString());
        });

        document.querySelectorAll('.industry-card:not([data-aos])').forEach((el, index) => {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', (100 + (index * 100)).toString());
        });

        AOS.refresh();
    });

    // Animated Counter for Impact Section
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Initialize counters when impact section comes into view
    const impactSection = document.getElementById('impacto-global');
    if (impactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateCounter(stat, target);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(impactSection);
    }
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            // Animate hamburger to X
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');

            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        const backToTopButton = document.querySelector('.back-to-top');
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
            // Ajuste para móviles
            if (window.innerWidth <= 768) {
                backToTopButton.style.right = '25px'; // Posición fija para móviles
            }
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            let isValid = true;

            // Validate Name
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                showError(nameInput, translations[currentLanguage]['form-error-name']);
                isValid = false;
            } else {
                hideError(nameInput);
            }

            // Validate Email
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                showError(emailInput, translations[currentLanguage]['form-error-email']);
                isValid = false;
            } else {
                hideError(emailInput);
            }

            // If validation passes, submit the form
            // Si la validación es correcta, se envían los datos al servidor
            if (isValid) {
                const formResponse = document.getElementById('formResponse');
                // Opcional: mostramos un mensaje de "Enviando..."
                formResponse.textContent = translations[currentLanguage]['form-sending'] || 'Enviando...';


                // Recogemos los datos del formulario
                const formData = new FormData(contactForm);
                console.info(formData);

                // Envío de datos usando fetch a process.php
                fetch('process.php', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.text())
                    .then(data => {
                        // Se muestra la respuesta del servidor (se espera un mensaje de éxito o error)
                        formResponse.textContent = data;
                        console.info("la data=" + data);
                        if (data.toLowerCase().indexOf('gracias') !== -1) {
                            // formResponse.className = 'response success';
                            formResponse.classList.remove('error');
                            formResponse.classList.add('success');
                            contactForm.reset(); // Resetea el formulario si fue exitoso
                            // Opcional: se limpia el mensaje después de unos segundos
                            setTimeout(() => {
                                formResponse.textContent = '';
                                formResponse.classList.remove('success');
                            }, 5000);
                        } else {
                            //formResponse.className = 'response error';
                            formResponse.classList.remove('success');
                            formResponse.classList.add('error');
                        }

                    })
                    .catch(error => {
                        console.error('Error:', error);
                        formResponse.textContent = translations[currentLanguage]['form-error-send'] || 'Error al enviar el mensaje. Inténtelo de nuevo.';
                        formResponse.classList.add('error');
                    });
            }
        });

        // Live validation on input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                if (input.value.trim()) {
                    hideError(input);
                }
            });
        });
    }

    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('invalid');
    }

    function hideError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.style.display = 'none';
        input.classList.remove('invalid');
    }

    // Language switcher
    const translations = {
        es: {
            // Navigation
            'nav-services': 'Servicios',
            'nav-industries': 'Industrias',
            'nav-testimonials': 'Testimonios',
            'nav-contact': 'Contacto',

            // Hero
            'hero-title-1': 'Desarrollo de Software y paginas webs:',
            'hero-title-2': 'a la Medida',
            'hero-subtitle': 'Somos un equipo multidisciplinario de expertos en tecnología, diseño y estrategia empresarial, dedicados a ofrecer soluciones que impulsen la innovación y la eficiencia en tu negocio',
            'eye-hover-text': 'Vemos más allá',
            'hero-cta': 'Haz crecer tu negocio',

            // Services
            'services-title': 'Servicios Destacados',
            'service-1-title': 'Software a la Medida',
            'service-1-desc': 'Soluciones personalizadas para web, móvil y escritorio que se adaptan a tus procesos empresariales únicos.',
            'service-2-title': 'Multiplataforma',
            'service-2-desc': 'Aplicaciones que funcionan en iOS, Android, Web y Cloud, ofreciendo experiencia consistente en todos los dispositivos.',
            'service-3-title': 'Odoo ERP',
            'service-3-desc': 'Implantación, migración y soporte especializado para gestionar todos los aspectos de tu empresa en un solo sistema.',
            'service-4-title': 'Community Manager',
            'service-4-desc': 'Gestionamos y potenciamos tu presencia en redes sociales para conectar con tu audiencia, aumentar engagement y fortalecer tu marca. Creamos contenido estratégico, interactuamos con tu comunidad y analizamos resultados.',
            'service-5-title': 'APIs y Microservicios',
            'service-5-desc': 'Integración de sistemas y desarrollo de arquitecturas escalables que conectan todas tus plataformas empresariales.',
            'service-6-title': 'Cloud Solutions',
            'service-6-desc': 'Implementación y administración de servicios en AWS, Azure y Google Cloud para maximizar rendimiento y seguridad.',
            'service-7-title': 'Diseño UI/UX',
            'service-7-desc': 'Interfaces centradas en usuarios que combinan estética con funcionalidad para mejorar la experiencia y aumentar la productividad.',
            'service-8-title': 'Consultoría Tecnológica',
            'service-8-desc': 'Roadmaps estratégicos, auditorías de sistemas y asesoramiento para transformación digital en todas las áreas de tu negocio.',
            'service-9-title': 'Inteligencia Artificial',
            'service-9-desc': 'Sistemas integrados con IA, chatbots inteligentes, análisis predictivo y automatización de procesos mediante aprendizaje automático.',

            // Industries
            'industries-title': 'Impulsamos Sectores Clave',
            'industry-1-title': 'Logística',
            'industry-1-desc': 'Soluciones de gestión logística para optimizar rutas, reducir costos y mejorar la eficiencia operativa.',
            'industry-2-title': 'Retail',
            'industry-2-desc': 'Sistemas de inventario, punto de venta y e-commerce integrados para una gestión comercial completa.',
            'industry-3-title': 'Manufactura',
            'industry-3-desc': 'Automatización de procesos industriales, gestión de producción y control de calidad para optimizar la cadena productiva.',
            'industry-4-title': 'Energía',
            'industry-4-desc': 'Monitoreo y optimización de consumo energético, gestión de recursos renovables y sistemas de control ambiental.',
            'industry-5-title': 'Salud',
            'industry-5-desc': 'Historias clínicas digitales, gestión hospitalaria y sistemas de telemedicina para optimizar la atención al paciente.',
            'industry-6-title': 'Finanzas',
            'industry-6-desc': 'Sistemas de gestión financiera, análisis de datos y plataformas seguras para transacciones y control presupuestario.',

            // Testimonials
            'testimonials-title': 'Lo Que Dicen Nuestros Clientes',

            // Global Impact
            'impact-title': 'Impacto Global en Números',
            'impact-countries': 'Países con Clientes',
            'impact-projects': 'Proyectos Ejecutados',
            'impact-satisfaction': 'Satisfacción del Cliente',
            'impact-team': 'Profesionales en el Equipo',
            'impact-years': 'Años de Experiencia',

            // Contact
            'contact-title': 'Hablemos sobre tu Proyecto',
            'contact-phone': 'Teléfono',
            'contact-email': 'Email',
            'contact-address': 'Dirección',
            'contact-name': 'Nombre',
            'contact-email-field': 'Correo',
            'contact-company': 'Empresa',
            'contact-phone-field': 'Teléfono',
            'contact-message': 'Mensaje',
            'contact-submit': 'Enviar Mensaje',
            'form-error-name': 'Por favor ingresa tu nombre',
            'form-error-email': 'Por favor ingresa un correo válido',
            'form-success': '¡Gracias! Tu mensaje ha sido enviado. Te contactaremos pronto.',

            // Footer
            'footer-tagline': 'Transformando ideas en soluciones digitales',
            'footer-quick-links': 'Enlaces Rápidos',
            'footer-connect': 'Conéctate',
            //'footer-copyright': `© ${new Date().getFullYear()} DOM. Todos los derechos reservados.`
            'footer-privacy': 'Política de Privacidad',
            "schedule-meeting": "📆 Agendar una Reunión"
        },
        en: {
            // Navigation
            'nav-services': 'Services',
            'nav-industries': 'Industries',
            'nav-testimonials': 'Testimonials',
            'nav-contact': 'Contact',

            // Hero
            'hero-title-1': 'Custom Software and Website :',
            'hero-title-2': 'Development',
            'hero-subtitle': 'We are a multidisciplinary team of experts in technology, design and business strategy, dedicated to delivering solutions that drive innovation and efficiency in your business',
            'hero-cta': 'Grow your business',
            'eye-hover-text': 'We see beyond',

            // Services
            'services-title': 'Featured Services',
            'service-1-title': 'Custom Software',
            'service-1-desc': 'Personalized solutions for web, mobile and desktop that adapt to your unique business processes.',
            'service-2-title': 'Cross-platform',
            'service-2-desc': 'Applications that work on iOS, Android, Web and Cloud, offering consistent experience across all devices.',
            'service-3-title': 'Odoo ERP',
            'service-3-desc': 'Implementation, migration and specialized support to manage all aspects of your company in a single system.',
            'service-4-title': 'Community Manager',
            'service-4-desc': 'We manage and boost your social media presence to connect with your audience, increase engagement, and strengthen your brand. We create strategic content, interact with your community, and analyze results for continuous improvement..',
            'service-5-title': 'APIs & Microservices',
            'service-5-desc': 'System integration and development of scalable architectures that connect all your business platforms.',
            'service-6-title': 'Cloud Solutions',
            'service-6-desc': 'Implementation and management of services in AWS, Azure and Google Cloud to maximize performance and security.',
            'service-7-title': 'UI/UX Design',
            'service-7-desc': 'User-centered interfaces that combine aesthetics with functionality to improve experience and increase productivity.',
            'service-8-title': 'Technology Consulting',
            'service-8-desc': 'Strategic roadmaps, system audits and advice for digital transformation in all areas of your business.',
            'service-9-title': 'Intelligent Artificial',
            'service-9-desc': 'AI-integrated systems, intelligent chatbots, predictive analytics, and process automation through machine learning.',

            // Industries
            'industries-title': 'We Drive Key Sectors',
            'industry-1-title': 'Logistics',
            'industry-1-desc': 'Logistics management solutions to optimize routes, reduce costs and improve operational efficiency.',
            'industry-2-title': 'Retail',
            'industry-2-desc': 'Inventory systems, point of sale and integrated e-commerce for complete commercial management.',
            'industry-3-title': 'Manufacturing',
            'industry-3-desc': 'Automation of industrial processes, production management and quality control to optimize the production chain.',
            'industry-4-title': 'Energy',
            'industry-4-desc': 'Monitoring and optimization of energy consumption, management of renewable resources and environmental control systems.',
            'industry-5-title': 'Healthcare',
            'industry-5-desc': 'Digital medical records, hospital management and telemedicine systems to optimize patient care.',
            'industry-6-title': 'Finance',
            'industry-6-desc': 'Financial management systems, data analysis and secure platforms for transactions and budget control.',

            // Testimonials
            'testimonials-title': 'What Our Clients Say',

            // Global Impact
            'impact-title': 'Global Impact in Numbers',
            'impact-countries': 'Countries with Clients',
            'impact-projects': 'Projects Executed',
            'impact-satisfaction': 'Client Satisfaction',
            'impact-team': 'Team Professionals',
            'impact-years': 'Years of Experience',

            // Contact
            'contact-title': 'Let\'s Talk About Your Project',
            'contact-phone': 'Phone',
            'contact-email': 'Email',
            'contact-address': 'Address',
            'contact-name': 'Name',
            'contact-email-field': 'Email',
            'contact-company': 'Company',
            'contact-phone-field': 'Phone',
            'contact-message': 'Message',
            'contact-submit': 'Send Message',
            'form-error-name': 'Please enter your name',
            'form-error-email': 'Please enter a valid email',
            'form-success': 'Thank you! Your message has been sent. We will contact you soon.',

            // Footer
            'footer-tagline': 'Transforming ideas into digital solutions',
            'footer-quick-links': 'Quick Links',
            'footer-connect': 'Connect',
            //'footer-copyright': '© ${new Date().getFullYear()} DOM. All rights reserved.'
            'footer-privacy': 'Privacy Policy',
            "schedule-meeting": "📆 Schedule a Meeting"
        }



    };
    // Obtener el idioma del navegador (puede ser en formato 'es', 'es-ES', 'en-US', etc.)
    const browserLanguage = navigator.language || navigator.userLanguage;

    // Normalizar el idioma (tomar solo los primeros 2 caracteres para comparar)
    const languageCode = browserLanguage.split('-')[0].toLowerCase();

    // Asignar el idioma según la detección (solo soportamos 'es' y 'en')
    let currentLanguage = 'es'; // Por defecto español

    if (languageCode !== 'es') {
        currentLanguage = 'en'; // Español si el navegador está en español
        changeLanguage(currentLanguage);
    }

    const currentYear = new Date().getFullYear();
    const footerText = currentLanguage === 'es' ? `© ${currentYear} DOM. Todos los derechos reservados.` : `© ${currentYear} DOM. All rights reserved.`;
    document.getElementById('footer-copyright').textContent = footerText;
    // Function to update privacy policy link based on language
    function updatePrivacyPolicyLink() {
        const privacyLink = document.getElementById('footer-privacy');
        if (currentLanguage === 'en') {
            privacyLink.href = 'privacy-policy-en.html';
            privacyLink.textContent = 'Privacy Policy';
        } else {
            privacyLink.href = 'privacy-policy.html';
            privacyLink.textContent = 'Política de Privacidad';
        }
    }
    updatePrivacyPolicyLink();

    function changeLanguage(language) {
        currentLanguage = language;
        updatePrivacyPolicyLink();

        // Update all text elements
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[language][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[language][key];
                } else {
                    element.textContent = translations[language][key];
                }
            }
        });

        // Update active state for language buttons
        document.querySelectorAll('#es-btn, #es-btn-mobile').forEach(btn => {
            btn.classList.toggle('active', language === 'es');
        });

        document.querySelectorAll('#en-btn, #en-btn-mobile').forEach(btn => {
            btn.classList.toggle('active', language === 'en');
        });

        // Dispatch language change event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: language }
        }));
    }

    // Set up language switcher buttons
    document.querySelectorAll('#es-btn, #es-btn-mobile').forEach(btn => {
        btn.addEventListener('click', () => changeLanguage('es'));
    });

    document.querySelectorAll('#en-btn, #en-btn-mobile').forEach(btn => {
        btn.addEventListener('click', () => changeLanguage('en'));
    });


    // Calendar Booking System
    let selectedDate = null;
    let selectedTime = null;
    let currentCalendarDate = new Date();
    const COMPANY_TIMEZONE = "America/Chicago";

    const monthNames = {
        es: [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        en: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ]
    };

    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30'
    ];
    let bookedSlots = []; // Aquí se guardarán las reservas ocupadas

    function fetchBookedSlots(callback) {
        fetch('get_bookings.php')
            .then(res => res.json())
            .then(data => {
                bookedSlots = data; // ["2025-07-24 09:00:00", ...]
                if (callback) callback();
            });
    }
    function initializeCalendar() {
        generateCalendar();
        generateTimeSlots();
        setupCalendarNavigation();
        setupBookingForm();
    }

    function generateCalendar() {
        const calendarGrid = document.querySelector('.calendar-grid');
        const currentMonthHeader = document.getElementById('currentMonth');

        // Clear existing days (keep headers)
        const dayHeaders = calendarGrid.querySelectorAll('.calendar-day-header');
        calendarGrid.innerHTML = '';
        dayHeaders.forEach(header => calendarGrid.appendChild(header));

        // Update month header
        const monthName = monthNames[currentLanguage][currentCalendarDate.getMonth()];
        currentMonthHeader.textContent = `${monthName} ${currentCalendarDate.getFullYear()}`;

        // Get first day of month and number of days
        const firstDay = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), 1);
        const lastDay = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Adjust for Monday start

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'other-month');
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;

            const dayDate = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), day);
            const dateStr = dayDate.toISOString().split('T')[0];

            // Mark today
            if (dayDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }

            // Disable past dates and weekends
            if (dayDate < today || dayDate.getDay() === 0 || dayDate.getDay() === 6) {
                dayElement.classList.add('disabled');
            } else {
                // Verifica si todas las horas de ese día están ocupadas
                const bookedTimes = bookedSlots
                    .filter(slot => slot.startsWith(dateStr))
                    .map(slot => slot.split(' ')[1].slice(0, 5));
                const allBooked = timeSlots.every(time => bookedTimes.includes(time));
                if (allBooked) {
                    dayElement.classList.add('disabled');
                } else {
                    dayElement.addEventListener('click', () => selectDate(dayDate, dayElement));
                }
            }

            calendarGrid.appendChild(dayElement);
        }
    }


    function generateTimeSlotsOLD() {
        const timeSlotsContainer = document.getElementById('timeSlots');
        timeSlotsContainer.innerHTML = '';

        // Si no hay fecha seleccionada, muestra todos habilitados
        if (!selectedDate) {
            timeSlots.forEach(time => {
                const slotElement = document.createElement('div');
                slotElement.classList.add('time-slot');
                slotElement.textContent = time;
                slotElement.addEventListener('click', () => selectTime(time, slotElement));
                timeSlotsContainer.appendChild(slotElement);
            });
            return;
        }

        // Formato de la fecha seleccionada: YYYY-MM-DD
        const dateStr = selectedDate.toISOString().split('T')[0];

        // Obtén las horas ocupadas para esa fecha
        const bookedTimes = bookedSlots
            .filter(slot => slot.startsWith(dateStr))
            .map(slot => slot.split(' ')[1].slice(0, 5)); // ["09:00", "10:30"]

        timeSlots.forEach(time => {
            const slotElement = document.createElement('div');
            slotElement.classList.add('time-slot');
            //slotElement.textContent = time;
            // Muestra la hora local del usuario
            slotElement.textContent = convertToLocalTime(selectedDate, time);

            if (bookedTimes.includes(time)) {
                slotElement.classList.add('disabled');
            } else {
                slotElement.addEventListener('click', () => selectTime(time, slotElement));
            }
            timeSlotsContainer.appendChild(slotElement);
        });
    }
    function generateTimeSlots() {
        const timeSlotsContainer = document.getElementById('timeSlots');
        timeSlotsContainer.innerHTML = '';

        // Usa la fecha de hoy si no hay fecha seleccionada
        const baseDate = selectedDate || new Date();

        timeSlots.forEach(time => {
            const slotElement = document.createElement('div');
            slotElement.classList.add('time-slot');
            // Siempre muestra la hora local del usuario
            slotElement.textContent = convertToLocalTime(baseDate, time);
            if (selectedDate) {
                // Si hay fecha seleccionada, verifica disponibilidad
                const dateStr = selectedDate.toISOString().split('T')[0];
                const bookedTimes = bookedSlots
                    .filter(slot => slot.startsWith(dateStr))
                    .map(slot => slot.split(' ')[1].slice(0, 5));
                if (bookedTimes.includes(time)) {
                    slotElement.classList.add('disabled');
                } else {
                    slotElement.addEventListener('click', () => selectTime(time, slotElement));
                }
            } else {
                slotElement.addEventListener('click', () => selectTime(time, slotElement));
            }
            timeSlotsContainer.appendChild(slotElement);
        });
    }
    // Función para convertir la hora de la empresa a la hora local del usuario
    function convertToLocalTime(dateObj, timeStr) {
        // dateObj: Date del día seleccionado (en local)
        // timeStr: "HH:MM" en horario de la empresa
        if (!dateObj) return timeStr;
        // Crea una fecha en la zona de la empresa
        const [hour, minute] = timeStr.split(':');
        // Usa luxon para facilitar la conversión
        const dt = luxon.DateTime.fromObject(
            {
                year: dateObj.getFullYear(),
                month: dateObj.getMonth() + 1,
                day: dateObj.getDate(),
                hour: parseInt(hour),
                minute: parseInt(minute)
            },
            { zone: COMPANY_TIMEZONE }
        );
        // Convierte a la zona local del navegador
        return dt.setZone(Intl.DateTimeFormat().resolvedOptions().timeZone).toLocaleString(luxon.DateTime.TIME_SIMPLE);
    }

    function selectDate(date, element) {
        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selection to clicked date
        element.classList.add('selected');
        selectedDate = date;

        // Update selected date display
        const selectedDateDisplay = document.getElementById('selectedDate');
        selectedDateDisplay.textContent = date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Update summary
        updateBookingSummary();
        generateTimeSlots();


    }

    function selectTime(time, element) {
        // Remove previous selection
        document.querySelectorAll('.time-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selection to clicked time
        element.classList.add('selected');
        selectedTime = time;

        // Update summary
        updateBookingSummary();

        // Enable submit button if both date and time are selected
        updateSubmitButton();
    }

    function updateBookingSummary() {
        const summaryDate = document.getElementById('summaryDate');
        const summaryTime = document.getElementById('summaryTime');

        if (selectedDate) {
            summaryDate.textContent = selectedDate.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } else {
            summaryDate.textContent = '-';
        }

        if (selectedTime) {
            summaryTime.textContent = convertToLocalTime(selectedDate, selectedTime);
        } else {
            summaryTime.textContent = '-';
        }
    }

    function updateSubmitButton() {
        const submitButton = document.getElementById('bookingSubmit');
        const nameInput = document.getElementById('bookingName');
        const empresaInput = document.getElementById('bookingEmpresa');
        const countryInput = document.getElementById('bookingCountry');
        const emailInput = document.getElementById('bookingEmail');
        const meetingTypeSelect = document.getElementById('meetingType');

        const isFormValid = selectedDate && selectedTime &&
            nameInput.value.trim() &&
            emailInput.value.trim() &&
            countryInput.value.trim() &&
            meetingTypeSelect.value;

        submitButton.disabled = !isFormValid;
    }

    function setupCalendarNavigation() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            generateCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            generateCalendar();
        });
    }

    function setupBookingForm() {
        const form = document.getElementById('bookingForm');
        if (!form) return;
        const inputs = form.querySelectorAll('input, select');
        //const submitButton = document.getElementById('bookingSubmit');

        // Crea la instancia de Notyf (hazlo solo una vez)
        const notyf = new Notyf({
            duration: 4000,
            position: { x: 'right', y: 'top' },
            types: [
                {
                    type: 'success',
                    background: '#00FF88',
                    className: 'notyf-success-custom',
                    icon: {
                        className: 'material-icons',
                        tagName: 'i',
                        text: 'check_circle'
                    }
                },
                {
                    type: 'error',
                    background: '#ff0033',
                    icon: {
                        className: 'material-icons',
                        tagName: 'i',
                        text: 'error'
                    }
                },
                {
                    type: 'info',
                    background: '#0099ff',
                    icon: {
                        className: 'material-icons',
                        tagName: 'i',
                        text: 'info'
                    }
                }
            ]
        });

        // Cambia el color del texto para notificaciones de éxito
        const style = document.createElement('style');
        style.innerHTML = `
            .notyf-success-custom .notyf__message {
            color: #1b3a2b !important;
            }
        `;
        document.head.appendChild(style);

        inputs.forEach(input => {
            input.addEventListener('input', updateSubmitButton);
            input.addEventListener('change', updateSubmitButton);
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = document.getElementById('bookingSubmit');
            // Deshabilita el botón y cambia el texto
            submitButton.disabled = true;
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span>Enviando reserva...</span>';
            // Prepare form data
            const formData = new FormData(form);
            if (selectedDate && selectedTime) {
                //paso la fecha con la hora del cliente
                // OPCIÓN 1: Usar Luxon para crear fechaCliente con zona horaria del cliente
                const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const [hour1, minute2] = selectedTime.split(':');

                // Crear la fecha en la zona horaria del cliente usando Luxon


                // Formato con zona horaria del cliente
                var year = selectedDate.getFullYear();
                var month = selectedDate.getMonth() + 1;
                var day = selectedDate.getDate();
                formData.append('fechaCliente', day + "/" + month + "/" + year + " " + convertToLocalTime(selectedDate, selectedTime));
                formData.append('timezonecliente', clientTimezone);


                //Y ahora paso la fecha que se va a guardar en la BD con la hora de la empresa
                // Usa Luxon para crear la fecha en la zona de la empresa
                const [hour, minute] = selectedTime.split(':');
                const dt = luxon.DateTime.fromObject(
                    {
                        year: selectedDate.getFullYear(),
                        month: selectedDate.getMonth() + 1,
                        day: selectedDate.getDate(),
                        hour: parseInt(hour),
                        minute: parseInt(minute)
                    },
                    { zone: COMPANY_TIMEZONE }
                );
                // Formato MySQL DATETIME en la zona de la empresa
                const fecha = dt.toFormat('yyyy-LL-dd HH:mm');
                formData.append('fecha', fecha);
            }
            formData.append('language', currentLanguage);
            // Procesar invitados
            const guestInputs = form.querySelectorAll('.guest-email-input');
            const guestEmails = [];
            guestInputs.forEach(input => {
                if (input.value.trim()) {
                    guestEmails.push(input.value.trim());
                }
            });
            // Elimina los campos previos y agrega uno solo con los correos separados por coma
            formData.delete('guestEmails[]');
            formData.append('invitados', guestEmails.join(','));

            fetch('booking_handler.php', {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        var textContent = currentLanguage === 'en'
                            ? 'Booking confirmed! We will send you a confirmation email shortly.'
                            : '¡Reserva confirmada! Te enviaremos un email de confirmación en breve.';
                        notyf.open({
                            type: 'success',
                            message: textContent
                        });


                        // Reset form and UI
                        form.reset();
                        selectedDate = null;
                        selectedTime = null;
                        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                        document.getElementById('selectedDate').textContent =
                            currentLanguage === 'en' ? 'Select a date' : 'Selecciona una fecha';
                        updateBookingSummary();
                        updateSubmitButton();
                        // *** ACTUALIZA LOS SLOTS Y CALENDARIO ***
                        fetchBookedSlots(initializeCalendar);
                    } else {
                        var textContent = data.message || (currentLanguage === 'en'
                            ? 'There was an error saving your booking. Please try again.'
                            : 'Hubo un error al guardar tu reserva. Intenta de nuevo.');
                        notyf.open({
                            type: 'error',
                            message: textContent
                        });
                    }
                })
                .catch(() => {

                    notyf.open({
                        type: 'error',
                        message: currentLanguage === 'en'
                            ? 'There was an error sending your booking. Please try again.'
                            : 'Hubo un error al enviar tu reserva. Intenta de nuevo.'
                    });
                }).finally(() => {
                    // Habilita el botón y restaura el texto
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                });
        });
    }


    if (document.getElementById('reserva-cita')) {
        fetchBookedSlots(initializeCalendar);
    }

});