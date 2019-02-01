import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Container,
  Label
} from "reactstrap";

const defaultState = {
  name: "",
  email: "",
  password: "",
  errors: {
    name: false,
    email: false,
    password: false
  },
  message: {
    name: "",
    email: "",
    password: ""
  },
  touched: {
    name: false,
    email: false,
    password: false
  }
};

class MyForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errors: {
      name: false,
      email: false,
      password: false
    },
    message: {
      name: "Name Must Be At Least 3 Characters",
      email: "Email Is Not Valid",
      password: "Password Is Invalid!"
    },
    touched: {
      name: false,
      email: false,
      password: false
    }
  };

  emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  passwordRegex = new RegExp(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
  );

  handleChange = evt => {
    const isCheckbox = evt.target.type === "checkbox";
    this.setState({
      [evt.target.name]: isCheckbox ? evt.target.checked : evt.target.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState(defaultState);
    console.log(this.state);
  };

  validate = (name, email, password) => {
    // true means invalid, false is valid
    return {
      name: name.length > 3 ? false : true,
      email: !this.emailRegex.test(email),
      password: !this.passwordRegex.test(password)
    };
  };

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  render() {
    const { name, email, password } = this.state;
    const errors = this.validate(name, email, password);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);
    console.log(errors);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <Container style={{ marginTop: "3rem" }}>
        <Form
          className="d-flex flex-column align-items-center"
          onSubmit={this.handleSubmit}
        >
          <FormGroup row>
            <Col md={12}>
              <Label for="exampleName">Name</Label>
              <Input
                name="name"
                id="exampleName"
                className={shouldMarkError("name") ? "error" : ""}
                value={this.state.name}
                onBlur={this.handleBlur("name")}
                onChange={this.handleChange}
              />
              {errors.name && this.state.touched.name ? (
                <span>{this.state.message.name}</span>
              ) : null}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md={12}>
              <Label for="exampleEmail">Email</Label>
              <Input
                name="email"
                id="exampleEmail"
                className={shouldMarkError("email") ? "error" : ""}
                value={this.state.email}
                onBlur={this.handleBlur("email")}
                onChange={this.handleChange}
              />
              {errors.email && this.state.touched.email ? (
                <span>{this.state.message.email}</span>
              ) : null}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md={12}>
              <Label for="examplePassword">Password</Label>
              <Input
                className={shouldMarkError("password") ? "error" : ""}
                type="password"
                name="password"
                id="examplePassword"
                value={this.state.password}
                onBlur={this.handleBlur("password")}
                onChange={this.handleChange}
              />
              {errors.password && this.state.touched.email ? (
                <span>{this.state.message.password}</span>
              ) : null}
            </Col>
          </FormGroup>

          <Button
            disabled={!isEnabled}
            outline
            size="lg"
            color="success"
            type="submit"
            className="block m-2"
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default MyForm;
