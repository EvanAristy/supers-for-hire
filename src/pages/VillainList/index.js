import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useNavigate } from "react-router-dom";
// css
import "./styles.css";

const VillainList = ({ allVillains }) => {

  const [offset, setOffset] = useState(0);
  const [perPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);
  const [currVillains, setCurrVillains] = useState([]);
  const [filter, setFilter] = useState(allVillains);
  const [characters, setCharacters] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setPageCount(Math.ceil(filter.length / perPage));
      setCurrVillains(filter.slice(offset, offset + perPage));
    };
    fetchData();
  }, [offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  const Villains = () => {

    const unFilter = () => {
      setFilter(allVillains);
    };
    const filterWeak = () => {
      const minor = allVillains.filter((power) =>power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength < 200);
      setFilter(minor);
    };
    const filterStrong = () => {
      const urgent = allVillains.filter((power) => (power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 200) & (power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength < 400));
      setFilter(urgent);
    };
    const filterSuper = () => {
      const priority = allVillains.filter((power) => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 500);
      setFilter(priority);
    };

    function handleOnDragEnd(result) {
        if (!result.destination) return
        const items = Array.from(currVillains)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setCurrVillains(items)
        console.log(result)
        characters.push(result)
        console.log(characters)
    }

    function handleConfirm() {
        if( alert('They have been notified and will be there shortly. Happy we could be of service.')){}
        else  navigate('/');
     }

    return (
        <div className="container">

            <div className="instructions">
                <h6>Please choose a category that best suits your needs. Category A for small jobs. Category B for dealing with a hero. Category C for total world domination</h6>
            </div>
            <div className="button">
                <button className="v-cat" onClick={() => unFilter()}>All Heros</button>
                <button className="v-cat" onClick={() => filterWeak()}>Category A</button>
                <button className="v-cat" onClick={() => filterStrong()}>Category B</button>
                <button className="v-cat" onClick={() => filterSuper()}>Category C</button>
            </div>

            <div className="main">
                <DragDropContext onDragEnd={handleOnDragEnd}>

                    <div className="left">
                        <Droppable droppableId="villain-container">
                            {(provided) => (
                                <div className="villain-container" {...provided.droppableProps} ref={provided.innerRef}>
                                    {currVillains.map(({id, name, images, slug}, index) => {
                                        return (
                                            <Draggable key={id} draggableId={name} index={index}>
                                                {(provided) => (                                
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="card v-card">
                                                        <img src={images.sm} className="card-img-top" alt="villain-pic" />
                                                        <div className="card-description">
                                                        <h6 className="card-title">{name}</h6>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    <div className="right">
                        <Droppable droppableId="cart-container">
                            {(provided) => (
                                <div className="shop-container" {...provided.droppableProps} ref={provided.innerRef}> 
                                    <h1>Selected</h1>
                                    {characters.map((chosen, i) => {
                                        return (
                                                                                
                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="v-card">
                                                <h6 className="card-title">{chosen.draggableId}</h6>
                                            </div>
                                        )
                                    })}
                                    <button className="v-confirm" onClick={handleConfirm}>Corfirm</button>
                                </div>
                            )}
                        </Droppable>
                    </div>

                </DragDropContext>
            </div>  
                
        </div>
    );
  };
  console.log(allVillains);

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
};

export default VillainList;
