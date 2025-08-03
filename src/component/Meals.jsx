import { useEffect, useState } from "react";
import MealItem from "./mealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig={};

export default function Meals() {

  const {data:loadedMeals,isLoading,error}=useHttp("http://localhost:3000/meals",requestConfig);
    
  // const [loadedMeals, setLoadedMeals] = useState([]);

  // useEffect(() => {
  //   async function fetchMeals() {
  //     const response = await fetch("http://localhost:3000/meals", {
  //       method: "GET",
  //     });

  //     if (!response.ok) {
  //       //...
  //     }
  //     const meals = await response.json();
  //     setLoadedMeals(meals);
  //   }
  //   fetchMeals();
  // }, []);
  if (isLoading) {
    return <p className="center">Loading Meals...</p>;
  }
  if(!loadedMeals){
    return <p className="center">no meals found</p>
  }
  if(error){
    return <Error title="Failed to fetch meals" message={error}/>
  }
 return (
  // <div className="meals-container">
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  // </div>
);
}
