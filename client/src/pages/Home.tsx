import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Dashboard from "@/components/sections/Dashboard";
import Solutions from "@/components/sections/Solutions";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Set title
    document.title = "DataCanvas - Build Custom Dashboards & Reports";
    
    // Add Google fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@300;400;500&family=IBM+Plex+Mono&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Dashboard />
      <Solutions />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
