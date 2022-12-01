import React, {useEffect, useState} from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Input,
    Form,
    Button
} from "reactstrap";
import "./CoctailCard.css"
import axios from "axios";
import HeartButton from "./HeartButton"
import AuthService from "services/auth.service";

const CocktailCard = (props) => {
    const [commentMessage, setCommentMessage] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState();

    function getCurrentUser(){
        setCurrentUser(JSON.parse(localStorage.getItem('user')));
    }
    const onSubmitHandler = async (e) => {

        e.preventDefault();
        getCurrentUser();
        const comment = {content: commentMessage, userId: currentUser.username, cocktailId: props.id};

        await axios.post('https://cocktails-370319.uc.r.appspot.com/addcomment', comment)
            .then(response => console.log(response))
            .catch(function (error) {
                    console.log(error);
            });

        await axios.get('https://cocktails-370319.uc.r.appspot.com/cocktailcomments/'+ props.id )
            .then(res => {
                setComments(res.data.cocktailcomments)
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            });
    }


    const fetchData = () => {
        getCurrentUser();
        axios.get('https://cocktails-370319.uc.r.appspot.com/cocktailcomments/'+ props.id )
            .then(res => {
                setComments(res.data.cocktailcomments)
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            });
        if(AuthService.getCurrentUser()) {
            axios.post('https://cocktails-370319.uc.r.appspot.com/checklike',
                {
                    "cocktailId": props.id,
                    "userId": JSON.parse(localStorage.getItem('user')).id
                }
            )
                .then(res => {
                    setLiked(res.data);
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response);
                    }
                });
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card style={{width:"83vw",height:"84vh", padding:"0 20px", margin: "10px"}}>
                                <CardHeader style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                    <Col md={11}>
                                    <Row style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}><h3 style={{margin: "0px"}} >{props.name}</h3></Row>
                                        <Row><p style={{fontSize:"18px", margin: "0px"}}>{props.category}   <span style={{fontSize:"14px",fontStyle: "italic", fontWeight:"bold", color:"red" }}>{props.alcoholic}</span></p> </Row>
                                    </Col>
                                    <Col style={{marginLeft:"3vw"}}><HeartButton  userID={currentUser ? currentUser.id : null} cocktailID={props.id} liked={liked}/></Col>
                                </CardHeader>

                                <CardBody style={{display: "flex", flexDirection: "column"}}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}>
                                        <img src={props.img} height={"auto"} width={"20%"}
                                             style={{'borderRadius': '10px'}}/>
                                        <Card style={{
                                            margin: "0",
                                            zIndex: "55",
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "70%",
                                            justifyContent: "flex-end",
                                            alignItems: "center"
                                        }}>
                                            <CardHeader style={{width: "100%"}}>
                                                <Form onSubmit={onSubmitHandler} style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    width: "100%",
                                                    height: "80%",
                                                    justifyContent: "space-around",
                                                    alignItems: "center"
                                                }}>
                                                    <Input
                                                        style={{width: "80%", height: "40px"}}
                                                        placeholder={AuthService.getCurrentUser() ? "Add your comment here..." : "Log in to add your own comment..."}
                                                        name="text"
                                                        value={commentMessage}
                                                        onChange={event => setCommentMessage(event.target.value)}
                                                    />
                                                    {AuthService.getCurrentUser() ?
                                                    <Button type="submit" style={{margin: "0"}}>
                                                        Send
                                                    </Button> :
                                                        <Button disabled={true} type="submit" style={{margin: "0"}}>
                                                            Send
                                                        </Button>}
                                                </Form></CardHeader>
                                            <CardBody style={{
                                                height: "250px",
                                                width: "100%",
                                                overflowY: "scroll",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                scrollbarWidth: "0"
                                            }}>
                                                <div style={{display:"flex", flexDirection:"column", width: "90%"}}>
                                                    {comments.map(el => (
                                                    <Row style={{width:"100%" , margin:"10px", display:"flex",  justifyContent:"space-between", alignItems:"center"}}>
                                                        <Col md={3}>
                                                            <img height={40} width={40} src={"https://i.ibb.co/y4WdjHt/default-avatar.png"}/>
                                                        </Col>
                                                        <Col>
                                                            <Row> <b>{el.userId}</b></Row>
                                                            <Row>{el.content}</Row>
                                                        </Col>
                                                    </Row>
                                                    ))}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <Row>
                                    <Col md={4} style={{padding:"10px", textAlign:"left"}}>
                                        <h4>{"Ingredients"}</h4>
                                        <div style={{  height:"20vh",
                                            overflow: "auto",
                                            marginTop:"10px"}}>
                                    {props.ing1 ? (
                                        <a href={"/ingredient/" + props.ing1} target={"_blank"}>
                                            <h5>{"1. " + props.ing1 + "  "}{props.measure1 ? props.measure1 : null}</h5>
                                        </a>
                                    ) : null}
                                    {props.ing2 ? (
                                        <a href={"/ingredient/" + props.ing2} target={"_blank"}>
                                            <h5>{"2. " + props.ing2 + "  "}{props.measure2 ? props.measure2 : null}</h5>
                                        </a>
                                    ) : null}
                                    {props.ing3 ? (
                                        <a href={"/ingredient/" + props.ing3} target={"_blank"}>
                                            <h5>{"3. " + props.ing3 + "  "}{props.measure3 ? props.measure3 : null}</h5>
                                        </a>
                                    ) : null}
                                    {props.ing4 ? (
                                        <a href={"/ingredient/" + props.ing4} target={"_blank"}>
                                            <h5>{"4. " + props.ing4 + "  "}{props.measure4 ? props.measure4 : null}</h5>
                                        </a>
                                    ) : null}
                                    {props.ing5 ? (
                                        <a href={"/ingredient/" + props.ing5} target={"_blank"}>
                                            <h5>{"5. " + props.ing5 + "  "}{props.measure5 ? props.measure5 : null}</h5>
                                        </a>
                                    ) : null}
                                    {props.ing6 ? (
                                        <a href={"/ingredient/" + props.ing6} target={"_blank"}>
                                            <h5>{"6. " + props.ing6 + "  "}{props.measure6 ? props.measure6 : null}</h5>
                                        </a>
                                    ) : null}
                                    {props.ing7 ? (
                                        <a href={"/ingredient/" + props.ing7} target={"_blank"}>
                                            <h5>{"7. " + props.ing7 + "  "}{props.measure7 ? props.measure7 : null}</h5>
                                        </a>
                                    ) : null}
                                    {props.ing8 ? (
                                        <a href={"/ingredient/" + props.ing8} target={"_blank"}>
                                            <h5>{"8. " + props.ing8 + "  "}{props.measure8 ? props.measure8 : null}</h5>
                                        </a>
                                    ) : null}</div>
                                    </Col>
                                        <Col md={1}>
                                            </Col>
                                    <Col md={5} style={{padding:"10px", textAlign:"center", height:"34vh"}}>
                                        <div style={{  height:"30vh",
                                            overflow: "auto",
                                            marginTop:"10px"}}>
                                    <h4>{"Instruction"}</h4>
                                    <h6>{props.instructions}</h6>
                                        </div>
                                    </Col>
                                    {props.refresh ?
                                        <Col md={2} style={{
                                            display:"flex",
                                            justifyContent:"flex-end",
                                            alignItems:"flex-end",
                                            height: "32vh"
                                        }}>
                                            <i style={{
                                                fontSize: "40px"
                                            }} type="submit" onClick={() => {
                                                window.location.reload()
                                            }} className="refresh nc-icon nc-refresh-69"/>
                                        </Col> : null}
                                </Row>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }

export default CocktailCard;
