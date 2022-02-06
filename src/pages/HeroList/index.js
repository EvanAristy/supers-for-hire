import { useEffect, useState } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate'
// components
// import Category from '../../components/Category';
// css
import "./styles.css"

const HeroList = ({allHeros}) => {

    const [offset, setOffset] = useState(0)
    const [perPage] = useState(12)
    const [pageCount, setPageCount] = useState(0)
    const [currHeros, setCurrHeros] = useState([])
    const [filter, setFilter] = useState(allHeros)

    useEffect(() => {
        const fetchData = async () => { 
            setPageCount(Math.ceil(filter.length/perPage))
            setCurrHeros(filter.slice(offset, offset + perPage))
        } 
        console.log(filter)
        fetchData()
    }, [offset])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset((selectedPage) * perPage)
    }


    const Heros = () => {

        const unFilter = () => {
            setFilter(allHeros)
        }
        const filterWeak = () => {
            const minor = allHeros.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength < 200 ) 
                setFilter(minor)
        }
        const filterStrong = () => {
            const urgent = allHeros.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 200 & power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength < 400 )  
                setFilter(urgent)
        }
        const filterSuper = () => {
            const priority = allHeros.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 500 )    
                setFilter(priority)
        }

        return (
            
            <div id="hero-container">
                
                <button onClick={() => unFilter()}>All Heros</button>
                <div className="categories">
                    <button onClick={() => filterWeak()}>Category A</button>
                    <button onClick={() => filterStrong()}>Category B</button>
                    <button onClick={() => filterSuper()}>Category C</button>
                </div>
                
                {
                    currHeros.map(hero => (
                        // <li>
                        <div className="card h-card"  key={hero.id}>
                            <img src={hero.images.sm} className="card-img-top" alt="hero-pic"/>
                            <div className="card-description">
                                <h6 className="card-title">{hero.name}</h6>
                            </div>
                        </div>
                        // </li>
                    ))
                }
                
            </div>
        )
    }


    const thisOne = allHeros.filter(specify => specify.name === 'A-Bomb')
    console.log(thisOne)
    // console.log(allHeros)


    return (
        <div>

            <Heros />

            <div className="h-page">
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </div>
            
        </div>
    );
}

export default HeroList;
