// import React, { useEffect, useState } from 'react';

// const Category = ({ allHeros, currHeros }) => {

//     const [average, setAverage] = useState('')
//     const [catA, setCatA] = useState([])
//     const [catB, setCatB] = useState([])
//     const [catC, setCatC] = useState([])

//     useEffect(() => {
//         const chooseCat = async () => {
//             const minor = allHeros.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength < 200 ) 
//                 setCatA(minor)         
//             const urgent = allHeros.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 200 & power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength < 400 )  
//                 setCatB(urgent)
//             const priority = allHeros.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 500 )    
//                 setCatC(priority) 
//                 setAll(allHeros)
//         }
//             chooseCat()           
//     }, [])

//     console.log('minor', catA)
//     console.log('urgent', catB)
//     console.log('priority', catC)
//     // console.log(allHeros)

//     const handleChange = (e) => {
//         setInput(e.target.value)
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         setAll(input)

//         const fetchNewData = async () => { 
//             setPageCount(Math.ceil(all.length/perPage))
//             setCurrHeros(all.slice(offset, offset + perPage))
//         } 
//         fetchNewData()
        
//     }

//     return (
        
//         <form onSubmit={handleSubmit}>
//             <label htmlFor="">
//             Select category:
//                 <select className="form-select" aria-label="Default select example">
//                     <option defaultValue>All</option>                 
//                     <option value={catA} onChange={handleChange}>Category One: break-in/robbery</option>                   
//                     <option value={catB} onChange={handleChange}>Category Two: heist/rescue</option>                 
//                     <option value={catC} onChange={handleChange}>Category Three: natural disaster/super villain terrorist/world-ending</option>                   
//                 </select>
//             </label>
//             <input type="submit" value="submit" />
//         </form>
        
//     );
// }

// export default Category;
