const locations = require("../data/locations.json")
const { getCitiesService } = require("../services/location.service")
const getStates = async (req,res)=>{

    return res.status(200).json({
        message : "locations fetched successfully",
        states : locations.states
    })
}

const getCities = async (req,res)=>{
    const cities = await getCitiesService(req);

return res.status(200).json({
    message:"cities fetched successfully",
    cities
})
}

module.exports = {getStates, getCities}