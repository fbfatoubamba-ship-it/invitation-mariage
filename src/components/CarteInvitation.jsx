import Calendrier from './Calendrier'
export default function CarteInvitation({ config }) {
  const { maries, verset, familles, decor } = config
  return (
    <section className="bloc carte-nom">
      <article className="evt arche photo nomscard">
        <div className="fond" style={{ '--photo': decor?.pagne ? `url(${decor.pagne})` : 'none' }} />
        <span className="sceau-mini" aria-hidden>{maries.initiales.charAt(0)}</span>
        <p className="bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p className="mot-mariage">Mariage</p>
        <p className="nom-script">{maries.epouse}</p>
        <p className="esperluette">&amp;</p>
        <p className="nom-script">{maries.epoux}</p>
        <p className="familles">{familles}</p>
        <blockquote className="verset">
          <p lang="ar" dir="rtl" className="verset-ar">{verset.arabe}</p>
          <p>« {verset.francais} »</p>
          <cite>{verset.source}</cite>
        </blockquote>
        <Calendrier evenements={config.evenements} />
      </article>
    </section>
  )
}
