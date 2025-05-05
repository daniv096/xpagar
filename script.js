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
        // Check if it's just a placeholder link
        if (this.getAttribute('href') === '#') {
            return;
        }

        // Check if the target element exists
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
             e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

console.log("xPagar script loaded.");

