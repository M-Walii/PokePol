import React, { useEffect, useState } from "react";
import './App.css';
import { NavLink } from "react-router-dom";
function App() {

  //set state for question////  
const [questions, setQuestions] = useState([]);

//Api Calling////
useEffect(() => {
    axios.get('https://polls.apiblueprint.org/questions?page=1', {

    })
      .then((response) => {
        console.log(response.data);
        setQuestions(response.data)
      }, 
        (error) => {
        console.log(error);
      });
  }, []);
  
//Store Data of Poll//
  const question = (
    <>
      {questions.map((question) =>
          < >
            <div className="question" key={question.published_at}>
            <div><b>{question.question + "?"}</b>
            <br></br>
            <b className="font">Published on:</b> <span className="font">{dateFormat(question.published_at,'dd-MM-yyyy')} </span>
            <br></br>
            <b className="font">Questions:</b> <span className="font">{question.choices.length}</span></div>
            
          </div>
          </>

      )}
</>
  );

  //Converting Date Formate//
  function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();    

    //replace the month
    format = format.replace("MM", month.toString().padStart(2,"0"));        

    //replace the year
    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2,2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2,"0"));

    return format;
}


  return (

    <div> 
       
          <h4 className="heading">PokePol</h4>
        
        </div>
  );
}

export default App;
