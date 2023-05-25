'use client';
import Head from 'next/head'
import Banner from '../components/banner'
import Image from 'next/image';
import Card from '../components/card';
import styles from "../styles/Home.module.css";
import coffeeData from "../pages/data/coffee-store-data.json"


export default function Home(props) {
  console.log("props", props);
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
      {coffeeData.length > 0 && (
        <>
          <h2 className={styles.heading2}>Toronto stores</h2>
          <div className={styles.cardLayout}>
          {props.coffeeData.map((CData) =>{
          return(<Card key={CData.id} name={CData.name} imgUrl={CData.imgUrl}  href={`/coffee-store/${CData.id}`} alt={CData.alt} className={styles.card}/>); 
        })}
        </div>
        </>
      )} 
      </main> 
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      coffeeData,
    },
  };
}