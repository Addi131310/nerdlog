let entries = JSON.parse(localStorage.getItem('anime')) || [];

function saveEntries() {
    localStorage.setItem('anime', JSON.stringify(entries));
}

function renderEntries() {
    const list = document.getElementById('entry-list');
    if (entries.length === 0) {
        list.innerHTML = '<p class="empty-msg">No anime added yet. Add one above!</p>';
        return;
    }
    list.innerHTML = entries.map((entry, index) => `
        <div class="entry-card anime">
            <div class="entry-info">
                <h3>${entry.title}</h3>
                <div class="entry-meta">
                    <span class="status ${entry.status}">${entry.status}</span>
                    ${entry.rating ? `<span class="rating">${'⭐'.repeat(entry.rating)}</span>` : ''}
                    ${entry.notes ? `<span class="notes">${entry.notes}</span>` : ''}
                </div>
            </div>
            <button class="delete-btn" onclick="deleteEntry(${index})">✕</button>
        </div>
    `).join('');
}

document.getElementById('add-btn').addEventListener('click', () => {
    const title = document.getElementById('title-input').value.trim();
    const status = document.getElementById('status-input').value;
    const rating = document.getElementById('rating-input').value;
    const notes = document.getElementById('notes-input').value.trim();
    if (!title) { alert('Please enter an anime title!'); return; }
    entries.push({ title, status, rating, notes });
    saveEntries();
    renderEntries();
    document.getElementById('title-input').value = '';
    document.getElementById('rating-input').value = '';
    document.getElementById('notes-input').value = '';
});

function deleteEntry(index) {
    entries.splice(index, 1);
    saveEntries();
    renderEntries();
}

renderEntries();