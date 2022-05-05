import { useState } from 'react'

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState(['hello', 'ninja']) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)

    // format a guess into an array of letter objects
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        const solutionArray = [...solution]
        const formattedGuess = [...currentGuess].map((l, i) => {
            const letter = { key: l, color: 'grey' }

            if (solutionArray[i] === l) {
                letter.color = 'green'
                solutionArray[i] = null
            } else if (solutionArray.includes(l)) {
                letter.color = 'yellow'
                solutionArray[solutionArray.indexOf(l)] = null
            }

            return letter
        })

        console.log('solution', solution)
        console.log('formattedGuess', formattedGuess)
        return formattedGuess
    }

    // adds a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add 1 to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) setIsCorrect(true)
        setGuesses(prevGuesses => {
            const newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory(prevHistory => [...prevHistory, currentGuess])
        setTurn(prevTurn => prevTurn + 1)
        setCurrentGuess('')
    }

    // handle a keyup event & track current guess
    // if user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            if (turn > 5) {
                console.log('Turn is less than 5')
                return
            }

            if (history.includes(currentGuess)) {
                console.log("You have already attempted this guess")
                return
            }

            if (currentGuess.length !== 5) {
                console.log('Please enter five letters')
                return
            }

            return addNewGuess(formatGuess())
        }

        if (key === 'Backspace') {
            return setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
                console.log(key)
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, handleKeyup }
}

export default useWordle
