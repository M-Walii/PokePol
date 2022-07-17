import React, { useState } from "react";
import './App.css';
import { NavLink } from "react-router-dom";
import axios from "axios";

function QuestionGen() {

  //Setting States//
  const [pokemon, setPokemon] = useState('')
  const [pokemonQuestion, setPokemonQuestion] = useState([])
  const [abilities, setAbilities] = useState([])


//check wheather pokemon choose by name or choose randomly//
  const SubmitHandler = async () => {

    if (pokemon === '') {

      await axios.get(`https://pokeapi.co/api/v2/pokemon/`, {

      })
        .then((response) => {
          console.log(response);
          const random = Math.floor(Math.random() * 20)
          const RandomPokemon = response.data.results[random].name
          console.log(random);
          console.log(RandomPokemon)
          setPokemon(RandomPokemon)
          axios.get(`https://pokeapi.co/api/v2/pokemon/${RandomPokemon}`, {

          })
            .then((response) => {
              console.log(response);

              setPokemonQuestion(response.data.abilities)

              var abilities = []

              response.data.abilities.forEach(element => {
                abilities.push(element.ability.name)
              });

              console.log(abilities)
              setAbilities(abilities)

            }, (error) => {
              console.log(error);
            });


        }, (error) => {
          console.log(error);
        });

    }
    else {


      console.log(pokemon)
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {

      })
        .then((response) => {
          console.log(response);

          setPokemonQuestion(response.data.abilities)

          var abilities = []

          response.data.abilities.forEach(element => {
            abilities.push(element.ability.name)
          });

          console.log(abilities)
          setAbilities(abilities)

        }, (error) => {
          console.log(error);
        });
    }

  }

//Sumit to poll//
  const SubmitPol = () => {
    var body = {
      "question": "What is the abilty of " + pokemon,
      "choices": abilities
    }
    axios.post('https://polls.apiblueprint.org/questions?page=1', body)
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }

  //Get Pokemon Ability//
  const pokemonQuestionMap = (
    <>
      {pokemonQuestion.map((pokemonQ, index) =>
        <div className="gen_question" key={index}>
          <b>{pokemonQ.ability.name}</b>
          <br></br>
        </div>
      )}
    </>
  );

  return (
    <>
          <div className="main_div"> 
         
          <div><h4 className="questionheading" >New Pokemon Pol</h4></div>


        </div>
    </>

  );
}

export default QuestionGen;
