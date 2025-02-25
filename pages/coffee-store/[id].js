// page needs to be react component
// has to export default

import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from '../../styles/coffee-store.module.css'
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/store-context";
import { isEmpty } from "../../utils";
import useSWR from "swr";
import { fetcher } from "../../utils";

// get static props
export async function getStaticProps(staticProps) {
   const params = staticProps.params;
 
   const coffeeStores = await fetchCoffeeStores();
   const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
     return coffeeStore.id.toString() === params.id; //dynamic id
   });
   return {
     props: {
       coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
     },
   };
 }

 // get static paths
 export async function getStaticPaths() {
   const coffeeStores = await fetchCoffeeStores();
   const paths = coffeeStores.map((coffeeStore) => {
     return {
       params: {
         id: coffeeStore.id.toString(),
       },
     };
   });
   return {
     paths,
     fallback: true,
   };
 }

const CoffeeStore = (initialProps) => {
    const router = useRouter();

// if not in static paths is needs to load en then it can show  the data
   if(router.isFallback){
      return <div>loading....</div>
   }

 const id = router.query.id;

 const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

 const {
   state: { coffeeStores },
 } = useContext(StoreContext);

 const handleCreateCoffeeStore = async (coffeeStore) => {
  try {
    const { id, name, voting, imgUrl, locality, address } = coffeeStore;
    const response = await fetch("/api/createCoffeeStore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        voting: 0,
        imgUrl,
        locality: locality || "",
        address: address || "",
      }),
    });

    const dbCoffeeStore = await response.json();
  } catch (err) {
    console.error("Error creating coffee store", err);
  }
};


useEffect(() => {
  if (isEmpty(initialProps.coffeeStore)) {
    if (coffeeStores.length > 0) {
      const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === id; //dynamic id
      });
      setCoffeeStore(findCoffeeStoreById);
      handleCreateCoffeeStore(findCoffeeStoreById);
    }
  } else {
    // SSG
    handleCreateCoffeeStore(initialProps.coffeeStore);
  }
}, [id, initialProps.coffeeStore, coffeeStores]);

 const { address ,name , locality, imgUrl} = coffeeStore;
 const [votingCount, setVotingCount] = useState(1);
 const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

 useEffect(() => {
  if(data && data.length > 0){
    console.log('data from swr', data);
    setCoffeeStore(data[0]);

    setVotingCount(data[0].voting)
  }
 }, [data]);

 const handleUpvoteButton = async () => {
   console.log('clicked');

   try {
    const response = await fetch("/api/favouriteCoffeeStoreById", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const dbCoffeeStore = await response.json();
    if(dbCoffeeStore && dbCoffeeStore.length > 0){
        let count = votingCount + 1;
        setVotingCount(count);
    }
  } catch (err) {
    console.error("error upvoting the coffeeStore", err);
  }
 }
 if(error){
  return <div>Something went wrong retrieving this page</div>
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
         <p className={styles.text}>{votingCount}</p>
      </div>
      <button className={styles.upvoteButton} onClick={handleUpvoteButton}>up vote</button>
 </div>
 </div> 
 </div>
 );
};

export default CoffeeStore;