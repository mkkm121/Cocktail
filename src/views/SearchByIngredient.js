import React, {useEffect, useState} from "react";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {
    InputGroupText,
    InputGroup,
    InputGroupAddon,
    Input,
} from "reactstrap";

const FilteredCoctails = (props) => {
    return (
    <div style={{ height: "74vh",
        overflow: "auto",
        marginTop:"10px",
    display:"flex",
    flexFlow:"row wrap"}}>
        {props.data.map((el, index) => {
        return (
            <a href={"./cocktail/" + el.idDrink}>

                        <Col style={{width:"18vw", minWidth:"180px", minHeight:"240px", padding:0}}>
                        <img src={el.strDrinkThumb} height={100} width={100} style={{'borderRadius': '5px'}}/>

                            <h5 style={{'fontSize': '15px'}}>{el.strDrink}</h5>
                            <h5 style={{'fontSize': '15px'}}>{el.strCategory}</h5>
                            <h5 style={{'fontSize': '15px'}}>{el.strAlcoholic}</h5>
                        </Col>

            </a>
        )
    })}
    </div>
        )
}

function SearchByIngredient(){
    const [data, setData] = useState([]);
    const [state, setState] = useState({
        ingredient1: "",
        ingredient2: "",
        ingredient3: "",
    })

    function GetData () {
        fetchData();

        useEffect(() => {
            fetchData();
        }, []);
    }

    function fetchData  ()  {
        if (state) {
            if (state.ingredient1 && state.ingredient2 && state.ingredient3){
                axios.get('http://localhost:8080/byingredient?ingredients=' + state.ingredient1 +',' + state.ingredient2 +',' + state.ingredient3).then(res => {
                    setData(res.data.drinks);
                });
            }
            else if(state.ingredient1 && state.ingredient2){
                axios.get('http://localhost:8080/byingredient?ingredients=' + state.ingredient1 +',' + state.ingredient2).then(res => {
                    setData(res.data.drinks);
                });
            }
            else if(state.ingredient1){
                axios.get('http://localhost:8080/byingredient?ingredients=' + state.ingredient1).then(res => {
                    setData(res.data.drinks);
                });
            }
        }
    }
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

        return (
            <>
                <div className="content" style={{padding:"0 30px"}}>
                            <Card style={{textAlign:"center", height:"86vh"}}>
                                <CardHeader >
                                    <p>Find the drink you are able to do! You can choose up to 3 ingredients.</p>
                                    <div style={{display:"flex", margin:"0 1vw", justifyContent:"space-evenly"}}  onSubmit={GetData()}>
                                        <Col md={4}>
                                            <Input type="text" name="ingredient1" value={state.ingredient1} onChange={handleChange} placeholder="Ingredient 1"/>
                                        </Col>
                                        {state.ingredient1 ? <Col md={4}>
                                            <Input type="text" name="ingredient2" value={state.ingredient2} onChange={handleChange} placeholder="Ingredient 2"/>
                                        </Col> : null}
                                        {state.ingredient1 && state.ingredient2 ?<Col md={4}>
                                            <Input type="text" name="ingredient3" value={state.ingredient3} onChange={handleChange} placeholder="Ingredient 3"/>
                                        </Col>: null}
                                    </div>
                                </CardHeader>
                                <CardBody>
                                        <FilteredCoctails data={data}/>
                                </CardBody>
                            </Card>
                </div>
            </>
        );
}

export default SearchByIngredient;
