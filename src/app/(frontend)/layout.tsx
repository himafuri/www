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

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
