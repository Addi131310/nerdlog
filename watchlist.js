let entries = JSON.parse(localStorage.getItem('watchlist')) || [];

function saveEntries() {
    localStorage.setItem('watchlist', JSON.stringify(entries));
}

function renderEntries() {
    const list = document.getElementById('entry-list');
    if (entries.length === 0) {
        list.innerHTML = '<p class="empty-msg">Nothing added yet. Add something above!</p>';
        return;
    }
    list.innerHTML = entries.map((entry, index) => `
        <div class="entry-card watchlist">
            <div class="entry-info">
                <h3>${entry.title} <span class="type-badge">${entry.type === 'movie' ? '🎬 Movie' : '📺 TV Show'}</span></h3>
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
    const type = document.getElementById('type-input').value;
    const status = document.getElementById('status-input').value;
    const rating = document.getElementById('rating-input').value;
    const notes = document.getElementById('notes-input').value.trim();
    if (!title) { alert('Please enter a title!'); return; }
    entries.push({ title, type, status, rating, notes });
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