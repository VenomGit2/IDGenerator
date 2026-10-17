import { profile } from '../data/profile.js'
import { download } from './download.js'

// A vCard (.vcf) is the standard "contact file" every phone can import.
export function buildVCard() {
  return [
    'BEGIN:VCARD', 'VERSION:3.0',
    `FN:${profile.name}`, `ORG:${profile.company}`, `TITLE:${profile.title}`,
    `TEL;TYPE=CELL:${profile.phone}`, `EMAIL:${profile.email}`, `URL:https://${profile.website}`,
    'END:VCARD',
  ].join('\n')
}

export function saveContactFile() {
  download(new Blob([buildVCard()], { type: 'text/vcard' }), 'alex-johnson.vcf')
}
