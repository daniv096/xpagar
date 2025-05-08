import confetti from 'canvas-confetti';

// Simple confetti effect on button click
const applyButton = document.getElementById('apply-button');

if (applyButton) {
    applyButton.addEventListener('click', () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Check if it's just a placeholder link for modal or other JS actions
        if (this.getAttribute('href') === '#' || this.classList.contains('btn-secondary')) {
            // Check if it's NOT the login modal button specifically
            if(this.id !== 'login-modal-button' && !this.closest('.modal-switch a')) {
                 // For other '#' links that are not modal triggers, we might still want to prevent default
                 // but not scroll. This condition might need refinement based on other '#' links.
                // e.preventDefault(); // Uncomment if other '#' links should not cause page jump
            }
             // If it's the login modal button or a link within the modal, JS will handle it, so do nothing here or e.preventDefault()
            if (this.id === 'login-modal-button' || this.closest('.modal-switch a')) {
                e.preventDefault();
            }
            return; // Exit early for modal triggers or simple '#' links not meant for scrolling
        }

        // Check if the target element exists
        const targetHref = this.getAttribute('href');
        // Ensure targetHref is not just "#" before querying
        if (targetHref && targetHref.length > 1) {
            const targetElement = document.querySelector(targetHref);
            if (targetElement) {
                 e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        } else if (targetHref === '#') {
            // If it's just '#', prevent default to avoid jumping to top if not handled above
            e.preventDefault();
        }
    });
});

// Modal functionality
const loginModal = document.getElementById('login-modal');
const loginModalButton = document.getElementById('login-modal-button');
const closeButton = document.querySelector('.modal .close-button');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');

if (loginModalButton) {
    loginModalButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        loginModal.style.display = 'flex';
    });
}

if (closeButton) {
    closeButton.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
}

// Close modal if user clicks outside of modal-content
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Basic validation example
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

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('reg-fullname').value;
        const alias = document.getElementById('reg-alias').value;
        const idNumber = document.getElementById('reg-id').value;
        const phone = document.getElementById('reg-phone').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (fullName && alias && idNumber && phone && email && password && confirmPassword) {
            if (password === confirmPassword) {
                alert('Registro exitoso (simulado)');
                loginModal.style.display = 'none';
                registerForm.reset();
                // Optionally switch back to login form
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            } else {
                alert('Las contraseñas no coinciden.');
            }
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
}

if (registerLink) {
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });
}

if (loginLink) {
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
}

console.log("xPagar script loaded.");