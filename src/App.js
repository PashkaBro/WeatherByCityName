import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import forecast from './Forecast'

function App(props) {

    const [todo, setTodo] = useState();
    const [input, setInput] = useState();

    function ClearFields() {
        document.getElementById("textfield1").value = "";
    }

    function FormatedData(n) {
        let res = n.data.main.temp - 273.15;
        let cast = n.data.weather[0].main;
        setTodo(
            <div className='Resp'>
                <div>  {`Current weather in ${input[0].toUpperCase() + input.substring(1, input.length)} :`}
                </div>
                {forecast[cast]}
                {Math.round(res)}
                <img width={50} height='auto' className="mr-3"
                     src="https://cdn3.iconfinder.com/data/icons/meteocons/512/celsius-512.png"
                     alt="Generic placeholder"/>
            </div>);
    }

    const todoInput = (n) => {
        setInput(n.target.value)
    };

    const axios = require('axios');

    const getTodos = () => {

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=23115c617732be5077c954f6e8f4d9e6`)
            .then(function (response) {
                FormatedData(response);
                console.log(response);
            })
            .catch(function (error) {
                setTodo(<div>
                    Please enter real City
                </div>);
                console.log(error);
            });

        ClearFields()
    };

    return (

        <div className="App">
            <br/>
            <input id='textfield1' type='text' autoFocus={true} placeholder='Enter city' onChange={todoInput}/>
            <button type="button" className="btn btn-success" onClick={getTodos}> Get Weather</button>
            {todo}
        </div>

    );
}

export default App;
