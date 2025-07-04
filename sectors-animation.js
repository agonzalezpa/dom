// 3D Animation for Industry Sectors
import sectorDescriptions from './sector-descriptions.js';

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.industry-animation-container');
    const sectors = [
        { id: 'logistica', name: 'Logística', desc: 'Soluciones de gestión logística para optimizar rutas, reducir costos y mejorar la eficiencia operativa.' },
        { id: 'retail', name: 'Retail', desc: 'Sistemas de inventario, punto de venta y e-commerce integrados para una gestión comercial completa.' },
        { id: 'manufactura', name: 'Manufactura', desc: 'Automatización de procesos industriales, gestión de producción y control de calidad para optimizar la cadena productiva.' },
        { id: 'energia', name: 'Energía', desc: 'Monitoreo y optimización de consumo energético, gestión de recursos renovables y sistemas de control ambiental.' },
        { id: 'salud', name: 'Salud', desc: 'Historias clínicas digitales, gestión hospitalaria y sistemas de telemedicina para optimizar la atención al paciente.' },
        { id: 'finanzas', name: 'Finanzas', desc: 'Sistemas de gestión financiera, análisis de datos y plataformas seguras para transacciones y control presupuestario.' }


    ];

    const sectorsEn = [
        { id: 'logistica', name: 'Logistics', desc: 'Logistics management solutions to optimize routes, reduce costs and improve operational efficiency.' },
        { id: 'retail', name: 'Retail', desc: 'Inventory systems, point of sale and integrated e-commerce for complete commercial management.' },
        { id: 'manufactura', name: 'Manufacturing', desc: 'Automation of industrial processes, production management and quality control to optimize the production chain.' },
        { id: 'energia', name: 'Energy', desc: 'Monitoring and optimization of energy consumption, management of renewable resources and environmental control systems.' },
        { id: 'salud', name: 'Healthcare', desc: 'Digital medical records, hospital management and telemedicine systems to optimize patient care.' },
        { id: 'finanzas', name: 'Finance', desc: 'Financial management systems, data analysis and secure platforms for transactions and budget control.' }
    ];

    // let activeSectors = sectors;
    let currentSector = null;
    let isAnimating = false;
    let sectorDescriptionHeight = 0;
    let currentLanguage = 'es';
    let animationFrameId;
    const browserLanguage = navigator.language || navigator.userLanguage;
    // Normalizar el idioma (tomar solo los primeros 2 caracteres para comparar)
    const languageCode = browserLanguage.split('-')[0].toLowerCase();
    if (languageCode !== 'es') {
        currentLanguage = 'en'; // Ingles si el navegador está en Ingles o un idioma diferente al español

    }
    // Initialize sectors
    function createSectors() {
        container.innerHTML = '';

        // Create description element that will show on the right side
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'sector-description';
        container.appendChild(descriptionElement);

        // Add 20% more sector items by duplicating and varying the existing ones
        const extraSectors = [
            { id: 'tecnologia', name: 'Tecnología', desc: 'Soluciones para empresas de tecnología que buscan optimizar sus procesos y mejorar su rendimiento.' },
            { id: 'educacion', name: 'Educación', desc: 'Plataformas de e-learning y gestión educativa para instituciones académicas y formación corporativa.' },
            { id: 'agricultura', name: 'Agricultura', desc: 'Sistemas IoT e informática para optimizar cultivos, gestión de recursos y planificación agrícola.' },
            { id: 'telecomunicaciones', name: 'Telecomunicaciones', desc: 'Software y soluciones para proveedores de servicios de comunicación y datos.' },
            { id: 'gobierno', name: 'Gobierno', desc: 'Plataformas de gestión pública, atención ciudadana y administración de recursos estatales.' }
        ];

        const extraSectorsEn = [
            { id: 'tecnologia', name: 'Technology', desc: 'Solutions for technology companies looking to optimize their processes and improve performance.' },
            { id: 'educacion', name: 'Education', desc: 'E-learning platforms and educational management for academic institutions and corporate training.' },
            { id: 'agricultura', name: 'Agriculture', desc: 'IoT systems and IT solutions to optimize crops, resource management and agricultural planning.' },
            { id: 'telecomunicaciones', name: 'Telecommunications', desc: 'Software and solutions for communication and data service providers.' },
            { id: 'gobierno', name: 'Government', desc: 'Public management platforms, citizen services and state resource administration.' }
        ];

        // Combine the original and extra sectors
        const allSectors = currentLanguage === 'en'
            ? [...sectorsEn, ...extraSectorsEn]
            : [...sectors, ...extraSectors];

        // Use allSectors instead of activeSectors
        allSectors.forEach((sector, index) => {
            const sectorElement = document.createElement('div');
            sectorElement.className = 'sector-item';
            sectorElement.textContent = sector.name;
            sectorElement.dataset.id = sector.id;
            sectorElement.dataset.index = index;

            // Set initial 3D transform
            const depth = Math.random() * -2500 - 500; // Increased depth range for more spread
            const xPos = (Math.random() - 1) * 1200; // Increased x range
            const yPos = (Math.random() - 0.5) * 1200; // Increased y range

            sectorElement.style.transform = `translate3d(${xPos}px, ${yPos}px, ${depth}px)`;
            sectorElement.style.opacity = Math.min(1, Math.max(0, (depth + 2500) / 2000));
            sectorElement.style.fontSize = `${Math.min(3, Math.max(0.8, (depth + 2500) / 1000))}em`;

            container.appendChild(sectorElement);

            // Add click event
            sectorElement.addEventListener('click', () => {

                selectSector(sector);
            });
        });

        // Set container height to 80% of its original height (reduce by 20%)
        container.style.height = '480px'; // Reduced from 600px
        sectorDescriptionHeight = container.offsetHeight;

        animateSectors();
    }

    // Select a sector to show its description
    function selectSector(sector) {
        currentSector = sector;
        const descriptionElement = container.querySelector('.sector-description');
        const isMobile = window.innerWidth <= 768; // Detectar dispositivos móviles/tablets
    
        if (isMobile) {
            // Para móviles: modal a pantalla completa con márgenes
            descriptionElement.style.left = '0';
            descriptionElement.style.right = '0';
            descriptionElement.style.top = '10%';
            descriptionElement.style.bottom = '10%';
            descriptionElement.style.width = '100%';
            descriptionElement.style.height = 'auto';
            descriptionElement.style.maxHeight = '80vh';
            descriptionElement.style.transform = 'none';
            descriptionElement.style.overflowY = 'auto';
            descriptionElement.style.padding = '20px';
        } else {
            // Para desktop: posición original
            descriptionElement.style.left = 'auto';
            descriptionElement.style.right = '5%';
            descriptionElement.style.top = '50%';
            descriptionElement.style.width = '45%';
            descriptionElement.style.height = sectorDescriptionHeight * 0.8 + 'px';
            descriptionElement.style.transform = 'translateY(-50%)';
        }
    
        // Hide description with animation
        descriptionElement.style.opacity = 0;
    
        // Get sector description from the imported data
        const sectorData = currentLanguage === 'en'
            ? sectorDescriptions.en[sector.id]
            : sectorDescriptions.es[sector.id];
    
        if (!sectorData) {
            console.error('No data found for sector:', sector.id, 'in language:', currentLanguage);
            return;
        }
    
        // Function to close the modal
        const closeModal = () => {
            currentSector = null;
            descriptionElement.style.opacity = 0;
            descriptionElement.classList.remove('active');
    
            // Start animation again
            setTimeout(() => {
                const sectors = container.querySelectorAll('.sector-item');
                sectors.forEach(sector => {
                    sector.style.display = '';
                    sector.style.opacity = '1';
                    sector.style.color = 'var(--white)';
                    sector.style.background = 'rgba(0, 255, 136, 0.1)';
                });
                isAnimating = true;
                animateSectors();
            }, 100);
            
            // Remove outside click listener when closing
            document.removeEventListener('click', handleOutsideClick);
        };
    
        // Function to handle clicks outside the modal
        const handleOutsideClick = (event) => {
            if (!descriptionElement.contains(event.target) && 
                !event.target.classList.contains('sector-item')) {
                closeModal();
            }
        };
    
        // Update description after fade out
        setTimeout(() => {
            // Create solutions list HTML
            const solutionsHtml = sectorData.solutions.map(solution => `<li>${solution}</li>`).join('');
    
            descriptionElement.innerHTML = `
                <h3>${sectorData.name}</h3>
                <p>${sectorData.description}</p>
                <div class="sector-benefits">
                    <h4>${currentLanguage === 'en' ? 'How We Can Help' : 'Cómo Podemos Ayudar'}</h4>
                    <ul>
                        ${solutionsHtml}
                    </ul>
                </div>
                <button class="back-button">${currentLanguage === 'en' ? 'Back' : 'Volver'}</button>
            `;

            // Ajustes adicionales para móvil
        if (isMobile) {
            // Reducir tamaño de texto y márgenes
            descriptionElement.querySelector('h3').style.fontSize = '1.5rem';
            descriptionElement.querySelector('p').style.fontSize = '0.9rem';
            descriptionElement.querySelector('ul').style.paddingLeft = '10px';
            
            // Botón más grande para touch
            const backButton = descriptionElement.querySelector('.back-button');
            if (backButton) {
                backButton.style.padding = '12px 25px';
                backButton.style.fontSize = '1.1rem';
            }
        }
    
            // Add event listener to back button
            const backButton = descriptionElement.querySelector('.back-button');
            if (backButton) {
                backButton.addEventListener('click', closeModal);
            }
    
            // Show description with animation
            setTimeout(() => {
                descriptionElement.style.opacity = 1;
                descriptionElement.classList.add('active');
            }, 50);
    
            // Add click outside listener after a small delay
            setTimeout(() => {
                document.addEventListener('click', handleOutsideClick);
            }, 50);
    
            // Don't completely hide sectors, just make them less prominent
            const sectorElements = container.querySelectorAll('.sector-item');
            sectorElements.forEach(element => {
                if (element.dataset.id !== sector.id) {
                    element.style.opacity = '0.3';
                } else {
                    // Highlight the selected sector
                    element.style.opacity = '1';
                    element.style.transform = 'translate3d(-150px, 0px, 200px)';
                    element.style.color = 'var(--neon-green)';
                    element.style.background = 'rgba(0, 255, 136, 0.2)';
                }
            });
    
            // Stop animation
            isAnimating = false;
        }, 100);
    }

    // Animate sectors in 3D space
    function animateSectors() {
        if (currentSector) return;

        isAnimating = true;
        const sectors = container.querySelectorAll('.sector-item');

        sectors.forEach(sector => {
            // Animate from back to front in a cycle
            let depth = parseFloat(sector.style.transform.split('translate3d(')[1].split('px,')[2]);
            let xPos = parseFloat(sector.style.transform.split('translate3d(')[1].split('px,')[0]);
            let yPos = parseFloat(sector.style.transform.split('translate3d(')[1].split('px,')[1]);

            // Move forward
            depth += 5;

            // Fade out when approaching the front
            if (depth > 200) {
                // Start fading out at depth 300, completely transparent by depth 500
                const fadeoutOpacity = Math.max(0, 1 - (depth - 200) / 100);
                sector.style.opacity = fadeoutOpacity;
            } else {
                // Normal opacity based on depth
                sector.style.opacity = Math.min(1, Math.max(0, (depth + 2500) / 2000));
            }

            // If too close, reset to back
            if (depth > 400) {
                depth = -2500;
                xPos = (Math.random() - 0.5) * 1000;
                yPos = (Math.random() - 0.5) * 1000;
            }

            // Update position and size
            sector.style.transform = `translate3d(${xPos}px, ${yPos}px, ${depth}px)`;
            sector.style.fontSize = `${Math.min(3, Math.max(0.8, (depth + 2500) / 1000))}em`;

            // Update z-index based on depth
            sector.style.zIndex = Math.floor(depth + 2500);
        });

        // Continue animation
        if (isAnimating) {
            animationFrameId = requestAnimationFrame(animateSectors);
        }
    }
    // Función para DETENER la animación
    function stopSectorAnimation() {
        isAnimating = false; // Detiene el loop de animación
        cancelAnimationFrame(animationFrameId); // Cancela el frame pendiente

        // Opcional: Resetear estilos de los sectores
        const sectors = container.querySelectorAll('.sector-item');
        sectors.forEach(sector => {
            sector.style.opacity = '1';
            sector.style.transform = 'translate3d(0, 0, 0)';
            sector.style.fontSize = '1em';
            sector.style.zIndex = '0';
        });
    }



    createSectors();

    // Handle language change
    window.addEventListener('languageChanged', function (e) {
        const language = e.detail.language;
        currentLanguage = language;
        console.info("Cambio de lenguaje: " + currentLanguage);
        stopSectorAnimation();
        container.innerHTML = '';
        currentSector = null;
        isAnimating = false;
        sectorDescriptionHeight = 0;
        createSectors();
        // activeSectors = language === 'en' ? sectorsEn : sectors;

    });

});