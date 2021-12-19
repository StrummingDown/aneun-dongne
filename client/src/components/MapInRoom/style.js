import styled from "styled-components";

export const Styled = {
  Div: styled.div`
    position: relative;
    width: 100%;
    margin-top: 3%;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 1px rgb(192, 251, 255) solid;
    box-shadow: 4px 4px 4px rgb(85, 85, 85);

    text-decoration: inherit;
    &:hover {
      transform: scale(1.05);
      box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
        4px 4px 5px 0px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
  `,
  Map: styled.div`
    width: 600px;
    height: 400px;
    border-radius: 10px;
    margin: auto;
    margin-bottom: 1rem;
    @media (max-width: 768px) {
      width: 80%;
      height: 300px;
      margin: auto;
    }
    @media (max-width: 612px) {
      margin: auto;
    }
  `,
  Address: styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-self: center;
    > a {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 3px;
    }
    > a img {
      width: 30px;
      height: 30px;
      text-decoration: none;
      color: black;
      border-radius: 10px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  `,
};
