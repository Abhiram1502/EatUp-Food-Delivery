import "../styles/Filter.css"
import { categories } from "../data/restaurants";
import { useRef, useState } from "react";
function Filters({ setCategory }) {
    const scrollRef = useRef();
    const [active, setActive] = useState(null);
    const [sortPop, setSortPop] = useState(false);
    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -200,
            behavior: "smooth",
        });
    }
    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 200,
            behavior: "smooth",
        });
    }
    const handleClick = (name) => {
        if (active === name) {
            setCategory(null);
            setActive(null);
        } else {
            setCategory(name);
            setActive(name);
        }
    }
    return (
        <div className="filter-section">
            <h2>What's On Your Mind</h2>
            <div className="cat-filter" ref={scrollRef}>
                {categories.map((res) => (
                    <div key={res.id} onClick={() => handleClick(res.name)} className={`cat-item ${active === res.name ? "active" : ""}`}>
                        <img src={res.image} />
                        <p>{res.name}</p>
                    </div>
                ))}
            </div>
            <div className="filter">
                <div>
                    <button className="sort-btn" onClick={() => { setSortPop(prevState => !prevState) }}>Sort By <i className="fa-solid fa-angle-down"></i></button>
                    {sortPop && (
                        <div className="sortPopUp">
                            <p>Price: High to Low</p>
                            <p>Price: Low to High</p>
                            <p>Rating: High to Low</p>
                        </div>
                    )}
                    <button onClick={()=>handleClick("veg")} className={`veg-btn ${active === "veg" ? "active" : ""}`}>{active=="veg"?"Non Veg":"Pure Veg"}</button>
                </div>
                <div>
                    <button className="scroll-btn" onClick={scrollLeft}><i class="fa-solid fa-arrow-left"></i></button>
                    <button className="scroll-btn" onClick={scrollRight}><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
    );
}
export default Filters;