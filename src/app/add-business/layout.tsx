import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Fashion Business | STYLEATLAS",
  description: "Add your fashion business to the STYLEATLAS directory. Reach new clients and showcase your portfolio.",
  alternates: {
    canonical: '/add-business'
  },
  openGraph: {
    url: '/add-business'
  }
};

export default function AddBusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
