import {findRecordByFilter } from "../../lib/airtable";
const getCoffeeStoreById = async (req, res) => {
    const {id} = req.query;
    try{
        if(id){
            // without await it returns an empty object
            const records =  await findRecordByFilter(id);
          if (records.length !== 0) {
            res.json(records);
          } else {
            res.json({ message: `id could not be found` });
          }
        }else{
            res.status(400)
            .json({message: "id is missing"});
        }
       
    }catch(error){
        res.status(500)
        .json({message: "something went wrong", error});
    }
};

export default getCoffeeStoreById;