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
  console.log(flowerSelected, "flowerSelected");
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
            <FormGroup className="d-flex flex-column" key={flower} check>
              <Label check>
                <Input
                  defaultChecked={i === 0}
                  onClick={() => setFlowerSelected(i)}
                  value={flowerSelected === i + 1}
                  type="radio"
                  name="radio"
                />
                {flowerPrices[flower]}
              </Label>
              <img src={`../flowerPics/${i + 1}.jpg`} alt="" srcset="" />
            </FormGroup>
          );
        })}
      </FormGroup>
      <Button onClick={handleNewCondolence}>Pay your respect</Button>
    </Form>
  );
};

export default FuneralForm;
