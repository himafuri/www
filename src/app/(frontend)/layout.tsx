import type { ReactNode } from "react";
import "./styles.css";

export const metadata = {
  description:
    "Website Resmi Himpunan Mahasiswa Furry Indonesia — Persekutuan Mahasiswa Furry Indonesia dari berbagai macam perguruan tinggi.",
  title: "HIMAFURI",
};

interface RootLayoutProps {
  children: ReactNode;
}

const themeScript = `try{if(localStorage.theme==='dark'||(!('theme' in localStorage)&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(_){}`;

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
