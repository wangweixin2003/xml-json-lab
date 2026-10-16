const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const bookStatus = document.querySelector('#book-status');
const profileStatus = document.querySelector('#profile-status');
const bookList = document.querySelector('#book-list');
const profileList = document.querySelector('#profile-list');

// XML Lab: fetch and parse the XML string with DOMParser.
fetch('book.xml')
  .then((response) => {
    if (!response.ok) throw new Error(`Could not load book.xml (${response.status})`);
    return response.text();
  })
  .then((xmlText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) throw new Error('book.xml is not well-formed.');
    const books = [...xmlDoc.querySelectorAll('book')];
    bookList.innerHTML = books.map((book) => `
      <article class="card">
        <p class="label">Book ${escapeHtml(book.getAttribute('id'))}</p>
        <h3>${escapeHtml(book.querySelector('title')?.textContent)}</h3>
        <p>${escapeHtml(book.querySelector('author')?.textContent)}</p>
        <span class="price">${escapeHtml(book.querySelector('price')?.textContent)} ${escapeHtml(book.querySelector('price')?.getAttribute('currency') || '')}</span>
      </article>`).join('');
    bookStatus.textContent = `${books.length} books loaded from book.xml.`;
  })
  .catch((error) => { bookStatus.textContent = error.message; });

// JSON Lab: fetch and parse the user profile data.
fetch('userProfiles.json')
  .then((response) => {
    if (!response.ok) throw new Error(`Could not load userProfiles.json (${response.status})`);
    return response.json();
  })
  .then((profiles) => {
    profileList.innerHTML = profiles.map((profile) => {
      const { firstName, lastName, email, dateOfBirth, address, preferences } = profile;
      return `
        <article class="card profile">
          <div class="profile-top">
            <div><p class="label">User profile</p><h3>${escapeHtml(firstName)} ${escapeHtml(lastName)}</h3></div>
            <span class="pill">${preferences.subscription ? 'Subscribed' : 'Not subscribed'}</span>
          </div>
          <p class="email">${escapeHtml(email)}</p>
          <p><span class="label">Date of birth</span><br>${escapeHtml(dateOfBirth)}</p>
          <div class="detail"><strong>Address</strong>${escapeHtml(address.street)}, ${escapeHtml(address.city)}, ${escapeHtml(address.state)} ${escapeHtml(address.zipCode)}</div>
          <div class="detail"><strong>Preferences</strong><span class="pill">Theme: ${escapeHtml(preferences.theme)}</span><span class="pill">Language: ${escapeHtml(preferences.language)}</span><span class="pill">Notifications: ${preferences.notifications ? 'On' : 'Off'}</span></div>
        </article>`;
    }).join('');
    profileStatus.textContent = `${profiles.length} user profiles loaded from userProfiles.json.`;
  })
  .catch((error) => { profileStatus.textContent = error.message; });
