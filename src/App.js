import "./App.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Buffer } from "buffer";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [queryText, setQuery] = useState("select 1");
  const [queryStatus, setQueryStatus] = useState("Pending");
  const [queryId, setQueryId] = useState("");

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

  const updateQueryText = (evt) => {
    setQuery(evt.target.value);
  };

  const sendQuery = (evt) => {
    setQueryId("Asking Flipside...");
    setQueryStatus("Asking Flipside...");

    var base64EncodedQuery = Buffer.from(queryText).toString("base64");
    base64EncodedQuery = base64EncodedQuery.replace("+", "-");
    base64EncodedQuery = base64EncodedQuery.replace("/", "_");
    base64EncodedQuery = base64EncodedQuery.replace("=", "");

    axios
      .post(
        "https://flipside-api.antonyip.com/sendQuery",
        {
          query: base64EncodedQuery,
          token: token,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (res) {
        console.log(res.data);

        if (res.data.ERROR) {
          console.log("ERROR");
          return;
        }

        setQueryId(res.data.result.queryRun.id);
        setQueryStatus(res.data.result.queryRun.state);
      });
  };

  const checkQueryStatus = (evt) => {
    setQueryStatus("Asking Flipside...");
    axios
      .post(
        "https://flipside-api.antonyip.com/getQueryStatus",
        {
          queryId: queryId,
          token: token,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (res) {
        console.log(res.data);
        setQueryStatus(res.data.result.queryRun.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getQueryResults = (evt) => {
    axios
      .post(
        "https://flipside-api.antonyip.com/getQueryResults",
        {
          queryId: queryId,
          token: token,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(function (res) {
        console.log(res.data);
      });
  };

  return (
    <div className="App">
      <br />
      <div className="Login">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm1.ControlInput1">
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
            className="mb-3"
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
          <Button
            variant="primary"
            type="button"
            onClick={(evt) => {
              getToken(evt);
            }}
          >
            Get ant-flipside-api-token
          </Button>
        </Form>
      </div>
      <br />
      <div className="Token">
        <Form>
          <Form.Group
            className="mb-3"
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
        </Form>
      </div>
      <br />
      <div className="Queries">
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm3.ControlTextarea1"
          >
            <Form.Label type="text">sendQuery</Form.Label>
            <Form.Control
              type="textarea"
              onChange={(e) => updateQueryText(e)}
              rows={6}
              defaultValue={queryText}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={(evt) => {
              sendQuery(evt);
            }}
          >
            Send Query
          </Button>
        </Form>
      </div>
      <br />
      <div className="Queries">
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm4.ControlTextarea1"
          >
            <Form.Label type="text">checkQueryStatus</Form.Label>
            <Form.Control
              type="textarea"
              rows={6}
              value={queryId}
              onChange={(evt) => {
                setQueryId(evt.target.value);
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={(evt) => {
              checkQueryStatus(evt);
            }}
          >
            Check Query Status
          </Button>
          <Form.Group
            className="mb-3"
            controlId="exampleForm4.ControlTextarea2"
          >
            <Form.Control
              type="textarea"
              rows={6}
              value={queryStatus}
              readOnly
            />
          </Form.Group>
        </Form>
      </div>
      <br />
      <div className="Queries">
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm5.ControlTextarea1"
          >
            <Form.Label type="text" id="ant-flipside-api-query-text">
              getQueryResults
            </Form.Label>
            <Form.Control
              type="textarea"
              rows={6}
              value={queryId}
              onChange={(evt) => {
                setQueryId(evt.target.value);
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={(evt) => {
              getQueryResults(evt);
            }}
          >
            Get Query Results
          </Button>
        </Form>
      </div>
      <br />
    </div>
  );
}

export default App;
