// Gallery Load More Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');

    if (!loadMoreBtn || !galleryGrid || hiddenItems.length === 0) {
        // Hide button if no hidden items
        if (loadMoreBtn && hiddenItems.length === 0) {
            loadMoreBtn.style.display = 'none';
        }
        return;
    }

    let currentIndex = 0;
    const itemsPerLoad = 8; // Show 8 more images each time

    // Function to load more items
    function loadMoreItems() {
        const endIndex = Math.min(currentIndex + itemsPerLoad, hiddenItems.length);

        // Reveal the next batch of items
        for (let i = currentIndex; i < endIndex; i++) {
            const item = hiddenItems[i];

            // Remove hidden class with animation
            setTimeout(() => {
                item.classList.remove('hidden');
                item.classList.add('fade-in');

                // Trigger lazy loading for the image
                const img = item.querySelector('img');
                if (img && img.dataset.src) {
                    img.src = img.dataset.src;
                    delete img.dataset.src;
                }
            }, (i - currentIndex) * 50); // Stagger animation
        }

        currentIndex = endIndex;

        // Update button text or hide if all items are shown
        if (currentIndex >= hiddenItems.length) {
            // All items loaded - change button text then hide
            loadMoreBtn.textContent = 'All Images Loaded';
            loadMoreBtn.classList.add('secondary');

            setTimeout(() => {
                loadMoreBtn.style.opacity = '0';
                loadMoreBtn.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    loadMoreBtn.style.display = 'none';
                }, 300);
            }, 1500);
        } else {
            // Update count
            const remaining = hiddenItems.length - currentIndex;
            loadMoreBtn.innerHTML = `<span data-translate="load-more">Load More</span> (${remaining})`;
        }
    }

    // Initial button text
    const totalHidden = hiddenItems.length;
    loadMoreBtn.innerHTML = `<span data-translate="load-more">Load More</span> (${totalHidden})`;

    // Click handler
    loadMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Disable button during loading
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('loading');

        // Simulate loading delay for better UX
        setTimeout(() => {
            loadMoreItems();
            loadMoreBtn.disabled = false;
            loadMoreBtn.classList.remove('loading');
        }, 300);
    });

    // Keyboard accessibility
    loadMoreBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            loadMoreBtn.click();
        }
    });

    // Intersection Observer for auto-load when scrolling near button
    const observerOptions = {
        root: null,
        rootMargin: '200px',
        threshold: 0.1
    };

    const autoLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !loadMoreBtn.disabled && currentIndex < hiddenItems.length) {
                // Auto-load when user scrolls near the button
                // Uncomment below to enable auto-loading
                // loadMoreBtn.click();
            }
        });
    }, observerOptions);

    // Start observing the load more button
    autoLoadObserver.observe(loadMoreBtn);

    // Handle language switching
    function updateLoadMoreText() {
        const currentLang = localStorage.getItem('language') || 'tr';
        const translations = {
            'tr': 'Daha Fazla Göster',
            'en': 'Load More',
            'ar': 'تحميل المزيد'
        };

        const remaining = hiddenItems.length - currentIndex;
        if (remaining > 0) {
            loadMoreBtn.innerHTML = `<span data-translate="load-more">${translations[currentLang]}</span> (${remaining})`;
        }
    }

    // Listen for language changes
    document.addEventListener('languageChanged', updateLoadMoreText);
});