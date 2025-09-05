function loadHTML(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            if (id === "navbar") {
                setActiveNav();
            }
        })
        .catch(error => console.error("Error loading file:", file, error));
}

function setActiveNav() {
    const links = document.querySelectorAll("#navbar a.nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Load navbar and footer automatically
window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("navbar")) {
        loadHTML("navbar", "navbar.html");
    }
    if (document.getElementById("footer")) {
        loadHTML("footer", "footer.html");
    }
});
