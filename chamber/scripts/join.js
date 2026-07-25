document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const hamburgerBtn = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamburgerBtn.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamburgerBtn.textContent = hamburgerBtn.classList.contains('open') ? '✖' : '☰';
});

document.getElementById('timestamp').value = new Date().toISOString();

const modalButtons = document.querySelectorAll('.modal-btn');
const closeButtons = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.modal');

modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetModalId = button.getAttribute('data-target');
        const modal = document.getElementById(targetModalId);
        modal.showModal();
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        modal.close();
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        const rect = modal.getBoundingClientRect();
        const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            modal.close();
        }
    });
});