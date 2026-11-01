// ============================================================
//  FICHIER CENTRAL : modifiez ici toutes les informations.
//  Laissez une valeur vide ("") tant qu'elle n'est pas connue :
//  le site affichera « À préciser » / « À confirmer ».
//  Heure au format 24 h : "15:30"
// ============================================================
export const mariage = {
  titreSite: 'Mariage de Hadja Salimata Coulibaly et Ouattara Abdoul-Kader',
  maries: { epouse: 'Hadja Salimata Coulibaly', epoux: 'Ouattara Abdoul-Kader', initiales: 'S & A' },
  familles: 'Les familles Coulibaly et Ouattara ont l’immense joie de vous annoncer le mariage de leurs enfants.',
  verset: {
    arabe: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    francais: 'Et parmi Ses signes, Il a créé de vous, pour vous, des épouses afin que vous trouviez auprès d’elles tranquillité ; et Il a mis entre vous affection et miséricorde.',
    source: 'Sourate Ar-Rum, 30:21',
  },
  // Images décoratives (dossier /public). Remplacez-les en changeant simplement le chemin.
  decor: { bouquet: '/bouquet.png', mainGantee: '/main-gantee.png', mains: '/mains-enveloppe.jpg', pagne: '/pagne.jpg' },
  // Chemin d'une image placée dans /public (ex : "/illustration-couple.jpg"). Vide = médaillon par défaut.
  illustration: '',
  // Fichier audio dans /public (ici : le son de votre vidéo). Vide = bouton masqué. Ne démarre jamais seul.
  musique: '/musique.mp3',
  // Adresse du script Google (voir README) : les messages des invités arrivent alors dans un Google Sheets.
  // Laissez vide pour utiliser WhatsApp à la place.
  messagesUrl: 'https://script.google.com/macros/s/AKfycbzPWpXPvVODAP1jxMTQru833aL5UgCkBzogqFFl4FwHd7T8e0S0dDKy6KuWWEdroIN7/exec',
  // Numéro WhatsApp au format international, chiffres seulement (ex : "2250700000000"). Vide = message d'attente.
  whatsapp: { numero: '', messageDebut: 'Bonjour Salimata et Abdoul-Kader, voici mon petit mot pour vous :' },
  // Pour chaque événement : date (fixe), heure, lieu. Laissez vide ("") si inconnu.
  // "adresse" sert uniquement au bouton « Voir l'itinéraire » (Google Maps) : il n'apparaît que si elle est remplie.
  // Petit mot affiché à la fin de la page (modifiable librement).
  motFin: 'Votre présence est pour nous le plus beau des cadeaux. Partager ces moments de joie avec vous, qui comptez tant à nos yeux, donnera à cette union tout son sens. Nous avons hâte de vous retrouver. Qu’Allah nous réunisse dans la joie et la santé.',
  evenements: [
    {
      id: 'mise-en-chambre', photo: '/photo-mise-en-chambre.jpg', titre: 'La mise en chambre', date: '2026-12-15',
      heure: '11h:00', lieu: 'palmeraie vision 2000', address:'',
      description: 'Un moment particulier qui précède le mariage, placé sous le signe de la famille, de la tradition et du bonheur.',
    },
    {
      id: 'mariage-musulman', photo: '/photo-mariage.jpg', titre: 'Le mariage musulman et la réception', date: '2026-12-17',
      heure: '10h:00', lieu: ' grande mosquee d Angre', address:'', // nom de la mosquée, quand elle sera choisie
      description: 'Les familles Coulibaly et Ouattara ont la joie de vous convier à cette union célébrée dans le respect des traditions musulmanes.',
    },
    {
      id: 'danse-rejouissances', photo: '/photo-rejouissances.jpg', titre: 'La danse de réjouissances', date: '2026-12-19',
      heure: '', lieu: '', adresse: '',
      description: 'Prolongeons la joie de cette belle union lors d’une journée de réjouissances, de partage et de bonheur en famille.',
    },
  ],
}
