import { useEffect, useState } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate'
// css
import "./styles.css"

const HeroList = ({allHeros}) => {

    const [offset, setOffset] = useState(0)
    const [perPage] = useState(12)
    const [pageCount, setPageCount] = useState(0)
    const [currHeros, setCurrHeros] = useState([])

    useEffect(() => {
        const fetchData = async () => { 
            setPageCount(Math.ceil(allHeros.length/perPage))
            setCurrHeros(allHeros.slice(offset, offset + perPage))
        } 
        fetchData()
    }, [offset])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset((selectedPage + 1) * perPage)
    }

    const Heros = () => {
        return (
            
            <div id="hero-container">
                <select className="form-select" aria-label="Default select example">
                    <div>
                        <p>Please choose a category</p>
                    </div>
                    <option selected>All</option>
                    <option value="1">Category One: break-in/robbery</option>
                    <option value="2">Category Two: heist/rescue</option>
                    <option value="3">Category Three: natural disaster/super villain terrorist/world-ending</option>
                </select>

                {
                    currHeros.map(hero => (
                        <div className="card h-card"  key={hero.id}>
                            <img src={hero.images.sm} className="card-img-top" alt="hero-pic"/>
                            <div className="card-description">
                                <h6 className="card-title">{hero.name}</h6>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        )
    }


    const thisOne = allHeros.filter(specify => specify.name === 'Dash')
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
