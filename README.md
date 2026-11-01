# Invitation de mariage — Hadja Salimata Coulibaly & Ouattara Abdoul Kader

Site d'invitation animé (React + Vite). Toutes les informations se modifient dans **`src/config/mariage.js`**.

## 1. Installer Node.js
Téléchargez la version « LTS » sur https://nodejs.org puis vérifiez dans un terminal : `node -v` et `npm -v`.

## 2. Installer et lancer en local
```
npm install
npm run dev
```
Ouvrez l'adresse affichée (généralement http://localhost:5173).

## 3. Tester
Cliquez sur « Ouvrir mon invitation », puis vérifiez la carte, les trois événements, les compteurs et le rendu sur téléphone. Pour tester la version finale : `npm run build` puis `npm run preview`.

## 4. Créer le dépôt GitHub et envoyer les fichiers
1. Créez un compte sur https://github.com, puis « New repository » (nom : `invitation-mariage`).
2. Dans le dossier du projet :
```
git init
git add .
git commit -m "Première version"
git branch -M main
git remote add origin https://github.com/VOTRE-NOM/invitation-mariage.git
git push -u origin main
```

## 5. Déployer sur Vercel
1. Connectez-vous sur https://vercel.com avec GitHub.
2. « Add New… » > « Project », choisissez le dépôt `invitation-mariage`.
3. Vercel détecte Vite. Vérifiez : commande de build `npm run build`, dossier de sortie `dist`.
4. Cliquez sur « Deploy ». Le lien public (`…vercel.app`) apparaît à la fin.

## 6. Modifier le site après publication
1. Ouvrez `src/config/mariage.js` et changez les valeurs (mosquée, lieux, heures, adresses pour Google Maps, numéro WhatsApp…).
2. Enregistrez, puis :
```
git add .
git commit -m "Mise à jour des informations"
git push
```
3. Vercel redéploie automatiquement en 1 à 2 minutes. Le lien reste le même.

Sans terminal : sur github.com, ouvrez le fichier, cliquez sur le crayon, modifiez, puis « Commit changes ». Le redéploiement se lance seul.

## Ce qui reste à compléter
- **Heure et lieu** de chaque événement (laissés vides volontairement) ; la date est déjà renseignée.
- **Mosquée** : champ `lieu` du mariage musulman. Pour afficher le bouton « Voir l'itinéraire », remplissez aussi `adresse` (rue, ville) ; sans adresse, le bouton reste masqué.
- **Numéro WhatsApp** : `whatsapp.numero`, format international sans `+` (ex. `2250700000000`).
- **Images** : le bouquet, la main gantée et le téléphone sont dans `public/` (`bouquet.png`, `main-gantee.png`, `telephone.jpg`). Pour une illustration du couple à la place du bouquet, ajoutez le fichier dans `public/` et renseignez `illustration: "/mon-image.jpg"`.
- **Musique** : placez un fichier audio dont vous avez les droits dans `public/` et renseignez `musique: "/musique.mp3"`. Elle ne démarre jamais seule.
- **Image d'aperçu WhatsApp** : ajoutez `public/apercu.jpg` (1200×630), puis dans `index.html` remplacez `/apercu.jpg` par l'adresse complète (ex. `https://votre-site.vercel.app/apercu.jpg`).

## Remarques
- Les compteurs utilisent l'heure de l'appareil de l'invité. Sans heure renseignée, ils comptent en jours et affichent « Horaire à confirmer ».
- Les réponses passent par WhatsApp : aucune base de données n'est utilisée.

## Images, motif et musique
- `public/pagne.jpg` : motif de pagne sénoufo (bandes décoratives et fond de la carte des mariés).
- `public/photo-*.jpg` : photos floutées en arrière-plan de chaque événement (champ `photo` dans `mariage.js`).
- `public/musique.mp3` : le son de votre vidéo, en boucle. Il ne démarre que si l'invité appuie sur le bouton en bas à droite.

## Recevoir les messages des invités dans un fichier (Google Sheets)
1. Sur https://sheets.google.com, créez une feuille vierge nommée « Messages des invités ». Ligne 1 : `Date`, `Nom`, `Message`.
2. Menu « Extensions » > « Apps Script ». Remplacez le code par :
```js
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
    .appendRow([new Date(), String(d.nom).slice(0, 120), String(d.message).slice(0, 1500)]);
  return ContentService.createTextOutput('ok');
}
```
3. « Déployer » > « Nouveau déploiement » > type « Application Web ». Exécuter en tant que : **Moi**. Qui a accès : **Tout le monde**. Cliquez sur « Déployer » et autorisez l'accès à votre compte Google.
4. Copiez l'URL qui se termine par `/exec`, collez-la dans `messagesUrl` de `src/config/mariage.js`, puis publiez (`git add .`, `git commit`, `git push`).
5. Chaque message arrive dans une nouvelle ligne de la feuille, que vous pouvez télécharger en Excel ou PDF (« Fichier » > « Télécharger »). Si vous modifiez le script plus tard, refaites « Déployer » > « Gérer les déploiements » > nouvelle version.
La feuille reste privée : les invités ne peuvent qu'ajouter un message, jamais lire les autres.
