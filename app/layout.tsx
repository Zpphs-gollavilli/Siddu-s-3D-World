import { montserrat, poppins } from "@/constant/font";
import "./globals.css";
import Navbar from "../components/Navbar";
import Script from "next/script";
import FloatingVideoLogo from "@/components/FloatingVideoLogo";   // ⬅️ added

export const metadata = {
  title: "Siddu's 3D World",
  description: "G Siddharth 3D Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tawkUrl = process.env.NEXT_PUBLIC_TAWKTO_URL;

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable} lg:overflow-x-hidden`}
    >
      <body>
        <Navbar />
        <FloatingVideoLogo />   {/* ⬅️ added — nothing else changed */}
        {children}

        {/* ✅ Tawk.to Live Chat Script from env */}
        {tawkUrl && (
          <Script id="tawk-to-delay" strategy="afterInteractive">
            {`
      setTimeout(function () {
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        var s1 = document.createElement("script");
        s1.async = true;
        s1.src = '${tawkUrl}';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        document.body.appendChild(s1);
      }, 12000); // 12 seconds delay
    `}
          </Script>
        )}

      </body>
    </html>
  );
}
