const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY);

const table = base('coffeeStores');

console.log({table});

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
                    const records = findCoffeeStoreRecords.map((record) =>{
                    return{
                        ...record.fields
                    };
                });
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
                    const records = createRecords.map((record) =>{
                        return{
                            ...record.fields,
                        };
                    });
                    res.json({records});
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
       console.error("error finding store", err);
       res.status(500);
       res.json({message: "error finding store", err});
    }
    }
};
export default createCoffeeStore;