import '../styles/globals.css'
import Header from '../components/Header'
import { useState } from 'react'
import { AppWrapper } from '../context/AppContext';
import Footer from '../components/Footer';


function MyApp({ Component, pageProps }) {

  return (
    <>
      <AppWrapper>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AppWrapper>
    </>
  )
}

export default MyApp
