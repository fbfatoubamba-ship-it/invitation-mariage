export default function Accueil({ config }) {
  const init = config.maries.initiales.replace(/\s/g, '')
  return (
    <section className="accueil">
      <h1 className="titre-invit">Invitation au mariage</h1>
      {config.decor?.mains && (
        <div className="mains">
          <img src={config.decor.mains} alt="Des mains gantées présentent une enveloppe bordeaux scellée" />
          <span className="sceau-init" aria-hidden>{init}</span>
        </div>
      )}
    </section>
  )
}
