import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import axios from 'axios'

let URL = "https://rickandmortyapi.com/api"

export default function Home() {

    let [chars, setChars] = useState([])

    useEffect(() => {
        getCharacters()
    }, [])

    function nextChar() {
        chars.shift()
        if (!chars.length) {
            //get more characters
        }
        setChars([...chars])
    }

    function renderCharacter() {
        let char = chars[0]
        return (
            <Card leftClick={nextChar} {...char} />
        )
    }

    function getCharacters() {
        return axios.get(`${URL}/character`)
            .then(res => {
                setChars(res.data.results)
            })
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}