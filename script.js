// JavaScript for Interactive Features (Tasks 4, 5, 6)

// Task 4: Interactive Button - Change Background Theme
document.addEventListener('DOMContentLoaded', function() {
    const colorChangeBtn = document.getElementById('colorChangeBtn');
    
    colorChangeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            colorChangeBtn.textContent = 'Switch to Light Mode';
            colorChangeBtn.classList.remove('btn-primary');
            colorChangeBtn.classList.add('btn-warning');
        } else {
            colorChangeBtn.textContent = 'Click to Change Theme';
            colorChangeBtn.classList.remove('btn-warning');
            colorChangeBtn.classList.add('btn-primary');
        }
    });
    
    // Task 5: API Integration - Fetch Users from JSONPlaceholder
    const fetchUsersBtn = document.getElementById('fetchUsers');
    const userDataContainer = document.getElementById('userData');
    
    fetchUsersBtn.addEventListener('click', function() {
        fetchUsersBtn.disabled = true;
        fetchUsersBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
        
        // Fetch data from JSONPlaceholder API
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                displayUsers(users);
                fetchUsersBtn.disabled = false;
                fetchUsersBtn.textContent = 'Load Users';
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                userDataContainer.innerHTML = '<div class="alert alert-danger">Failed to load user data. Please try again.</div>';
                fetchUsersBtn.disabled = false;
                fetchUsersBtn.textContent = 'Load Users';
            });
    });
    
    function displayUsers(users) {
        userDataContainer.innerHTML = '';
        
        users.slice(0, 6).forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'col-md-4 mb-3';
            userCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${user.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${user.company.name}</h6>
                        <p class="card-text">
                            <strong>Email:</strong> ${user.email}<br>
                            <strong>Phone:</strong> ${user.phone}<br>
                            <strong>Website:</strong> ${user.website}
                        </p>
                    </div>
                </div>
            `;
            userDataContainer.appendChild(userCard);
        });
    }
    
    // Task 6: Form Validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Reset previous validation states
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.classList.remove('is-invalid');
        });
        
        // Validate form fields
        let isValid = true;
        
        // Name validation
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            nameInput.classList.add('is-invalid');
            isValid = false;
        }
        
        // Email validation
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        }
        
        // Message validation
        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim()) {
            messageInput.classList.add('is-invalid');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            formSuccess.classList.remove('d-none');
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.add('d-none');
            }, 5000);
        }
    });
    
    // Real-time validation for email field
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.remove('is-invalid');
        }
    });
    
    // Load some users by default
    fetchUsersBtn.click();
});