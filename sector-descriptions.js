// Sector descriptions data file
const sectorDescriptions = {
    es: {
        logistica: {
            name: "Logística",
            description: "Soluciones de gestión logística para optimizar rutas, reducir costos y mejorar la eficiencia operativa.",
            solutions: [
                "Software de gestión de flotas con GPS en tiempo real",
                "Planificación de rutas optimizadas basadas en IA",
                "Sistemas de gestión de almacenes e inventario",
                "Plataformas de seguimiento de envíos para clientes",
                "Integración con sistemas de facturación y contabilidad"
            ]
        },
        retail: {
            name: "Retail",
            description: "Sistemas de inventario, punto de venta y e-commerce integrados para una gestión comercial completa.",
            solutions: [
                "Soluciones POS multitienda sincronizadas",
                "Integración con marketplaces y plataformas e-commerce",
                "Sistemas de gestión de inventario en tiempo real",
                "Software de fidelización y CRM para retailers",
                "Analytics para comportamiento de compra y tendencias"
            ]
        },
        manufactura: {
            name: "Manufactura",
            description: "Automatización de procesos industriales, gestión de producción y control de calidad para optimizar la cadena productiva.",
            solutions: [
                "Sistemas MES (Manufacturing Execution Systems)",
                "Software de planificación de producción",
                "Soluciones IoT para monitoreo de equipos industriales",
                "Control de calidad y trazabilidad de productos",
                "Integración con ERP y sistemas de gestión empresarial"
            ]
        },
        energia: {
            name: "Energía",
            description: "Monitoreo y optimización de consumo energético, gestión de recursos renovables y sistemas de control ambiental.",
            solutions: [
                "Monitoreo de consumo energético en tiempo real",
                "Sistemas SCADA para control de instalaciones",
                "Optimización de distribución energética",
                "Gestión de recursos renovables y sostenibilidad",
                "Soluciones IoT para smart grids y energía inteligente"
            ]
        },
        salud: {
            name: "Salud",
            description: "Historias clínicas digitales, gestión hospitalaria y sistemas de telemedicina para optimizar la atención al paciente.",
            solutions: [
                "Software de gestión de historias clínicas electrónicas",
                "Plataformas de telemedicina y consulta virtual",
                "Sistemas de gestión hospitalaria integrados",
                "Aplicaciones de seguimiento para pacientes",
                "Analítica predictiva para prevención y diagnóstico"
            ]
        },
        finanzas: {
            name: "Finanzas",
            description: "Sistemas de gestión financiera, análisis de datos y plataformas seguras para transacciones y control presupuestario.",
            solutions: [
                "Software de gestión contable y financiera",
                "Plataformas seguras para transacciones digitales",
                "Sistemas de control presupuestario y proyecciones",
                "Soluciones de análisis de datos financieros",
                "Automatización de procesos de tesorería y facturación"
            ]
        },
        tecnologia: {
            name: "Tecnología",
            description: "Soluciones para empresas de tecnología que buscan optimizar sus procesos y mejorar su rendimiento.",
            solutions: [
                "Sistemas de gestión de proyectos tecnológicos",
                "Plataformas DevOps y CI/CD",
                "Software para monitoreo de infraestructura",
                "Herramientas de colaboración y desarrollo",
                "Soluciones de seguridad informática y compliance"
            ]
        },
        educacion: {
            name: "Educación",
            description: "Plataformas de e-learning y gestión educativa para instituciones académicas y formación corporativa.",
            solutions: [
                "LMS (Learning Management Systems) personalizados",
                "Plataformas de gestión académica y administrativa",
                "Sistemas de evaluación y seguimiento de alumnos",
                "Soluciones de formación corporativa y e-learning",
                "Herramientas colaborativas para entornos educativos"
            ]
        },
        agricultura: {
            name: "Agricultura",
            description: "Sistemas IoT e informática para optimizar cultivos, gestión de recursos y planificación agrícola.",
            solutions: [
                "Soluciones IoT para monitoreo de cultivos",
                "Sistemas de riego inteligente y gestión de agua",
                "Software de planificación agrícola y siembra",
                "Plataformas de trazabilidad para productos agrícolas",
                "Análisis predictivo para optimización de cosechas"
            ]
        },
        telecomunicaciones: {
            name: "Telecomunicaciones",
            description: "Software y soluciones para proveedores de servicios de comunicación y datos.",
            solutions: [
                "Sistemas OSS/BSS para operadores",
                "Plataformas de gestión de clientes y facturación",
                "Monitoreo de redes y servicios en tiempo real",
                "Software para optimización de infraestructura",
                "Soluciones de análisis de datos para telecomunicaciones"
            ]
        },
        gobierno: {
            name: "Gobierno",
            description: "Plataformas de gestión pública, atención ciudadana y administración de recursos estatales.",
            solutions: [
                "Sistemas de gestión gubernamental integrados",
                "Plataformas de atención y servicios ciudadanos",
                "Software para administración de recursos públicos",
                "Soluciones de transparencia y gobierno abierto",
                "Sistemas de gestión documental y trámites digitales"
            ]
        }
    },
    en: {
        logistica: {
            name: "Logistics",
            description: "Logistics management solutions to optimize routes, reduce costs and improve operational efficiency.",
            solutions: [
                "Fleet management software with real-time GPS",
                "AI-based optimized route planning",
                "Warehouse and inventory management systems",
                "Shipment tracking platforms for customers",
                "Integration with billing and accounting systems"
            ]
        },
        retail: {
            name: "Retail",
            description: "Inventory systems, point of sale and integrated e-commerce for complete commercial management.",
            solutions: [
                "Synchronized multi-store POS solutions",
                "Integration with marketplaces and e-commerce platforms",
                "Real-time inventory management systems",
                "Loyalty and CRM software for retailers",
                "Analytics for purchasing behavior and trends"
            ]
        },
        manufactura: {
            name: "Manufacturing",
            description: "Automation of industrial processes, production management and quality control to optimize the production chain.",
            solutions: [
                "Manufacturing Execution Systems (MES)",
                "Production planning software",
                "IoT solutions for industrial equipment monitoring",
                "Quality control and product traceability",
                "Integration with ERP and business management systems"
            ]
        },
        energia: {
            name: "Energy",
            description: "Monitoring and optimization of energy consumption, management of renewable resources and environmental control systems.",
            solutions: [
                "Real-time energy consumption monitoring",
                "SCADA systems for facility control",
                "Energy distribution optimization",
                "Renewable resources management and sustainability",
                "IoT solutions for smart grids and intelligent energy"
            ]
        },
        salud: {
            name: "Healthcare",
            description: "Digital medical records, hospital management and telemedicine systems to optimize patient care.",
            solutions: [
                "Electronic medical record management software",
                "Telemedicine and virtual consultation platforms",
                "Integrated hospital management systems",
                "Patient tracking applications",
                "Predictive analytics for prevention and diagnosis"
            ]
        },
        finanzas: {
            name: "Finance",
            description: "Financial management systems, data analysis and secure platforms for transactions and budget control.",
            solutions: [
                "Accounting and financial management software",
                "Secure platforms for digital transactions",
                "Budget control and forecast systems",
                "Financial data analysis solutions",
                "Treasury and billing process automation"
            ]
        },
        tecnologia: {
            name: "Technology",
            description: "Solutions for technology companies looking to optimize their processes and improve performance.",
            solutions: [
                "Technology project management systems",
                "DevOps and CI/CD platforms",
                "Infrastructure monitoring software",
                "Collaboration and development tools",
                "IT security and compliance solutions"
            ]
        },
        educacion: {
            name: "Education",
            description: "E-learning platforms and educational management for academic institutions and corporate training.",
            solutions: [
                "Custom Learning Management Systems (LMS)",
                "Academic and administrative management platforms",
                "Student evaluation and tracking systems",
                "Corporate training and e-learning solutions",
                "Collaborative tools for educational environments"
            ]
        },
        agricultura: {
            name: "Agriculture",
            description: "IoT systems and IT solutions to optimize crops, resource management and agricultural planning.",
            solutions: [
                "IoT solutions for crop monitoring",
                "Smart irrigation and water management systems",
                "Agricultural planning and planting software",
                "Traceability platforms for agricultural products",
                "Predictive analysis for harvest optimization"
            ]
        },
        telecomunicaciones: {
            name: "Telecommunications",
            description: "Software and solutions for communication and data service providers.",
            solutions: [
                "OSS/BSS systems for operators",
                "Customer management and billing platforms",
                "Real-time network and service monitoring",
                "Infrastructure optimization software",
                "Data analysis solutions for telecommunications"
            ]
        },
        gobierno: {
            name: "Government",
            description: "Public management platforms, citizen services and state resource administration.",
            solutions: [
                "Integrated government management systems",
                "Citizen service and attention platforms",
                "Public resource management software",
                "Transparency and open government solutions",
                "Document management systems and digital procedures"
            ]
        }
    }
};

export default sectorDescriptions;