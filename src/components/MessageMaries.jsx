import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
export default function MessageMaries({ whatsapp, messagesUrl = '', decor = {}, initiales = '' }) {
  const [nom, setNom] = useState('')
  const [msg, setMsg] = useState('')
  const [etat, setEtat] = useState('repos') // repos | envoi | ok | erreur
  const numero = (whatsapp.numero || '').replace(/\D/g, '')
  const rempli = nom.trim() && msg.trim()
  const texte = `${whatsapp.messageDebut}\n\n${msg.trim()}\n\n— ${nom.trim()}`
  const envoyer = async () => {
    setEtat('envoi')
    try {
      await fetch(messagesUrl, {
        method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ nom: nom.trim().slice(0, 120), message: msg.trim().slice(0, 1500) }),
      })
      setEtat('ok'); setNom(''); setMsg('')
    } catch { setEtat('erreur') }
  }
  return (
    <section className="bloc rsvp">
      <div className="papier">
        <span className="sceau-mini grand" aria-hidden>{initiales.charAt(0)}</span>
        <h2>Un petit mot pour les futurs mariés</h2>
        {etat === 'ok' ? (
          <div className="formulaire">
            <p className="intro-mot">Merci ! Votre message a bien été envoyé aux futurs mariés.</p>
            <button className="btn-or" onClick={() => setEtat('repos')}>Écrire un autre message</button>
          </div>
        ) : (
          <>
            <p className="intro-mot">Laissez-leur un message, un vœu ou un souvenir : il leur ira droit au cœur.</p>
            <div className="formulaire">
              <label>Votre nom<input value={nom} maxLength={120} onChange={(e) => setNom(e.target.value)} autoComplete="name" /></label>
              <label>Votre message<textarea rows="5" maxLength={1500} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Écrivez votre petit mot ici…" /></label>
              {messagesUrl ? (
                <button className="btn-or" onClick={envoyer} disabled={!rempli || etat === 'envoi'}>
                  <Send size={16} aria-hidden /> {etat === 'envoi' ? 'Envoi en cours…' : 'Envoyer mon message'}
                </button>
              ) : (
                <a className={`btn-or ${rempli && numero ? '' : 'inactif'}`} aria-disabled={!(rempli && numero)}
                   href={rempli && numero ? `https://wa.me/${numero}?text=${encodeURIComponent(texte)}` : undefined}
                   target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden /> Envoyer mon message</a>
              )}
              {etat === 'erreur' && <p className="bientot" role="alert">L’envoi n’a pas abouti. Vérifiez votre connexion et réessayez.</p>}
            </div>
          </>
        )}
      </div>
      {decor.mainGantee && <img className="main-gantee" src={decor.mainGantee} alt="" loading="lazy" />}
    </section>
  )
}
