import React, { useState } from "react";
import './App.css';
import { NavLink } from "react-router-dom";
import {
  Button
} from "reactstrap";
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

         <div className="que_div"> 
         <input 
         type='text'
         placeholder="Enter Pokemon Name.."
         onChange={e => setPokemon(e.target.value)} />
        
        <Button size="sm"
         className="que_button" 
         onClick={SubmitHandler}>Generate Poll</Button>
        </div> 
        <br></br>

        {pokemon === '' ? null : 
        <center>
        <h2 className="questionheading">What is the Ability of {pokemon} ?</h2>
        </center>} 
        
        <div className="poll_columns">{pokemonQuestionMap}</div>    
        <center>
        <NavLink to="/">
        <Button size="sm" 
         className="poll_button">
         Back to Poll 
        </Button>
        </NavLink>
        
        {pokemon === '' ? null :
        <Button size="sm" 
          onClick={SubmitPol}>
          Submit Poll
        </Button>}
        </center>
        </div>
    </>

  );
}

export default QuestionGen;
