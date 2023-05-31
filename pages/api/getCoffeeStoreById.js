const getCoffeeStoryById = (req, res) => {
    const {id} = req.query;

    try{
        res.json({message: `id is created ${id}`});

    }catch(error){
        res.status(500)
        .json({message: "something went wrong", error});
    }
};

export default getCoffeeStoryById;