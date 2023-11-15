import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { CDN_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const  [rmenu,setRmenu] = useState(null);

  const {resId} = useParams(); 
 

useEffect(() => {
    fetchMenu();
},[]);



const fetchMenu = async () =>{
const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=" +resId+"&catalog_qa=undefined&submitAction=ENTER");
const jsonValue = await data.json();
console.log(jsonValue);

setRmenu(jsonValue.data);

}

if(rmenu === null){
    return <Shimmer/>;
}
const {name,cuisines,avgRating,costForTwo} =rmenu?.cards[0]?.card?.card?.info;
const {itemCards} = rmenu?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR.cards[1].card.card;
console.log(itemCards);


    return (
        <div className = "resmenu" >
         <h1>{name}</h1>
         <h3>{cuisines}</h3>
         <h2>Menu</h2>
         <h3>{avgRating}</h3>
         <h3>{costForTwo/100}</h3>
            
            <ul>
                {itemCards && itemCards.map(item =>
                <li key = {item?.card?.info?.id} >
                    {item?.card?.info?.name}-
                Rs{item?.card?.info?.defaultPrice/100 || item?.card?.info?.price/100}
              <img className = "resim" src ={CDN_URL + item?.card?.info?.imageId} />
                </li>)}
               
            </ul>

        </div>
    )
}

export default RestaurantMenu;