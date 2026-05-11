document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservation-form');
    const confirmation = document.getElementById('confirmation');
    
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            
            if (phone && !/^01[0-2,5][0-9]{8}$/.test(phone)) {
                alert('Please enter a valid Egyptian phone number (e.g., 01234567890)');
                return;
            }
            
            document.getElementById('confirm-name').textContent = name;
            document.getElementById('confirm-date').textContent = date;
            document.getElementById('confirm-time').textContent = time;
            
            confirmation.classList.remove('hidden');
            
            const reservation = {
                name: name,
                email: email,
                phone: phone,
                date: date,
                time: time,
                guests: guests,
                timestamp: new Date().toISOString()
            };
            
            let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
            reservations.push(reservation);
            localStorage.setItem('reservations', JSON.stringify(reservations));
            
            confirmation.scrollIntoView({ behavior: 'smooth' });
            
            form.style.opacity = '0.5';
            form.style.pointerEvents = 'none';
        });
        
        const resetBtn = form.querySelector('button[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                confirmation.classList.add('hidden');
                form.style.opacity = '1';
                form.style.pointerEvents = 'auto';
            });
        }
    }
    
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#28a745';
            } else {
                this.style.borderColor = '#dc3545';
            }
        });
    });
});