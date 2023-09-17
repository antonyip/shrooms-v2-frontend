import axios from "axios";

import { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { Buffer } from "buffer";

import Navigation from "../Components/Navigation/Navigation";
import User from "../Components/User/User";
import { CurrentUserContext } from "../Components/User/UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [queryText, setQuery] = useState("select 1");
  const [queryStatus, setQueryStatus] = useState("Pending");
  const [queryId, setQueryId] = useState("");

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
          setQueryId("Missing/Wrong Token?");
          setQueryStatus("Missing/Wrong Token?");
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
        if (!res.data.result?.queryRun?.state) {
          setQueryStatus("No such query...");
          return;
        }
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

  const cancelQuery = (evt) => {
    setQueryStatus("Query Canceled.. Check Flipside's API to finalize.");
    axios
      .post(
        "https://flipside-api.antonyip.com/cancelQuery",
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
    <>
      <Navigation></Navigation>
      <br />
      <CurrentUserContext.Provider
        value={{
          username,
          setUsername,
          password,
          setPassword,
          token,
          setToken,
        }}
      >
        <User></User>
      </CurrentUserContext.Provider>
      <Container>
        <Form as={Row}>
          <Form.Group
            className="mb-3"
            controlId="exampleForm3.ControlTextarea1"
            as={Col}
            xs={12}
          >
            <Form.Label type="text" className="h2">
              sendQuery
            </Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => updateQueryText(e)}
              rows={6}
              defaultValue={queryText}
            />
          </Form.Group>
          <Button
            as={Col}
            xs={12}
            variant="primary"
            type="button"
            onClick={(evt) => {
              sendQuery(evt);
            }}
          >
            Send Query
          </Button>
        </Form>
      </Container>
      <Container>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm4.ControlTextarea1"
          >
            <Form.Label type="text" className="h2">
              checkQueryStatus
            </Form.Label>
            <Form.Control
              as="input"
              rows={6}
              value={queryId}
              aria-describedby="btn-check-query-status"
              onChange={(evt) => {
                setQueryId(evt.target.value);
              }}
            />
            <Button
              id="btn-check-query-status"
              variant="primary"
              type="button"
              onClick={(evt) => {
                checkQueryStatus(evt);
              }}
            >
              Check Query Status
            </Button>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm4.ControlTextarea2"
          >
            <Form.Control as="input" rows={6} value={queryStatus} readOnly />
          </Form.Group>
        </Form>
      </Container>
      <Container>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm5.ControlTextarea1"
          >
            <Form.Label
              type="text"
              id="ant-flipside-api-query-text"
              className="h2"
            >
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
      </Container>
      <Container>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm6.ControlTextarea1"
          >
            <Form.Label
              type="text"
              id="ant-flipside-api-query-text"
              className="h2"
            >
              cancelQuery
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
              cancelQuery(evt);
            }}
          >
            Cancel Query
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;
