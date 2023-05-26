const getUrlForCoffeeStores = (latLong, query, limit) => {
    // use backticks instead of '' otherwise it wont work
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}

export const fetchCoffeeStores = async () =>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.FOURSQUARE_API_KEY,
            }, 
      };
      
      const response = await fetch(getUrlForCoffeeStores("52.1286810832076%2C5.188415254503215", "coffee", 6 ), options);
      const data = await response.json();
      return data.results;
};
