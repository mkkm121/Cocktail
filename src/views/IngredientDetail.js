import React, {useEffect, useState} from "react";
import {Row} from "reactstrap";
import axios from "axios";
import {useLocation} from "react-router-dom";
import IngredientCard from "../components/IngredientCard/IngredientCard";

function GetData(path) {
    const [data, setData] = useState([]);

    const fetchData = () => {
        axios.get('https://cocktails-370319.uc.r.appspot.com' + path).then(res => {
            setData(res.data.ingredients);
        });
    }
    useEffect(() => {
        fetchData();
    }, []);
    return data.map((el, index) => {
        return (
            <div>
                <IngredientCard
                    name={el.strIngredient}
                    alcoholic={el.strAlcohol}
                    description={el.strDescription}
                    abv={el.strABV}
                />
            </div>
        )
    })
}

function IngredientDetails() {
    let location = useLocation();
    return (
        <>
            <div className="content">
                <Row>
                    {GetData(location.pathname)}
                </Row>
            </div>
        </>
    );
}

export default IngredientDetails;
