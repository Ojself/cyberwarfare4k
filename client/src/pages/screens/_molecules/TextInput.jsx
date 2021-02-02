import React from 'react'
    import {Button,
  FormGroup,
  Input} from "reactstrap"

const TextInput = ({
  user,
  handleTextAreaChange,
  handleCommentPost,
  textArea,
}) => {
  
  return (
    <div className="d-flex" style={{ minHeight: "30vh" }}>
      <div
        className="d-flex flex-column align-items-center"
        style={{
          maxWidth: "15%",
          minWidth: "15%",
          paddingTop: "4vmin",
          wordBreak: "break-all",
        }}
      >
        <img
          style={{
            maxWidth: "120px",
            width: "100%",
            borderRadius: "50%",
            marginBottom: "1vmin",
          }}
          src={user.account.avatar}
          alt="Hacker Avatar"
        />
      </div>
      <div
        className="d-flex flex-column justify-content-center"
        style={{
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <FormGroup
          style={{
            width: "100%",
            height: "85%",
          }}
        >
          <Input
            style={{
              paddingTop: "1.5vmin",
              paddingLeft: "2vmin",
              backgroundColor: "#030303",
              height: "100%",
              color: "#f8f9fa",
            }}
            maxLength={250}
            value={textArea} // AAAAA
            onChange={handleTextAreaChange}
            required={true}
            type="textarea"
            name="text"
            placeholder="write your post.."
          />
        </FormGroup>

        <Button
          style={{ width: "10vw" }}
          disabled={textArea.length < 2 || textArea.length > 254}
          onClick={() => handleCommentPost()}
          color="primary"
        >
          Post
        </Button>
      </div>
    </div>
  );
};
    





export default TextInput
