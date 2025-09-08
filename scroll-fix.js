// Temporary fix - disable all problematic scroll enhancements
(function() {
    'use strict';
    
    // Disable Lenis smooth scroll if it exists
    if (window.lenis) {
        window.lenis.destroy();
        window.lenis = null;
    }
    
    // Remove smooth scroll CSS
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Disable navigation enhancements that cause jumping
    window.NavigationEnhancer = null;
    window.QuickNav = null;
    
    // Remove any scroll event listeners that cause stuttering
    const newBody = document.body.cloneNode(true);
    document.body.parentNode.replaceChild(newBody, document.body);
    
    // Simple smooth scroll only for anchor links
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
    
    console.log('Scroll fix applied - problematic enhancements disabled');
})();