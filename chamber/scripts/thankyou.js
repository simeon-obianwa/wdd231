document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const hamburgerBtn = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
hamburgerBtn.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamburgerBtn.textContent = hamburgerBtn.classList.contains('open') ? '✖' : '☰';
});

const currentUrl = window.location.search;
const urlParams = new URLSearchParams(currentUrl);

if (urlParams.has("first_name")) {
    document.getElementById("res-first").textContent = urlParams.get("first_name");
    document.getElementById("res-last").textContent = urlParams.get("last_name");
    document.getElementById("res-email").textContent = urlParams.get("email");
    document.getElementById("res-phone").textContent = urlParams.get("phone");
    document.getElementById("res-org").textContent = urlParams.get("organization");
    
    const rawTime = urlParams.get("timestamp");
    const formattedDate = new Date(rawTime).toLocaleString();
    document.getElementById("res-time").textContent = formattedDate;
}