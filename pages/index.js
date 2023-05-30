'use client';
import Head from 'next/head'
import Banner from '../components/banner'
import Image from 'next/image';
import Card from '../components/card';
import styles from "../styles/Home.module.css";
import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../hooks/use-track-location';
import { useEffect, useState, useContext } from 'react';
import {ACTION_TYPES, StoreContext } from '../store/store-context';


export default function Home(props) {
  const{ handleTrackLocation, locationErrorMsg, isFindingLocation} = useTrackLocation();

  //const [coffeeStores, setCoffeeStores] = useState('');
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);
  const {dispatch, state} = useContext(StoreContext);
  const {coffeeStores, latLong} = state;

  // get location and set location
  useEffect(() => {
    async function setCoffeeStoresByLocation() {
          if (latLong) {
            try{
              const response = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=6`);
              const coffeeStores = await response.json();
              //setCoffeeStores(fetchedCoffeeStores);
              // set coffee stores
              dispatch({
                type: ACTION_TYPES.SET_COFFEE_STORES,
                payload: {
                  coffeeStores,
                },
              }); 
              
            }catch(error){
              // set error
              setCoffeeStoresError(error.message);
            }
        }
    }
     
    setCoffeeStoresByLocation();
    },[latLong])
    
  const handleOnBannerBtnClick =  () => {  
     handleTrackLocation();

    console.log({latLong, locationErrorMsg});
  };
  return (
    <div className={styles.container}>
      <Head>
        <title> Coffee Connoisseur</title>
      </Head>

      <main className={styles.main}>
       <Banner buttonText ={isFindingLocation ? "Locating..." : "View stores nearby" } handleOnClick={handleOnBannerBtnClick} />
      {coffeeStoresError && <p>Something went wrong: {locationErrorMsg}</p>}
       <div className={styles.heroImage}>
        <Image src="/static/hero-image.png" width={700} height={400}></Image>
       </div>
      {coffeeStores.length > 0 && (
        <>
          <h2 className={styles.heading2}>Stores near me</h2>
          <div className={styles.cardLayout}>
          {coffeeStores.map((CData) =>{
          return(<Card key={CData.id} name={CData.name} imgUrl={CData.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}  href={`/coffee-store/${CData.id}`} alt={CData.alt} className={styles.card}/>); 
        })}
        </div>
        </>
      )}     

      {props.coffeeStores.length > 0 && (
        <>
          <h2 className={styles.heading2}>Bilthoven</h2>
          <div className={styles.cardLayout}>
          {props.coffeeStores.map((CData) =>{
          return(<Card key={CData.id} name={CData.name} imgUrl={CData.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}  href={`/coffee-store/${CData.id}`} alt={CData.alt} className={styles.card}/>); 
        })}
        </div>
        </>
      )} 
      </main> 
    </div>
  )
}

export async function getStaticProps() {
  // api should not be called in staticProps
  //your API route is not available until your Next app is built and getStaticProps runs at build time. Therefore the API route would not be available to populate the data during the build.
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    },
  };
}