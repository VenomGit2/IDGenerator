// ✏️ EDIT ME: the content of each section tab (Portfolio, Services, Resume).

// =====================================================================
// PORTFOLIO. Three separate lists:  1) IMAGES,  2) VIDEOS  and  3) BROCHURES (PDF)
// In the app, the Portfolio tab has an "Images | Videos | Brochures" switch, one for each list.
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
  brochures: 'https://drive.google.com/drive/folders/1-00EcnlfKizIor70Lyst9-uzbtz4k1Ls', // ⚠️ SAMPLE link. Replace it with your own brochures folder link
}


// ---------------------------------------------------------------
// 1) IMAGES: paste your Google Drive PHOTO links here.
//    One line per image. Use  image:  with the Drive link.
//    (A file stored in the project works too: image: '/work/my-photo.jpg')
// ---------------------------------------------------------------
export const portfolioImages = [
  { title: 'Hotel Seven Hills', category: 'Social Media Designs', image: 'https://drive.google.com/file/d/1TF7XYbPJNc67-dxj76FqrVcKjzPwvNjm/view?usp=sharing', width: 800, height: 800, featured: false},
  { title: 'Ankura Hospital', category: 'Hospital Posters', image: 'https://drive.google.com/file/d/1jB0V9QITY8nQh8bM2oqJGHUu1iDEFA9U/view?usp=sharing', width: 800, height: 1100, featured: false,featured: true },
  { title: 'Hotel Jaidhan', category: 'Social Media Designs', image: 'https://drive.google.com/file/d/199Z7t47dcDQtNHt4TA78XUCiUI-GfKey/view?usp=sharing', width: 800, height: 800},
  { title: 'Endo Rheuma Care', category: 'Social Media Designs', image: 'https://drive.google.com/file/d/1LDjB2XlqzZCDiDW4uRKrASU3GN3Q8ApU/view?usp=sharing', width: 800, height: 1000, featured: true, },
  { title: 'Jeevayu', category: 'Food & Beverage', image: 'https://drive.google.com/file/d/1-INiIWNpp42daQEZxXzN0OChXxGYhGpp/view?usp=sharing', width: 800, height: 1000, },
  { title: 'Organvi', category: 'Food & Beverage', image: 'https://drive.google.com/file/d/1TkQgzWr0NswPKHGFVJ11mUF2aLjdCkim/view?usp=sharing', width: 800, height: 1100, featured: true, description: 'App screens for a mobile banking product.' },
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
  { title: 'KrishnaJanmashtmi', category: 'Motion', video: 'https://drive.google.com/file/d/1ZFLjPx2MfixglJjUq-3SbjQrw831NmYS/view?usp=drive_link' ,featured: true},
    { title: 'Navratri', category: 'Motion', video: 'https://drive.google.com/file/d/13jRexwapdduD7Pes-algNh_sTkR7tD6E/view?usp=drive_link' },
    { title: 'Dr.ParthSarthi', category: 'Motion', video: 'https://drive.google.com/file/d/1XzAjnHb7m47d_iIcsGWOtz0OK44OJidG/view?usp=drive_link' },
    { title: 'LaPinoz', category: 'Motion', video: 'https://drive.google.com/file/d/18-d3uQdSTg3caX47XP9QlKj8sJJ0PFaU/view?usp=sharing' ,featured: true},
    { title: 'CarzSpa', category: 'Motion', video: 'https://drive.google.com/file/d/1e_6vqyWgh4tIqYf-izL_o2eJQDMdJLrl/view?usp=sharing' },

  // Example of a Google Drive video (remove the two slashes at the start of the line, then paste your link):
  // { title: 'Logo Animation', category: 'Motion', video: 'PASTE_YOUR_DRIVE_LINK_HERE', description: 'Optional short note' },
]


// ---------------------------------------------------------------
// 3) BROCHURES: your PDF brochures. They appear under  Portfolio > Brochures.
//    Each one shows its first page as the cover. Tapping it opens the PDF full screen, where people can scroll
//    the pages, tap a page to zoom in, and download it.
//
//    One line per brochure. Use  pdf:  with either
//      - a file in the project:  copy it to  public/brochures/  and write  pdf: '/brochures/my-brochure.pdf'
//      - a Google Drive link:    Drive > Share > "Anyone with the link" > Viewer > Copy link, then  pdf: 'PASTE_LINK'
//    Optional:  thumb: a cover picture instead of the first page (a Drive link or a file in public/)
//               description: a short line shown under the title in the reader
//    Pieces with the same category get one filter button, like images and videos.
// ---------------------------------------------------------------
export const portfolioBrochures = [
  // SAMPLE brochure (a small test PDF). Delete this line and add your own.
      { title: 'Matrix Hospitals', category: 'Brochures', pdf: 'https://drive.google.com/file/d/10MpjjOKT6EEq7yw2wJlGO7gJfFSPbO0e/view?usp=sharing' },
  { title: 'WOW India', category: 'Brochures', pdf: 'https://drive.google.com/file/d/18mOZB0SYmifUEWGGaUF1_tNdZaLRqFp0/view?usp=sharing' },
    { title: 'Shivai Constructions', category: 'Brochures', pdf: 'https://drive.google.com/file/d/15q4WzqR5qaoIJfxkckzJ0RKW46aJoHLS/view?usp=sharing' },
        { title: 'Jaison Pipes', category: 'Brochures', pdf: 'https://drive.google.com/file/d/16We3vqM3wS9CQsRG5I4uUCvrZQnWoyrN/view?usp=sharing' },
  // Example of a Google Drive brochure (remove the two slashes at the start of the line, then paste your link):
  // { title: 'Company Brochure', category: 'Corporate', pdf: 'PASTE_YOUR_DRIVE_LINK_HERE' },
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
