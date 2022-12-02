import React, {useEffect, useState} from "react";
import {Col, Form, Input, Row} from "reactstrap";
import axios from "axios";

const GetData = (props) => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        axios.get('https://cocktails-370319.uc.r.appspot.com/allcocktails').then(res => {
            setData(res.data.drinks);
        });
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
    <div style={{ height: "84vh",
        overflow: "auto",
    marginTop:"10px"}}>
        {data.map((el, index) => {
            return (
                ((props.searchBarValue == "") && ((el.strAlcoholic.toString() === props.type.toString() && el.strCategory.toString() === props.category.toString()) || (el.strAlcoholic.toString() === props.type.toString() && props.category.toString() === "All"))) ?
                    <a href={"./cocktail/" + el.idDrink}>
                        <div>
                            <Row style={{'margin': '10px'}}>
                                <img src={el.strDrinkThumb} height={100} width={100} style={{'borderRadius': '5px'}}/>
                                <Col>
                                    <h5 style={{'fontSize': '15px'}}>{el.strDrink}</h5>
                                    <h5 style={{'fontSize': '15px'}}>{el.strCategory}</h5>
                                    <h5 style={{'fontSize': '15px'}}>{el.strAlcoholic}</h5>
                                </Col>
                            </Row>
                        </div>
                    </a>
                    : (props.searchBarValue !== "") ? ((el.strDrink.toString().toLowerCase().includes(props.searchBarValue.toString().toLowerCase().toLowerCase())) ?
                        <a href={"./cocktail/" + el.idDrink}>
                            <div>
                                <Row style={{'margin': '10px'}}>
                                    <img src={el.strDrinkThumb} height={100} width={100} style={{'borderRadius': '5px'}}/>
                                    <Col>
                                        <h5 style={{'fontSize': '15px'}}>{el.strDrink}</h5>
                                        <h5 style={{'fontSize': '15px'}}>{el.strCategory}</h5>
                                        <h5 style={{'fontSize': '15px'}}>{el.strAlcoholic}</h5>
                                    </Col>
                                </Row>
                            </div>
                        </a>
                        : null) : null

            )
        })
        }</div>
    )
}

function AllCocktails(props, path, searchBarVal) {
    const [value, setValue] = useState("Alcoholic");
    const [categoryValue, setCategoryValue] = useState("All");
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const handleCategoryValueChange = (event) => {
        setCategoryValue(event.target.value);
    }
    return (
        <>
            <div className="content" style={{paddingBottom:"0"}}>
                <Form>
                    <Row>
                        <Col md={2}>
                            <Input
                                bsSize="sm"
                                className="mb-6"
                                type="select"
                                value={value}
                                onChange={handleChange}
                            >
                                <option value="Alcoholic">
                                    Alcoholic
                                </option>
                                <option value="Non alcoholic">
                                    Non Alcoholic
                                </option>
                                <option value="Optional alcohol">
                                    Optional Alcohol
                                </option>
                            </Input>
                        </Col>
                        <Col md={2}>
                            <Input
                                bsSize="sm"
                                className="mb-6"
                                type="select"
                                value={categoryValue}
                                onChange={handleCategoryValueChange}
                            >
                                <option value="All">
                                    All
                                </option>
                                <option value="Ordinary Drink">
                                    Ordinary Drink
                                </option>
                                <option value="Cocktail">
                                    Cocktail
                                </option>
                                <option value="Shake">
                                    Shake
                                </option>
                                <option value="Other/Unknown">
                                    Other/Unknown
                                </option>
                                <option value="Cocoa">
                                    Cocoa
                                </option>
                                <option value="Shot">
                                    Shot
                                </option>
                                <option value="Coffee / Tea">
                                    Coffee / Tea
                                </option>
                                <option value="Homemade Liqueur">
                                    Homemade Liqueur
                                </option>
                                <option value="Punch / Party Drink">
                                    Punch / Party Drink
                                </option>
                                <option value="Beer">
                                    Beer
                                </option>
                                <option value="Soft Drink">
                                    Soft Drink
                                </option>
                            </Input>
                        </Col>
                    </Row>
                </Form>
                <GetData  type={value} category={categoryValue} searchBarValue={props.searchBarVal}></GetData>
            </div>
        </>
    );
}

export default AllCocktails;
