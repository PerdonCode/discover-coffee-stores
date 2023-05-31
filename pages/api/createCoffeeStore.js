import { table, getMinifiedRecords } from "../../lib/airtable";

const createCoffeeStore = async (req, res) =>{   
        if(req.method ==="POST"){
            // find a record
            const{id, name, locality, address, imgUrl, voting} = req.body;
        try{  
            if(id){
                const findCoffeeStoreRecords = await table.select({
                    filterByFormula: `id=${id}`,
                    }).firstPage(); 
                if(findCoffeeStoreRecords.length !== 0){
                    const records = getMinifiedRecords(findCoffeeStoreRecords);
                    res.json(records);
                }else{
                    // create record
                    if(name){
                        const createRecords = await table.create([
                        {
                            fields: {
                                id,
                                name,
                                address,
                                locality,
                                voting,
                                imgUrl
                            },
                        },
                    ]);
                    const records = getMinifiedRecords(createRecords);
                    res.json(records);
                    }else{
                        res.status(400);
                        res.json({message: "name is missing"});
                    }
            } 
            }else{
                res.status(400);
                res.json({message: "id is missing"});
            }
    }catch(err){
       console.error("error creating or finding store", err);
       res.status(500);
       res.json({message: "error creating or finding store", err});
    }
    }
};
export default createCoffeeStore;