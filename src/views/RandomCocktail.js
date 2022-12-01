import React, {useEffect, useState} from "react";
import {Row} from "reactstrap";
import axios from "axios";
import CocktailCard from "../components/CocktailCard/CocktailCard.js";

const GetData = () => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        axios.get('https://cocktails-370319.uc.r.appspot.com/random').then(res => {
            setData(res.data.drinks);
        });
    }
    useEffect(() => {
        fetchData();
    }, []);
    return data.map((el, index) => {
        return (
            <div>
                <CocktailCard
                    refresh={true}
                    id={el.idDrink}
                    name={el.strDrink}
                    img={el.strDrinkThumb}
                    category={el.strCategory}
                    alcoholic={el.strAlcoholic}
                    instructions={el.strInstructions}
                    ing1={el.strIngredient1}
                    measure1={el.strMeasure1}
                    ing2={el.strIngredient2}
                    measure2={el.strMeasure2}
                    ing3={el.strIngredient3}
                    measure3={el.strMeasure3}
                    ing4={el.strIngredient4}
                    measure4={el.strMeasure4}
                    ing5={el.strIngredient5}
                    measure5={el.strMeasure5}
                    ing6={el.strIngredient6}
                    measure6={el.strMeasure6}
                    ing7={el.strIngredient7}
                    measure7={el.strMeasure7}
                    ing8={el.strIngredient8}
                    measure8={el.strMeasure8}
                    ing9={el.strIngredient9}
                    measure9={el.strMeasure9}
                    ing10={el.strIngredient10}
                    measure10={el.strMeasure10}
                    ing11={el.strIngredient11}
                    measure11={el.strMeasure11}
                />

            </div>
        )
    })
}

function RandomCocktail() {
    return (
        <>
            <div className="content">
                <Row>
                    <GetData/>
                </Row>
            </div>
        </>
    );
}

export default RandomCocktail;
