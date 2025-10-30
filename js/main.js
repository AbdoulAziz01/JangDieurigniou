/**
 * Gestionnaire d'événement déclenché lorsque le DOM est entièrement chargé
 * Ce bloc de code s'exécute dès que la structure HTML est chargée
 */
document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // GESTION DU MENU MOBILE
    // ============================================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Vérifie si les éléments du menu mobile existent
    if (mobileMenuButton && mobileMenu) {
        // Gestion du clic sur le bouton du menu mobile
        mobileMenuButton.addEventListener('click', function() {
            // Affiche ou masque le menu mobile
            mobileMenu.classList.toggle('hidden');
            
            // Gestion de l'accessibilité avec aria-expanded
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Ferme le menu lorsqu'un lien est cliqué (pour une meilleure UX sur mobile)
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // ============================================
    // DÉFILEMENT FLUIDE POUR LES LIENS D'ANCRE
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Empêche le comportement par défaut du lien
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignore les liens vides
            
            // Trouve l'élément cible du lien d'ancrage
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Défilement fluide vers l'élément cible
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Compense la hauteur du header fixe
                    behavior: 'smooth' // Animation de défilement fluide
                });
            }
        });
    });
    
    // ============================================
    // ANIMATION DU HEADER AU DÉFILEMENT
    // ============================================
    const header = document.querySelector('header');
    if (header) {
        // Ajoute un écouteur d'événement de défilement
        window.addEventListener('scroll', function() {
            // Ajoute ou supprime les classes en fonction de la position de défilement
            if (window.scrollY > 50) {
                header.classList.add('bg-white', 'shadow-md');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('bg-white', 'shadow-md');
                header.classList.add('bg-transparent');
            }
        });
        
        // Initialisation de l'état du header au chargement de la page
        if (window.scrollY > 50) {
            header.classList.add('bg-white', 'shadow-md');
        } else {
            header.classList.add('bg-transparent');
        }
    }
    
    // ============================================
    // ANIMATION AU DÉFILEMENT (FADE IN)
    // ============================================
    /**
     * Fonction pour animer les éléments au défilement
     * Ajoute la classe 'fade-in' aux éléments visibles à l'écran
     */
    const animateOnScroll = function() {
        // Sélectionne tous les éléments à animer
        const elements = document.querySelectorAll('.feature-card, .section-padding > div');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Si l'élément est visible dans la fenêtre
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Configuration de l'Intersection Observer pour une détection plus efficace
    const observerOptions = {
        threshold: 0.1 // Déclenche l'observation quand 10% de l'élément est visible
    };
    
    // Crée un nouvel observateur d'intersection
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // Si l'élément est dans la vue
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Arrête d'observer après l'animation
            }
        });
    }, observerOptions);
    
    // Commence à observer tous les éléments à animer
    document.querySelectorAll('.feature-card, .section-padding > div').forEach(element => {
        observer.observe(element);
    });
    
    // Ajoute l'écouteur de défilement pour l'animation
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécute une première fois au chargement
    
    // ============================================
    // GESTION DU FORMULAIRE DE CONTACT
    // ============================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêche le rechargement de la page
            
            // Récupère les données du formulaire
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value; // Convertit FormData en objet JavaScript
            });
            
            // À implémenter : Envoi des données au serveur
            console.log('Données du formulaire :', formObject);
            
            // Affiche un message de confirmation
            alert('Merci pour votre message ! Nous vous recontacterons bientôt.');
            contactForm.reset(); // Réinitialise le formulaire
        });
    }
    
    // ============================================
    // MISE EN SURBRILLANCE DU LIEN ACTIF DANS LA NAVIGATION
    // ============================================
    /**
     * Met à jour le lien actif dans la navigation en fonction de la section visible
     */
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; // Ajuste la position de déclenchement
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Vérifie si la section est dans la vue
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Met en surbrillance le lien correspondant
                const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (navLink) {
                    navLink.classList.add('text-blue-600', 'font-semibold');
                    navLink.classList.remove('text-gray-500');
                }
            } else {
                // Réinitialise les autres liens
                const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (navLink) {
                    navLink.classList.remove('text-blue-600', 'font-semibold');
                    navLink.classList.add('text-gray-500');
                }
            }
        });
    }
    
    // Ajoute l'écouteur de défilement pour la mise à jour des liens actifs
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Met à jour une première fois au chargement
});
