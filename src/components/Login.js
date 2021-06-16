import React from "react";
import styled from "styled-components";
import { auth, provider } from "./firebase";

const Login = (props) => {
  const googleSignIn = () => {
    auth.signInWithPopup(provider).catch((e) => alert(e.message));
  };
  return (
    <Container>
      <Nav>
        <a class = "logo" href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Rait_new_logo_png.png" alt="" />
        </a>
        <div>
          <Join>
            <a>
              <h1>Join Now</h1>
            </a>
          </Join>
          <SignIn>
            <h1>Sign In</h1>
          </SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          {/* <h1>Welcome to RAIT</h1> */}
          <img src="/images/login-hero.svg" alt="" />
        </Hero>
        <Form>
          <Google onClick={googleSignIn}>
            <img src="/images/google.svg" alt="" />
            Join with Google
          </Google>
        </Form>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
`;
const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  img {
    width: 200px;
    margin-top: -20px;
  }
  & > a {
    width: 135px;
    height: 34px;
    
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-weight: 600;
  display: inline-block;
  font-size: 18px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
    border-radius: 4px;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  display: inline-block;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 18px;
  font-weight: 600;
  line-height: 40px;
  padding: 2px 24px;
  text-align: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    text-decoration: none;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128%;
  align-items: center;
  margin-left: 120px;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 20px;
    width: 40%;
    font-family: "Times New Roman", Times, serif;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      font-size: 56px;
    }
  }
  img {
    /* z-index: -1; */
    width: 700px;
    position: absolute;
    right: 150px;
    bottom: 150px;
   
    top: 20px;
    @media (max-width: 768px) {
      top: 300px;
      width: 350px;
      position: initial;
      margin-left: 60px;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 20px;
    margin-left: -20px;
  }
`;
const Google = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  cursor: pointer;
  background-color: #ffff;
  border-radius: 24px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%),
    inset 0 0 0 1px rgb(0 0 0 / 0%);
  vertical-align: middle;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
  @media (max-width: 768px) {
    margin-left: 60px;
  }
`;
export default Login;
