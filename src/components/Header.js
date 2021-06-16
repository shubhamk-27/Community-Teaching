import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { auth } from "./firebase";
import { selectUser } from "../features/userSlice";
const Header = () => {
  const user = useSelector(selectUser);
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Rait_new_logo_png.png" alt="" />
          </a>
        </Logo>
        <Search>
          <div>
            <input placeholder="Search" />
          </div>
          <SearchIcons>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              data-supported-dps="16x16"
              fill="currentColor"
              width="20"
              height="20"
              focusable="false"
            >
              <path d="M14.56 12.44L11.3 9.18a5.51 5.51 0 10-2.12 2.12l3.26 3.26a1.5 1.5 0 102.12-2.12zM3 6.5A3.5 3.5 0 116.5 10 3.5 3.5 0 013 6.5z"></path>
            </svg>
          </SearchIcons>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a href="/home">
                <img src="/images/nav-home.svg" alt="" />
                <span>Home</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-network.svg" alt="" />
                <span>Live Lecture</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-jobs.svg" alt="" />
                <span>Courses</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-book.svg" alt="" />
                <span>Books</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/whiteboard.png" alt="" />
                <span>Whiteboard</span>
              </a>
            </NavList>
            <User>
              <a>
                <img src={user.photo} alt="" />
                <span>Me</span>
                <img src="/images/down-icon.svg" alt="" />
              </a>
              <SignOut onClick={() => auth.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>
            <Work>
              <a>
                <img src="/images/nav-work.svg" alt="" />
                <span>
                  Notices
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0;
  position: fixed;
  top: 0;
  width: 400vw;
  z-index: 100;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-left: 120px;
  min-height: 60px;
  max-width: 1128px;
  @media (max-width: 768px) {
    margin-left: 40px;
  }
`;

const Logo = styled.div`
  a {
    margin-right: 8px;
    
    img {
      width: 130px;
    }
  }
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      width: 220px;
      padding: 0 8px 0 48px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      text-decoration: none;
      height: 38px;
      border-radius: 2px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;
const SearchIcons = styled.div`
  margin-left: 4px;
  position: absolute;
  width: 100px;
  z-index: 1;
  top: 8px;
  left: 8px;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: white;
    width: 100%;
  }
`;

const NavListWrap = styled.nav`
  background-color: white;
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: -10px;
      left: 0;
      width: 100%;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      border-color: rgba(0, 0, 0, 0.9);
      @media (max-width: 768px) {
        bottom: 0px;
      }
    }
  }
`;
const NavList = styled.nav`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    justify-content: center;
    line-height: 1.5;
    min-height: 42px;
    min-width: 80px;
    position: relative;
    cursor: pointer;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      /* min-width: 70px; */
      background-color: #fff;
      border-top: 0.1px solid rgba(0, 0, 0, 0.2);
      min-width: 68px;
      min-height: 65px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  text-decoration: none;
  transition-duration: 167ms;
  text-align: centre;
  display: none;
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }
  a > img {
    margin: 2px 0px 0px 0px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    span {
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      margin-top: -2px;
    }
  }
  &:hover {
    ${SignOut} {
      align-items: center;
      justify-content: center;
      display: flex;
      @media(max-width: 768px) {
                top: 100px;
            }
    }
  }
`;
const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

export default Header;
