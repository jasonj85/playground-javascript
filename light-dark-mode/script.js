const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// dark / light images
function imageMode(color) {
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

// dark mode
function darkMode() {
    nav.style.backgroundColor = 'rbg(0 0 0 / 50%)';
    textBox.style.backgroundColor = 'rbg(255 255 255 / 50%)';
    console.log(toggleIcon.children[0]);
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    imageMode('dark');
}

// light mode
function lightMode() {
    nav.style.backgroundColor = 'rbg(255 255 255 / 50%)';
    textBox.style.backgroundColor = 'rbg(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    imageMode('light');
}

// switch theme
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkMode();
        localStorage.setItem('theme', 'dark');
        localStorage.setItem('myCat', 'Tom');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        lightMode();
        localStorage.setItem('theme', 'light');
    }
}

// event listener
toggleSwitch.addEventListener('change', switchTheme);

// check theme from localstorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme); 

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        darkMode();
    }
}
