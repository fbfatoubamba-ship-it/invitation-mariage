import { useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
export default function BoutonMusique({ fichier }) {
  const ref = useRef(null); const [on, setOn] = useState(false)
  if (!fichier) return null
  const basculer = () => {
    const a = ref.current
    if (on) { a.pause(); setOn(false) } else { a.play().then(() => setOn(true)).catch(() => setOn(false)) }
  }
  return (
    <>
      <audio ref={ref} src={fichier} loop preload="none" />
      <button className="musique" onClick={basculer} aria-label={on ? 'Couper la musique' : 'Activer la musique'}>
        {on ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  )
}
