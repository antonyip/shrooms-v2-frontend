import axios from "axios";
import { useUserContext } from "./UserContext";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

function User() {
  const { username, setUsername, password, setPassword, token, setToken } =
    useUserContext();

  const getToken = (evt) => {
    setToken("");
    axios
      .post(
        "https://flipside-api.antonyip.com/getToken",
        {
          username: username,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (res) {
        if (!res.data) return;
        console.log(res.data);
        if (res.data.ERROR) return;
        setToken(res.data.token);
      });
  };

  return (
    <Container>
      <Form>
        <Row>
          <Form.Group
            as={Col}
            xs={3}
            className="mb-3"
            controlId="exampleForm1.ControlInput1"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              rows={6}
              placeholder="Antonidas"
              value={username}
              onChange={(evt) => {
                setUsername(evt.target.value);
              }}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            className="mb-3"
            xs={3}
            controlId="exampleForm1.ControlTextarea1"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              rows={6}
              value={password}
              onChange={(evt) => {
                setPassword(evt.target.value);
              }}
            />
          </Form.Group>
          <Col xs={2} className="mb-3">
          <Button
              variant="primary"
              type="button"
              onClick={(evt) => {
                getToken(evt);
              }}
            >
              Get ant-flipside-api-token
            </Button>
          </Col>
          <Form.Group
            as={Col}
            className="mb-3"
            xs={4}
            controlId="exampleForm2.ControlTextarea1"
          >
            <Form.Label type="password">ant-flipside-api-token</Form.Label>
            <Form.Control
              type="password"
              rows={6}
              value={token}
              onChange={(evt) => {
                setToken(evt.target.value);
              }}
            />
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
}

export default User;
