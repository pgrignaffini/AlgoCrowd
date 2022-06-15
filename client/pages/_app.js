import '../styles/globals.css'
import Header from '../components/Header'
import { useState } from 'react'
import { AppWrapper } from '../context/AppContext';
import Footer from '../components/Footer';


function MyApp({ Component, pageProps }) {

  const [account, setAccount] = useState();
  const [isAccountConnected, setIsAccountConnected] = useState(false);

  return (
    <>
      <AppWrapper account={account} isAccountConnected={isAccountConnected}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AppWrapper>
    </>
  )
}

export default MyApp
