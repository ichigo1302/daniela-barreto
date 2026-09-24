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

const leadForm = document.querySelector('.lead-form');

if (leadForm) {
    leadForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(leadForm);
        const nome = formData.get('nome')?.toString().trim() || 'Não informado';
        const telefone = formData.get('telefone')?.toString().trim() || 'Não informado';
        const email = formData.get('email')?.toString().trim() || 'Não informado';
        const objetivo = formData.get('objetivo')?.toString().trim() || 'Não informado';

        const message = `Olá Daniela, quero agendar uma consulta.%0A%0ANome: ${encodeURIComponent(nome)}%0ATelefone/WhatsApp: ${encodeURIComponent(telefone)}%0AE-mail: ${encodeURIComponent(email)}%0AQual seu principal objetivo na consulta com a nutricionista?: ${encodeURIComponent(objetivo)}`;
        const whatsappLink = `https://wa.me/5515981027918?text=${message}`;

        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
        leadForm.reset();
    });
}
