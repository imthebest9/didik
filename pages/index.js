import NavBar from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import MainLayout from '../layout/MainLayout';
import Head from 'next/head';
import CardSlider from '../components/CardSlider';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { getAuth } from 'firebase/auth';
import nookies from 'nookies';

export default function Home({ service }) {
  //const { user } = useUser();
  const auth = getAuth();
  
  return (
    <>
      <NavBar />
      <MainLayout>
        <HeroBanner />
        <CardSlider />
        <CTA />
        <Footer />
      </MainLayout>
    </>
  );
}
