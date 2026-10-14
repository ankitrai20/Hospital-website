import { useState } from 'react'
import './App.css'

const doctors = [
  {
    name: 'Dr. Maya Bennett',
    initials: 'MB',
    specialization: 'Cardiology',
    detail: 'Heart health and preventive care',
    tone: 'mint',
  },
  {
    name: 'Dr. Ethan Brooks',
    initials: 'EB',
    specialization: 'General Medicine',
    detail: 'Primary care for adults and families',
    tone: 'blue',
  },
  {
    name: 'Dr. Sofia Patel',
    initials: 'SP',
    specialization: 'Pediatrics',
    detail: 'Thoughtful care for growing families',
    tone: 'peach',
  },
]

const departments = [
  'General Medicine',
  'Cardiology',
  'Pediatrics',
  'Diagnostics',
  'Emergency Care',
]

function App() {
  const [confirmation, setConfirmation] = useState('')
  const [minimumDate] = useState(() => {
    const today = new Date()
    return [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('-')
  })

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.reportValidity()) return

    const patientName = new FormData(form).get('patient-name')
    setConfirmation(
      `Thanks, ${patientName}. Your request has been recorded in this demo only. No appointment has been booked and no information was sent.`,
    )
  }

  return (
    <div className="hospital">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="navbar">
        <a className="logo" href="#home" aria-label="CarePlus home">
          Care<span>Plus</span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#doctors">Doctors</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="appointment-btn nav-appointment" href="#appointment">
          Book Appointment
        </a>
      </header>

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">YOUR HEALTH, OUR PRIORITY</p>
            <h1 id="hero-title">Better Care for a <span>Healthier Life.</span></h1>
            <p>
              Quality healthcare, experienced doctors and compassionate care
              for you and your family.
            </p>
            <a className="appointment-btn" href="#appointment">
              Request an Appointment
            </a>
            <p className="hero-note">Compassionate care, centered around you.</p>
          </div>

          <aside className="hero-card" aria-label="CarePlus promise">
            <div className="medical-icon" aria-hidden="true">✚</div>
            <p className="card-kicker">HERE FOR YOUR HEALTH</p>
            <h2>Care you can trust</h2>
            <p>Professional care for every stage of life.</p>
            <a href="#services" className="text-link">Explore our services <span aria-hidden="true">→</span></a>
          </aside>
        </section>

        <section className="services section-shell" id="services" aria-labelledby="services-title">
          <p className="eyebrow">OUR SERVICES</p>
          <h2 id="services-title">Healthcare made simpler</h2>
          <p className="section-intro">
            Thoughtful support and essential services for every step of your
            health journey.
          </p>

          <div className="service-grid">
            <article className="service-card">
              <span className="service-icon" aria-hidden="true">♡</span>
              <h3>General Medicine</h3>
              <p>Everyday healthcare, preventive advice, and ongoing support for your family.</p>
            </article>
            <article className="service-card">
              <span className="service-icon" aria-hidden="true">✚</span>
              <h3>Emergency Care</h3>
              <p>Timely assistance for urgent health concerns when every moment matters.</p>
            </article>
            <article className="service-card">
              <span className="service-icon" aria-hidden="true">⌕</span>
              <h3>Diagnostics</h3>
              <p>Helpful testing and health checks to inform your care with confidence.</p>
            </article>
          </div>
        </section>

        <section className="doctors section-shell" id="doctors" aria-labelledby="doctors-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MEET OUR TEAM</p>
              <h2 id="doctors-title">Care from people who care</h2>
              <p className="section-intro">
                Get to know a few of the specialists here to support your health.
              </p>
            </div>
            <span className="demo-label">DEMO PROFILES</span>
          </div>

          <div className="doctor-grid">
            {doctors.map((doctor) => (
              <article className="doctor-card" key={doctor.name}>
                <div className={`doctor-avatar ${doctor.tone}`} aria-hidden="true">
                  {doctor.initials}
                </div>
                <div className="doctor-info">
                  <span className="demo-label doctor-demo">SAMPLE DOCTOR</span>
                  <h3>{doctor.name}</h3>
                  <p className="doctor-specialty">{doctor.specialization}</p>
                  <p className="doctor-detail">{doctor.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="demo-disclaimer">
            These are fictional sample profiles for demonstration only.
          </p>
        </section>

        <section className="appointment" id="appointment" aria-labelledby="appointment-title">
          <div className="appointment-layout">
            <div className="appointment-copy">
              <p className="eyebrow">TAKE THE NEXT STEP</p>
              <h2 id="appointment-title">Request an appointment</h2>
              <p>
                Share your preferred visit details below. This demo form
                provides on-page feedback only and does not book a visit.
              </p>
              <div className="appointment-assurance">
                <span aria-hidden="true">✓</span>
                No information is sent or stored
              </div>
            </div>

            <form className="appointment-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="patient-name">Patient name</label>
                  <input
                    id="patient-name"
                    name="patient-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                    maxLength="100"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="e.g. +1 555 010 1234"
                    pattern="(?=.*[0-9])[0-9+ .\x2d]{7,20}"
                    title="Enter 7 to 20 digits, spaces, plus signs, periods, or hyphens."
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="department">Department</label>
                  <select id="department" name="department" defaultValue="" required>
                    <option value="" disabled>Select a department</option>
                    {departments.map((department) => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="preferred-date">Preferred date</label>
                  <input
                    id="preferred-date"
                    name="preferred-date"
                    type="date"
                    min={minimumDate}
                    required
                  />
                </div>
                <div className="form-field form-field-full">
                  <label htmlFor="preferred-time">Preferred time</label>
                  <select id="preferred-time" name="preferred-time" defaultValue="" required>
                    <option value="" disabled>Select a preferred time</option>
                    <option value="morning">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM – 4:00 PM)</option>
                    <option value="evening">Evening (4:00 PM – 6:00 PM)</option>
                  </select>
                </div>
              </div>
              <button className="appointment-btn submit-btn" type="submit">
                Send demo request
              </button>
              <p className="form-note">
                Demo only · No appointment is booked · No data is sent
              </p>
              <p className="form-confirmation" role="status" aria-live="polite">
                {confirmation}
              </p>
            </form>
          </div>
        </section>

        <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
          <div className="contact-heading">
            <p className="eyebrow">WE’RE HERE TO HELP</p>
            <h2 id="contact-title">Get in touch</h2>
            <p className="section-intro">
              Have a question? Our friendly team is ready to point you in the
              right direction.
            </p>
          </div>
          <div className="contact-grid">
            <article className="contact-card">
              <span className="contact-icon" aria-hidden="true">☎</span>
              <div>
                <h3>Call us</h3>
                <a href="tel:+15550102020">+1 (555) 010-2020</a>
                <p>Sample contact details</p>
              </div>
            </article>
            <article className="contact-card">
              <span className="contact-icon" aria-hidden="true">✉</span>
              <div>
                <h3>Email</h3>
                <a href="mailto:hello@careplus.example">hello@careplus.example</a>
                <p>Sample contact details</p>
              </div>
            </article>
            <article className="contact-card">
              <span className="contact-icon" aria-hidden="true">⌖</span>
              <div>
                <h3>Visit</h3>
                <p className="contact-value">100 Wellness Way, Sample City</p>
                <p>Sample address for demonstration</p>
              </div>
            </article>
          </div>
          <p className="demo-disclaimer">
            Contact details shown are placeholders. Please replace them with approved hospital information.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="logo footer-logo" href="#home">Care<span>Plus</span></a>
            <p>Compassionate care for healthier lives.</p>
          </div>
          <div className="footer-links">
            <a href="#services">Our services</a>
            <a href="#doctors">Meet our doctors</a>
            <a href="#appointment">Request an appointment</a>
            <a href="#contact">Contact us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {minimumDate.slice(0, 4)} CarePlus Hospital. Demo website — sample information only.</p>
          <p>For emergencies, contact your local emergency services.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
