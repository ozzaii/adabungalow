// Simple image visibility fix
(function() {
    'use strict';
    
    // Make all images visible immediately
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loaded class to all images
            img.classList.add('loaded');
            
            // Also ensure opacity is set
            img.style.opacity = '1';
            
            // If image fails to load, still show placeholder
            img.onerror = function() {
                this.style.opacity = '1';
                this.classList.add('loaded');
            };
        });
    });
    
    // Also handle dynamically added images
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.tagName === 'IMG') {
                    node.classList.add('loaded');
                    node.style.opacity = '1';
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();