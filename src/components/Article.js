import React, { useState, useEffect } from "react";
import styled from "styled-components";
import db from "./firebase";

import { selectUser } from "../features/userSlice";
import {
  selectQuestionId,
  selectQuestionName,
  setQuestionInfo,
} from "../features/questionSlice";
import Modal from "react-modal";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
function Article({ Id, question, imageUrl, timestamp, users }) {
  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const questionId = useSelector(selectQuestionId);
  const [answer, setAnswer] = useState("");
  const [getAnswers, setGetAnswers] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const QuestionName = useSelector(selectQuestionName);
  useEffect(() => {
    if (questionId) {
      db.collection("questions")
        .doc(questionId)
        .collection("answer")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setGetAnswers(
            snapshot.docs.map((doc) => ({ id: doc.id, answers: doc.data() }))
          )
        );
    }
  }, [questionId]);

  const handleAnswer = (e) => {
    e.preventDefault();

    if (questionId) {
      db.collection("questions").doc(questionId).collection("answer").add({
        user: user,
        answer: answer,
        questionId: questionId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    console.log(questionId);
    setAnswer("");
    setIsModalOpen(false);
  };
 
  return (
    <div>
      <Container
       onClick={() =>
              dispatch(
                setQuestionInfo({
                  questionId: Id,
                  questionName: question,
                })
              )
            }>
        <SharedActor>
          <a>
            <img src={users.photo} alt="" />
            <div>
              <span>{users.displayName ? users.displayName : users.email}</span>
              <span>{users.email}</span>
              <span>{new Date(timestamp?.toDate()).toLocaleString()}</span>
            </div>
            <button>
              <img className="menu" src="/images/menu.svg" alt="" />
            </button>
          </a>
        </SharedActor>
        <Description>{question}</Description>
        <SharedImg>
          <a>
            <img src={imageUrl ? imageUrl : null} alt="" />
          </a>
        </SharedImg>
        <SocialActions>
          <button onClick={() => setIsModalOpen(true)}>
            <img src="data:image/jpeg;base64,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" />
            <span>Answer</span>
          </button>
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
            <ModalQuestion>
              <button onClick={() => setIsModalOpen(false)}>
                <img src="data:image/png;base64,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" />
              </button>
              <h1>"{question}"</h1>
              <p>
                asked by{" "}
                <span className="name">
                  {users.displayName ? users.displayName : users.email}
                </span>{" "}
                {""}
                on{" "}
                <span className="name">
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </span>
              </p>
            </ModalQuestion>
            <ModalAnswer>
              <textarea
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
              />
            </ModalAnswer>
            <ModalButtons>
              {/* <button onClick={() => setIsModalOpen(false)}>Cancel</button> */}
              <button onClick={handleAnswer}>Add Answer</button>
            </ModalButtons>
          </Modal>
        </SocialActions>
        <ViewAnswers>
          <button
           
          >
            View All Answers
            <img src="data:image/png;base64,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" />
          </button>
        </ViewAnswers>
        <Answers>
          {getAnswers.map(({ id, answers }) => (
            <p
              key={id}
              style={{
                
                // paddingBottom: "17px",
                // paddingRight: "350px",
                borderBottom: "1px solid rgba(0,0,0,0.4)",
                margin: "8px 0px 0px 0px",
              }}
            >
              {Id === answers.questionId ? (
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      // position: "absolute",
                      // color: "gray",
                      // fontSize: "small",
                      // display: "flex",
                      right: "0px",
                    }}
                  >
                    <span style={{ color: "#b92b27" }}>
                      by{" "}
                      '{answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.email}{" "}'
                      on{" "}
                      '{new Date(answers.timestamp?.toDate()).toLocaleString()}'
                    </span>
                  </span>
                </span>
              ) : (
                ""
              )}
            </p>
          ))}
        </Answers>
      </Container>
    </div>
  );
}

export default Article;

const Container = styled.div`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: #000;
        }
        &:nth-child(n + 2) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
    .menu {
      width: 20px;
    }
  }
  button {
    position: absolute;
    top: 0;
    right: 12px;
    border: none;
    outline: none;
    background: transparent;
  }
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    width: 80%;
    height: 80%;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  box-sizing: inherit;
  display: block;
  overflow: visible;
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  /* margin: 0 16px; */
  margin: 0;
  background: transparent;
  align-items: center;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  img {
    width: 20px;
    height: 20px;
    border: none;
    display: flex;
    align-items: center;
  }
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      background: transparent;
      border: none;
      align-items: center;
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 4px 8px;
  img {
    width: 20px;
    height: 20px;
    border: none;
    display: flex;
    align-items: center;
  }
  button {
    justify-content: center;
    align-items: center;
    font-size: 17px;
    width: 100%;
    display: inline-flex;
    padding: 8px;
    color: #0a66c2;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    background: transparent;

    span {
      margin-left: 4px;
    }
    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

const ViewAnswers = styled(SocialActions)`
  background-color: transparent;
  button {
    font-size: 16px;
    width: 100%;
    padding-right: 2px;
    text-decoration: none;
    img {
      border: none;
      background-color: transparent;
    }
  }
`;

const Answers = styled.div`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
  /* border-bottom: "1px solid rgba(0,0,0,0.09)"; */
`;

const ModalQuestion = styled.div`
  button {
    flex: 0;
    margin-left: 450px;

    border: none;
    img {
      width: 10px;
    }
  }
  h1 {
    font-size: 25px;
    padding: 2px;
  }
  p {
    margin: 6px 0px 0px 10px;
  }
`;
const ModalAnswer = styled.div`
  textarea {
    margin: 15px 8px 0px 0px;
    width: 100%;
    height: 200px;
  }
`;
const ModalButtons = styled.div`
  button {
    margin-top: 10px;
    width: 100px;
    height: 25px;
    border-radius: 10px;
    margin-left: 280px;
    justify-content: space-between;
  }
`;
