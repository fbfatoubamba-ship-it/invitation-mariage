export const ou = (v, defaut = 'À préciser') => (v && String(v).trim() ? v : defaut)
export const dateLongue = (iso) =>
  new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(iso + 'T12:00:00'))
export const adresseComplete = (e) => [e.lieu, e.adresse].filter((x) => x && x.trim()).join(', ')
export const lienItineraire = (e) =>
  e.adresse && e.adresse.trim()
    ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(adresseComplete(e))
    : ''
