import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isSavepositionOpen, visitedModal, loginState, loginModal } from "../../recoil/recoil";
import { Styled } from "./style";
import ImageUpload from "../UploadImage/ImageUpload";
import VisitedUpload from "../UploadImage/VisitedUpload";
function ModalVisited({ visitedImg }) {
  const [isVisitedPlaceOpen, setIsVisitedPlaceOpen] = useRecoilState(visitedModal);
  const [image, setImage] = useState(""); //전역으로 바꿀수도
  const [memo, setMemo] = useState(""); //마찬가지 전역으로 바꿀수도
  const [curUserImage, setCurUserImage] = useState(null);
  const [placeImage, setPlaceImage] = useState(visitedImg);
  const [isUploaded, setIsUploaded] = useState(false);
  const [clickedBtn, setClickedBtn] = useState(false); //저장버튼 누른 후 인지 아닌지 확인하려는 용도
  const [errorMessage, setErrorMessage] = useState({
    image: "",
    memo: "",
  });
  //로긴모달창,로긴상태
  const isLogin = useRecoilValue(loginState);
  const setIsLoginOpen = useSetRecoilState(loginModal);
  useEffect(() => {
    // axios.get(`${process.env.REACT_APP_API_URL}/home/bookmark`, formData, { withCredentials: true })
  });
  function updateInfoRequest(e) {
    e.preventDefault();
    // 로긴 안한상태면 로그인부터 시킨다.
    if (!isLogin) {
      setIsVisitedPlaceOpen(false);
      setIsLoginOpen(true);
      return;
    }
    let formData = new FormData();
    // console.log("저장버튼 들어간다.", e);
    //form-data 객체의 기존 키에 새 값을 추가하거나 키가 없으면 키를 추가한다.

    formData.append("image", placeImage); // 파일
    formData.append("memo", memo); //메모
    console.log(memo);
    console.log("img", placeImage);
    console.log("폼데이터", formData);
    console.log("폼데이터imag", formData.get("image"));
    // headers: { "content-type": "multipart/form-data" },
    axios
      .post(`${process.env.REACT_APP_API_URL}/home/bookmark`, formData, { withCredentials: true })

      .then((res) => {
        console.log(res.data.message);
        setIsUploaded(true);
      })
      .catch((err) => {
        setClickedBtn(true);
        setIsUploaded(false);
        console.log(err);
        if (!isUploaded && clickedBtn) {
          setErrorMessage({ ...errorMessage, ...{ image: "이미지업로드 실패" } });
        }
      });
  }
  console.log(isUploaded && clickedBtn);
  useEffect(() => {
    //onClick으로 하니까 필요없으려나?? 우선 납둬봐
  }, [isUploaded]);
  return (
    <>
      <Styled.FormContainer>
        <Styled.CloseBtn onClick={() => setIsVisitedPlaceOpen(false)}>
          <i className="fas fa-times"></i>
        </Styled.CloseBtn>
        <form id="form-id" onSubmit={updateInfoRequest}>
          <h3>이미지</h3>
          <VisitedUpload placeImage={placeImage} setPlaceImage={setPlaceImage} />
          <div className="alert-box">{errorMessage.image}</div>
          {/* //! 업로드버튼 하나 없애 form 두개 못하겠다 */}
          {/* <button type="submit" className="image-upload-button" onClick={saveImage}>
            업로드
          </button>
        </form>
        <form> */}
          <div className="form-memo">
            <h3>메모</h3>
            {/* <label htmlFor="memo">메모</label> */}
            <input
              id="memo"
              value={memo}
              onChange={(e) => {
                console.log(e.target.value);
                setMemo(e.target.value);
              }}
            />
          </div>
          <div className="alert-box">{errorMessage.memo}</div>
          {/* //! 로긴안했으면 모달창뜨게하기, 모달창 여러개 떴을때 우선순위 정하기 */}
          <div className="button-wraaper">
            <button type="submit" className="save-position-button">
              저장
            </button>
            <button type="submit" className="delete-position-button">
              삭제
            </button>
          </div>
        </form>
      </Styled.FormContainer>
    </>
  );
}

export default ModalVisited;