class BookingSystem {
  constructor() {
    this.form = document.getElementById('reservation-form');
    this.roomCards = document.querySelectorAll('.room-card');
    this.dateInput = document.getElementById('dates');
    this.init();
  }
  
  init() {
    this.setupDatePicker();
    this.setupRoomSelection();
    this.setupFormSubmission();
  }
  
  setupDatePicker() {
    if (!this.dateInput) return;
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    this.dateInput.addEventListener('focus', () => {
      if (!this.dateInput.value) {
        const checkIn = this.formatDate(today);
        const checkOut = this.formatDate(tomorrow);
        this.dateInput.value = `${checkIn} - ${checkOut}`;
      }
    });
    
    this.dateInput.addEventListener('click', () => {
      this.showDateModal();
    });
  }
  
  formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
  showDateModal() {
    const modal = document.createElement('div');
    modal.className = 'date-modal';
    modal.innerHTML = `
      <div class="date-modal-content">
        <h3>Select Your Dates</h3>
        <div class="date-inputs">
          <div class="date-input-group">
            <label>Check-in</label>
            <input type="date" id="check-in" min="${new Date().toISOString().split('T')[0]}">
          </div>
          <div class="date-input-group">
            <label>Check-out</label>
            <input type="date" id="check-out" min="${new Date().toISOString().split('T')[0]}">
          </div>
        </div>
        <div class="date-modal-actions">
          <button class="btn btn-outline" onclick="this.closest('.date-modal').remove()">Cancel</button>
          <button class="btn btn-primary" id="confirm-dates">Confirm</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const checkIn = modal.querySelector('#check-in');
    const checkOut = modal.querySelector('#check-out');
    const confirmBtn = modal.querySelector('#confirm-dates');
    
    checkIn.addEventListener('change', () => {
      const minCheckOut = new Date(checkIn.value);
      minCheckOut.setDate(minCheckOut.getDate() + 1);
      checkOut.min = minCheckOut.toISOString().split('T')[0];
      
      if (checkOut.value && new Date(checkOut.value) <= new Date(checkIn.value)) {
        checkOut.value = checkOut.min;
      }
    });
    
    confirmBtn.addEventListener('click', () => {
      if (checkIn.value && checkOut.value) {
        const checkInDate = new Date(checkIn.value);
        const checkOutDate = new Date(checkOut.value);
        this.dateInput.value = `${this.formatDate(checkInDate)} - ${this.formatDate(checkOutDate)}`;
        modal.remove();
        this.calculatePrice(checkInDate, checkOutDate);
      }
    });
    
    setTimeout(() => modal.classList.add('active'), 10);
  }
  
  calculatePrice(checkIn, checkOut) {
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const roomSelect = document.getElementById('room');
    
    if (roomSelect && roomSelect.value) {
      const prices = {
        deluxe: 250,
        premium: 350,
        signature: 550
      };
      
      const basePrice = prices[roomSelect.value] || 250;
      const totalPrice = basePrice * nights;
      
      this.showPriceSummary(nights, totalPrice);
    }
  }
  
  showPriceSummary(nights, total) {
    const existing = document.querySelector('.price-summary');
    if (existing) existing.remove();
    
    const summary = document.createElement('div');
    summary.className = 'price-summary';
    summary.innerHTML = `
      <h4>Booking Summary</h4>
      <div class="summary-item">
        <span>Number of nights:</span>
        <span>${nights}</span>
      </div>
      <div class="summary-item summary-total">
        <span>Total price:</span>
        <span>€${total.toLocaleString()}</span>
      </div>
    `;
    
    this.form.insertBefore(summary, this.form.querySelector('.btn-submit'));
  }
  
  setupRoomSelection() {
    this.roomCards.forEach(card => {
      const button = card.querySelector('.btn-outline');
      if (button) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const roomType = card.dataset.room;
          this.selectRoom(roomType);
        });
      }
    });
  }
  
  selectRoom(roomType) {
    const roomSelect = document.getElementById('room');
    if (roomSelect) {
      roomSelect.value = roomType;
    }
    
    window.scrollTo({
      top: document.getElementById('contact').offsetTop - 80,
      behavior: 'smooth'
    });
  }
  
  setupFormSubmission() {
    if (!this.form) return;
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (this.validateBookingForm()) {
        this.submitBooking();
      }
    });
  }
  
  validateBookingForm() {
    const required = this.form.querySelectorAll('[required]');
    let isValid = true;
    
    required.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        isValid = false;
      } else {
        field.classList.remove('error');
      }
    });
    
    return isValid;
  }
  
  submitBooking() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    const submitBtn = this.form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    
    setTimeout(() => {
      this.showBookingConfirmation(data);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      this.form.reset();
    }, 2000);
  }
  
  showBookingConfirmation(data) {
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.innerHTML = `
      <div class="confirmation-content">
        <div class="confirmation-icon">✓</div>
        <h2>Reservation Request Received!</h2>
        <p>Thank you, ${data.name}. We have received your reservation request.</p>
        <p>Our team will contact you within 24 hours to confirm your booking.</p>
        <button class="btn btn-primary" onclick="this.closest('.confirmation-modal').remove()">Close</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BookingSystem();
});

const bookingStyles = document.createElement('style');
bookingStyles.textContent = `
  .date-modal,
  .confirmation-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 1rem;
  }
  
  .date-modal.active,
  .confirmation-modal.active {
    opacity: 1;
  }
  
  .date-modal-content,
  .confirmation-content {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    max-width: 500px;
    width: 100%;
  }
  
  .date-modal h3 {
    margin-bottom: 1.5rem;
  }
  
  .date-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .date-input-group {
    display: flex;
    flex-direction: column;
  }
  
  .date-input-group label {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  .date-input-group input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    font-size: 1rem;
  }
  
  .date-modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
  
  .price-summary {
    background: #f8f7f4;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 1.5rem;
  }
  
  .price-summary h4 {
    margin-bottom: 1rem;
  }
  
  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .summary-total {
    font-weight: bold;
    font-size: 1.125rem;
    padding-top: 0.5rem;
    border-top: 1px solid #ddd;
  }
  
  .confirmation-icon {
    width: 60px;
    height: 60px;
    background: #27ae60;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 1rem;
  }
  
  .confirmation-content {
    text-align: center;
  }
  
  .confirmation-content h2 {
    margin-bottom: 1rem;
  }
  
  .confirmation-content p {
    margin-bottom: 0.75rem;
    color: #666;
  }
  
  .confirmation-content .btn {
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    .date-inputs {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(bookingStyles);