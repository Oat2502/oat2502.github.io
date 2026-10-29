# Your website: setup & updating

Everything on the site comes from **one file: `content.js`**. You never need to touch the other files.

```
index.html   page skeleton        (don't edit)
style.css    design               (don't edit, except to change the colour)
site.js      builds the page      (don't edit)
content.js   ← ALL YOUR TEXT, PAPERS, TALKS, PROJECTS
images/      ← your photos
```

---

## Part 1 — Put it online for free (one-time, ~15 min)

Hosting is free on **GitHub Pages**.

1. Create a free account at **github.com**.
2. Click **+** (top right) → **New repository**.
   - Name it exactly `yourusername.github.io` (for example `otissloanwood.github.io`). This gives you the cleanest address.
   - Set it to **Public** and click **Create repository**.
3. On the next page, click **uploading an existing file**.
   Drag in **all the files and the `images` folder** from this website folder. Then click **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment*, choose
   **Source: Deploy from a branch**, **Branch: main**, **folder: / (root)**, then **Save**.
5. Wait 1–2 minutes. Your site is live at `https://yourusername.github.io`.

**Your own domain (optional, about €10/year):** buy a domain such as `otissloanwood.com` from a registrar (Simply.com, Namecheap, etc.). Then go to **Settings → Pages → Custom domain** and follow GitHub's instructions. Hosting itself stays free.

---

## Part 2 — Updating (adding a paper, talk, etc.)

All edits happen in your web browser:

1. Go to your repository on github.com and click **`content.js`**.
2. Click the **pencil icon ✏️** (Edit this file).
3. Find the list you want. Search with Ctrl/Cmd+F for `PUBLICATIONS`, `TALKS`, `PROJECTS`, etc.
4. **Copy an existing entry**, from its `{` to its `},`, and paste it **at the top of the list**. Then change the text.
5. Click **Commit changes…** → **Commit changes**.
6. The site updates in about a minute. Refresh the page; if it looks the same, press Ctrl/Cmd+Shift+R.

### Example: adding a new paper

Paste this at the top of `publications: [`:

```js
    {
      year: "2027",
      title: "Title of the new paper",
      authors: "O. Sloan Wood, J. B. Knudsen",
      venue: "Journal name, 8(2)",
      type: "Journal article",
      link: "https://doi.org/10.xxxx/xxxxx",
      award: "",
    },
```

- `type` must be one of `"Journal article"`, `"Conference"`, `"Thesis"` or `"Other"`. These names drive the filter buttons.
- Your name is bolded automatically in author lists.
- Write `link: ""` if there's no link yet.

### Example: adding a talk

```js
    { date: "Mar 2027", type: "Talk", title: "Talk title", where: "Event, City", link: "" },
```

### Adding photos

1. In your repository, open the `images` folder, then choose **Add file → Upload files**.
2. Upload, for example, `portrait.jpg`, then commit.
3. In `content.js`, set `portrait: "images/portrait.jpg",`.
   Projects work the same way: `image: "images/star-homes.jpg",`.
   For the large drawing at the top, use `heroImage:`.

Keep photos under about 500 KB. Export them about 2000 px wide as JPG so the site stays fast. Until you add a photo, the site shows architectural line drawings as placeholders.

### The 3 rules (if something breaks)

1. Text goes inside `"double quotes"`. If you need quote marks *inside* text, use curly ones: “ ” or ’.
2. Every `}` that closes an entry needs a comma after it: `},`
3. Don't delete the `[` and `]` around each list.

If you make a typo, the site shows a **red box** naming the line to check. To undo, open the file's **History**, open the previous version and copy it back. Nothing is ever lost.

---

## Small customisations

- **Accent colour:** in `style.css`, change `--accent: #a8492a;` near the top.
- **Text formatting in About / project descriptions:** `*italic*` and `[link text](https://...)`.
- **Hiding a section:** empty its list (for example `talks: [],`). The section and its menu link disappear.
- **Number of papers shown before “Show all”:** in `site.js`, change `PUB_LIMIT = 8`.

## Preview before publishing (optional)

Double-click `index.html` on your computer to open it in a browser. It works offline exactly as it will online.
