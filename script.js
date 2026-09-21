const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuIcon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    menuIcon.classList.toggle('fa-bars', !isOpen);
    menuIcon.classList.toggle('fa-xmark', isOpen);
});

menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
    }
});

const testimonialsGrid = document.querySelector('.testimonials-grid');
const testimonialCards = Array.from(testimonialsGrid.children);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let testimonialIndex = testimonialCards.length;
let testimonialTimer;

testimonialCards.slice(-3).forEach((card) => {
    testimonialsGrid.insertBefore(card.cloneNode(true), testimonialsGrid.firstChild);
});

const setTestimonialsPosition = (withTransition) => {
    const firstCard = testimonialsGrid.querySelector('.testimonial-card');
    const cardStyle = window.getComputedStyle(firstCard);
    const gap = parseFloat(cardStyle.marginRight) || parseFloat(window.getComputedStyle(testimonialsGrid).gap);
    const cardWidth = firstCard.getBoundingClientRect().width + gap;

    testimonialsGrid.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;
    testimonialsGrid.style.transition = withTransition ? 'transform 0.7s ease' : 'none';
};

const moveTestimonials = () => {
    testimonialIndex -= 1;
    setTestimonialsPosition(true);
};

const startTestimonials = () => {
    if (reducedMotion.matches) {
        return;
    }

    window.clearInterval(testimonialTimer);
    testimonialTimer = window.setInterval(moveTestimonials, 3500);
};

testimonialsGrid.addEventListener('transitionend', () => {
    if (testimonialIndex === 0) {
        testimonialIndex = testimonialCards.length;
        setTestimonialsPosition(false);
    }
});

window.addEventListener('resize', () => setTestimonialsPosition(false));
setTestimonialsPosition(false);
startTestimonials();
