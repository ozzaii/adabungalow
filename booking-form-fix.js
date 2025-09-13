// Fix booking form jumping and improve interactions
(function() {
    'use strict';
    
    class BookingFormFix {
        constructor() {
            this.init();
        }
        
        init() {
            this.fixMobileViewport();
            this.preventJumping();
            this.enhanceFormInteractions();
            this.setupGuestCounter();
        }
        
        fixMobileViewport() {
            // Prevent zoom on iOS when focusing inputs
            const inputs = document.querySelectorAll('input[type="date"], input[type="number"], input[type="text"], select, textarea');
            
            inputs.forEach(input => {
                // Set font size to prevent zoom
                input.style.fontSize = '16px';
                
                // Handle focus to prevent jumping
                input.addEventListener('focus', (e) => {
                    // Store scroll position
                    const scrollY = window.scrollY;
                    
                    // Prevent default only on iOS
                    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                        setTimeout(() => {
                            window.scrollTo(0, scrollY);
                        }, 0);
                    }
                });
                
                // Smooth blur
                input.addEventListener('blur', () => {
                    // Ensure keyboard dismisses properly
                    if (document.activeElement === input) {
                        input.blur();
                    }
                });
            });
        }
        
        preventJumping() {
            // Prevent form from causing page jumps
            const bookingSection = document.querySelector('.chapter-availability');
            if (!bookingSection) return;
            
            // Add scroll padding
            bookingSection.style.scrollMarginTop = '100px';
            
            // Handle form field focus
            const formFields = bookingSection.querySelectorAll('input, select, textarea');
            formFields.forEach(field => {
                field.addEventListener('focus', (e) => {
                    // Prevent scroll jump
                    e.preventDefault();
                    
                    // Get field position
                    const rect = field.getBoundingClientRect();
                    const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
                    
                    // Only scroll if field is not fully in view
                    if (!isInView) {
                        const scrollTop = window.scrollY + rect.top - 150; // 150px offset from top
                        window.scrollTo({
                            top: scrollTop,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Focus field after scroll
                    setTimeout(() => {
                        field.focus({ preventScroll: true });
                    }, 100);
                });
            });
        }
        
        enhanceFormInteractions() {
            // Add visual feedback for form interactions
            const bookingCard = document.querySelector('.booking-card');
            if (!bookingCard) return;
            
            // Add hover effect to booking card
            bookingCard.addEventListener('mouseenter', () => {
                bookingCard.style.transform = 'translateY(-2px)';
            });
            
            bookingCard.addEventListener('mouseleave', () => {
                bookingCard.style.transform = 'translateY(0)';
            });
            
            // Enhance date inputs
            const dateInputs = document.querySelectorAll('input[type="date"]');
            dateInputs.forEach(input => {
                // Set min date to today
                const today = new Date().toISOString().split('T')[0];
                if (input.id === 'checkin') {
                    input.min = today;
                    
                    // Update checkout min when checkin changes
                    input.addEventListener('change', () => {
                        const checkoutInput = document.getElementById('checkout');
                        if (checkoutInput && input.value) {
                            const nextDay = new Date(input.value);
                            nextDay.setDate(nextDay.getDate() + 1);
                            checkoutInput.min = nextDay.toISOString().split('T')[0];
                            
                            // Clear checkout if it's before new min
                            if (checkoutInput.value && checkoutInput.value <= input.value) {
                                checkoutInput.value = '';
                            }
                        }
                    });
                }
            });
        }
        
        setupGuestCounter() {
            // Handle guest counter buttons
            const minusBtn = document.querySelector('.guest-btn.minus');
            const plusBtn = document.querySelector('.guest-btn.plus');
            const guestInput = document.getElementById('guests');
            
            if (!minusBtn || !plusBtn || !guestInput) return;
            
            minusBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const current = parseInt(guestInput.value) || 1;
                if (current > 1) {
                    guestInput.value = current - 1;
                    this.animateCounter(guestInput);
                }
            });
            
            plusBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const current = parseInt(guestInput.value) || 1;
                if (current < 10) {
                    guestInput.value = current + 1;
                    this.animateCounter(guestInput);
                }
            });
        }
        
        animateCounter(input) {
            // Add pulse animation
            input.style.transform = 'scale(1.1)';
            setTimeout(() => {
                input.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new BookingFormFix();
        });
    } else {
        new BookingFormFix();
    }
})();