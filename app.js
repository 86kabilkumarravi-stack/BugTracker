const STORAGE_KEY = 'bugTrackerBugs';

const bugForm = document.getElementById('bug-form');
const bugList = document.getElementById('bug-list');
const bugCount = document.getElementById('bug-count');
const statusFilter = document.getElementById('status-filter');

let bugs = [];

function loadBugs() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  bugs = saved ? JSON.parse(saved) : [];
}

function saveBugs() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bugs));
}

function generateId() {
  return `BUG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function formatCount(count) {
  return `${count} bug${count === 1 ? '' : 's'}`;
}

function renderBugs() {
  const filter = statusFilter.value;
  const visibleBugs = bugs.filter((bug) => filter === 'All' || bug.status === filter);

  bugList.innerHTML = visibleBugs.length
    ? visibleBugs.map(createBugCardHtml).join('')
    : '<p class="empty-state">No bugs found. Add one using the form above.</p>';

  bugCount.textContent = formatCount(visibleBugs.length);
}

function createBugCardHtml(bug) {
  return `
    <article class="bug-card">
      <div class="bug-meta">
        <span class="badge ${bug.status === 'Closed' ? 'badge-closed' : 'badge-open'}">${bug.status}</span>
        <span>Severity: ${bug.severity}</span>
        <span>Assigned: ${bug.assignedTo}</span>
      </div>
      <h3 class="bug-title">${bug.title}</h3>
      <p class="bug-description">${bug.description}</p>
      <div class="bug-details">
        <span>ID: ${bug.id}</span>
        <span>Created: ${new Date(bug.createdAt).toLocaleString()}</span>
      </div>
      <div class="action-buttons">
        ${bug.status === 'Open' ? `<button class="btn btn-secondary" data-action="close" data-id="${bug.id}">Close Bug</button>` : ''}
        <button class="btn btn-danger" data-action="delete" data-id="${bug.id}">Delete Bug</button>
      </div>
    </article>
  `;
}

function addBug(event) {
  event.preventDefault();

  const title = document.getElementById('bug-title').value.trim();
  const description = document.getElementById('bug-description').value.trim();
  const severity = document.getElementById('bug-severity').value;
  const assignedTo = document.getElementById('bug-assigned').value.trim();

  if (!title || !description || !assignedTo) {
    window.alert('Please complete every field before adding a bug.');
    return;
  }

  bugs.unshift({
    id: generateId(),
    title,
    description,
    severity,
    assignedTo,
    status: 'Open',
    createdAt: Date.now(),
  });

  saveBugs();
  renderBugs();
  bugForm.reset();
}

function handleBugListClick(event) {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }

  const bugId = button.dataset.id;
  const action = button.dataset.action;

  if (action === 'delete') {
    bugs = bugs.filter((bug) => bug.id !== bugId);
  } else if (action === 'close') {
    bugs = bugs.map((bug) =>
      bug.id === bugId ? { ...bug, status: 'Closed' } : bug
    );
  }

  saveBugs();
  renderBugs();
}

bugForm.addEventListener('submit', addBug);
bugList.addEventListener('click', handleBugListClick);
statusFilter.addEventListener('change', renderBugs);

loadBugs();
renderBugs();
