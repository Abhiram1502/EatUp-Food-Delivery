import {assets} from "../assets/assets"
import "../styles/Hero.css"
function Hero(){
    return(
        <div className="hero">
            <img src={assets.banner_hero}></img>
            <div className="hero-content">
                <h1>Order Your Favourite Food Here!</h1>
                <p>Fresh meals delivered to your doorstep in minutes</p>
            </div>
        </div>
    );
}
export default Hero;