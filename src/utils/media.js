// Helpers that turn the links you paste into content.js into something the page can display.
//
// You can paste NORMAL share links. No conversion needed:
//   Google Drive photo ... https://drive.google.com/file/d/XXXX/view?usp=sharing
//   Google Drive video ... https://drive.google.com/file/d/XXXX/view?usp=sharing
//   YouTube video ........ https://www.youtube.com/watch?v=XXXX   (or youtu.be/XXXX, or /shorts/XXXX)
//   Vimeo video .......... https://vimeo.com/123456789
//   A file in this project  /work/photo.jpg   or   /work/clip.mp4
//
// For Google Drive, the file must be shared as "Anyone with the link can view".

// ---------- Google Drive ----------

/** Returns the file id inside a Google Drive link, or null if it is not a Drive link. */
function getDriveFileId(url = '') {
  if (!/(drive|docs)\.google\.com/.test(url)) return null
  const fromPath = url.match(/\/d\/([\w-]+)/)       // .../file/d/FILE_ID/view
  const fromQuery = url.match(/[?&]id=([\w-]+)/)    // ...open?id=FILE_ID
  return (fromPath ?? fromQuery)?.[1] ?? null
}

/** Google's picture of a Drive file at the width you ask for. Works for photos and for video preview frames. */
function driveThumbnail(fileId, width) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`
}

// ---------- YouTube and Vimeo ----------

function getYouTubeId(url = '') {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/)
  return match?.[1] ?? null
}

function getVimeoId(url = '') {
  return url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1] ?? null
}

// ---------- what the rest of the app uses ----------

/** True when this piece of work is a video. */
export function isVideo(work) {
  return Boolean(work.video)
}

/** A usable picture address. Turns a Google Drive link into a direct picture; other addresses are left as they are. */
export function imageSrc(url, width = 1600) {
  if (!url) return undefined
  const driveId = getDriveFileId(url)
  return driveId ? driveThumbnail(driveId, width) : url
}

/**
 * The still picture shown for a piece of work (grid tile, featured card, video cover).
 * Uses, in order: thumb, image, then a picture taken from the video itself when that is possible.
 */
export function posterSrc(work, width = 700) {
  if (work.thumb) return imageSrc(work.thumb, width)
  if (work.image) return imageSrc(work.image, width)
  if (work.video) {
    const driveId = getDriveFileId(work.video)
    if (driveId) return driveThumbnail(driveId, width)
    const youTubeId = getYouTubeId(work.video)
    if (youTubeId) return `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`
  }
  return undefined // no picture available (for example a plain .mp4 without a thumb)
}

/**
 * How to play a video.
 *   { kind: 'embed', src }  -> shown inside an iframe (Drive, YouTube, Vimeo)
 *   { kind: 'file',  src }  -> shown with a normal <video> player (a file such as /work/clip.mp4)
 */
export function videoSource(url) {
  const driveId = getDriveFileId(url)
  if (driveId) return { kind: 'embed', src: `https://drive.google.com/file/d/${driveId}/preview` }

  const youTubeId = getYouTubeId(url)
  if (youTubeId) return { kind: 'embed', src: `https://www.youtube.com/embed/${youTubeId}?rel=0&playsinline=1` }

  const vimeoId = getVimeoId(url)
  if (vimeoId) return { kind: 'embed', src: `https://player.vimeo.com/video/${vimeoId}` }

  return { kind: 'file', src: url }
}

/** Width divided by height for a video box. Defaults to 16:9 unless you give width and height in content.js. */
export function videoRatio(work) {
  return work.width && work.height ? work.width / work.height : 16 / 9
}

/**
 * Links for a document such as your resume PDF.
 *   viewUrl      opens the document in a new tab
 *   downloadUrl  downloads it
 *   embedUrl     a preview that can be shown inside the page (only for Google Drive links, otherwise null,
 *                because phones cannot show a PDF inside a page reliably)
 */
export function documentLinks(url) {
  const driveId = getDriveFileId(url)
  if (driveId) {
    return {
      viewUrl: `https://drive.google.com/file/d/${driveId}/view`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${driveId}`,
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
    }
  }
  return { viewUrl: url, downloadUrl: url, embedUrl: null }
}

/**
 * The cover picture for a brochure PDF, or null when there is none to show right away.
 *   - your own  thumb  picture, if you gave one
 *   - for a Google Drive PDF, Google's picture of its first page
 * For a PDF in the project (no thumb) the first page is drawn by the PDF reader instead: see PdfCover.jsx.
 */
export function pdfCoverSrc(brochure, width = 600) {
  if (brochure.thumb) return imageSrc(brochure.thumb, width)
  const driveId = getDriveFileId(brochure.pdf)
  return driveId ? driveThumbnail(driveId, width) : null
}
