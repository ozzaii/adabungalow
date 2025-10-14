// Booking Section Interactions & Animations
document.addEventListener('DOMContentLoaded', () => {
    
    // Guest Counter Functionality
    const guestMinus = document.querySelector('.guest-btn.minus');
    const guestPlus = document.querySelector('.guest-btn.plus');
    const guestCount = document.querySelector('.guest-count');
    
    if (guestMinus && guestPlus && guestCount) {
        guestMinus.addEventListener('click', () => {
            let count = parseInt(guestCount.value);
            if (count > 1) {
                guestCount.value = count - 1;
                animateValueChange(guestCount);
            }
        });
        
        guestPlus.addEventListener('click', () => {
            let count = parseInt(guestCount.value);
            if (count < 10) {
                guestCount.value = count + 1;
                animateValueChange(guestCount);
            }
        });
    }
    
    function animateValueChange(element) {
        gsap.fromTo(element, {
            scale: 1.2,
            color: '#C9A227'
        }, {
            scale: 1,
            color: '#1B2A24',
            duration: 0.3,
            ease: 'back.out(2)'
        });
    }
    
    // Date validation - checkout must be after checkin
    const checkinDate = document.getElementById('checkin');
    const checkoutDate = document.getElementById('checkout');
    
    if (checkinDate && checkoutDate) {
        checkinDate.addEventListener('change', () => {
            checkoutDate.min = checkinDate.value;
            if (checkoutDate.value && checkoutDate.value <= checkinDate.value) {
                checkoutDate.value = '';
            }
        });
        
        checkoutDate.addEventListener('change', () => {
            if (checkinDate.value && checkoutDate.value <= checkinDate.value) {
                checkoutDate.value = '';
                shakeField(checkoutDate.parentElement);
            }
        });
    }
    
    function shakeField(element) {
        gsap.fromTo(element, {
            x: 0
        }, {
            x: [-10, 10, -10, 10, 0],
            duration: 0.5,
            ease: 'power2.inOut'
        });
    }
    
    // Villa selection enhancement
    const villaSelect = document.getElementById('villa');
    if (villaSelect) {
        villaSelect.addEventListener('change', () => {
            const selectedOption = villaSelect.options[villaSelect.selectedIndex];
            if (villaSelect.value) {
                gsap.to(villaSelect.parentElement, {
                    borderColor: 'rgba(201, 162, 39, 0.5)',
                    duration: 0.3
                });
            }
        });
    }
    
    // Special requests character counter
    const specialRequests = document.querySelector('.special-requests');
    if (specialRequests) {
        const maxLength = 500;
        
        specialRequests.addEventListener('input', () => {
            const remaining = maxLength - specialRequests.value.length;
            if (remaining < 50) {
                specialRequests.style.borderColor = 'rgba(201, 162, 39, 0.5)';
            }
        });
    }
    
    // Set initial visibility to prevent white flash
    gsap.set('.booking-card', { visibility: 'visible' });
    gsap.set(['.booking-field', '.price-preview', '.booking-actions', '.trust-badge'], { 
        visibility: 'visible' 
    });
    
    // Booking Card Entrance Animation - CONSOLIDATED to prevent jumping
    const bookingCard = document.querySelector('.booking-card');
    if (bookingCard) {
        // Single timeline for all booking animations - prevents conflicts
        const bookingTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.chapter-availability',
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true // Only play once
            }
        });

        // Chain animations in sequence
        bookingTl
            .from(bookingCard, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            })
            .from('.booking-field', {
                y: 20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: 'power2.out'
            }, '-=0.4') // Overlap slightly
            .from('.price-preview', {
                scale: 0.98,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.3')
            .from('.booking-actions', {
                y: 15,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.4')
            .from('.trust-badge', {
                scale: 0.9,
                opacity: 0,
                duration: 0.4,
                stagger: 0.06,
                ease: 'power2.out'
            }, '-=0.3');
    }
    
    // Floating animation for background
    const availabilitySection = document.querySelector('.chapter-availability');
    if (availabilitySection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // This is handled by CSS animation but we can add particle effects if needed
    }
    
    // Form field focus animations
    document.querySelectorAll('.field-input').forEach(field => {
        const input = field.querySelector('input, select, textarea');
        
        if (input) {
            input.addEventListener('focus', () => {
                gsap.to(field, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
            
            input.addEventListener('blur', () => {
                gsap.to(field, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        }
    });
    
    // WhatsApp button - populate data-wa attributes from form
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        // Update data-wa attributes before click propagates to whatsapp-booking.js
        whatsappBtn.addEventListener('click', (e) => {
            // Gather form data
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const villa = document.getElementById('villa');
            const villaText = villa.value ? villa.options[villa.selectedIndex].text : '';
            const guests = document.getElementById('guests').value;
            const specialRequests = document.querySelector('.special-requests').value;

            // Format date range
            const formatDate = (dateStr) => {
                if (!dateStr) return '';
                const date = new Date(dateStr);
                const options = { day: 'numeric', month: 'short' };
                return date.toLocaleDateString('tr-TR', options);
            };

            const dateRange = checkin && checkout
                ? `${formatDate(checkin)} - ${formatDate(checkout)}`
                : '';

            // Format guests
            const guestText = guests ? `${guests} kişi` : '';

            // Update data-wa attributes
            whatsappBtn.dataset.waRange = dateRange;
            whatsappBtn.dataset.waGuests = guestText;
            whatsappBtn.dataset.waVilla = villaText;
            whatsappBtn.dataset.waNote = specialRequests;

            // whatsapp-booking.js will handle the rest via event propagation
        }, true); // Use capture phase to run before whatsapp-booking.js

        // Button hover animation
        whatsappBtn.addEventListener('mouseenter', () => {
            gsap.to(whatsappBtn.querySelector('.btn-icon'), {
                rotation: 15,
                scale: 1.2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        whatsappBtn.addEventListener('mouseleave', () => {
            gsap.to(whatsappBtn.querySelector('.btn-icon'), {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
    
    // Auto-populate today's date for check-in
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (checkinDate) {
        checkinDate.min = today.toISOString().split('T')[0];
    }
    
    if (checkoutDate) {
        checkoutDate.min = tomorrow.toISOString().split('T')[0];
    }
});