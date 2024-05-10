import { useNavigate } from "react-router-dom";
import { apiChallenge } from "../../api/apiChallenge";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Timer from "../../Components/Timer";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Excel() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  const getStatus = () => {
    apiChallenge
      .get(`/getstatus`)
      .then((response) => {
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <Header />
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "7em",
          }}
        >
          <Timer />
        </Container>
      </Row>
    </div>
  );
}