const rows = [
    { nr: 1, points: ['H6', 'H2', 'S3', 'H4', 'S5'] },
    { nr: 2, points: ['H5', 'S1', 'H6', 'H3', 'S4'] },
    { nr: 3, points: ['H4', 'S5', 'H1', 'S2', 'H6'] },
    { nr: 4, points: ['S3', 'S6', 'H5', 'S1', 'H2'] },
    { nr: 5, points: ['S2', 'H3', 'S4', 'S6', 'H1'] },
    { nr: 6, points: ['S1', 'H4', 'S2', 'H5', 'S3'] },
];

rows.forEach(row => {
    document.write(`<tr>
        <td>${row.nr}</td>
        <td><input type="text" placeholder="Navn" maxlength="20"></td> <!-- Tilføjet maxlength -->
        ${row.points.map(p => `<td>${p}<br><select>
            <option value="0">0</option>
            <option value="0.5">½</option>
            <option value="1">1</option>
        </select></td>`).join('')}
        <td class="sum">0</td>
        <td class="placement">-</td>
    </tr>`);
});

});

function calculateScores() {
    const table = document.getElementById('scoreTable');
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        const scoreCells = cells.slice(2, 7);

        const sum = scoreCells.reduce((total, cell) => {
            const select = cell.querySelector('select');
            return total + (select ? parseFloat(select.value) || 0 : 0);
        }, 0);

        const sumCell = cells[7];
        sumCell.textContent = sum;
    });

    const sortedRows = rows.slice().sort((a, b) => {
        const aSum = parseFloat(a.querySelector('.sum').textContent);
        const bSum = parseFloat(b.querySelector('.sum').textContent);
        return bSum - aSum;
    });

    sortedRows.forEach((row, index) => {
        row.querySelector('.placement').textContent = index + 1;
    });

    const tbody = table.querySelector('tbody');
    sortedRows.forEach(row => tbody.appendChild(row));
}


