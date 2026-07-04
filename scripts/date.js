const currentYearElement = document.getElementById('currentyear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    lastModifiedElement.innerHTML = `Last Modification: ${document.lastModified}`;
}