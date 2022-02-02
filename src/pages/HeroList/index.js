import React from 'react';
// css
import "./styles.css"

const HeroList = ({allHeros}) => {

    const Heros = () => {
        return (
            <div id="hero-container">
                {
                    allHeros.map(hero => (
                        <div className="card"  key={hero.id}>
                            <img src={hero.images.sm} className="card-img-top" alt="hero-pic"/>
                            <div className="card-body">
                                <h5 className="card-title">{hero.name}</h5>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
    console.log(allHeros)
    return (
        <div>
            <Heros />
        </div>
    );
}

export default HeroList;
