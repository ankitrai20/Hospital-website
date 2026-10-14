
import './App.css'

function App() {
  return (
    <div className="hospital">
      <header className="navbar">
        <a className="logo" href="#home">Care<span>Plus</span></a>

        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#doctors">Doctors</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="appointment-btn" href="#appointment">
          Book Appointment
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">YOUR HEALTH, OUR PRIORITY</p>
            <h1>Better Care for a <span>Healthier Life.</span></h1>
            <p>
              Quality healthcare, experienced doctors and
              compassionate care for you and your family.
            </p>
            <a className="appointment-btn" href="#appointment">
              Book Your Appointment
            </a>
          </div>

          <div className="hero-card">
            <div className="medical-icon">✚</div>
            <h2>Care you can trust</h2>
            <p>Professional care for every stage of life.</p>
          </div>
        </section>

        <section className="services" id="services">
          <p className="eyebrow">OUR SERVICES</p>
          <h2>Healthcare made simpler</h2>

          <div className="service-grid">
            <article>
              <span>♡</span>
              <h3>General Medicine</h3>
              <p>Everyday healthcare for your family.</p>
            </article>

            <article>
              <span>✚</span>
              <h3>Emergency Care</h3>
              <p>Timely help when you need it.</p>
            </article>

            <article>
              <span>♧</span>
              <h3>Diagnostics</h3>
              <p>Support for tests and health checks.</p>
            </article>
          </div>
        </section>

        <section className="appointment" id="appointment">
          <h2>Ready to book a visit?</h2>
          <p>Contact our reception to schedule an appointment.</p>
          <a className="appointment-btn" href="#contact">
            Contact the Hospital
          </a>
        </section>
      </main>

      <footer id="contact">
        <strong>CarePlus Hospital</strong>
        <p>Demo website — replace with approved hospital details.</p>
      </footer>
    </div>
  )
}

export default App
