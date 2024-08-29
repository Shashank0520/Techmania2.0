// Get the theme switcher checkbox
const themeSwitch = document.getElementById('theme-switch');

// Check if there's a saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'dark-theme') {
        themeSwitch.checked = true;
    }
}

// Add event listener to toggle the theme
themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light-theme');
    }
});

// Smooth scrolling to top
document.getElementById('scroll-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Toggle dropdown menu on click
document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('show');

        // Close other dropdowns if any
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            if (dropdown !== parent) {
                dropdown.classList.remove('show');
            }
        });
    });
});

window.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
});