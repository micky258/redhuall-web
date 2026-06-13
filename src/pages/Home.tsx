import Hero from "../components/Hero";
import { About, Products, Services, WorksPreview, MaintenanceBanner } from "../components/Sections";
import { Contact } from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Services />
      <WorksPreview />
      <MaintenanceBanner />
      <Contact />
    </>
  );
}
