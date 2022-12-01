import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row,  Modal, ModalFooter,
    ModalHeader, ModalBody} from "reactstrap";
import axios from "axios";
import authHeader, {authHeaderOnlyToken} from "../services/auth-header";

function User() {
    const [data, setData] = useState({
        users: [],
        isFetching: false
    });

    // Modal open state
    const [modal, setModal] = useState({
        openStatus: false,
        type: ''
    });
    // Toggle for Modal
    const toggle = () => setModal(!modal);

    const [userLikedCoctailList, setUserLikedCoctailList] = useState([]);
    const [userCommentsList, setUserCommentsList] = useState([]);
    const [userID, setUserID] = useState();
    const [username, setUsername] = useState();
    const [likedDrinks, setLikedDrinks] = useState(0)
    const [commentedDrinks, setCommentedDrinks] = useState(0)
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        address: "",
        city: "",
        country: "",
        postalcode: "",
        aboutme: "",
    })

    async function updateUserData() {
        const updateUser = {
            "aboutme": state.aboutme,
            "address": state.address,
            "city": state.city,
            "country": state.country,
            "firstname": state.firstname,
            "lastname": state.lastname,
            "postalcode": state.postalcode
        };

        axios.put("http://localhost:8080/updateUser", updateUser, {headers: {
                Authorization: 'Bearer ' + authHeaderOnlyToken(),
                'Content-Type': 'application/json'
            } } )
            .catch(error => {
                console.error('There was an error!', error);
            });

        window.location.reload();

    }

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    function showPopUp(type) {
        setModal({
            openStatus: !modal.openStatus,
            type: type
        });
        if(type == 'drinksList')
        axios.get("http://localhost:8080/userlikescocktailslist/" + userID)
            .then(response => {
                if (response.data) {
                    setUserLikedCoctailList(response.data.drinks)
                }
            });
        else if(type == 'commentsList'){
            axios.get("http://localhost:8080/usercomments/"+username)
                .then(response => {
                    if (response.data) {
                        console.log(response.data)
                        setUserCommentsList(response.data.usercomments)
                    }
                });

            }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setData({users: data.users, isFetching: true});
                const response = await axios.get("http://localhost:8080/currentUser", {
                    headers:
                        authHeader()
                });
                setData({users: response.data, isFetching: false});
                setState({
                    ...state,
                    ["firstname"]: response.data && response.data.user[0] ? response.data.user[0].firstname : "",
                    ["lastname"]: response.data && response.data.user[0] ? response.data.user[0].lastname : "",
                    ["username"]: response.data && response.data.user[0] ? response.data.user[0].username : "",
                    ["email"]: response.data && response.data.user[0] ? response.data.user[0].email : "",
                    ["city"]: response.data && response.data.user[0] ? response.data.user[0].city : "",
                    ["country"]: response.data && response.data.user[0] ? response.data.user[0].country : "",
                    ["address"]: response.data && response.data.user[0] ? response.data.user[0].address : "",
                    ["aboutme"]: response.data && response.data.user[0] ? response.data.user[0].aboutme : "",
                    ["postalcode"]: response.data && response.data.user[0] ? response.data.user[0].postalcode : "",
                });
                let id = response.data.user[0].id;
                setUserID(id)
                setUsername(response.data.user[0].username)
                let likesresponse = await axios.get("http://localhost:8080/userlikes/" + id);
                setLikedDrinks(likesresponse.data)
                let commentresponse = await axios.get("http://localhost:8080/numberusercomments/" + response.data.user[0].username);
                setCommentedDrinks(commentresponse.data)
            } catch (exception) {
                console.log(exception)
                setData({users: data.users, isFetching: false});
            }

        };
        fetchUsers();
    }, []);

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="4">
                        <Card className="card-user">
                            <div className="image">
                                <img
                                    alt="..."
                                    src={data?.users?.user && data.users.user[0] ? data.users.user[0].backurl : "https://i.ibb.co/WV8K5jK/login-Back.jpg"}
                                />
                            </div>
                            <CardBody>
                                <div className="author">
                                    <a  onClick={(e) => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="avatar border-gray"
                                            src={ data?.users?.user && data.users.user[0] ? data.users.user[0].photourl : "https://i.ibb.co/y4WdjHt/default-avatar.png"}
                                        />
                                        <h5 className="title">{data?.users?.user && data.users.user[0] ? data.users.user[0].firstname : ""} {data?.users?.user && data.users.user[0] ? data.users.user[0].lastname : ""}</h5>
                                    </a>
                                    <p className="description">{ data?.users?.user && data.users.user[0] ? data.users.user[0].username : ""}</p>
                                </div>
                                <p className="description text-center">
                                    {data?.users?.user && data.users.user[0] ? data.users.user[0].aboutme : ""}
                                </p>
                            </CardBody>
                            <CardFooter>
                                <Modal isOpen={modal.openStatus}
                                       toggle={toggle}
                                       modalTransition={{ timeout: 500 }}>
                                    <ModalHeader>
                                        {modal.type=='drinksList' ? <p><b>{state.username}</b> liked drinks list</p> : null }
                                        {modal.type=='commentsList' ? <p><b>{state.username}</b> comments list</p> : null }
                                    </ModalHeader>
                                    <ModalBody>
                                        {modal.type=='drinksList' ?
                                        userLikedCoctailList.map((el) => {
                                            return (
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
                                            )
                                        }) : null}

                                        {userCommentsList.map((el) => {
                                        return (
                                        modal.type=='commentsList' ?
                                            <Row style={{width:"100%" , margin:"10px", display:"flex",  justifyContent:"space-between", alignItems:"center"}}>
                                                <Col md={3}>
                                                    <img height={40} width={40} src={"https://i.ibb.co/y4WdjHt/default-avatar.png"}/>
                                                </Col>
                                                <Col>
                                                    <Row> <b>{el.userId}</b></Row>
                                                    <Row>{el.content}</Row>
                                                    <Row><a href={"/cocktail/"+el.cocktailId}>{el.cocktailName}</a></Row>
                                                </Col>
                                            </Row>
                                         : null
                                        )})}

                                    </ModalBody>
                                </Modal>
                                <hr/>
                                <div className="button-container">
                                    <Row>
                                        <Col className="ml-auto" lg="3" md="6" xs="6">
                                            <h5>
                                                {likedDrinks} <br/>
                                                <a href="#" onClick={()=>showPopUp('drinksList')}><small>Favourite Drinks</small></a>
                                            </h5>
                                        </Col>
                                        <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                            <h5>
                                                {commentedDrinks} <br/>
                                                <a href="#" onClick={()=>showPopUp('commentsList')}><small>Comments</small></a>
                                            </h5>
                                        </Col>
                                        <Col className="mr-auto" lg="3">
                                            <h5>
                                                246 <br/>
                                                <small>Drinking Friends</small>
                                            </h5>
                                        </Col>
                                    </Row>
                                </div>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Best Drinking Friends</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <ul className="list-unstyled team-members">
                                    <li>
                                        <Row>
                                            <Col md="2" xs="2">
                                                <div className="avatar">
                                                    <img
                                                        alt="..."
                                                        className="img-circle img-no-padding img-responsive"
                                                        src={
                                                            require("assets/img/faces/ayo-ogunseinde-2.jpg")
                                                                .default
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="7" xs="7">
                                                DJ Khaled <br/>
                                                <span className="text-muted">
                          <small>Offline</small>
                        </span>
                                            </Col>
                                            <Col className="text-right" md="3" xs="3">
                                                <Button
                                                    className="btn-round btn-icon"
                                                    color="success"
                                                    outline
                                                    size="sm"
                                                >
                                                    <i className="fa fa-envelope"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </li>
                                    <li>
                                        <Row>
                                            <Col md="2" xs="2">
                                                <div className="avatar">
                                                    <img
                                                        alt="..."
                                                        className="img-circle img-no-padding img-responsive"
                                                        src={
                                                            require("assets/img/faces/joe-gardner-2.jpg")
                                                                .default
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="7" xs="7">
                                                SHOT IT <br/>
                                                <span className="text-success">
                          <small>Available</small>
                        </span>
                                            </Col>
                                            <Col className="text-right" md="3" xs="3">
                                                <Button
                                                    className="btn-round btn-icon"
                                                    color="success"
                                                    outline
                                                    size="sm"
                                                >
                                                    <i className="fa fa-envelope"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </li>
                                    <li>
                                        <Row>
                                            <Col md="2" xs="2">
                                                <div className="avatar">
                                                    <img
                                                        alt="..."
                                                        className="img-circle img-no-padding img-responsive"
                                                        src={
                                                            require("assets/img/faces/clem-onojeghuo-2.jpg")
                                                                .default
                                                        }
                                                    />
                                                </div>
                                            </Col>
                                            <Col className="col-ms-7" xs="7">
                                                Flume <br/>
                                                <span className="text-danger">
                          <small>Busy</small>
                        </span>
                                            </Col>
                                            <Col className="text-right" md="3" xs="3">
                                                <Button
                                                    className="btn-round btn-icon"
                                                    color="success"
                                                    outline
                                                    size="sm"
                                                >
                                                    <i className="fa fa-envelope"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </li>
                                </ul>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="8">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Edit Profile</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    {/*<Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>Username</label>
                                                <Input
                                                    placeholder="First Name"
                                                    type="text"
                                                    name="username"
                                                    value={state ? state.username : ""}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <FormGroup>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email address
                                                </label>
                                                <Input
                                                    placeholder="Email" type="email"
                                                    name="email"
                                                    value={state ? state.email : ""}
                                                    onChange={handleChange}
                                                />

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    */}
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Input
                                                    placeholder="First Name"
                                                    type="text"
                                                    name="firstname"
                                                    value={state ? state.firstname : ""}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Input
                                                    placeholder="Last Name"
                                                    type="text"
                                                    name="lastname"
                                                    value={state ? state.lastname : ""}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>Address</label>
                                                <Input
                                                    placeholder="Home Address"
                                                    type="text"
                                                    name="address"
                                                    value={state ? state.address : ""}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="4">
                                            <FormGroup>
                                                <label>City</label>
                                                <Input
                                                    placeholder="City"
                                                    type="text"
                                                    name="city"
                                                    value={state ? state.city : ""}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-1" md="4">
                                            <FormGroup>
                                                <label>Country</label>
                                                <Input
                                                    placeholder="Country"
                                                    type="text"
                                                    name="country"
                                                    value={state ? state.country : ""}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <FormGroup>
                                                <label>Postal Code</label>
                                                <Input
                                                    placeholder="ZIP Code" type="text"
                                                    name="postalcode"
                                                    value={state ? state.postalcode : ""}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>About Me</label>
                                                <Input
                                                    type="textarea"
                                                    name="aboutme"
                                                    value={state ? state.aboutme : ""}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                className="btn-round"
                                                color="primary"
                                                onClick={() => {
                                                    updateUserData();
                                                }}
                                            >
                                                Update Profile
                                            </Button>
                                        </div>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default User;
