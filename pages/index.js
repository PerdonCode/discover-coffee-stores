'use client';
import Head from 'next/head'
import Banner from '../components/banner'
import Image from 'next/image';
import Card from '../components/card';
import styles from "../styles/Home.module.css";


export default function Home() {
  const handleOnBannerBtnClick = () => {  
    console.log("hi button clicked");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title> Coffee Connoisseur</title>
      </Head>

      <main className={styles.main}>
       <Banner buttonText ="View stores nearby" handleOnClick={handleOnBannerBtnClick} />
       <div className={styles.heroImage}>
        <Image src="/static/hero-image.png" width={700} height={400}></Image>
       </div>
       <div classname={styles.cardLayout}>
        <Card name={'amsterdamse coffee'} imgUrl="/static/hero-image.png" href="/coffee-store/amsterdamse-coffee" className={styles.card}/>
       </div>
      </main> 
    </div>
  )
}