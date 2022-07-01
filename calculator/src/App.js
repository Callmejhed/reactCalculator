import "./App.css";
import {React, useState} from "react"

export default function App() {
    const [calc, setCalc] = useState("")
    const [result, setResult] = useState("")
    const operators = [".", "-", "+", "*", "/"]
    
    //This function creates all the numbers except 0 because i was too lazy to type them all
    function createNumbers(){
        const numbers = []
        for (let i=1; i<10; i++){
            numbers.push(
                <button 
                key={i}
                onClick={()=>updateCalc(i.toString())}>
                    {i}
                </button>
            )
        }
        return numbers
    }

    //This function displays the values being typed in. Basically the problem/equation 
    function updateCalc(value){
        //This if statement is basically saying if (if the value we just entered is an operator and there is no calculation) or (the value we just entered is an operator and the last value we entered is also an operator) then return (i.e don't let anything happen) else append value to calc
        if (
            (operators.includes(value) && calc === "") || 
            (operators.includes(value) && operators.includes(calc.slice(-1)))
            )
        {
            return
        }
        setCalc(calc + value)
        //The thing just updates the result anytime we type anything
        //It also does BODMAS wahala for me so thats a bonus
        //I had to use ```(calc + value)``` because the actual value of calc wouldn't be accurate until the next re-render
        //The ```.toString()``` isn't really necessary since i'm already passing just strings into the function but it's for sanity sake
        if(!operators.includes(value)){
            setResult(eval(calc + value).toString())
        }
    }

    function calculate(){
        setCalc(eval(calc.toString()))
    }
    
    //This removes the last item in the calc array basically becoming a backspace key
    function backSpace(){
        //The if statement checks if the calc value is empty first to prevent errors in the console
        if(calc === ""){
            return
        }
        const value = calc.slice(0, -1)
        setCalc(value)
    }

    // const possibleInputs = [
    //     "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/"
    // ]

    //This function works as a clear screen key
    function clearScreen(){
        //I'm not too sure about this one but i think it should loop through string calc then each time it loops remove the first element in the string. Then reset the calc variable each time
        if (calc == '')
        {
            return
        }
        for (i=0; i<calc.length; i++){
            const value = calc.slice(1)
            setCalc(value)
        }
    }


    return (
        <>
            <div className="screen">
                {result ? <span>({result})</span>: " "}{calc || 0}
            </div>

            <div className="keypad">
            <div className="operators">
                <button onClick={() => updateCalc("+")}>+</button>
                <button onClick={() => updateCalc("-")}>-</button>
                <button onClick={() => updateCalc("/")}>/</button>
                <button onClick={() => updateCalc("*")}>*</button>
                <button onClick={backSpace}>DEL</button>
                <button onClick={clearScreen}>AC</button>
            </div>
            <div className="numbers">
                {createNumbers()}
                <button onClick={() => updateCalc(".")}>.</button>
                <button onClick={() => updateCalc("0")}>0</button>
                <button onClick={calculate}>=</button>
            </div>
        </div>
        </>
    );
}