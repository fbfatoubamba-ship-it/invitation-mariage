import { MapPin } from 'lucide-react'
import { lienItineraire } from '../utils'
export default function Localisation({ evenement }) {
  const lien = lienItineraire(evenement)
  if (!lien) return null
  return (
    <a className="btn-or petit" href={lien} target="_blank" rel="noopener noreferrer">
      <MapPin size={16} aria-hidden /> Voir l’itinéraire
    </a>
  )
}
