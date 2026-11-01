
import { useEffect, useState } from 'react'

function analyserHeure(heure) {
  if (!heure || !heure.trim()) return null

  // Accepte 11:00, 11h:00 et 11h00
  const match = heure.trim().match(/^(\d{1,2})\s*(?:h\s*:?\s*|:)\s*(\d{2})$/i)

  if (!match) return undefined

  const heures = Number(match[1])
  const minutes = Number(match[2])

  if (heures > 23 || minutes > 59) return undefined

  return { heures, minutes }
}

export default function CompteARebours({ date, heure }) {
  const [now, setNow] = useState(Date.now())

  const aUneHeure = Boolean(heure && heure.trim())
  const heureAnalysee = analyserHeure(heure)

  useEffect(() => {
    const intervalle = setInterval(
      () => setNow(Date.now()),
      aUneHeure ? 1000 : 60000
    )

    return () => clearInterval(intervalle)
  }, [aUneHeure])

  // Vérification de la date
  const partiesDate = date?.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (!partiesDate || heureAnalysee === undefined) {
    return (
      <p className="cr-fin">
        Date ou heure invalide. Vérifiez les informations de l'événement.
      </p>
    )
  }

  const annee = Number(partiesDate[1])
  const mois = Number(partiesDate[2])
  const jour = Number(partiesDate[3])

  const h = heureAnalysee?.heures ?? 23
  const m = heureAnalysee?.minutes ?? 59
  const s = heureAnalysee ? 0 : 59

  const dateCible = new Date(annee, mois - 1, jour, h, m, s)

  if (
    dateCible.getFullYear() !== annee ||
    dateCible.getMonth() !== mois - 1 ||
    dateCible.getDate() !== jour
  ) {
    return (
      <p className="cr-fin">La date de cet événement est invalide.</p>
    )
  }

  const reste = dateCible.getTime() - now

  if (reste <= 0) {
    return (
      <p className="cr-fin">
        Cette belle journée est passée. Merci de l’avoir partagée avec nous.
      </p>
    )
  }

  const j = Math.floor(reste / 864e5)
  const heuresRestantes = Math.floor(reste / 36e5) % 24
  const minutesRestantes = Math.floor(reste / 6e4) % 60
  const secondesRestantes = Math.floor(reste / 1e3) % 60

  const cases = heureAnalysee
    ? [
        ['Jours', j],
        ['Heures', heuresRestantes],
        ['Minutes', minutesRestantes],
        ['Secondes', secondesRestantes]
      ]
    : [['Jours', j]]

  return (
    <div className="cr" aria-label="Compte à rebours">
      {cases.map(([label, valeur]) => (
        <div key={label} className="cr-case">
          <b>{String(valeur).padStart(2, '0')}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
