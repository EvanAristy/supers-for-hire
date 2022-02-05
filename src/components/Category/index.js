import React, { useEffect, useState } from 'react';

const Category = ({ allHeros }) => {

    const [average, setAverage] = useState('')
    const [catA, setCatA] = useState([])
    const [catB, setCatB] = useState([])
    const [catC, setCatC] = useState([])
    // const good = response.data.filter(superHero => superHero.biography.alignment === 'good')
    // const minor = allHeros.map(power =>power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength)
    // setAverage(blah) 


    useEffect(() => {
        try {
            const minor = allHeros.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength < 200 ) 
                setCatA(minor)
            
            const urgent = allHeros.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 200  < 400 )  
                setCatB(urgent)

            const priority = allHeros.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 500 )    
                setCatC(priority) 

        } catch (error) {
            console.log(error)
        }
    }, [])

    console.log('minor', catA)
    console.log('urgent', catB)
    console.log('priority', catC)
    // console.log(average)
    // const handlePageClick = (e) => {
    //     const selectedPage = e.selected;
    //     setOffset((selectedPage + 1) * perPage)
    // }

    // console.log(allHeros)
    return (
        
        
            <select className="form-select" aria-label="Default select example">
                <option defaultValue>All</option>
                <option value={catA} >Category One: break-in/robbery</option>
                <option value={catB}>Category Two: heist/rescue</option>
                <option value={catC}>Category Three: natural disaster/super villain terrorist/world-ending</option>
            </select>
        
    );
}

export default Category;
