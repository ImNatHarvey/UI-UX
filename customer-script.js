function loadCustomerHTML(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            if (id === "customer-navbar") {
                setCustomerActiveNav();
            }
        })
        .catch(error => console.error("Error loading file:", file, error));
}

function setCustomerActiveNav() {
    const links = document.querySelectorAll("#customer-navbar a.nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Load customer navbar and footer automatically
window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("customer-navbar")) {
        loadCustomerHTML("customer-navbar", "customer-navbar.html");
    }
    if (document.getElementById("footer")) {
        loadCustomerHTML("footer", "footer.html");
    }

    // Add logout functionality
    document.getElementById("customerLogout")?.addEventListener("click", function (e) {
        e.preventDefault();
        if (confirm("Are you sure you want to log out?")) {
            // Redirect to login page
            window.location.href = "login.html";
        }
    });

    // Initialize customer dashboard functionality
    initCustomerDashboard();
});

function initCustomerDashboard() {
    // Customer dashboard initialization code
    console.log("Customer dashboard initialized");

    // Load recent orders if on dashboard
    if (document.getElementById('recentOrders')) {
        loadRecentOrders();
    }

    // Initialize profile form if on profile page
    if (document.getElementById('profileForm')) {
        initProfileForm();
    }
}

function loadRecentOrders() {
    // This would typically fetch from an API
    const recentOrders = [
        { id: 'ORD-1025', date: '2025-09-03', total: '₱245', status: 'Delivered' },
        { id: 'ORD-1024', date: '2025-09-02', total: '₱189', status: 'Preparing' },
        { id: 'ORD-1023', date: '2025-09-01', total: '₱320', status: 'Completed' }
    ];

    const ordersContainer = document.getElementById('recentOrders');
    if (ordersContainer) {
        ordersContainer.innerHTML = recentOrders.map(order => `
            <div class="card mb-2">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-0">Order #${order.id}</h6>
                        <small class="text-muted">${order.date} • ${order.total}</small>
                    </div>
                    <span class="badge bg-${order.status === 'Delivered' ? 'success' : order.status === 'Preparing' ? 'warning' : 'info'}">${order.status}</span>
                </div>
            </div>
        `).join('');
    }
}

function initProfileForm() {
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');

    if (profileForm) {
        // Load user data (this would typically come from an API)
        const userData = {
            fullName: 'Juan Dela Cruz',
            deliveryAddress: '123 Main Street, Manila',
            contactNumber: '09123456789',
            username: 'juan.delacruz'
        };

        // Populate form fields
        document.getElementById('fullName').value = userData.fullName;
        document.getElementById('deliveryAddress').value = userData.deliveryAddress;
        document.getElementById('contactNumber').value = userData.contactNumber;
        document.getElementById('username').value = userData.username;

        // Handle form submission
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get updated values
            const updatedData = {
                fullName: document.getElementById('fullName').value,
                deliveryAddress: document.getElementById('deliveryAddress').value,
                contactNumber: document.getElementById('contactNumber').value,
                username: document.getElementById('username').value
            };

            // Here you would typically send this to an API
            console.log('Updating profile:', updatedData);

            // Show success message
            alert('Profile updated successfully!');
        });
    }

    if (passwordForm) {
        passwordForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validate passwords match
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match!');
                return;
            }

            // Here you would typically send this to an API
            console.log('Changing password:', { currentPassword, newPassword });

            // Show success message and reset form
            alert('Password changed successfully!');
            passwordForm.reset();
        });
    }
}

