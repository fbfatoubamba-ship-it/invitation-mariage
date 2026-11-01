import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
export default function ConfirmationPresence({ whatsapp, decor = {}, initiales = '' }) {
  const [nom, setNom] = useState(''); const [rep, setRep] = useState('oui')
  const [nb, setNb] = useState(1); const [msg, setMsg] = useState('')
  const numero = (whatsapp.numero || '').replace(/\D/g, '')
  const texte = `${whatsapp.messageDebut}\nNom : ${nom}\nPrésence : ${rep === 'oui' ? 'Je serai présent(e)' : 'Je ne pourrai pas venir'}` +
    (rep === 'oui' ? `\nNombre de personnes : ${nb}` : '') + (msg ? `\nMessage : ${msg}` : '')
  return (
    <section className="bloc rsvp">
      <div className="papier">
        <span className="sceau-mini grand" aria-hidden>{initiales.charAt(0)}</span>
        {decor.telephone && (
          <div className="appel">
            <img src={decor.telephone} alt="" loading="lazy" />
            <p className="appel-titre"><span>Êtes-vous</span><em>prêt(e) ?</em></p>
          </div>
        )}
        <h2>Confirmer ma présence</h2>
        {!numero ? <p className="bientot">Les modalités de confirmation seront communiquées ultérieurement.</p> : (
          <div className="formulaire">
            <label>Votre nom<input value={nom} onChange={(e) => setNom(e.target.value)} autoComplete="name" /></label>
            <label>Votre réponse
              <select value={rep} onChange={(e) => setRep(e.target.value)}>
                <option value="oui">Je serai présent(e)</option><option value="non">Je ne pourrai pas venir</option>
              </select></label>
            {rep === 'oui' && <label>Nombre de personnes<input type="number" min="1" max="20" value={nb} onChange={(e) => setNb(e.target.value)} /></label>}
            <label>Message (facultatif)<textarea rows="3" value={msg} onChange={(e) => setMsg(e.target.value)} /></label>
            <a className={`btn-or ${nom.trim() ? '' : 'inactif'}`} aria-disabled={!nom.trim()}
               href={nom.trim() ? `https://wa.me/${numero}?text=${encodeURIComponent(texte)}` : undefined}
               target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden /> Confirmer sur WhatsApp</a>
          </div>
        )}
      </div>
      {decor.mainGantee && <img className="main-gantee" src={decor.mainGantee} alt="" loading="lazy" />}
    </section>
  )
}
