// Load entries from local storage or start with empty array
let entries = JSON.parse(localStorage.getItem('books')) || [];

// Save entries to local storage
function saveEntries() {
    localStorage.setItem('books', JSON.stringify(entries));
}

// Render all entries to the page
function renderEntries() {
    const list = document.getElementById('entry-list');

    if (entries.length === 0) {
        list.innerHTML = '<p class="empty-msg">No books added yet. Add one above!</p>';
        return;
    }

    list.innerHTML = entries.map((entry, index) => `
        <div class="entry-card books">
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

// Add a new entry
document.getElementById('add-btn').addEventListener('click', () => {
    const title = document.getElementById('title-input').value.trim();
    const status = document.getElementById('status-input').value;
    const rating = document.getElementById('rating-input').value;
    const notes = document.getElementById('notes-input').value.trim();

    if (!title) {
        alert('Please enter a book title!');
        return;
    }

    entries.push({ title, status, rating, notes });
    saveEntries();
    renderEntries();

    // Clear inputs
    document.getElementById('title-input').value = '';
    document.getElementById('rating-input').value = '';
    document.getElementById('notes-input').value = '';
});

// Delete an entry
function deleteEntry(index) {
    entries.splice(index, 1);
    saveEntries();
    renderEntries();
}

// Load entries on page load
renderEntries();