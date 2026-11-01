import { useEffect, useRef, useState } from 'react'
import { Share2 } from 'lucide-react'
import { mariage as c } from './config/mariage'
import EnveloppeAnimee from './components/EnveloppeAnimee'
import Accueil from './components/Accueil'
import CarteInvitation from './components/CarteInvitation'
import IllustrationCouple from './components/IllustrationCouple'
import CarteEvenement from './components/CarteEvenement'
import MessageMaries from './components/MessageMaries'
import BoutonMusique from './components/BoutonMusique'

function Drape({ id, chevauche }) {
  return (
    <svg className={`drape-sep ${chevauche ? 'chevauche' : ''}`} viewBox="0 0 800 160" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={id + 'a'} x1="0" x2="1"><stop offset="0" stopColor="#4A101D" /><stop offset=".45" stopColor="#a02040" /><stop offset="1" stopColor="#5a0f22" /></linearGradient>
        <linearGradient id={id + 'b'} x1="0" x2="1"><stop offset="0" stopColor="#651126" /><stop offset=".55" stopColor="#8f1a33" /><stop offset="1" stopColor="#4A101D" /></linearGradient>
      </defs>
      <path d="M0 60 C120 20 220 130 360 90 S600 20 800 80 V160 H0Z" fill={`url(#${id}a)`} />
      <path d="M0 88 C150 58 260 150 400 112 S640 52 800 108 V160 H0Z" fill={`url(#${id}b)`} />
      <path d="M0 62 C120 22 220 132 360 92 S600 22 800 82" fill="none" stroke="#e7a3b6" strokeOpacity=".35" strokeWidth="3" />
      <path d="M0 122 C200 92 380 160 560 126 S740 102 800 132 V160 H0Z" fill="#3a0c17" />
    </svg>
  )
}

function Frise({ src }) {
  return src ? <div className="frise" role="presentation" style={{ backgroundImage: `url(${src})` }} /> : null
}

function Apparition({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!('IntersectionObserver' in window)) return el.classList.add('vu')
    const o = new IntersectionObserver(([x]) => { if (x.isIntersecting) { el.classList.add('vu'); o.disconnect() } }, { threshold: 0.1 })
    o.observe(el); return () => o.disconnect()
  }, [])
  return <div ref={ref} className="apparait">{children}</div>
}

export default function App() {
  const [ouvert, setOuvert] = useState(false)
  const [copie, setCopie] = useState(false)
  const partager = async () => {
    const data = { title: c.titreSite, text: 'Vous êtes invité(e) à notre mariage.', url: window.location.href }
    try {
      if (navigator.share) return await navigator.share(data)
      await navigator.clipboard.writeText(data.url); setCopie(true); setTimeout(() => setCopie(false), 2500)
    } catch { /* partage annulé */ }
  }
  return (
    <>
      {!ouvert && <EnveloppeAnimee config={c} onOuvert={() => { setOuvert(true); window.scrollTo(0, 0) }} />}
      {ouvert && (
        <main className="site">
          <div className="petales" aria-hidden>{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
          <Frise src={c.decor?.pagne} />
          <Accueil config={c} />
          <CarteInvitation config={c} />
          <Drape id="g1" chevauche />
          <IllustrationCouple config={c} />
          <Apparition>
            <section className="bloc">
              <h2>Les étapes de cette belle union</h2>
              <div className="chrono">{c.evenements.map((e) => <CarteEvenement key={e.id} e={e} initiales={c.maries.initiales} />)}</div>
            </section>
          </Apparition>
          <Drape id="g2" />
          <Apparition><MessageMaries whatsapp={c.whatsapp} messagesUrl={c.messagesUrl} decor={c.decor} initiales={c.maries.initiales} /></Apparition>
          <Frise src={c.decor?.pagne} />
          <section className="bloc fin">
            {c.motFin && (<><h2>Merci du fond du cœur</h2><p className="mot-fin">{c.motFin}</p></>)}
            <button className="btn-or" onClick={partager}><Share2 size={16} aria-hidden /> Partager l’invitation</button>
            {copie && <p role="status" className="bientot">Lien copié</p>}
            {c.decor?.bouquet && <img className="bouquet petit" src={c.decor.bouquet} alt="" loading="lazy" />}
            <p className="nom-script petit-script">{c.maries.initiales}</p>
          </section>
          <BoutonMusique fichier={c.musique} />
        </main>
      )}
    </>
  )
}
