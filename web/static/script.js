function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        const classElement = resultDiv.querySelector('.class');
        const scoreElement = resultDiv.querySelector('.score');

        if (data.error) {
            resultDiv.textContent = `Error: ${data.error}`;
        } else {

            classElement.textContent = `Predicted Class: ${data.class}`;
            scoreElement.textContent = `Prediction Confidence Score: ${data.score}`;
            localStorage.setItem('classResult', data.class);
            localStorage.setItem('scoreResult', data.score);
        }    
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function loadContent(url, button) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;

            // now to keep the button highlighted for the active page
            const buttons = document.querySelectorAll('.sideBar button');
            buttons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            updatePageWithLocalStorage();

        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

function updatePageWithLocalStorage() {
    // This function should be called to update the page with data from local storage
    const savedClassResult = localStorage.getItem('classResult');
    const savedScoreResult = localStorage.getItem('scoreResult');

    const classElement = document.querySelector('#result .class');
    const scoreElement = document.querySelector('#result .score');

    if (classElement && savedClassResult) {
        classElement.textContent = `Predicted Class: ${savedClassResult}`;
    }

    if (scoreElement && savedScoreResult) {
        scoreElement.textContent = `Prediction Confidence Score: ${savedScoreResult}`;
    }
}

