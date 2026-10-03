// 1. Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

if(window.innerWidth <= 850) {
    themeToggleMobile.style.display = 'block';
}

// 2. Menu Mobile Toggle
const menuBtn = document.getElementById('menuBtn');
const links = document.querySelector('.links');
menuBtn.addEventListener('click', () => {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
});

// 3. Efek Scroll Parallax 3D Model
window.addEventListener('scroll', () => {
    const modelWrap = document.querySelector('.model-wrap');
    if (modelWrap) {
        const scrollY = window.scrollY;
        
        let opacity = 1 - (scrollY / 600);
        modelWrap.style.opacity = Math.max(0, opacity);
        
        let brightness = 1 - (scrollY / 500);
        modelWrap.style.filter = `brightness(${Math.max(0.2, brightness)})`;
        
        let translateY = scrollY * 0.45; 
        modelWrap.style.transform = `translateY(${translateY}px)`;
    }
});
