import { Heart } from 'lucide-react'
export default function Calendrier({ evenements }) {
  const [y, m] = evenements[0].date.split('-').map(Number)
  const premier = new Date(y, m - 1, 1)
  const nb = new Date(y, m, 0).getDate()
  const decal = (premier.getDay() + 6) % 7
  const prefixe = `${y}-${String(m).padStart(2, '0')}`
  const fetes = new Set(evenements.filter((e) => e.date.startsWith(prefixe)).map((e) => Number(e.date.slice(8))))
  const mois = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(premier)
  return (
    <div className="calendrier">
      <p className="cal-mois">{mois}</p>
      <div className="cal-grille">
        {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((j) => <span key={j} className="tete">{j}</span>)}
        {Array.from({ length: decal }, (_, i) => <span key={'v' + i} />)}
        {Array.from({ length: nb }, (_, i) => i + 1).map((d) => (
          <span key={d} className={`jour ${fetes.has(d) ? 'fete' : ''}`}>
            {fetes.has(d) && <Heart aria-hidden strokeWidth={1.4} />}<b>{d}</b>
          </span>
        ))}
      </div>
    </div>
  )
}
