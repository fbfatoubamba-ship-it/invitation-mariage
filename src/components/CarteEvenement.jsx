import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { dateLongue } from '../utils'
import CompteARebours from './CompteARebours'
import Localisation from './Localisation'
export default function CarteEvenement({ e, initiales }) {
  const mosquee = e.id === 'mariage-musulman'
  const lieu = e.lieu || (mosquee ? 'Mosquée à confirmer' : 'Lieu à préciser')
  return (
    <article className="evt arche photo">
      <div className="fond" style={{ '--photo': e.photo ? `url(${e.photo})` : 'none' }} />
      <span className="sceau-mini" aria-hidden>{initiales.charAt(0)}</span>
      <h3>{e.titre}</h3>
      <ul className="trio">
        <li><CalendarDays size={22} aria-hidden /><span className="sr">Date : </span><span className="cap">{dateLongue(e.date)}</span></li>
        <li><Clock size={22} aria-hidden /><span className="sr">Heure : </span><span>{e.heure ? e.heure.replace(e.heure.replace(/\s*h?\s*:\s*/, ' h ')) : 'À préciser'}</span></li>
        <li><MapPin size={22} aria-hidden /><span className="sr">Lieu : </span><span>{lieu}</span></li>
      </ul>
      <p className="evt-desc">{e.description}</p>
      <CompteARebours date={e.date} heure={e.heure} />
      <Localisation evenement={e} />
    </article>
  )
}
