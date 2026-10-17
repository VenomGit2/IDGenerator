import { Phone, Mail, Globe, MapPin } from 'lucide-react'
import { profile } from '../../data/profile.js'
import Row from '../ui/Row.jsx'
import StaggerList from '../ui/StaggerList.jsx'

export default function ContactInfo() {
  return (
    <StaggerList>
      <Row icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} />
      <Row icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
      {/* <Row icon={Globe} label="Website" value={profile.website} href={`https://${profile.website}`} /> */}
      {profile.locations.map(place => (
        <Row key={place} icon={MapPin} label="Location" value={place} href={`https://maps.google.com/?q=${encodeURIComponent(place)}`} />
      ))}
    </StaggerList>
  )
}
