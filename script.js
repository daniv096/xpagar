import confetti from 'canvas-confetti';

// Simple confetti effect on button click - this button was removed, keeping for potential future use
// const applyButton = document.getElementById('apply-button');
// if (applyButton) {
//     applyButton.addEventListener('click', () => {
//         confetti({
//             particleCount: 100,
//             spread: 70,
//             origin: { y: 0.6 }
//         });
//     });
// }

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Exclude modal-related links and simple '#' placeholders from smooth scroll
        if (href === '#' || 
            this.id === 'login-modal-button' || 
            this.classList.contains('show-login-link') ||
            this.id === 'show-reg-type-link' ||
            this.id === 'switch-to-merchant-reg-link' ||
            this.id === 'switch-to-customer-reg-link' ||
            this.classList.contains('learn-more-btn') ||
            this.id === 'hero-solicita-avance-btn' || // New hero buttons
            this.id === 'hero-registrate-btn' ||      // New hero buttons
            this.closest('.modal-switch a')) { 
            
            if (!this.classList.contains('learn-more-btn') && // Prevent default jump for non-scrolling links
                !this.id === 'hero-solicita-avance-btn' &&
                !this.id === 'hero-registrate-btn' &&
                href === '#') {
                 e.preventDefault(); 
            }
            if(href === '#') return; 
        }

        if (href && href.length > 1 && href.startsWith('#')) {
            try {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.warn('Smooth scroll target not found or invalid:', href, error);
            }
        }
    });
});

// Modal functionality
const loginModal = document.getElementById('login-modal');
const loginModalButton = document.getElementById('login-modal-button');
const closeButton = document.querySelector('.modal .close-button');
const modalTitle = document.getElementById('modal-title');

// Forms and sections
const loginForm = document.getElementById('login-form');
const registrationTypeSelection = document.getElementById('registration-type-selection');
const customerRegisterForm = document.getElementById('customer-register-form');
const merchantRegisterForm = document.getElementById('merchant-register-form');

// Buttons for switching views
const showRegTypeLink = document.getElementById('show-reg-type-link');
const registerAsCustomerBtn = document.getElementById('register-as-customer-btn');
const registerAsMerchantBtn = document.getElementById('register-as-merchant-btn');
const switchToMerchantRegLink = document.getElementById('switch-to-merchant-reg-link');
const switchToCustomerRegLink = document.getElementById('switch-to-customer-reg-link');
const showLoginLinks = document.querySelectorAll('.show-login-link');


function showModalSection(sectionToShow) {
    loginForm.style.display = 'none';
    registrationTypeSelection.style.display = 'none';
    customerRegisterForm.style.display = 'none';
    merchantRegisterForm.style.display = 'none';

    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }

    if (sectionToShow === loginForm) {
        modalTitle.textContent = 'Ingresar';
    } else if (sectionToShow === registrationTypeSelection) {
        modalTitle.textContent = 'Selecciona tu tipo de registro';
    } else if (sectionToShow === customerRegisterForm) {
        modalTitle.textContent = 'Registro de Cliente';
    } else if (sectionToShow === merchantRegisterForm) {
        modalTitle.textContent = 'Registro de Comercio';
    } else {
        modalTitle.textContent = 'Ingresar o Registrarse';
    }
}


if (loginModalButton) {
    loginModalButton.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'flex';
        showModalSection(loginForm); 
    });
}

// New hero buttons potentially opening modal
const heroSolicitaAvanceBtn = document.getElementById('hero-solicita-avance-btn');
if (heroSolicitaAvanceBtn) {
    heroSolicitaAvanceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Potentially open modal or scroll to a relevant section
        // For now, let's assume it might open the login/register modal to proceed
        loginModal.style.display = 'flex';
        showModalSection(loginForm); // Or a specific form related to cash advance if available
        console.log("Hero Solicita Avance button clicked");
    });
}

const heroRegistrateBtn = document.getElementById('hero-registrate-btn');
if (heroRegistrateBtn) {
    heroRegistrateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'flex';
        showModalSection(registrationTypeSelection); // Show registration type selection
        console.log("Hero Registrate button clicked");
    });
}


if (closeButton) {
    closeButton.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
}

window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Navigation within modal
if (showRegTypeLink) {
    showRegTypeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModalSection(registrationTypeSelection);
    });
}

showLoginLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showModalSection(loginForm);
    });
});

if (registerAsCustomerBtn) {
    registerAsCustomerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showModalSection(customerRegisterForm);
    });
}

if (registerAsMerchantBtn) {
    registerAsMerchantBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showModalSection(merchantRegisterForm);
    });
}

if (switchToMerchantRegLink) {
    switchToMerchantRegLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModalSection(merchantRegisterForm);
    });
}

if (switchToCustomerRegLink) {
    switchToCustomerRegLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModalSection(customerRegisterForm);
    });
}

// Generic Carousel Functionality
function initializeCarousel(carouselId, trackClass, slidesClass, dotsClass, intervalTime = 7000) {
    const carouselElement = document.getElementById(carouselId) || document.querySelector(carouselId); // Allow ID or class selector
    if (!carouselElement) {
        // console.warn(`Carousel element with selector ${carouselId} not found.`);
        return;
    }

    const carouselTrack = carouselElement.querySelector(`.${trackClass}`);
    const dotsContainer = carouselElement.querySelector(`.${dotsClass}`);
    
    if (!carouselTrack) {
        // console.warn(`Carousel track with class ${trackClass} not found inside ${carouselId}.`);
        return;
    }

    const slides = Array.from(carouselTrack.children).filter(child => child.classList.contains(slidesClass.replace('.', '')));
    
    if (slides.length === 0) {
        // console.warn(`No slides with class ${slidesClass} found in ${trackClass}.`);
        return;
    }

    let currentIndex = 0;
    let slideInterval;

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        if (dotsContainer) {
            const dots = Array.from(dotsContainer.children);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    // function prevSlide() { // Not currently used with buttons, but good to have
    //     currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    //     updateCarousel();
    // }

    function goToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        currentIndex = index;
        updateCarousel();
        resetSlideInterval();
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        if (slides.length > 1) {
            slideInterval = setInterval(nextSlide, intervalTime);
        }
    }

    // Create dots
    if (dotsContainer && slides.length > 1) {
        dotsContainer.innerHTML = ''; // Clear existing dots if any (e.g., on re-init)
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot'); // General class, specific styling via parent
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    updateCarousel(); // Initial setup
    resetSlideInterval(); // Start auto-slide

    // Optional: Pause on hover
    const carouselContainer = carouselTrack.closest('.carousel-container'); // Find closest container
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carouselContainer.addEventListener('mouseleave', resetSlideInterval);
    }
}

// Initialize Hero Carousel
initializeCarousel(
    'hero-carousel-section',      // ID of the main section containing the carousel
    'hero-carousel-track',        // Class of the track element
    'hero-carousel-slide',        // Class of individual slide elements
    'hero-carousel-dots',         // Class of the dots container
    5000                          // Interval time for hero carousel (e.g., 5 seconds)
);

// Initialize Services Carousel
initializeCarousel(
    'servicios-carousel-section', // ID of the main section for this carousel
    'services-carousel-track',    // Unique class for its track
    'services-carousel-slide',    // Unique class for its slides
    'services-carousel-dots',     // Unique class for its dots container
    7000                          // Interval time for services carousel
);


// Form Submissions
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (email && password) {
            alert('Ingreso exitoso (simulado)');
            loginModal.style.display = 'none';
            loginForm.reset();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
}

if (customerRegisterForm) {
    customerRegisterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('reg-customer-fullname').value;
        const alias = document.getElementById('reg-customer-alias').value;
        const idNumber = document.getElementById('reg-customer-id').value;
        const phone = document.getElementById('reg-customer-phone').value;
        const email = document.getElementById('reg-customer-email').value;
        const password = document.getElementById('reg-customer-password').value;
        const confirmPassword = document.getElementById('reg-customer-confirm-password').value;

        if (fullName && alias && idNumber && phone && email && password && confirmPassword) {
            if (password === confirmPassword) {
                alert('Registro de cliente exitoso (simulado)');
                loginModal.style.display = 'none';
                customerRegisterForm.reset();
                showModalSection(loginForm); // Go back to login form
            } else {
                alert('Las contraseñas no coinciden.');
            }
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
}

if (merchantRegisterForm) {
    merchantRegisterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const storeName = document.getElementById('reg-merchant-name').value;
        const storeRif = document.getElementById('reg-merchant-rif').value;
        const storeCategory = document.getElementById('reg-merchant-category').value;
        const storeAddress = document.getElementById('reg-merchant-address').value;
        const contactPerson = document.getElementById('reg-merchant-contact-person').value;
        const phone = document.getElementById('reg-merchant-phone').value;
        const email = document.getElementById('reg-merchant-email').value;
        const password = document.getElementById('reg-merchant-password').value;
        const confirmPassword = document.getElementById('reg-merchant-confirm-password').value;

        if (storeName && storeRif && storeCategory && storeAddress && contactPerson && phone && email && password && confirmPassword) {
            if (password === confirmPassword) {
                alert('Registro de comercio exitoso (simulado)');
                loginModal.style.display = 'none';
                merchantRegisterForm.reset();
                showModalSection(loginForm); // Go back to login form
            } else {
                alert('Las contraseñas no coinciden.');
            }
        } else {
            alert('Por favor, completa todos los campos del comercio.');
        }
    });
}

console.log("xPagar script loaded and updated for new hero carousel and modular carousel logic.");