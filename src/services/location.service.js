const locations = require("../data/locations.json");

const getCitiesService = async (req) => {
    const stateId = Number(req.params.stateId);

    const state = locations.states.find(
        state => state.id === stateId
    );

    if (!state) {
        throw new NotFoundError("State not found");
    }

    const cities = locations.cities.filter(
        city => city.stateId === stateId
    );

    return cities;
};

module.exports = {getCitiesService}