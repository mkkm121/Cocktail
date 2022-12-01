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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            validate: {
                emailState: '',
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
      /*  const emailRex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const { validate } = this.state;

        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success';
        } else {
            validate.emailState = 'has-danger';
        }*/
        const { validate } = this.state;
validate.emailState = 'has-success';
        this.setState({ validate });
    }

    submitForm(e) {
        e.preventDefault();
        console.log(`Email: ${this.state.email}`);
        console.log(`Password: ${this.state.password}`);
        AuthService.login(this.state.email, this.state.password).then(
            () => {
                this.props.history.push("/user");
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

        e.preventDefault();
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className="content">
            <div className="App">
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input

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
                        <FormText>Your username is most likely your email.</FormText>
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
                    <Button  type={"submit"}>Submit</Button>
                </Form>
            </div>
            </div>
        );
    }
}

export default Login;