import React, { useState, useEffect } from "react";
import api from "../../../api";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";

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
    console.log("New condolences");
    console.log(textArea, flowerSelected);
  };

  return (
    <div>
      {loading && <p>Loading..</p>}
      {!!funeralMember && (
        <>
          <h1>{`${funeralMember.name} funeral`}</h1>
          <Card>
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
              {funeralMember.bounty && (
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  A bounty of was {funeralMember.bounty} claimed
                </CardSubtitle>
              )}
            </CardBody>
          </Card>
          <h2>Condolences</h2>
          {funeralMember.comments.map((comment) => {
            return (
              <Condolence
                key={comment}
                creator={comment.creator}
                flower={comment.flower}
                comment={comment.comment}
              />
            );
          })}
          <h2>Pay Your Respect</h2>
          <FuneralForm
            handleNewCondolence={handleNewCondolence}
            textArea={textArea}
            setTextArea={setTextArea}
            flowerSelected={flowerSelected}
            setFlowerSelected={setFlowerSelected}
          />
        </>
      )}
    </div>
  );
};
export default FuneralDetailed;
