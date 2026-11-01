export default function IllustrationCouple({ config }) {
  const src = config.illustration || config.decor?.bouquet
  return (
    <section className="bloc illus">
      {src && <img src={src} alt={config.illustration ? 'Illustration du couple' : 'Bouquet de roses bordeaux et ivoire'} loading="lazy" className={config.illustration ? 'illus-img' : 'bouquet'} />}
    </section>
  )
}
