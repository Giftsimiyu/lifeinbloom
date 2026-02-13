'use client';

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import ConsentBanner from "./consentBanner";

export default function NavbarFooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <>
      {!isLandingPage && <Navbar />}
      {children}
      {!isLandingPage && <Footer />}
      <ConsentBanner />
    </>
  );
}
