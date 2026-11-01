import { useState, useRef, useEffect } from 'react'
export default function EnveloppeAnimee({ config, onOuvert }) {
  const [etat, setEtat] = useState('ferme')
  const timers = useRef([])
  const reduit = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const ouvrir = () => {
    if (etat !== 'ferme') return
    if (reduit) return onOuvert()
    setEtat('sceau')
    timers.current.push(setTimeout(() => setEtat('rabat'), 600))
    timers.current.push(setTimeout(() => setEtat('carte'), 1500))
    timers.current.push(setTimeout(() => setEtat('fin'), 2900))
    timers.current.push(setTimeout(onOuvert, 3500))
  }
  return (
    <div className={`ecran-env ${etat}`} role="dialog" aria-label="Invitation">
      <div className="drape d1" /><div className="drape d2" />
      <div className="scene">
        <div className="enveloppe">
          <div className="env-dos" />
          <div className="env-carte"><span>{config.maries.initiales}</span></div>
          <div className="env-devant"><i className="fleur f1" /><i className="fleur f2" /></div>
          <div className="env-rabat"><div className="rabat-face" /></div>
          <div className="sceau"><span>{config.maries.initiales}</span></div>
        </div>
        <p className="env-texte">Une invitation spéciale vous attend</p>
        <button className="btn-or" onClick={ouvrir} disabled={etat !== 'ferme'}>Ouvrir mon invitation</button>
        <button className="lien-passer" onClick={onOuvert}>Passer l’animation</button>
      </div>
    </div>
  )
}
