// exported by default
// every file has its own function
// file needs to be a function
import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {

    // confige latlong and limit
    try{
        const {latLong, limit} = req.query;
         const response = await fetchCoffeeStores(latLong, limit);

         res.status(200);
         res.json(response);
    } catch(err){
        console.error('there is an error', err)
        res.status(500);
        res.json({message: 'something went wrong', err});
    }
    

    // return 
}

export default getCoffeeStoresByLocation;