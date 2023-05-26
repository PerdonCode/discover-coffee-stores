'use client';
import Head from 'next/head'
import Banner from '../components/banner'
import Image from 'next/image';
import Card from '../components/card';
import styles from "../styles/Home.module.css";
import coffeeData from "../pages/data/coffee-store-data.json"
import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../hooks/use-track-location';


export default function Home(props) {
  const{ handleTrackLocation, latLong, locationErrorMsg, isFindingLocation} = useTrackLocation();

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
      {locationErrorMsg}
       <div className={styles.heroImage}>
        <Image src="/static/hero-image.png" width={700} height={400}></Image>
       </div>
      {props.coffeeStores.length > 0 && (
        <>
          <h2 className={styles.heading2}>Toronto stores</h2>
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
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    },
  };
}