import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Kirjaudu({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const baseUrl = "http://127.0.0.1:8000/"

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const form_data = new FormData();
  form_data.append('username', username)
  form_data.append('password', password)

  async function loginUser() {
    return fetch(baseUrl + 'kirjaudu', {
      method: 'POST',
      headers: {
      },
      body: form_data
    })
      .then(data => data.json())
  }

  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser();
    setToken(token);
    nav("/admin");
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Käyttäjätunnus</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Salasana</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
