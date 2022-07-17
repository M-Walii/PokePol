import React from "react";
import './App.css';
import axios from "axios";
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

  return (

    <div> 
       
          <h4 className="heading">PokePol</h4>
        
        </div>
  );
}

export default App;
