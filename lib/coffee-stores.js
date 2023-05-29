import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCES_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
    // use backticks instead of '' otherwise it wont work
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}

export const fetchCoffeeStores = async (
  latLong = "52.1286810832076%2C5.188415254503215",
  limit = 6
) =>{
    const photos = await getListOfCoffeeStorePhotos();
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
            }, 
      };
      
      const response = await fetch(getUrlForCoffeeStores(latLong, "coffee", limit ), options);
      const data = await response.json();
      return data.results.map((result, idx) => {
        const locality = result.location.locality;
       return{
        id: result.fsq_id,
        address: result.location.address,
        name: result.name,
        locality: locality.length > 0 ? locality : "",
        imgUrl: photos.length > 0 ? photos[idx] : null,
       }
      });
};

    const  getListOfCoffeeStorePhotos = async () =>{
    const photos = await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 10,
    });

    const unsplashResults = photos.response.results
    return unsplashResults.map((result) => result.urls["small"]);

}
