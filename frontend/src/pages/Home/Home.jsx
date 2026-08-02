import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Donate from "./Donate";
import FAQPreview from "./FAQPreview";
import Hero from "./Hero";
import Stats from "./Stats";

const Home = () => {
  return (
    <div className="bg-secondary">
      <Navbar />
      <Hero />
      <Stats />
      <FAQPreview />
      <Donate />
      <Footer />
    </div>
  );
};

export default Home;
