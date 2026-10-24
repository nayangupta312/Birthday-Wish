async function loadBirthdayPage() {
    const app = document.getElementById('app');
    const response = await fetch('birthday-content.html');

    if (!response.ok) {
        throw new Error(`Could not load birthday-content.html (${response.status}).`);
    }

    app.innerHTML = await response.text();

    const script = document.createElement('script');
    script.src = 'birthday.js';
    script.onerror = () => {
        showLoadError('Could not load birthday.js.');
    };
    document.body.appendChild(script);
}

function showLoadError(message) {
    console.error(message);
    const app = document.getElementById('app');
    app.textContent = message;
    app.className = 'p-6 text-center text-white';
}

loadBirthdayPage().catch(error => {
    showLoadError(`Unable to load the birthday page: ${error.message}`);
});
