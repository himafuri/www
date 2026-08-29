"use client";

import { useState } from "react";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import useMountEffect from "@/hooks/useMountEffect";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiDiscord, SiInstagram } from "@icons-pack/react-simple-icons";

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
  const [lang, setLang] = useState<"ID" | "EN">("ID");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useMountEffect(() => {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  });

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      {/* ===== Navbar ===== */}
      <header className="sticky top-0 z-50 bg-navbar shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="#top" aria-label="HIMAFURI beranda">
            <Image
              src="/himafurilogo.png"
              alt="Logo HIMAFURI"
              width={36}
              height={36}
              priority
              className="rounded-full"
            />
          </a>

          <div className="flex items-center gap-5 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                className="flex items-center justify-center text-white/90 transition-opacity hover:opacity-100"
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord HIMAFURI"
              >
                <SiDiscord size={20} />
              </a>
              <a
                className="flex items-center justify-center text-white/90 transition-opacity hover:opacity-100"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram HIMAFURI"
              >
                <SiInstagram size={20} />
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language Switcher */}
              <div
                className="flex items-center overflow-hidden rounded-full border border-white/60 p-0.5"
                role="group"
                aria-label="Pilih bahasa"
              >
                <button
                  type="button"
                  className={`cursor-pointer rounded-full px-3 py-0.5 text-xs font-bold transition-all ${
                    lang === "ID"
                      ? "bg-white text-navbar shadow-sm"
                      : "bg-transparent text-white hover:text-white/80"
                  }`}
                  onClick={() => {
                    setLang("ID");
                  }}
                >
                  ID
                </button>
                <button
                  type="button"
                  className={`cursor-pointer rounded-full px-3 py-0.5 text-xs font-bold transition-all ${
                    lang === "EN"
                      ? "bg-white text-navbar shadow-sm"
                      : "bg-transparent text-white hover:text-white/80"
                  }`}
                  onClick={() => {
                    setLang("EN");
                  }}
                >
                  EN
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="cursor-pointer rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ===== Hero ===== */}
        <section className="relative flex min-h-[520px] items-center overflow-hidden py-12 md:py-16">
          <Image
            src="/himafuribanner.jpg"
            alt="Anggota komunitas HIMAFURI berkumpul"
            fill
            priority
            className="z-0 object-cover opacity-75"
            sizes="100vw"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/30 via-background/60 to-background" />

          <div className="relative z-[2] mx-auto flex max-w-6xl w-full flex-col items-center gap-8 px-6 md:flex-row md:items-center md:gap-12">
            <div className="flex h-[195px] w-[198px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-[0_16px_35px_rgba(36,124,192,0.2)] ring-4 ring-white/30 dark:ring-white/10">
              <Image
                src="/mascot-placeholder.png"
                alt="Placeholder maskot HIMAFURI"
                width={198}
                height={195}
                className="object-contain"
              />
            </div>

            <div className="max-w-[640px] text-center md:text-left">
              <h1 className="font-heading mb-3 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
                Himpunan Mahasiswa Furry Indonesia
              </h1>
              <p className="mb-6 text-base text-muted-foreground sm:text-lg">
                Persekutuan Mahasiswa Furry Indonesia dari berbagai macam
                perguruan tinggi.
              </p>

              <div className="mb-6 flex flex-wrap justify-center gap-4 sm:gap-6 md:justify-start">
                <div className="flex flex-col rounded-xl border border-border bg-card/80 px-4 py-2 shadow-xs backdrop-blur-xs">
                  <span className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
                    500+
                  </span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Anggota Komunitas
                  </span>
                </div>
                <div className="flex flex-col rounded-xl border border-border bg-card/80 px-4 py-2 shadow-xs backdrop-blur-xs">
                  <span className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
                    130+
                  </span>
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Institusi Terdaftar
                  </span>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="h-auto rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary/90 active:translate-y-0.5"
              >
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gabung ke Discord HIMAFURI
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ===== Visi & Misi ===== */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-12 md:grid-cols-2">
          <Card className="rounded-2xl border border-border bg-card p-6 shadow-xs transition-shadow hover:shadow-md">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="font-heading text-2xl font-bold text-card-foreground">
                Visi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-base leading-relaxed text-muted-foreground">
                Merangkul mahasiswa-mahasiswa Perguruan Tinggi di Indonesia yang
                memiliki ketertarikan terhadap komunitas furry.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border border-border bg-card p-6 shadow-xs transition-shadow hover:shadow-md">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="font-heading text-2xl font-bold text-card-foreground">
                Misi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-base leading-relaxed text-muted-foreground">
                Melakukan segala kegiatan HIMAFURI terutama dalam mencari
                mahasiswa-mahasiswa yang tersebar di berbagai Perguruan Tinggi
                di Indonesia secara konsisten untuk mencapai Visi HIMAFURI.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ===== FAQ ===== */}
        <section className="mx-auto max-w-6xl px-6 pt-4 pb-16">
          <h2 className="font-heading mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">
            Pertanyaan Yang Sering Ditanyakan
          </h2>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="mx-auto flex max-w-3xl flex-col gap-3"
          >
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${String(index)}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                {item.answer ? (
                  <AccordionContent>{item.answer}</AccordionContent>
                ) : null}
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-footer px-6 pt-14 pb-10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-8">
          <div className="flex max-w-[360px] items-start gap-4">
            <Image
              src="/himafurilogo.png"
              alt="Logo HIMAFURI"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="font-heading mb-1 font-bold text-white">
                Himpunan Mahasiswa Furry Indonesia
              </p>
              <p className="text-xs text-footer-foreground">
                © 2026 Himpunan Mahasiswa Furry Indonesia
              </p>
            </div>
          </div>

          <nav className="min-w-[160px]">
            <h3 className="font-heading mb-3 text-sm font-bold text-white">
              Panduan
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-footer-foreground">
              <li>
                <a href="#top" className="transition-colors hover:text-white">
                  Komunitas
                </a>
              </li>
              <li>
                <a href="#top" className="transition-colors hover:text-white">
                  Peraturan &amp; Tata Tertib
                </a>
              </li>
              <li>
                <a href="#top" className="transition-colors hover:text-white">
                  Tautan Penting
                </a>
              </li>
            </ul>
          </nav>

          <nav className="min-w-[160px]">
            <h3 className="font-heading mb-3 text-sm font-bold text-white">
              Media Sosial
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-footer-foreground">
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <SiDiscord size={16} />
                  <span>Discord</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <SiInstagram size={16} />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mx-auto my-8 max-w-6xl border-t border-white/10" />

        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-3 text-sm text-footer-foreground max-[860px]:flex-col max-[860px]:items-start">
          <p className="max-w-[640px]">
            &ldquo;Pengaruh pengajaran itu umumnya memerdekakan manusia atas
            hidupnya lahir, sedang merdekanya hidup batin terdapat dari
            pendidikan.&rdquo;
          </p>
          <span className="italic whitespace-nowrap">
            &mdash; Ki Hajar Dewantara
          </span>
        </div>
      </footer>
    </>
  );
}
