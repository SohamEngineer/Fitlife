export default function WorkoutStats({ stats }) {
  return (
    <section className="quick-stats">
      {stats.map(({ label, value, icon }, i) => (
        value && (
          <div className="stat-card" key={i}>
            <div className="stat-icon-wrapper">
              {icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        )
      ))}
    </section>
  )
}
