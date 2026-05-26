# Bug Tracker

A simple client-side bug tracker built with HTML, CSS, and JavaScript. Bugs are stored in the browser's `localStorage`, so they persist between page refreshes.

## Features

- Add bugs with title, description, severity, and assignee
- Display bug cards with status badges
- Close bugs and delete bugs
- Filter bug list by status
- Data persistence using `localStorage`

## Files

- `index.html` — main app markup
- `style.css` — UI styling and layout
- `app.js` — bug tracker logic and storage handling

## Running the app

1. Open `index.html` in your browser.
2. Add bugs using the form.
3. Use the filter dropdown to view Open or Closed bugs.

## Notes

- This is a static web app and does not require a server.
- If you want to reset the stored bugs, clear your browser site data or run `localStorage.clear()` in the browser console.
