import { useEffect, useState } from 'react'
export default function CompteARebours({ date, heure }) {
  const [now, setNow] = useState(Date.now())
  const precis = Boolean(heure && heure.trim())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), precis ? 1000 : 60000)
    return () => clearInterval(t)
  }, [precis])
  const cible = new Date(precis ? `${date}T${heure}:00` : `${date}T23:59:59`).getTime()
  const reste = cible - now
  if (reste <= 0) return <p className="cr-fin">Cette belle journée est passée. Merci de l’avoir partagée avec nous.</p>
  const j = Math.floor(reste / 864e5), h = Math.floor(reste / 36e5) % 24
  const m = Math.floor(reste / 6e4) % 60, s = Math.floor(reste / 1e3) % 60
  const cases = precis ? [['Jours', j], ['Heures', h], ['Minutes', m], ['Secondes', s]] : [['Jours', j]]
  return (
    <div className="cr" aria-label="Compte à rebours">
      {cases.map(([l, v]) => (<div key={l} className="cr-case"><b>{String(v).padStart(2, '0')}</b><span>{l}</span></div>))}
    </div>
  )
}
