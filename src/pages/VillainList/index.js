import { useEffect, useState } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate'
// css
import "./styles.css"

const VillainList = ({ allVillains }) => {

    const [offset, setOffset] = useState(0)
    const [perPage] = useState(12)
    const [pageCount, setPageCount] = useState(0)
    const [currVillains, setCurrVillains] = useState([])
    const [filter, setFilter] = useState(allVillains)

    useEffect(() => {
        const fetchData = async () => {
            
            setPageCount(Math.ceil(filter.length/perPage))
            setCurrVillains(filter.slice(offset, offset + perPage))
        } 
        fetchData()
    }, [offset])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset((selectedPage) * perPage)
    }

    const Villains = () => {

        const unFilter = () => {
            setFilter(allVillains)
        }
        const filterWeak = () => {
            const minor = allVillains.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength < 200 ) 
                setFilter(minor)
        }
        const filterStrong = () => {
            const urgent = allVillains.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 200 & power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength < 400 )  
                setFilter(urgent)
        }
        const filterSuper = () => {
            const priority = allVillains.filter(power => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 500 )    
                setFilter(priority)
        }

        return (
            
            <div id="villain-container">

                <button onClick={() => unFilter()}>All Heros</button>
                <div className="categories">
                    <button onClick={() => filterWeak()}>Category A</button>
                    <button onClick={() => filterStrong()}>Category B</button>
                    <button onClick={() => filterSuper()}>Category C</button>
                </div>

                {
                    currVillains.map(villain => (
                        <div className="card v-card"  key={villain.id}>
                            <img src={villain.images.sm} className="card-img-top" alt="villain-pic"/>
                            <div className="card-description">
                                <h6 className="card-title">{villain.name}</h6>
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

            <div className="v-page">
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

export default VillainList;
