/* ==================================================
   MENU HAMBURGUESA
================================================== */

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {

    nav.classList.toggle('active');

});

/* ==================================================
   CERRAR MENU AL HACER CLICK
================================================== */

const navLinks = document.querySelectorAll('.nav a');

navLinks.forEach(link => {

    link.addEventListener('click', () => {

        nav.classList.remove('active');

    });

});

/* ==================================================
   SCROLL SUAVE
================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: 'smooth',
            block: 'start'

        });

    });

});

/* ==================================================
   MODAL FORMULARIO
================================================== */

const modal = document.getElementById('modal');

const openModalButtons =
    document.querySelectorAll('.open-modal');

const closeModal =
    document.getElementById('closeModal');

/* abrir */

openModalButtons.forEach(button => {

    button.addEventListener('click', () => {

        modal.classList.add('active');

        document.body.style.overflow = 'hidden';

    });

});

/* cerrar boton X */

closeModal.addEventListener('click', () => {

    modal.classList.remove('active');

    document.body.style.overflow = '';

});

/* cerrar clic afuera */

modal.addEventListener('click', (e) => {

    if (e.target === modal) {

        modal.classList.remove('active');

        document.body.style.overflow = '';

    }

});

/* ==================================================
   FORMULARIO TEMPORAL
================================================== */
const serviceForm = document.getElementById('serviceForm');

if (serviceForm) {

    serviceForm.addEventListener('submit', () => {

        const boton =
            serviceForm.querySelector('button[type="submit"]');

        if (boton) {

            boton.disabled = true;
            boton.innerText = 'Enviando...';

        }

    });

}
/* ==================================================
   LIGHTBOX PROFESIONAL
================================================== */

const galleryItems =
    document.querySelectorAll('.gallery-item');

const lightbox =
    document.getElementById('lightbox');

const lightboxImage =
    document.getElementById('lightboxImage');

const lightboxClose =
    document.getElementById('lightboxClose');

const lightboxPrev =
    document.getElementById('lightboxPrev');

const lightboxNext =
    document.getElementById('lightboxNext');

let currentImageIndex = 0;

/* abrir imagen */

galleryItems.forEach((item, index) => {

    item.addEventListener('click', () => {

        currentImageIndex = index;

        openLightbox();

    });

});

function openLightbox() {

    lightbox.classList.add('active');

    lightboxImage.src =
        galleryItems[currentImageIndex].src;

    document.body.style.overflow = 'hidden';

}

/* cerrar */

function closeLightbox() {

    lightbox.classList.remove('active');

    document.body.style.overflow = '';

}

lightboxClose.addEventListener(
    'click',
    closeLightbox
);

/* imagen siguiente */

function nextImage() {

    currentImageIndex++;

    if (currentImageIndex >= galleryItems.length) {

        currentImageIndex = 0;

    }

    lightboxImage.src =
        galleryItems[currentImageIndex].src;

}

/* imagen anterior */

function prevImage() {

    currentImageIndex--;

    if (currentImageIndex < 0) {

        currentImageIndex =
            galleryItems.length - 1;

    }

    lightboxImage.src =
        galleryItems[currentImageIndex].src;

}

lightboxNext.addEventListener(
    'click',
    nextImage
);

lightboxPrev.addEventListener(
    'click',
    prevImage
);

/* cerrar clic afuera */

lightbox.addEventListener('click', (e) => {

    if (e.target === lightbox) {

        closeLightbox();

    }

});

/* teclado */

document.addEventListener('keydown', (e) => {

    if (!lightbox.classList.contains('active'))
        return;

    if (e.key === 'Escape')
        closeLightbox();

    if (e.key === 'ArrowRight')
        nextImage();

    if (e.key === 'ArrowLeft')
        prevImage();

});

/* ==================================================
   TOUCH MOVIL LIGHTBOX
================================================== */

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener(
    'touchstart',
    (e) => {

        touchStartX =
            e.changedTouches[0].screenX;

    },
    false
);

lightbox.addEventListener(
    'touchend',
    (e) => {

        touchEndX =
            e.changedTouches[0].screenX;

        handleSwipe();

    },
    false
);

function handleSwipe() {

    const distance =
        touchStartX - touchEndX;

    if (distance > 50) {

        nextImage();

    }

    if (distance < -50) {

        prevImage();

    }

}

/* ==================================================
   CARRUSEL NOSOTROS
================================================== */
/*
const carouselTrack =
    document.querySelector('.carousel-track');

const carouselImages =
    document.querySelectorAll(
        '.carousel-track img'
    );

const prevBtn =
    document.querySelector('.carousel-btn.prev');

const nextBtn =
    document.querySelector('.carousel-btn.next');

let carouselIndex = 0;

/* detectar cantidad visible */
/*
function getVisibleSlides() {

    if (window.innerWidth <= 768)
        return 1;

    if (window.innerWidth <= 992)
        return 2;

    return 3;

}
*/
/* mover */
/*
function updateCarousel() {

    const visibleSlides =
        getVisibleSlides();

    const imageWidth =
        carouselImages[0].offsetWidth + 20;

    carouselTrack.style.transform =
        `translateX(-${carouselIndex * imageWidth}px)`;

    const maxIndex =
        carouselImages.length - visibleSlides;

    if (carouselIndex > maxIndex) {

        carouselIndex = 0;

        carouselTrack.style.transform =
            `translateX(0px)`;

    }

}
*/
/* siguiente */
/*
function nextSlide() {

    const visibleSlides =
        getVisibleSlides();

    const maxIndex =
        carouselImages.length - visibleSlides;

    carouselIndex++;

    if (carouselIndex > maxIndex) {

        carouselIndex = 0;

    }

    updateCarousel();

}
*/
/* anterior */
/*
function prevSlide() {

    const visibleSlides =
        getVisibleSlides();

    const maxIndex =
        carouselImages.length - visibleSlides;

    carouselIndex--;

    if (carouselIndex < 0) {

        carouselIndex = maxIndex;

    }

    updateCarousel();

}
*/

nextBtn.addEventListener(
    'click',
    nextSlide
);

prevBtn.addEventListener(
    'click',
    prevSlide
);

/* autoplay */

setInterval(() => {

    nextSlide();

}, 4000);

/* resize */

window.addEventListener(
    'resize',
    updateCarousel
);

/* iniciar */

window.addEventListener(
    'load',
    updateCarousel
);

/* ==================================================
   FIN SCRIPT
================================================== */

console.log(
    'AAB Cortinas Metálicas cargado correctamente'
);