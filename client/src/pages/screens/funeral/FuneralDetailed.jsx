import React, { useState, useEffect } from "react";
import api from "../../../api";
import {
  Container,
  Col,
  Row,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import FuneralForm from "./FuneralForm";
import Condolence from "./Condolence";
import formatDateOfDeath from "./helper";

const FuneralDetailed = ({ match, updateGlobalValues }) => {
  const [funeralMember, setFuneralMember] = useState(null);
  const [flowerSelected, setFlowerSelected] = useState(1);
  const [textArea, setTextArea] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFuneral = async (id) => {
      let data;
      try {
        data = await api.getFuneral(id);
      } catch (err) {
        console.error("Error: ", err);
        return updateGlobalValues(err);
      }
      setFuneralMember(data.funeralMember);
      updateGlobalValues(updateGlobalValues);
      setLoading(false);
    };

    const id = match.params.id;
    getFuneral(id);
  }, []);

  const handleNewCondolence = async () => {
    let data;
    try {
      data = await api.postFuneralComment(
        match.params.id,
        textArea,
        flowerSelected
      );
    } catch (err) {
      console.error("Error: ", err);
      return updateGlobalValues(err, true, true);
    }
    updateGlobalValues(data);
    setFuneralMember(data.funeralMember);
    setTextArea("");
    setFlowerSelected(1);
  };

  return (
    <div>
      {loading && <p>Loading..</p>}
      {!!funeralMember && (
        <Container>
          <h1 className="mt-3">{`${funeralMember.name}'s funeral`}</h1>
          <Row className="d-flex flex-column align-items-center">
            <Col sm="10" md="4">
              <Card className="mt-3">
                <CardImg
                  top
                  width="100%"
                  src={funeralMember.avatar}
                  alt={funeralMember.name}
                />
                <CardBody>
                  <CardTitle tag="h5">
                    {funeralMember.name} was shutdown{" "}
                    {formatDateOfDeath(funeralMember.createdAt)}
                  </CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {funeralMember.bounty
                      ? `A bounty of was {funeralMember.bounty} claimed`
                      : "-"}
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <h2 className="mt-5 mb-3">Condolences</h2>
          <Row className="d-flex flex-column align-items-center">
            {funeralMember.comments.map((comment, i) => {
              return (
                <Col
                  key={`${comment.comment}${i}`}
                  className="my-2 "
                  sm="12"
                  md="8"
                >
                  <Condolence
                    creator={comment.creator}
                    flower={comment.flower}
                    comment={comment.comment}
                  />
                </Col>
              );
            })}
          </Row>
          <h2 className="mt-5 mb-3">Pay your respect</h2>
          <Row className="d-flex flex-column align-items-center">
            <Col className="my-2 " sm="12" md="8">
              <FuneralForm
                handleNewCondolence={handleNewCondolence}
                textArea={textArea}
                setTextArea={setTextArea}
                flowerSelected={flowerSelected}
                setFlowerSelected={setFlowerSelected}
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};
export default FuneralDetailed;
