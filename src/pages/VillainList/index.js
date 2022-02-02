import React from 'react';
// css
import "./styles.css"

const VillainList = ({ allVillains }) => {

    const Villains = () => {
        return (
            <div id="villain-container">
                {
                    allVillains.map(villain => (
                        <div className="card"  key={villain.id}>
                            <img src={villain.images.sm} className="card-img-top" alt="villain-pic"/>
                            <div className="card-body">
                                <h5 className="card-title">{villain.name}</h5>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
    console.log(allVillains)

    return (
        <div>
            <Villains />
        </div>
    );
}

export default VillainList;
