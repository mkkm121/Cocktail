import React from "react";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";

function IngredientCard(props) {
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader><h2>{props.name}</h2></CardHeader>
                            <CardBody>
                                <img src={"https://www.thecocktaildb.com/images/ingredients/"+props.name+".png"} height={250} width={250} style={{'borderRadius': '10px'}}/>
                                {props.alcoholic ? <h3>{"Alcoholic: " + props.alcoholic}</h3> : null}
                                {props.abv ? <h3>{"ABV: " + props.abv + "%"}</h3> : null }
                                {props.description ?<h9>{"Description  : " + props.description}</h9> : null }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default IngredientCard;
