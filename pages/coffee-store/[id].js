// page needs to be react component
// has to export default

import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from '../../styles/coffee-store.module.css'
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";


export async function getStaticProps({params}){
   const coffeeStores = await fetchCoffeeStores();
   console.log("data", coffeeStores);

    return{
      props: {
         CoffeeStore: coffeeStores.find((coffeeStore) => {
            return coffeeStore.id.toString() === params.id; //dynamic id
           
         })
      }
   }
}

export async function getStaticPaths(){
   // paths dynamic
   const coffeeStores = await fetchCoffeeStores();
   const paths = coffeeStores.map(coffeeStore =>{
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
 const { address ,name , locality, imgUrl} = props.CoffeeStore;

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
    
    <Image src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} width={600} height={360} className={styles.storeImg} alt={name} />
    </div>
    <div className={cls("glass", styles.col2)}>
       {/* check for address then show */} 
      {address&& (
         <div className={styles.iconWrapper}>
         <Image src="/static/icons/places.svg" width={24} height={24} alt="icon"/>
         <p className={styles.text}>{address}</p>
      </div>
      )}
      {/* check for locality then show */} 
      {locality && (
         <div className={styles.iconWrapper}>
         <Image src="/static/icons/nearMe.svg" width={24} height={24} alt="icon" />
         <p className={styles.text}>{locality}</p>
      </div>
      )}
      
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