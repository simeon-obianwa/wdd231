import { places } from '../data/places.mjs';

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const hamburgerBtn = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamburgerBtn.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamburgerBtn.textContent = hamburgerBtn.classList.contains('open') ? '✖' : '☰';
});

const visitorBanner = document.getElementById('visitor-message');
const visitorText = document.getElementById('visitor-text');
const closeVisitorBtn = document.getElementById('close-visitor-btn');

const lastVisit = localStorage.getItem('lastDiscoverVisit');
const currentVisit = Date.now();

if (!lastVisit) {
    visitorText.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentVisit - parseInt(lastVisit, 10);
    const msInDay = 1000 * 60 * 60 * 24;
    const daysDifference = Math.floor(timeDifference / msInDay);

    if (daysDifference < 1) {
        visitorText.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        visitorText.textContent = "You last visited 1 day ago.";
    } else {
        visitorText.textContent = `You last visited ${daysDifference} days ago.`;
    }
}

localStorage.setItem('lastDiscoverVisit', currentVisit.toString());

if (closeVisitorBtn) {
    closeVisitorBtn.addEventListener('click', () => {
        visitorBanner.style.display = 'none';
    });
}

const container = document.getElementById('discover-cards-container');

places.forEach(place => {
    const card = document.createElement('article');
    card.classList.add('discover-card');
    card.style.gridArea = place.id;

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>📍 ${place.address}</address>
        <p>${place.description}</p>
        <button type="button" class="learn-more-btn" data-id="${place.id}">Learn More</button>
    `;

    container.appendChild(card);
});

const modal = document.getElementById('discover-modal');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-discover-modal');

document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const placeId = button.getAttribute('data-id');
        const place = places.find(p => p.id === placeId);

        if (place) {
            modalContent.innerHTML = `
                <h3>${place.name} Details</h3>
                <ul>
                    <li><strong>Location:</strong> ${place.address}</li>
                    <li><strong>Overview:</strong> ${place.description}</li>
                    <li><strong>Operating Hours:</strong> Open daily to tourists & chamber members</li>
                    <li><strong>Verification:</strong> Verified Lekki Chamber Partner Attraction</li>
                </ul>
            `;
            modal.showModal();
        }
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => modal.close());
}

modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
        rect.top <= event.clientY && event.clientY <= rect.bottom &&
        rect.left <= event.clientX && event.clientX <= rect.right
    );
    if (!isInDialog) {
        modal.close();
    }
});