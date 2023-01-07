import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleChangeType(newType){
    setFilters({ type: newType })
  }

  function handleFindPets(){
    if (filters.type === "all"){
      fetch('http://localhost:3001/pets')
      .then(res => res.json())
      .then(petData => setPets(petData))}
    else if (filters.type === "cat"){
      fetch('http://localhost:3001/pets?type=cat')
      .then(res => res.json())
      .then(petData => setPets(petData))}
    else if (filters.type === "dog"){
      fetch('http://localhost:3001/pets?type=dog')
      .then(res => res.json())
      .then(petData => setPets(petData))}
    else if (filters.type === "micropig"){
      fetch('http://localhost:3001/pets?type=micropig')
      .then(res => res.json())
      .then(petData => setPets(petData))}
    }

  function handleAdopt(id){
    fetch(`http://localhost:3001/pets/${id}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "isAdopted": true
      })
  })
    .then(res => res.json())
    .then(updatedPet => {
      const newPets = pets.filter(pet => pet !== updatedPet)
      setPets([...newPets, updatedPet])
    })
    }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onFindPetsClick={handleFindPets} onChangeType={handleChangeType}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdopt}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
