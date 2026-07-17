document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const hamburgerBtn = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamburgerBtn.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamburgerBtn.classList.toggle('open');
    if (hamburgerBtn.classList.contains('open')) {
        hamburgerBtn.textContent = '✖';
    } else {
        hamburgerBtn.textContent = '☰';
    }
});

const url = 'data/members.json';
const display = document.querySelector('#directory-container');

const getMembershipName = (level) => {
    switch (level) {
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Member";
    }
};

async function getDirectoryData() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching directory data:", error);
    }
}

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement('section');

        let levelClass = getMembershipName(member.membershipLevel).toLowerCase();

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="150" height="auto">
            <h3>${member.name}</h3>
            <p class="membership-badge ${levelClass}">${getMembershipName(member.membershipLevel)} Level</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        display.appendChild(card);
    });
}

getDirectoryData();

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listButton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});