import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Modal from "react-modal";
import firebase from "firebase";
import db, { auth } from "./firebase";
import Article from "./Article";
const Main = () => {
  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);
  Modal.setAppElement("#root");
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const questionName = input;

  const handleQuestion = (e) => {
    e.preventDefault();

    if (questionName) {
      db.collection("questions").add({
        user: user,
        question: input,
        imageUrl: inputUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInput("");
    setInputUrl("");
    setIsModalOpen();
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("questions")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            questions: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <Container>
      <ShareBox onClick={() => setIsModalOpen(true)}>
        <div>
          <img src={user.photo} />
          <button>Start a post</button>
        </div>
        <div>
          <button>
            <img src="/images/image.png" />
            <span>Photo</span>
          </button>

          <button>
            <img src="/images/video-camera.png" />
            <span>Video</span>
          </button>

          <button>
            <img src="/images/event.png" />
            <span>Events</span>
          </button>

          <button>
            <img src="/images/edit.png" />
            <span>Write Article</span>
          </button>
        </div>
        <Modal
          isOpen={IsmodalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 600,
              height: 450,
              backgroundColor: "rgba(0,0,0,0.09)",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-280px",
              marginLeft: "-295px",
            },
          }}
        >
          <ModalTitle>
            <h5>Ask a Question</h5>
            {/* <button onClick={() => setIsModalOpen(false)}>
              <img src="data:image/png;base64,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" />
            </button> */}
          </ModalTitle>
          <ModalInfo>
            <img
              src={
                user.photo
                  ? user.photo
                  : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
              }
            />
            <p>{user.displayName ? user.displayName : user.email}</p>
            {/* <div className="modal__scope"> 
              <p>Public</p>
            </div> */}
          </ModalInfo>
          <ModalField>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="What is your question?"
            />
            <div className="modal__fieldLink">
              <input
                required
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Inclue a image link that gives context."
              />
            </div>
          </ModalField>
          <ModalButtons>
            {/* <button className="cancle" onClick={() => setIsModalOpen(true)}>
              Cancel
            </button> */}
            <button type="sumbit" onClick={handleQuestion} className="add">
              Post
            </button>
          </ModalButtons>
        </Modal>
      </ShareBox>
      {posts.map(({ id, questions }) => (
        <Article
          key={id}
          Id={id}
          question={questions.question}
          imageUrl={questions.imageUrl}
          timestamp={questions.timestamp}
          users={questions.user}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
  width: 100%;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
          width: 20px;
          height: 20px;
          padding: 0 6px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const ModalTitle = styled.div`
  padding: 0px 0px 6px 2px;
  display: flex;
  flex: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  button {
    flex: 0;
    margin-left: 280px;
    border: none;
    img {
      width: 10px;
    }
  }
`;
const ModalInfo = styled.div`
  display: flex;
  img {
    margin: 20px 0px 0px 0px;
    width: 35px;
    border-radius: 24px;
  }
  p {
    margin: 27px 0px 0px 6px;
  }
`;
const ModalField = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  flex: 1;
  input {
    width: 100%;
    height: 100px;
    flex: 1;
    border: none;
    outline: none;
    margin-left: 0px;
    &:hover {
      border: none;
    }
  }
`;
const ModalButtons = styled.div`
  border-top: 1px solid lightgray;
  margin-top: 60px;
  button {
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 100px;
    height: 25px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
  }
`;
export default Main;
