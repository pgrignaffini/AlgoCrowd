import '../styles/globals.css'
import Header from '../components/Header'
import {useState} from 'react'
import {AppWrapper} from '../context/AppContext';
import Footer from '../components/Footer';

import {ToastProvider, useToasts} from 'react-toast-notifications';

const FormWithToasts = () => {
    const {addToast} = useToasts();

    const onSubmit = async value => {
        const {error} = await dataPersistenceLayer(value);

        if (error) {
            addToast(error.message, {appearance: 'error'});
        } else {
            addToast('Saved Successfully', {appearance: 'success'});
        }
    };

    return <form onSubmit={onSubmit}>...</form>;
};

function MyApp({Component, pageProps}) {

    return (
        <>
            <AppWrapper>
                <ToastProvider>
                    <Header/>
                    <Component {...pageProps} />
                    <Footer/>
                </ToastProvider>
            </AppWrapper>
        </>
    )
}

export default MyApp
