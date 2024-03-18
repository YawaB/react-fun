import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";

const ANIMALS = ["cat", "dog", "bird"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);

  const [breeds] = useBreedList(animal);
  const handleChange = (e) => {
    setLocation(e.target.value);
  };
  useEffect(() => {
    requestpets();
  }, []);

  async function requestpets() {
    const res = await fetch(
      `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestpets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            type="text"
            onChange={handleChange}
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="location">
          Breed
          <select
            id="breed"
            disabled={breeds.length === 0}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            value={breed}
          >
            {breeds.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
export default SearchParams;
