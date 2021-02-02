import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const flowers = ["1", "2", "3", "4", "5"];
const flowerPrices = {
  1: 50,
  2: 1000,
  3: 75000,
  4: 250000,
  5: 1000000,
};

const FuneralForm = ({
  handleNewCondolence,
  setFlowerSelected,
  flowerSelected,
  textArea,
  setTextArea,
}) => {
  const handleTextAreaChange = (e) => {
    setTextArea(e.target.value);
  };

  return (
    <Form>
      <FormGroup>
        <Input
          value={textArea}
          onChange={handleTextAreaChange}
          type="textarea"
          name="text"
          id="funeralComment"
          placeholder="Your message"
        />
      </FormGroup>
      <FormGroup className="d-flex" tag="fieldset">
        <legend>Flower arrangement</legend>
        {flowers.map((flower, i) => {
          return (
            <FormGroup key={flower} className="d-flex flex-column m-auto" check>
              <Label check>
                <Input
                  defaultChecked={i === 0}
                  onClick={() => setFlowerSelected(i + 1)}
                  value={flowerSelected === i + 1}
                  type="radio"
                  name="radio"
                />
                {flowerPrices[flower]}
              </Label>
              <img
                src={`../flowerPics/${i + 1}.jpg`}
                alt={`Flower Decoration ${i + 1}`}
              />
            </FormGroup>
          );
        })}
      </FormGroup>
      <Button onClick={handleNewCondolence}>Pay your respect</Button>
    </Form>
  );
};

export default FuneralForm;
