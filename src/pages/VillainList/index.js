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

    useEffect(() => {
        const fetchData = async () => {
            
            setPageCount(Math.ceil(allVillains.length/perPage))
            setCurrVillains(allVillains.slice(offset, offset + perPage))
        } 
        fetchData()
    }, [offset])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset((selectedPage + 1) * perPage)
    }

    const Villains = () => {
        return (
            <div id="villain-container">
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
