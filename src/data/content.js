// ✏️ EDIT ME: the content of each section tab (Portfolio, Services, Resume).

// =====================================================================
// PORTFOLIO. Two separate lists:  1) IMAGES  and  2) VIDEOS
// In the app, the Portfolio tab has an "Images | Videos" switch, one for each list.
//
// GOOGLE DRIVE LINKS: open the file in Drive > Share > "Anyone with the link" > Viewer > Copy link.
// Paste the link exactly as it is. If a file is not shared as "Anyone with the link", visitors will not see it.
//
// Every piece has:
//   title, category            (pieces with the same category get one filter button)
//   description (optional)     a short note shown in the full-screen viewer
//   featured: true (optional)  also show it in the "Featured work" strip on the home screen (pick your best 3 or 4)
//   width, height (optional)   the size in pixels. Helps phones load smoothly with no jumping.
//   thumb (optional)           a small cover picture (a Drive link, or a file in public/work/)
//
// The list order is the display order. Put your strongest work first.
// =====================================================================


// ---------------------------------------------------------------
// DRIVE FOLDERS: the rest of your work.
// You cannot show everything inside the card (it would load slowly), so show your best pieces in the two lists
// below, and link to your full collection here. Each link adds a "See all on Drive" button at the bottom of
// its side of the Portfolio tab.
//
// How: in Google Drive, right-click the FOLDER > Share > General access > "Anyone with the link" > Viewer > Copy link.
// Leave a link as '' (empty) to hide that button.
// ---------------------------------------------------------------
export const portfolioFolders = {
  images: 'https://drive.google.com/drive/folders/1HaJPwbXHqTVediyk-UbMtcGQuCsXyXpS', // ⚠️ SAMPLE link. Replace it with your own images folder link
  videos:'https://drive.google.com/drive/folders/1-o5ylidt6xDeOmSd5pYjiEJYmubj7jDT', // ⚠️ SAMPLE link. Replace it with your own videos folder link
}


// ---------------------------------------------------------------
// 1) IMAGES: paste your Google Drive PHOTO links here.
//    One line per image. Use  image:  with the Drive link.
//    (A file stored in the project works too: image: '/work/my-photo.jpg')
// ---------------------------------------------------------------
export const portfolioImages = [
  { title: 'Apex Brand Identity', category: 'Branding', image: '/work/brand-identity.svg', width: 800, height: 800, featured: true, description: 'Logo mark and identity system for a design studio.' },
  { title: 'Night Sessions Poster', category: 'Poster', image: '/work/poster-night.svg', width: 800, height: 1100, featured: true, description: 'Event poster for a live music series.' },
  { title: 'Bold Coffee Packaging', category: 'Packaging', image: '/work/packaging.svg', width: 800, height: 800, description: 'Box design for a specialty coffee brand.' },
  { title: 'New Drop Social Kit', category: 'Social', image: '/work/social-kit.svg', width: 800, height: 1000, featured: true, description: 'Story, reel and post templates for a product launch.' },
  { title: 'The Design Issue', category: 'Editorial', image: '/work/editorial.svg', width: 800, height: 1000, description: 'Magazine cover and layout.' },
  { title: 'Mobile Banking UI', category: 'UI Design', image: '/work/app-ui.svg', width: 800, height: 1100, featured: true, description: 'App screens for a mobile banking product.' },
  // Example of a Google Drive photo (remove the two slashes at the start of the line, then paste your link):
  // { title: 'Summer Campaign', category: 'Poster', image: 'PASTE_YOUR_DRIVE_LINK_HERE', width: 1200, height: 1500 },
]


// ---------------------------------------------------------------
// 2) VIDEOS: paste your Google Drive VIDEO links here.
//    One line per video. Use  video:  with the Drive link.
//    Also works: a YouTube link (watch, youtu.be or shorts), a Vimeo link, or a file like '/work/clip.mp4'.
//    The cover picture is taken from the video itself for Drive and YouTube.
//    For a vertical video (a reel), add  width: 1080, height: 1920  so the player is tall.
// ---------------------------------------------------------------
export const portfolioVideos = [
  // SAMPLE VIDEO: a public YouTube clip, only here to show how videos look. Delete this line and add your own.
  { title: 'Sample Motion Reel', category: 'Motion', video: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', description: 'Sample video. Replace this with your own reel.' },
  // Example of a Google Drive video (remove the two slashes at the start of the line, then paste your link):
  // { title: 'Logo Animation', category: 'Motion', video: 'PASTE_YOUR_DRIVE_LINK_HERE', description: 'Optional short note' },
]


// Both lists together. The "Featured work" strip uses this, you do not need to edit it.
export const portfolio = [...portfolioImages, ...portfolioVideos]


export const services = [
  'Design system architecture',
  'Product strategy & UX audits',
  'Spatial and AR/VR interface design',
  'Team coaching & design ops',
]

// ---------------------------------------------------------------
// RESUME: your resume as a PDF file. The Resume tab shows "View" and "Download" buttons for it.
//
// Option A: a file in this project. Save your PDF as  public/resume.pdf  (this replaces the sample),
//           or give it another name in public/ and change the url below, e.g. '/alex-johnson-resume.pdf'.
// Option B: a Google Drive link. Drive > Share > "Anyone with the link" > Viewer > Copy link, and paste it as the url.
//           With a Drive link the resume is also shown as a preview inside the tab.
// ---------------------------------------------------------------
export const resumeFile = {
  url: '/resume.pdf',                  // ⚠️ SAMPLE file. Replace it with your own resume
  title: 'Alex Johnson: Resume',       // shown on the card
  note: 'PDF · Updated October 2026',  // small line under the title (optional: use '' to hide)
  downloadName: 'Alex-Johnson-Resume.pdf', // the file name people get when they download it
}
