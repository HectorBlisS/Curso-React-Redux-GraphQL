import React from 'react';
import Card from '../card/Card';
import styles from './home.module.css';
import { connect } from 'react-redux';

function Home({characters}) {
    
    function renderCharacter() {
        let char = characters[0]
        return (<Card {...char} />)
    };

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        characters: state.characters.array
    }
}

export default connect(mapStateToProps)(Home)