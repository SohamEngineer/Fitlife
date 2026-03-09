export default function WorkoutSection({ title, children }) {
  if (!children) return null

  return (
    <section className="detail-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-content">
        {children}
      </div>
    </section>
  )
}
