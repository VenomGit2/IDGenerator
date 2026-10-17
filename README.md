# Digital ID Card

A mobile-first digital ID / business card built with **React** (UI), **Vite** (dev server + build)
and **framer-motion** (animations). It has a black-and-yellow glass look, 7 swipeable sections, a QR code,
and "Save Contact".

## Run it

```bash
npm install     # once, downloads the libraries
npm run dev     # starts the app at http://localhost:5173
npm run build   # makes the final files in /dist
```

Open it in your browser and switch the window to phone width (or open it on your phone).

## The 30-second mental model

```
data (your info)  ->  components (small pieces of screen)  ->  App (puts them in order)
                              ^
                      styles (how they look)
```

## Folder map

```
idcard/
├── index.html              The single HTML page. React fills <div id="root">.
├── package.json            List of libraries + the npm commands above.
└── src/
    ├── main.jsx            Starts React and loads the styles. You rarely touch this.
    ├── App.jsx             THE PAGE. Arranges all components, holds shared state.
    │
    ├── data/               ✏️ START HERE to change the content
    │   ├── profile.js        Name, title, phone, email, photo, stats, social links
    │   └── content.js        PORTFOLIO (your design work), services, resume PDF
    │
    ├── config/             Fixed lists the app is built from
    │   ├── navigation.js     The 7 section buttons (label, icon, colour)
    │
    ├── components/         Small reusable pieces of the screen
    │   ├── Hero.jsx            Cover, avatar, name, stats
    │   ├── ActionButtons.jsx   Save Contact + Share
    │   ├── SectionNav.jsx      The grid of 7 buttons
    │   ├── SectionPanel.jsx    The card showing the open section (swipe + arrows)
    │   ├── FeaturedWork.jsx    Swipeable strip of your best work (the pieces marked featured)
    │   ├── OpenForWork.jsx     "Open for work" banner + WhatsApp button
    │   ├── MiniHeader.jsx      Sticky bar that appears when you scroll
    │   ├── Sheet.jsx           Bottom pop-up (base)       (used by QrSheet)
    │   ├── Toast.jsx           "Contact saved" message
    │   ├── Background.jsx      Coloured glows behind the glass
    │   ├── sections/           One file per section tab (ContactInfo, Portfolio, Resume ...)
    │   │   └── index.js          Connects each nav button to its section file
    │   └── ui/                 Tiny building blocks (Row, CountUp, StaggerList, Lightbox, PdfViewer)
    │
    ├── hooks/              Reusable logic ("hooks" = functions React components can call)
    │   ├── useTheme.js         Dark / light switch
    │   ├── useToast.js         Show a message for 2 seconds
    │   ├── useRipple.js        Touch ripple + vibration
    │   └── useSectionTabs.js   Which section is open, and which way we slid
    │
    ├── utils/              Plain helper functions (no screen)
    │   ├── vcard.js            Builds the contact file for "Save Contact"
    │   ├── download.js         Saves a file to the phone
    │   ├── media.js            Turns Drive, YouTube and Vimeo links into pictures and players
    │   └── haptics.js          Small vibration
    │
    ├── animations/
    │   └── variants.js         Shared animation numbers (springs, stagger)
    │
    └── styles/             All the CSS, split by topic
        ├── index.css           Loads every file below, in order
        ├── tokens.css          ALL colours + sizes. Dark and light themes live here.
        ├── base.css            Resets, page layout
        ├── background.css      The drifting colour glows
        ├── glass.css           The see-through glass effect
        ├── hero.css            Top card styles
        ├── buttons.css         Every button
        ├── nav.css             The 7-button grid + sliding pill
        ├── panel.css           Section card + rows, cards
        ├── portfolio.css       Image grid, filter buttons, full-screen viewer
        ├── featured.css        Featured work strip + Open for work banner
        ├── overlays.css        Mini header, bottom sheets, toast
        └── motion.css          Ripple, hover (mouse only), reduced motion
```

## Common changes (where to look)

| I want to...                         | Edit this file                                |
| ------------------------------------ | --------------------------------------------- |
| Change the name, photo, phone, links | `src/data/profile.js`                         |
| Change the WhatsApp number or messages | `src/data/profile.js` (the `whatsapp` part)  |
| Change services                      | `src/data/content.js`                         |
| Use your own resume PDF              | save it as `public/resume.pdf`, or set `resumeFile` in `src/data/content.js` |
| Pick which work is featured          | `featured: true` on a piece in `src/data/content.js` |
| Change the "Open for work" wording   | `src/data/profile.js` (the `availability` part) |
| Change the brand colour              | `src/styles/tokens.css` (`--accent`, `--btn-a`, `--btn-b`) |
| Make the glass more/less see-through | `src/styles/tokens.css` (`--glass-fill`, `--glass-blur`) |
| Add or rename a section tab          | `src/config/navigation.js` + a file in `components/sections/` + `components/sections/index.js` |
| Change how fast things animate       | `src/animations/variants.js`                  |
| Change a button's look               | `src/styles/buttons.css`                      |

## Good to know

- **WhatsApp tab** opens a chat with your WhatsApp Business number (set `whatsapp.number` in `src/data/profile.js`). The number in the project is a SAMPLE, so replace it with yours. Visitors tap Send themselves, so no server is needed.
- **Hover** styles only apply with a mouse. On phones, buttons react while pressed (`:active`).

## Add your design work (Portfolio): images and videos

The Portfolio tab has an **Images | Videos** switch. Each side has its own list in `src/data/content.js`:

| List | Where you paste your links | Field |
| ---- | -------------------------- | ----- |
| `portfolioImages` | Google Drive **photo** links | `image:` |
| `portfolioVideos` | Google Drive **video** links (or YouTube, Vimeo, a file) | `video:` |

Paste normal share links, with no conversion. In Google Drive: right-click the file > Share > General access > **Anyone with the link** > Viewer > Copy link.

**Add an image** (one line in `portfolioImages`):

```js
{ title: 'Summer Campaign', category: 'Poster', image: 'PASTE_THE_DRIVE_LINK', width: 1200, height: 1500 },
```

**Add a video** (one line in `portfolioVideos`):

```js
{ title: 'Logo Animation', category: 'Motion', video: 'PASTE_THE_DRIVE_LINK' },
```

- A video shows a cover picture with a play button and plays inside the full-screen viewer. YouTube (watch, youtu.be, shorts), Vimeo and files such as `'/work/clip.mp4'` work too.
- For a vertical video (a reel), add `width: 1080, height: 1920` so the player is tall.
- If one of the two lists is empty, that side of the switch is hidden.
- **The rest of your work:** you cannot show everything in the card, so show your best pieces in the two lists and link to your full collection. Put your Drive FOLDER links in `portfolioFolders` (also in `content.js`). Each one adds a "See all images on Drive" or "See all videos on Drive" button at the bottom of its side. Leave a link as `''` (empty) and that button stays hidden until you add it. Share each folder as "Anyone with the link" > Viewer.
- Files stored in the project (the `public/work/` folder) work too: use paths like `'/work/summer.jpg'`.

Good to know

- A Google Drive file must be shared as **Anyone with the link**. Otherwise it will not show for visitors.
- Drive covers and videos can load slower than files on a normal image or video service. YouTube or Vimeo play more smoothly for large videos.
- Add `featured: true` to your best 3 or 4 pieces (images or videos): they also appear in the swipeable "Featured work" strip on the home screen, above the "Open for work" banner.
- Pieces with the same `category` get one filter button inside their side. The list order is the display order, so put your strongest work first.
- For the smoothest loading on phones, give each piece a `width` and `height`. An optional `thumb` (a small cover picture) is used in the grid.
- In the viewer: photos swipe, double-tap zooms and pull down closes. Videos use the arrow buttons to move on.
- The sample images (`public/work/*.svg`) and the sample video are placeholders. Delete them and their lines in `content.js` when you add your own.

## Your resume (PDF)

The Resume tab shows your resume right inside the tab, with no redirect, plus a **Download PDF** button.

- **From a file in the project:** save your PDF as `public/resume.pdf`. This replaces the sample file. (Another file name works too: copy it into `public/` and change `url` in `resumeFile`.) Every page is drawn in the tab, one below the other. Tap a page to read it full screen, where you can double-tap to zoom in.
- **From Google Drive:** share the PDF as "Anyone with the link", copy the link and paste it as `url` in `resumeFile`. Google's own preview is then shown in the tab.
- The download file name is set in `resumeFile` too (`downloadName`), in `src/data/content.js`.
- The PDF reader library is only downloaded when someone opens the Resume tab, so it does not slow down the first load.
- The file `public/resume.pdf` is a SAMPLE. Replace it before you share the card.

## Cover photo and profile photo

Both are set in `src/data/profile.js`:

- `photo`: your round profile photo.
- `cover`: the wide picture behind it (about 1200 x 500 px; a dark or moody picture works best).

Each accepts a Google Drive share link ("Anyone with the link") or a file in the `public/` folder such as `'/cover.jpg'`. A soft dark fade is added over the cover so the ID number and buttons stay readable. If `cover` is empty, or the picture cannot load, the default yellow-and-dark design is shown.
