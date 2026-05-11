document.addEventListener('DOMContentLoaded', function() {
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        footerYear.innerHTML = '&copy; ' + new Date().getFullYear() + ' Sultan\'s Feast. All rights reserved.';
    }
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === currentPage) {
            link.style.backgroundColor = '#D2691E';
            link.style.fontWeight = 'bold';
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const priorityRange = document.getElementById('priority');
        const priorityValue = document.getElementById('priority-value');
        
        if (priorityRange && priorityValue) {
            const labels = ['Very Low', 'Low', 'Normal', 'High', 'Very High'];
            priorityRange.addEventListener('input', function() {
                priorityValue.textContent = labels[this.value - 1];
                priorityValue.style.color = 'hsl(' + (120 - (this.value - 1) * 30) + ', 70%, 40%)';
            });
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            alert('Thank you ' + name + '! Your message has been sent successfully.');
            this.reset();
        });
    }
    
    const allButtons = document.querySelectorAll('button, .btn');
    allButtons.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('hidden');
    }
}