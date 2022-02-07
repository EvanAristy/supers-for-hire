import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useNavigate } from "react-router-dom";
// components
// import Category from '../../components/Category';
// css
import "./styles.css";

const HeroList = ({ allHeros }) => {

  const [offset, setOffset] = useState(0);
  const [perPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);
  const [currHeros, setCurrHeros] = useState([]);
  const [filter, setFilter] = useState(allHeros);
  const [characters, setCharacters] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setPageCount(Math.ceil(filter.length / perPage));
      setCurrHeros(filter.slice(offset, offset + perPage));
    };
    // console.log(filter);
    fetchData();
  }, [offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  const Heros = () => {

    const unFilter = () => {
      setFilter(allHeros);
    };
    const filterWeak = () => {
      const minor = allHeros.filter((power) => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength < 200);
      setFilter(minor);
    };
    const filterStrong = () => {
      const urgent = allHeros.filter((power) => (power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 200) & (power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength < 400));
      setFilter(urgent);
    };
    const filterSuper = () => {
      const priority = allHeros.filter(
        (power) => power.powerstats.combat + power.powerstats.durability + power.powerstats.intelligence + power.powerstats.power + power.powerstats.speed + power.powerstats.strength > 500);
      setFilter(priority);
    };

    function handleOnDragEnd(result) {
        if (!result.destination) return
        const items = Array.from(currHeros)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setCurrHeros(items)
        console.log(result)
        characters.push(result)
        console.log(characters)
    }

    function handleConfirm() {
       if( alert('Help is on the way. We are Happy to be of service')){}
       else  navigate('/');
    }

    return (
      <div className="container">
            <div className="instructions">
                <h6>Please choose a category based on your needs. Category A for minor threats. Category B for dangerouse tasks. Category C for world-ending threats</h6>
            </div>
            <div className="button">
                <button className="h-all hcat-button" onClick={() => unFilter()}>All Heros</button>
                <button className="h-weak hcat-button" onClick={() => filterWeak()}>Category A</button>
                <button className="h-strong hcat-button" onClick={() => filterStrong()}>Category B</button>
                <button className="h-super hcat-button" onClick={() => filterSuper()}>Category C</button>
            </div>
        
            <div className="main">
                <DragDropContext onDragEnd={handleOnDragEnd}>

                    <div className="left">
                        <Droppable droppableId="hero-container">
                            {(provided) => (
                                <div className="hero-container" {...provided.droppableProps} ref={provided.innerRef}> 
                                    {currHeros.map(({id, name, images, slug}, index) => {
                                        return (
                                            <Draggable key={id} draggableId={name} index={index}>
                                                {(provided) => (                                
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="card h-card">
                                                        <img src={images.sm} className="card-img-top" alt="hero-pic" />
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
                                            // <Draggable key={chosen.draggableId} draggableId={chosen.draggableId} index={i}>
                                                // {(provided) => (                                
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="h-card">
                                                        {/* <img src={images.sm} className="card-img-top" alt="hero-pic" /> */}
                                                        {/* <div className="card-description"> */}
                                                            <h6 className="card-title">{chosen.draggableId}</h6>
                                                        {/* </div>  */}
                                                    </div>
                                                // )}
                                            // </Draggable>
                                        )
                                    })}
                                    <button className="h-confirm every-button" onClick={handleConfirm}>Corfirm</button>
                                </div>
                            )}
                        </Droppable>
                    </div>

                </DragDropContext>
            </div>
            

      </div>
    );
  };

  const thisOne = allHeros.filter((specify) => specify.name === "A-Bomb");
  console.log(thisOne);
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
};

export default HeroList;
