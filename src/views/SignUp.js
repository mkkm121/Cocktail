import { Component } from 'react';
import {
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Label,
    Input,
    Button,
} from 'reactstrap';
import AuthService from "../services/auth.service";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            username: '',
            validate: {
                emailState: '',
                passwordConfirmation: '',
            },
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        this.setState({
            [name]: value,
        });
    };

    validateEmail(e) {
        const emailRex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const { validate } = this.state;

        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success';
        } else {
            validate.emailState = 'has-danger';
        }

        this.setState({ validate });
    }

    validatePassword(e, password) {
        console.log(password)
        console.log(e)
        console.log(e.target.value)
        const { validate } = this.state;

        if (password == e.target.value)
            validate.passwordConfirmation = 'has-success';
        else
            validate.passwordConfirmation = 'has-danger';


        this.setState({ validate });
    }

    submitForm(e) {
        e.preventDefault();
        if(this.state.password == this.state.passwordConfirmation) {
            AuthService.register(this.state.username, this.state.email, this.state.password).then(
                () => {
                    this.props.history.push("/login");
                    // window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(resMessage)
                }
            );
        }
    }

    render() {

        const { email, password, passwordConfirmation, username } = this.state;
        return (
            <div className="content">
            <div className="App">
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="mojito123PL"
                            value={username}
                            onChange={(e) => {
                                this.handleChange(e);
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="example@example.com"
                            valid={this.state.validate.emailState === "has-success"}
                            invalid={this.state.validate.emailState === "has-danger"}
                            value={email}
                            onChange={(e) => {
                                this.validateEmail(e);
                                this.handleChange(e);
                            }}
                        />
                        <FormFeedback>
                            Uh oh! Looks like there is an issue with your email. Please input
                            a correct email.
                        </FormFeedback>
                        <FormFeedback valid>
                            That's a tasty looking email you've got there.
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="********"
                            value={password}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordConfirmation">Confirm password</Label>
                        <Input
                            type="password"
                            name="passwordConfirmation"
                            id="passwordConfirmation"
                            placeholder="********"
                            value={passwordConfirmation}
                            valid={this.state.validate.passwordConfirmation === "has-success"}
                            invalid={this.state.validate.passwordConfirmation === "has-danger"}
                            onChange={(e) => {
                                this.validatePassword(e, password);
                                this.handleChange(e);
                            }}
                        />
                        <FormFeedback valid>
                            Passwords are identical
                        </FormFeedback>
                        <FormFeedback >
                            Passwords do not match
                        </FormFeedback>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
            </div>
        );
    }
}

export default SignUp;