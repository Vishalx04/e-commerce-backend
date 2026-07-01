const locations = require("../data/locations.json");
const { BadRequestError } = require("../errors");

const validateState=(state)=>{
    const stateExists = locations.states.find(s=>{
        return s.name.toLowerCase() === state.toLowerCase()
    });

    if(!stateExists){
        throw new BadRequestError("Invalid state");
    }

    return stateExists;
}

const validateCity=(city, stateId)=>{
    const cityExists = locations.cities.find(c=>{
        return c.name.toLowerCase() === city.toLowerCase() && c.stateId === stateId
    })

    if(!cityExists) {
        throw new BadRequestError("Invalid city");
    }

    return cityExists;
}






module.exports = {validateState, validateCity}