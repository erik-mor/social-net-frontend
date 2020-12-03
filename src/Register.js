import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Register = () => {
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_manager, setIsManager] = useState("");
  const [location, setLocation] = useState(false);
  const [error, setError] = useState(false);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeIsManager = (e) => {
    const isManager = e.target.checked;
    setIsManager(isManager);
  };

  const onChangeLocation = (e) => {
    const allowLocation = e.target.checked;
    setLocation(allowLocation);
  };

  const callback = (position) => {
    console.log(position);
    callAPI(position.coords.longitude, position.coords.latitude);
  };

  const onError = () => {
    callAPI(null, null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (location) {
        if (navigator.geolocation) {
          console.log("Here");
          navigator.geolocation.getCurrentPosition(callback, onError);
        } else {
          console.log("Not supported operation");
        }
      } else {
        onError();
      }
    }
    setValidated(true);
  };

  const callAPI = (long, lat) => {
    console.log(long, lat);
    let user = {
      username,
      first_name,
      last_name,
      email,
      password,
      is_manager,
      long,
      lat,
    };

    fetch(`http://localhost:8080/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          setError(false);
          resetForm();
        } else {
          setError(true);
        }
        setMessage(res.message);
      });
  };

  const resetForm = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setLocation(false);
    setIsManager(false);
    setPassword("");
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Enter username</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={onChangeUsername}
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="firstName">
        <Form.Label>Enter first name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter first name"
          value={first_name}
          onChange={onChangeFirstName}
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>Enter last name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter last name"
          value={last_name}
          onChange={onChangeLastName}
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Are you a manager"
          checked={is_manager}
          onChange={onChangeIsManager}
        />
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Check
          type="checkbox"
          label="Accept using your location"
          checked={location}
          onChange={onChangeLocation}
        />
        <Form.Text className="text-muted">
          Without your location we will not be able to include you in
          discoveries.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Alert
        variant={error ? "danger" : "success"}
        style={{ marginTop: "10px" }}
        hidden={!message.length}
      >
        {message}
      </Alert>
    </Form>
  );
};

export default Register;
