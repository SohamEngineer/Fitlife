import React from 'react'
import "./style/about.css"

const teamMembers = [
  {
    id: 1,
    name: "Alex Carter",
    role: "Strength & Conditioning Coach",
    image: "https://i.pravatar.cc/300?img=11",
    emoji: "💪"
  },
  {
    id: 2,
    name: "Maya Singh",
    role: "Yoga & Flexibility Expert",
    image: "https://i.pravatar.cc/300?img=47",
    emoji: "🧘"
  },
  {
    id: 3,
    name: "Jordan Lee",
    role: "Nutrition Specialist",
    image: "https://i.pravatar.cc/300?img=32",
    emoji: "🥗"
  },
  {
    id: 4,
    name: "Sam Rivera",
    role: "HIIT & Cardio Trainer",
    image: "https://i.pravatar.cc/300?img=15",
    emoji: "🔥"
  },
  {
    id: 5,
    name: "Priya Nair",
    role: "Mindfulness & Recovery",
    image: "https://i.pravatar.cc/300?img=44",
    emoji: "🌟"
  }
]


function About() {
  return (
    <>
      <div className="about-wrapper container">

        {/* HERO */}
        <section className="about-hero">
          <div>
            <div className="hero-badge"><span></span> Est. 2024 — Group Project</div>
            <h1 className="hero-title">
              About<br /><span className="accent">Us</span>
            </h1>
            <p className="hero-sub">
              We're a team of five passionate individuals who believe fitness is not a destination — 
              it's a daily practice, a mindset, and a movement that transforms lives from the inside out.
            </p>
          </div>
          <div className="hero-stats">
            {[
              { num: "500+", label: "Workouts Designed" },
              { num: "10K+", label: "Lives Impacted" },
              { num: "5", label: "Expert Members" },
              { num: "100%", label: "Commitment" }
            ].map((s, i) => (
              <div className="stat-box" key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY FITNESS */}
        <section className="section-block">
          <div className="section-eyebrow">The Foundation</div>
          <h2 className="section-heading">Why Fitness<br />Matters</h2>
          <p style={{ color: '#666', maxWidth: 680, fontSize: 15, lineHeight: 1.8 }}>
            Fitness is not just about aesthetics — it is the cornerstone of a long, energetic, and fulfilling life. 
            Every rep, every step, every breath you take during exercise is an investment in your future self.
          </p>

          <div className="fitness-grid">
            {[
              {
                icon: "🫀",
                title: "Heart Health",
                desc: "Regular exercise strengthens your cardiovascular system, reducing the risk of heart disease, stroke, and high blood pressure by up to 35%. Your heart is a muscle — train it."
              },
              {
                icon: "🧠",
                title: "Mental Clarity",
                desc: "Physical activity releases endorphins and serotonin — nature's antidepressants. A consistent workout routine reduces anxiety, sharpens focus, and builds mental resilience."
              },
              {
                icon: "⚡",
                title: "Daily Energy",
                desc: "Contrary to popular belief, exercise gives you energy. It improves mitochondrial efficiency, boosts metabolism, and leads to deeper, more restorative sleep every night."
              },
              {
                icon: "🦴",
                title: "Bone & Muscle",
                desc: "Strength training preserves muscle mass, increases bone density, and protects against age-related decline. Starting young compounds these benefits over decades."
              },
              {
                icon: "⏳",
                title: "Longevity",
                desc: "Studies show that 150 minutes of moderate exercise per week can add up to 7 years to your life. Movement is the most powerful anti-aging medicine known to science."
              },
              {
                icon: "🤝",
                title: "Community",
                desc: "Fitness builds bonds. Shared sweat, shared goals, shared victories — training with others creates accountability, motivation, and a sense of belonging that fuels progress."
              }
            ].map((card, i) => (
              <div className="fitness-card" key={i}>
                <span className="card-num">0{i + 1}</span>
                <span className="fitness-icon">{card.icon}</span>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MOTIVE */}
        <section className="section-block">
          <div className="section-eyebrow">Our Mission</div>
          <h2 className="section-heading">Why We Built<br />This</h2>

          <div className="motive-layout">
            <div className="motive-text">
              <p>
                This website was born from a <strong>shared frustration</strong>. As a group of students and fitness enthusiasts, 
                we found that most fitness resources online were either too generic, too expensive, or too overwhelming for beginners.
              </p>
              <p>
                We wanted to build a platform that <strong>speaks your language</strong> — one that doesn't drown you in jargon, 
                doesn't push overpriced supplements, and doesn't make you feel like you need to already be fit to get started.
              </p>
              <p>
                Our mission is simple: <strong>make fitness accessible, understandable, and genuinely enjoyable</strong> for every person, 
                regardless of their starting point. Whether you're 18 or 55, beginner or intermediate — this space is for you.
              </p>
              <p>
                As a group project, each one of us brought our unique expertise to the table — from nutrition and yoga 
                to HIIT training and mental wellness — to create a <strong>holistic fitness experience</strong> that addresses 
                the whole person, not just the body.
              </p>
              <div className="motive-quote">
                <p>"We don't chase perfection. We chase progress — one rep, one meal, one mindful breath at a time."</p>
              </div>
            </div>

            <div className="motive-values">
              {[
                { icon: "🎯", title: "Accessibility First", desc: "Free, clear, and beginner-friendly content for everyone, everywhere — no barriers." },
                { icon: "🔬", title: "Science-Backed", desc: "Every recommendation we make is grounded in research, not trends or influencer culture." },
                { icon: "🌱", title: "Sustainable Growth", desc: "We promote lifelong habits over crash diets and quick fixes. Progress that lasts." },
                { icon: "💬", title: "Community-Driven", desc: "Built by a team, for a community. Your feedback shapes everything we create." },
                { icon: "🌍", title: "Inclusive Approach", desc: "Fitness looks different for everyone. We celebrate every body, every journey." }
              ].map((v, i) => (
                <div className="value-row" key={i}>
                  <span className="value-icon">{v.icon}</span>
                  <div>
                    <h5>{v.title}</h5>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="team-section">
          <div className="section-eyebrow">The People</div>
          <h2 className="section-heading">Meet The<br />Team</h2>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div className="member-card" key={member.id}>
                <div className="member-img-wrap">
                  <img src={member.image} alt={member.name} />
                  <div className="member-overlay" />
                  <div className="member-emoji">{member.emoji}</div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}

export default About
