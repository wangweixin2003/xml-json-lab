# XML & JSON Lab Submission

This folder completes both tasks in the lab instructions.

- `book.xml` is a well-formed XML catalogue. Every book has an `id`, `title`, `author`, and `price`.
- `userProfiles.json` is valid JSON with three unique profiles. Each profile includes contact details, an address, and preferences with `theme`, `language`, `notifications`, and `subscription`.
- `index.html`, `styles.css`, and `script.js` fetch and display both data files. The script uses `DOMParser` for XML and `response.json()` for JSON.

## Run it locally

Because browser security blocks `fetch()` from a `file://` page, serve this folder with any local web server. For example, from this folder run:

    python -m http.server 8000

Then open <http://localhost:8000>.

## Published GitHub Pages site`r`n`r`n<https://wangweixin2003.github.io/xml-json-lab/>`r`n`r`n## Publish with GitHub Pages

Create a GitHub repository, upload all files in this folder to its root, then choose **Settings → Pages → Deploy from a branch → main → /(root)**. GitHub will provide the public Pages URL to submit.

