import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { resumeFile } from '../../data/content.js'
import { documentLinks } from '../../utils/media.js'
import { buzz } from '../../utils/haptics.js'
import { item } from '../../animations/variants.js'
import StaggerList from '../ui/StaggerList.jsx'
import PdfViewer from '../ui/PdfViewer.jsx'

// Your resume, shown right here in the tab (nobody is sent to another page).
// Set the file in src/data/content.js (resumeFile).
//   - a PDF file in the project: its pages are drawn here (see PdfViewer.jsx)
//   - a Google Drive link: Google's own preview is shown here
// "Download PDF" saves the file to the phone.
export default function Resume() {
  const { downloadUrl, embedUrl } = documentLinks(resumeFile.url)

  return (
    <StaggerList>
      <motion.div variants={item}>
        {embedUrl ? (
          <div className="resume-preview">
            <iframe src={embedUrl} title={resumeFile.title} loading="lazy" />
          </div>
        ) : (
          <PdfViewer url={resumeFile.url} title={resumeFile.title} />
        )}
      </motion.div>

      <motion.a className="btn primary" variants={item} href={downloadUrl} download={resumeFile.downloadName} onClick={() => buzz(8)}>
        <Download size={17} /> Download PDF
      </motion.a>
    </StaggerList>
  )
}
