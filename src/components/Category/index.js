import React, { useEffect, useState } from 'react';

const Category = ({ allHeros }) => {

    const [average, setAverage] = useState('')

    useEffect(() => {
        const fetchAverage = async () => { 
            const blah = allHeros.map(power =>power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength)
            setAverage(blah) 
        } 
        fetchAverage()
    }, [])
    console.log(average)
    // const handlePageClick = (e) => {
    //     const selectedPage = e.selected;
    //     setOffset((selectedPage + 1) * perPage)
    // }

    // console.log(allHeros)
    return (
        
        
            <select className="form-select" aria-label="Default select example">
                <option defaultValue>All</option>
                <option value="0-200">Category One: break-in/robbery</option>
                <option value="200-400">Category Two: heist/rescue</option>
                <option value="400+">Category Three: natural disaster/super villain terrorist/world-ending</option>
            </select>
        
    );
}

export default Category;
