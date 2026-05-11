document.addEventListener('DOMContentLoaded', function() {
    const menuBody = document.getElementById('menu-body');
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    const orderList = document.getElementById('order-list');
    const totalSpan = document.getElementById('total');
    const budgetMeter = document.getElementById('budget');
    
    let order = [];
    let total = 0;
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = menuBody.querySelectorAll('tr');
            
            rows.forEach(function(row) {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const category = this.value;
            const rows = menuBody.querySelectorAll('tr');
            
            rows.forEach(function(row) {
                if (category === 'all' || row.dataset.category === category) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const name = row.cells[0].textContent;
            const priceText = row.cells[2].textContent;
            const price = parseFloat(priceText.replace('$', ''));
            
            order.push({ name: name, price: price });
            total += price;
            
            updateOrderDisplay();
            
            this.textContent = 'Added!';
            this.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                this.textContent = 'Add';
                this.style.backgroundColor = '';
            }, 1000);
        });
    });
    
    function updateOrderDisplay() {
        orderList.innerHTML = '';
        order.forEach(function(item, index) {
            const li = document.createElement('li');
            li.innerHTML = item.name + ' - $' + item.price.toFixed(2) + 
                ' <button onclick="removeItem(' + index + ')" style="background:#dc3545;color:white;border:none;padding:2px 8px;border-radius:3px;cursor:pointer;">×</button>';
            orderList.appendChild(li);
        });
        
        totalSpan.textContent = total.toFixed(2);
        budgetMeter.value = total;
        
        localStorage.setItem('order', JSON.stringify(order));
        localStorage.setItem('total', total);
    }
    
    window.removeItem = function(index) {
        total -= order[index].price;
        order.splice(index, 1);
        updateOrderDisplay();
    };
    
    const savedOrder = localStorage.getItem('order');
    if (savedOrder) {
        order = JSON.parse(savedOrder);
        total = parseFloat(localStorage.getItem('total')) || 0;
        updateOrderDisplay();
    }
});