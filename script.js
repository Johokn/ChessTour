const API_URL = 'https://script.google.com/u/0/home/projects/1HC9XXo7yrwmRd_8XkSz5kakxUWU3d5yF9uyp-3ym14-4VBSNQIo1eBKC/edit';

// Hent data fra Google Sheets
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const tbody = document.querySelector('#scoreTable tbody');
        tbody.innerHTML = ''; // Ryd eksisterende rækker

        data.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
                <td>${row[4]}</td>
                <td>${row[5]}</td>
                <td>${row[6]}</td>
                <td>${row[7]}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Fejl ved hentning af data:', error);
    }
}

// Send data til Google Sheets
async function sendData() {
    const newRow = ['Navn', 1, 0.5, 1, 0, 1, 3.5, '1']; // Eksempel på data
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRow),
        });
        const text = await response.text();
        console.log('Svar fra serveren:', text);
    } catch (error) {
        console.error('Fejl ved sending af data:', error);
    }
}
