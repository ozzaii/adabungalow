// WhatsApp Form Integration for Ada Bungalow
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('luxuryReservation');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const suite = document.getElementById('suite').value;
            const message = document.getElementById('message').value;
            
            // Get villa type text
            const suiteSelect = document.getElementById('suite');
            const suiteText = suiteSelect.options[suiteSelect.selectedIndex].text;
            
            // Create WhatsApp message
            let whatsappMessage = `Merhaba, Ada Bungalow rezervasyon talebi:\n\n`;
            whatsappMessage += `📝 *Rezervasyon Bilgileri*\n`;
            whatsappMessage += `👤 Ad Soyad: ${name}\n`;
            whatsappMessage += `📧 Email: ${email}\n`;
            whatsappMessage += `📱 Telefon: ${phone}\n`;
            whatsappMessage += `📅 Giriş Tarihi: ${checkin}\n`;
            whatsappMessage += `📅 Çıkış Tarihi: ${checkout}\n`;
            whatsappMessage += `🏡 Villa Tipi: ${suiteText}\n`;
            
            if (message) {
                whatsappMessage += `💬 Özel İstekler: ${message}\n`;
            }
            
            whatsappMessage += `\nLütfen müsaitlik ve fiyat bilgisi veriniz.`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp number
            const whatsappNumber = '905454174344';
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Show success message
            const btn = form.querySelector('.btn-submit span');
            const originalText = btn.textContent;
            btn.textContent = '✓ WhatsApp\'a Yönlendiriliyor...';
            
            setTimeout(() => {
                btn.textContent = originalText;
                form.reset();
            }, 3000);
        });
    }
    
    // Update suite WhatsApp links with specific messages
    const suiteLinks = document.querySelectorAll('.suite-link');
    suiteLinks.forEach((link, index) => {
        const villaTypes = ['Havuzlu VIP Villa', 'Şelaleli Villa', 'Luxury 3+1 Villa'];
        const villaType = villaTypes[index] || 'Villa';
        
        const message = `Merhaba, ${villaType} hakkında bilgi almak istiyorum. Müsaitlik ve fiyat bilgisi verebilir misiniz?`;
        const encodedMessage = encodeURIComponent(message);
        
        link.href = `https://wa.me/905454174344?text=${encodedMessage}`;
    });
    
    // Add tooltip to floating WhatsApp button
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        const tooltip = document.createElement('div');
        tooltip.className = 'whatsapp-message';
        tooltip.innerHTML = '💬 Hemen rezervasyon yapın!';
        document.body.appendChild(tooltip);
        
        let showTimeout;
        
        // Show tooltip after 3 seconds
        showTimeout = setTimeout(() => {
            tooltip.classList.add('show');
            
            // Hide after 5 seconds
            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 5000);
        }, 3000);
        
        // Hide tooltip when clicked
        whatsappFloat.addEventListener('click', () => {
            tooltip.classList.remove('show');
            clearTimeout(showTimeout);
        });
    }
});

// Add date pickers for check-in and check-out
document.addEventListener('DOMContentLoaded', function() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        checkinInput.setAttribute('type', 'date');
        checkinInput.setAttribute('min', today);
        
        checkoutInput.setAttribute('type', 'date');
        checkoutInput.setAttribute('min', today);
        
        // Update checkout min date when checkin changes
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            const minCheckout = checkinDate.toISOString().split('T')[0];
            checkoutInput.setAttribute('min', minCheckout);
            
            if (checkoutInput.value && checkoutInput.value < minCheckout) {
                checkoutInput.value = minCheckout;
            }
        });
    }
});