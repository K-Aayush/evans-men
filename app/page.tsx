import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import SearchOverlay from "@/components/SearchOverlay";
import CartDrawer from "@/components/CartDrawer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StatementSection from "@/components/StatementSection";
import CampaignSection from "@/components/CampaignSection";
import FeaturedProduct from "@/components/FeaturedProduct";
import ProductRail from "@/components/ProductRail";
import CategoryReveal from "@/components/CategoryReveal";
import Lookbook from "@/components/Lookbook";
import ShopTheLook from "@/components/ShopTheLook";
import FullscreenCampaign from "@/components/FullScreenCampaign";
import NewArrivals from "@/components/NewArrivals";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <main>
        <Hero />
        <Marquee />
        <StatementSection />
        <CampaignSection />
        <FeaturedProduct />
        <ProductRail />
        <CategoryReveal />
        <FullscreenCampaign />
        <Lookbook />
        <ShopTheLook />
        <NewArrivals />
      </main>
      <Footer />
    </>
  );
}
