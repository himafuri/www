"use client";

import Image from "next/image";
import { useState } from "react";

const faqItems = [
  {
    question: "Lorem Ipsum FAQ nya disini",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
  },
  { question: "Lorem Ipsum FAQ nya disini", answer: "" },
  { question: "Lorem Ipsum FAQ nya disini", answer: "" },
  { question: "Lorem Ipsum FAQ nya disini", answer: "" },
  { question: "Lorem Ipsum FAQ nya disini", answer: "" },
];

export default function HomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [lang, setLang] = useState<"ID" | "EN">("ID");

  function toggleFaq(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <>
      {/* ===== Navbar ===== */}
      <header className="navbar">
        <div className="navbar__inner">
          <a
            className="navbar__brand"
            href="#top"
            aria-label="HIMAFURI beranda"
          >
            <Image
              src="/himafurilogo.png"
              alt="Logo HIMAFURI"
              width={36}
              height={36}
              priority
            />
          </a>

          <div className="navbar__actions">
            <a
              className="navbar__icon"
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord HIMAFURI"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.317 4.369A19.79 19.79 0 0 0 15.885 3c-.21.375-.444.875-.608 1.273a18.27 18.27 0 0 0-5.556 0A12.6 12.6 0 0 0 9.11 3a19.74 19.74 0 0 0-4.435 1.37C1.578 8.29.865 12.1 1.22 15.86a19.9 19.9 0 0 0 5.993 3.03c.484-.66.914-1.363 1.284-2.104a12.9 12.9 0 0 1-2.022-.98c.17-.124.336-.253.497-.386 3.9 1.81 8.13 1.81 11.98 0 .162.133.328.262.497.386-.645.386-1.324.71-2.026.982.37.74.8 1.443 1.284 2.103a19.83 19.83 0 0 0 6-3.03c.42-4.36-.68-8.13-2.902-11.49ZM8.68 13.55c-1.17 0-2.13-1.07-2.13-2.39 0-1.31.94-2.39 2.13-2.39 1.19 0 2.15 1.08 2.13 2.39 0 1.32-.94 2.39-2.13 2.39Zm6.64 0c-1.17 0-2.13-1.07-2.13-2.39 0-1.31.94-2.39 2.13-2.39 1.19 0 2.15 1.08 2.13 2.39 0 1.32-.93 2.39-2.13 2.39Z" />
              </svg>
            </a>
            <a
              className="navbar__icon"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram HIMAFURI"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.2"
                  cy="6.8"
                  r="0.9"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

            <div className="lang-toggle" role="group" aria-label="Pilih bahasa">
              <button
                type="button"
                className={`lang-toggle__btn ${lang === "ID" ? "is-active" : ""}`}
                onClick={() => {
                  setLang("ID");
                }}
              >
                ID
              </button>
              <button
                type="button"
                className={`lang-toggle__btn ${lang === "EN" ? "is-active" : ""}`}
                onClick={() => {
                  setLang("EN");
                }}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ===== Hero ===== */}
        <section className="hero">
          <Image
            src="/himafuribanner.jpg"
            alt="Anggota komunitas HIMAFURI berkumpul"
            fill
            priority
            className="hero__bg"
            sizes="100vw"
          />
          <div className="hero__overlay" />

          <div className="hero__inner">
            <div className="hero__mascot">
              <Image
                src="/mascot-placeholder.png"
                alt="Placeholder maskot HIMAFURI"
                width={198}
                height={195}
              />
            </div>

            <div className="hero__content">
              <h1>Himpunan Mahasiswa Furry Indonesia</h1>
              <p className="hero__lead">
                Persekutuan Mahasiswa Furry Indonesia dari berbagai macam
                perguruan tinggi.
              </p>

              <div className="hero__stats">
                <div className="stat">
                  <span className="stat__number">500+</span>
                  <span className="stat__label">Anggota Komunitas</span>
                </div>
                <div className="stat">
                  <span className="stat__number">130+</span>
                  <span className="stat__label">Institusi Terdaftar</span>
                </div>
              </div>

              <a
                className="btn btn--primary"
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gabung ke Discord
              </a>
            </div>
          </div>
        </section>

        {/* ===== Visi & Misi ===== */}
        <section className="vision-mission">
          <div className="card">
            <h2>Visi</h2>
            <p>
              Merangkul mahasiswa-mahasiswa Perguruan Tinggi di Indonesia yang
              memiliki ketertarikan terhadap komunitas furry.
            </p>
          </div>
          <div className="card">
            <h2>Misi</h2>
            <p>
              Melakukan segala kegiatan HIMAFURI terutama dalam mencari
              mahasiswa-mahasiswa yang tersebar di berbagai Perguruan Tinggi di
              Indonesia secara konsisten untuk mencapai Visi HIMAFURI.
            </p>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="faq">
          <h2 className="faq__title">Pertanyaan Yang Sering Ditanyakan</h2>

          <div className="faq__list">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div className="faq__item" key={index}>
                  <button
                    type="button"
                    className="faq__question"
                    aria-expanded={isOpen}
                    onClick={() => {
                      toggleFaq(index);
                    }}
                  >
                    <span>{item.question}</span>
                    <svg
                      className={`faq__chevron ${isOpen ? "is-open" : ""}`}
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {isOpen && item.answer && (
                    <div className="faq__answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <Image
              src="/himafurilogo.png"
              alt="Logo HIMAFURI"
              width={48}
              height={48}
            />
            <div>
              <p className="footer__brand-name">
                Himpunan Mahasiswa Furry Indonesia
              </p>
              <p className="footer__copyright">
                © 2026 Himpunan Mahasiswa Furry Indonesia
              </p>
            </div>
          </div>

          <nav className="footer__col">
            <h3>Panduan</h3>
            <ul>
              <li>
                <a href="#top">Komunitas</a>
              </li>
              <li>
                <a href="#top">Peraturan &amp; Tata Tertib</a>
              </li>
              <li>
                <a href="#top">Tautan Penting</a>
              </li>
            </ul>
          </nav>

          <nav className="footer__col">
            <h3>Media Sosial</h3>
            <ul>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gabung ke Discord Kami
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer__divider" />

        <div className="footer__quote">
          <p>
            &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.&rdquo;
          </p>
          <span>- John &ldquo;Furdough&rdquo; Doe</span>
        </div>
      </footer>
    </>
  );
}
