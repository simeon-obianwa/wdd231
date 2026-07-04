// Course data array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseContainer = document.getElementById('course-container');
const totalCreditsElement = document.getElementById('total-credits');

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'course-overlay';
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay-content">
            <button class="overlay-close" aria-label="Close overlay">&times;</button>
            <div id="overlay-body"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('.overlay-close').addEventListener('click', closeOverlay);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeOverlay();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeOverlay();
        }
    });
}

function openOverlay(course) {
    const overlay = document.getElementById('course-overlay');
    const overlayBody = document.getElementById('overlay-body');

    const techList = course.technology.join(', ');

    overlayBody.innerHTML = `
        <h2>${course.subject} ${course.number}: ${course.title}</h2>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p><strong>Description:</strong></p>
        <p>${course.description}</p>
        <p><strong>Technologies:</strong> ${techList}</p>
        ${course.completed ? '<p class="completed-badge">✓ Completed</p>' : ''}
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOverlay() {
    const overlay = document.getElementById('course-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function createCourseCard(course) {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    courseCard.setAttribute('tabindex', '0');
    courseCard.setAttribute('role', 'button');
    courseCard.setAttribute('aria-label', `View details for ${course.subject} ${course.number}: ${course.title}`);

    if (course.completed) {
        courseCard.classList.add('completed');
    }

    const techTags = course.technology.map(tech =>
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    courseCard.innerHTML = `
        <div class="course-header">
            <h3>${course.subject} ${course.number}</h3>
            <p class="course-title">${course.title}</p>
        </div>
        <p class="course-credits">${course.credits} credits</p>
        <p class="course-certificate">Certificate: ${course.certificate}</p>
        <p class="course-description">${course.description}</p>
        <div class="course-tech">${techTags}</div>
        ${course.completed ? '<p class="completed-badge">✓ Completed</p>' : ''}
    `;

    courseCard.addEventListener('click', () => openOverlay(course));

    courseCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openOverlay(course);
        }
    });

    return courseCard;
}

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        courseContainer.appendChild(courseCard);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
}

document.addEventListener('DOMContentLoaded', () => {
    createOverlay();
    displayCourses(courses);
});

const btnAll = document.getElementById('btn-all');
const btnCse = document.getElementById('btn-cse');
const btnWdd = document.getElementById('btn-wdd');

function updateActiveButton(activeBtn) {
    [btnAll, btnCse, btnWdd].forEach(btn => btn.classList.remove('active-filter'));
    activeBtn.classList.add('active-filter');
}

btnAll.addEventListener('click', () => {
    displayCourses(courses);
    updateActiveButton(btnAll);
});

btnCse.addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
    updateActiveButton(btnCse);
});

btnWdd.addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
    updateActiveButton(btnWdd);
});