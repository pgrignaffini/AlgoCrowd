import '../styles/globals.css'
import Header from '../components/Header'
import { useState } from 'react'
import { AppWrapper } from '../context/AppContext';


function MyApp({ Component, pageProps }) {

  const [account, setAccount] = useState();
  const [isAccountConnected, setIsAccountConnected] = useState(false);

  return (
    <>
      <AppWrapper account={account} isAccountConnected={isAccountConnected}>
        <Header setAccount={setAccount} setAccountIsConnected={setIsAccountConnected} account={account} isAccountConnected={isAccountConnected}/>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  )
}

export default MyApp
