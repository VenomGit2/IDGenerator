// Loads the PDF reader library (pdf.js) the first time something needs it, then reuses it.
// It is large, so it is only downloaded when a PDF is actually shown (the Resume tab or a brochure).
// The "legacy" build is used because it also works on older phones.
let pdfjsPromise = null

export function loadPdfJs() {
  if (!pdfjsPromise) {
    pdfjsPromise = (async () => {
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
      const worker = (await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url')).default
      pdfjs.GlobalWorkerOptions.workerSrc = worker
      return pdfjs
    })()
  }
  return pdfjsPromise
}
