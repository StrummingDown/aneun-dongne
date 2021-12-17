import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  userInfo,
  loginState,
  loginModal,
  loginAgainModal,
  token,
  kToken,
  warningDeleteUserModal,
} from "../../recoil/recoil";
import { Styled } from "./style";
import { message } from "../../modules/message";
import ProfileUpload from "../../components/UploadImage/ProfileUpload";
import Cookies from "universal-cookie";

function Profile({ imgUrl, setImgUrl, setPrevImg, setNickname }) {
  const history = useHistory();

  const setIsLoginAgainOpen = useSetRecoilState(loginAgainModal);
  //   const [imgUrl, setImgUrl] = useState("");
  // const [prevImg, setPrevImg] = useState(
  //   "https://aneun-dongne.s3.ap-northeast-2.amazonaws.com/%E1%84%92%E1%85%A2%E1%86%B7%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5+414kb.png"
  // ); //DB에만 영향을 받는다.
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputCheckPassword, setInputCheckPassword] = useState("");
  const cookies = new Cookies();
  const [isDelete, setIsDelete] = useState(false);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const setIsLoginOpen = useSetRecoilState(loginModal);

  const [accessToken, setAccessToken] = useRecoilState(token);
  const kakaoToken = useRecoilValue(kToken);
  const [errorMessage, setErrorMessage] = useState("");
  const [isWarningModal, setWarningModal] = useRecoilState(warningDeleteUserModal);
  useEffect(() => {
    console.log(kakaoToken);
    if (kakaoToken) setErrorMessage(message.kakaoState);
  }, []);

  console.log(inputEmail);
  useEffect(() => {
    //! 우선 적음 나중에 지우게되도
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/info`, {
        headers: {
          Authorization: `Bearer ${cookies.get("jwt") || cookies.get("kakao-jwt")}`,
          // Authorization: `Bearer ${accessToken || kakaoToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);
        console.log(typeof res.data.data.userInfo.user_image_path);
        setInputEmail(res.data.data.userInfo.email);
        if (res.data.data.userInfo.user_image_path) {
          console.log(res.data.data.userInfo.user_image_path);
          setImgUrl(res.data.data.userInfo.user_image_path);
          setNickname(res.data.data.userInfo.nickname);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            //1. 토큰없는데 어떻게 마이페이지에 들어와져있을때가 있음.

            setIsLoginAgainOpen(true);
          }
        }
      });
  }, []);
  console.log(imgUrl);
  const editInfo = async (e) => {
    e.preventDefault();

    if (!kakaoToken && !accessToken) {
      setIsLoginAgainOpen(true);
      return;
    }
    let a = null;
    let formData = new FormData();
    // if(!imgUrl){
    //   formData.append("image", imgUrl);
    // }

    if (inputCheckPassword !== inputNewPassword || inputPassword < 8 || inputNewPassword.length < 8) {
      setErrorMessage(message.checkAgain);
      return;
    }
    if (imgUrl) {
      formData.append("image", imgUrl);
      console.log(imgUrl);
    }
    console.log(imgUrl);
    formData.append("nickname", inputUsername);
    formData.append("email", inputEmail);
    formData.append("password", inputPassword);
    formData.append("checkPassword", inputCheckPassword);
    formData.append("newPassword", inputNewPassword);
    // formData.append("")
    console.log(formData.get("image"));

    axios
      .patch(`${process.env.REACT_APP_API_URL}/user/info`, formData, {
        headers: {
          Authorization: `Bearer ${cookies.get("jwt") || cookies.get("kakao-jwt")}`,
          // Authorization: `Bearer ${accessToken || kakaoToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setImgUrl(res.data.data.user_image_path);
        setPrevImg(res.data.data.user_image_path);
        setNickname(res.data.data.nickname);
        setInputEmail(res.data.data.email);
        setErrorMessage(message.changedProfile);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            //1. 토큰없는데 어떻게 마이페이지에 들어와져있을때
            setIsLoginAgainOpen(true);
          } else if (err.response.status === 400) {
            //2. DB에서 확인 안될때 or 수정비번이랑 수정비번확인이 틀릴때
            setErrorMessage(message.checkAgain);
          } else if (err.response.status === 403) {
            //3. 카톡로긴일땐 정보변경을 허용하지 않음
            //403번: 유저가 누구인진 알지만 허용하지 않을때
            setErrorMessage(message.kakaoState);

            //현재비번 잘못썼을때else if()
            //닉넴잘못적었을때
          }
        }
      });
  };
  //닉네임변경
  const handleInputUsername = (e) => {
    setInputUsername(e.target.value);
  };
  //이메일변경불가
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  //비밀번호변경//유효성검사추가해야함
  const handleInputPassword = (e) => {
    setInputPassword(e.target.value);
  };

  const handleInputNewPassword = (e) => {
    setInputNewPassword(e.target.value);
  };
  const handleInputCheckPassword = (e) => {
    setInputCheckPassword(e.target.value);
  };

  //유효성검사
  const validPassword = (inputCheckPassword, inputNewPassword) => {
    if (inputCheckPassword !== inputNewPassword) {
      setErrorMessage({ ...errorMessage, ...{ checkPasswordErr: "비밀번호가 일치하지 않습니다." } });
      return false;
    }
  };

  //빈칸이 있는지 확인
  const handleEdit = () => {
    if (imgUrl === "" || inputUsername === "" || inputEmail === "" || inputPassword === "") {
      alert("빈칸이 있어요!");
      return;
    }
  };

  //회원탈퇴모달 오픈 (회원탈퇴로직 ModalWarningDeleteUserInfo/WaringDeleteUserInfo.js)
  const openWarningModalHandler = () => {
    setWarningModal(true);
  };

  return (
    <div>
      <Styled.UserInfopage>
        <Styled.View>
          <Styled.ImgDiv>
            <ProfileUpload imgUrl={imgUrl} setImgUrl={setImgUrl} />
          </Styled.ImgDiv>

          <Styled.ContentBox>
            <form onSubmit={editInfo}>
              <div className="userinfo-each-label">
                <input type="text" name="nickname" placeholder="새로운 닉네임" onChange={handleInputUsername} />
              </div>
              <div className="userinfo-each-label">
                <input type="text" value={inputEmail} readOnly />
                {/* <div>{inputEmail} </div> */}
              </div>
              <div className="userinfo-each-label">
                <input
                  type="password"
                  name="password"
                  // defaultValue=""
                  placeholder="현재 비밀번호"
                  value={inputPassword}
                  onChange={(e) => handleInputPassword(e)}
                />
              </div>

              <div className="userinfo-each-label">
                <input
                  type="password"
                  name="password"
                  // defaultValue=""
                  placeholder="새로운 비밀번호"
                  value={inputNewPassword}
                  onChange={(e) => handleInputNewPassword(e)}
                />
              </div>
              <div className="userinfo-each-label">
                <input
                  type="password"
                  name="password"
                  placeholder="새로운 비밀번호 확인"
                  // defaultValue=""
                  value={inputCheckPassword}
                  onChange={(e) => handleInputCheckPassword(e)}
                />
              </div>
              <div className="alert-box">{errorMessage}</div>
              <div className="userinfo-button-label">
                <button className="btn-exit" onClick={openWarningModalHandler}>
                  회원탈퇴
                </button>
                <button className="btn-edit" type="submit">
                  저장
                </button>
              </div>
            </form>
          </Styled.ContentBox>
        </Styled.View>
      </Styled.UserInfopage>
    </div>
  );
}

export default Profile;
