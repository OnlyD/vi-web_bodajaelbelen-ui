// Wedding countdown timer
function updateCountdown() {
    // Set the wedding date (February 28, 2025, 4:00 PM)
    const weddingDate = new Date('2025-02-28T16:00:00').getTime();
    
    // Get current date
    const now = new Date().getTime();
    
    // Calculate the difference
    const distance = weddingDate - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    // Update the HTML elements
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    
    // If the countdown is finished
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        
        // Change the countdown title
        const countdownTitle = document.querySelector('.countdown h2');
        countdownTitle.textContent = '¡Ya es el gran día! 🎉';
    }
}

// RSVP functionality
function confirmAttendance(response) {
    const message = response === 'si' 
        ? '¡Gracias por confirmar tu asistencia! 💕\n\nRecibirás más detalles pronto.'
        : 'Gracias por avisarnos. Te echaremos de menos en nuestro día especial. 💝';
    
    alert(message);
    
    // You could replace this with actual form submission or API call
    // For now, just show a confirmation
    const rsvpSection = document.querySelector('.rsvp');
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'rsvp-confirmation';
    confirmationDiv.style.cssText = `
        margin-top: 30px;
        padding: 20px;
        background: ${response === 'si' ? '#d4edda' : '#f8d7da'};
        border: 1px solid ${response === 'si' ? '#c3e6cb' : '#f5c6cb'};
        border-radius: 15px;
        color: ${response === 'si' ? '#155724' : '#721c24'};
        font-weight: 500;
    `;
    
    confirmationDiv.innerHTML = response === 'si' 
        ? '✅ ¡Tu asistencia ha sido confirmada! Gracias por acompañarnos en este día tan especial.'
        : '❌ Hemos registrado que no podrás asistir. Gracias por avisarnos.';
    
    // Remove existing confirmation if any
    const existingConfirmation = rsvpSection.querySelector('.rsvp-confirmation');
    if (existingConfirmation) {
        existingConfirmation.remove();
    }
    
    rsvpSection.appendChild(confirmationDiv);
    
    // Hide the buttons after confirmation
    const buttons = document.querySelector('.rsvp-buttons');
    buttons.style.display = 'none';
}

// Smooth scrolling for any anchor links (if added later)
document.addEventListener('DOMContentLoaded', function() {
    // Start the countdown
    updateCountdown();
    
    // Update countdown every minute
    setInterval(updateCountdown, 60000);
    
    // Add some interactive animations
    const cards = document.querySelectorAll('.detail-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Add some sparkle effects (optional enhancement)
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #c2185b;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleAnimation 1.5s ease-out forwards;
    `;
    
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Create sparkles occasionally
setInterval(createSparkle, 3000);