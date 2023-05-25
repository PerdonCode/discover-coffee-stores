// page needs to be react component
// has to export default

import Link from "next/link";
import { useRouter } from "next/router";
import CoffeeStoreData from "../data/coffee-store-data.json"
import Head from "next/head";
import styles from '../../styles/coffee-store.module.css'
import Image from "next/image";
import cls from "classnames";


export function getStaticProps({params}){
    console.log('params', params);
    return{
      props: {
         CoffeeStore: CoffeeStoreData.find((coffeeStore) => {
            return coffeeStore.id.toString() === params.id; //dynamic id
           
         })
      }
   }
}

export function getStaticPaths(){
   // paths dynamic
   const paths = CoffeeStoreData.map(coffeeStore =>{
      return {
         params:{
            id: coffeeStore.id.toString(),
         }
      }
   })
   return{
      paths,
      fallback: true,
   };
}

const CoffeeStore = (props) => {
    const router = useRouter();

// if not in static paths is needs to load en then it can show  the data
   if(router.isFallback){
      return <div>loading....</div>
   }
 const {address ,name , neighbourhood, imgUrl} = props.CoffeeStore;

 const handleUpvoteButton = () => {
   console.log('clicked');
 }
 return (
    <div> 
      <Head>
         <title>{name}</title>
      </Head>
      <div className={styles.container}>
      <div className={styles.col1}>
         <div className={styles.backToHomeLink}>
            <Link href="/"> go back to homepage</Link>
         </div>
         <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
         </div>
    
    <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name} />
    </div>
    <div className={cls("glass", styles.col2)}>
      <div className={styles.iconWrapper}>
         <Image src="/static/icons/places.svg" width={24} height={24} alt="icon"/>
         <p className={styles.text}>{address}</p>
      </div>
      <div className={styles.iconWrapper}>
         <Image src="/static/icons/nearMe.svg" width={24} height={24} alt="icon" />
         <p className={styles.text}>{neighbourhood}</p>
      </div>
      <div className={styles.iconWrapper}>
         <Image src="/static/icons/star.svg" width={24} height={24}  alt="icon"/>
         <p className={styles.text}>1</p>
      </div>
      <button className={styles.upvoteButton} onClick={handleUpvoteButton}>up vote</button>
 </div>
 </div> 
 </div>
 );
};

export default CoffeeStore;