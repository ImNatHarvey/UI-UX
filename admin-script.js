function loadAdminHTML(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            if (id === "admin-navbar") {
                setAdminActiveNav();
            }
        })
        .catch(error => console.error("Error loading file:", file, error));
}

function setAdminActiveNav() {
    const links = document.querySelectorAll("#admin-navbar a.nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Load admin navbar and footer automatically
window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("admin-navbar")) {
        loadAdminHTML("admin-navbar", "admin-navbar.html");
    }
    if (document.getElementById("footer")) {
        loadAdminHTML("footer", "footer.html");
    }
    
    // Add logout functionality
    document.getElementById("adminLogout")?.addEventListener("click", function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to log out?")) {
            // Redirect to login page or perform logout actions
            window.location.href = "login.html";
        }
    });
    
    // Initialize any admin-specific functionality
    initAdminDashboard();
});

function initAdminDashboard() {
    // Admin dashboard initialization code
    console.log("Admin dashboard initialized");
    
    // You can add chart initialization or other admin-specific JS here
}