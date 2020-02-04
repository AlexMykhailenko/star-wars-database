export default class SwapiService {

    _apiBase = 'https://swapi.co/api';
    _imageBase = 'starwars-visualguide.com/assets/img';

    getRecource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`, { mode: 'cors' });
        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}${url}, received ${res.status}`);
        };
        return await res.json()
    };

    getAllPeople = async () => {
        const res = await this.getRecource(`/people/`);
        return res.results.map(this._transformPerson);
    };

    getPerson = async (id) => {
        const person = await this.getRecource(`/people/${id}`)
        return this._transformPerson(person);
    };

    getAllPlanets = async () => {
        const res = await this.getRecource(`/planets/`);
        return res.results.map(this._transformPlanet);
    };

    getPlanet = async (id) => {
        const planet = await this.getRecource(`/planets/${id}`);
        return this._transformPlanet(planet);
    };

    getAllStarships = async () => {
        const res = await this.getRecource(`/starships/`);
        return res.results.map(this._transformStarschip);
    };

    getStarship = async (id) => {
        const starship = await this.getRecource(`/starships/${id}`);
        return this._transformStarschip(starship);
    };

    getPersonImage = ({ id }) => {
        return `https://${this._imageBase}/characters/${id}.jpg`
    };

    getStarshipImage = ({ id }) => {
        return `https://${this._imageBase}/starships/${id}.jpg`
    };

    getPlanetImage = ({ id }) => {
        return `https://${this._imageBase}/planets/${id}.jpg`
    };

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    };

    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        };
    };

    _transformStarschip = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity
        };
    };

    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    };
};
