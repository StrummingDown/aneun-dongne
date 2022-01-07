import React, { useEffect, useState } from "react";
import axios from "axios";
import { Styled } from "./style";
import HomeMap from "../../components/HomeMap/HomeMap";
import PlaceList from "../../components/PlaceList/PlaceList";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loading, defaultposition, nowlocation, usersaddress, searchPlaceModal } from "../../recoil/recoil";
import Loading from "../../components/Loading/Loading";

import { toast } from "react-toastify";
import HomeRightbar from "../../components/HomeSearchBar/Home-Rightbar-index";

function Home() {
  //atom값을 참조하지 않아야 리렌더링이 안됨.
  const setOpenSearchPlaceModal = useSetRecoilState(searchPlaceModal);
  const setNowLocation = useSetRecoilState(nowlocation);
  // const [isLoading, setIsLoading] = useState(true);
  const setAdd = useSetRecoilState(usersaddress);
  const setDefaultPosition = useSetRecoilState(defaultposition);

  // * 현재위치 받는 useEffect

  // useEffect(() => {
  //   const getPosition = () => {
  //     // navigator.geolocation.watchPosition()를 사용하고 있었는데
  //     //이는 사용자 움직임에 따라 계속 위치정보 갱신
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude;
  //         const lon = position.coords.longitude;
  //         console.log("---", isLoading);
  //         setNowLocation({ lat, lon });
  //         // setDefaultPosition({ lat, lon });
  //         axios
  //           .get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`, {
  //             headers: { Authorization: `KakaoAK ${process.env.REACT_APP_REST_API}` },
  //           })
  //           .then((res) => {
  //             return res.data.documents[0].address;
  //           })
  //           .then((address) => {
  //             setAdd({
  //               area: address.region_1depth_name,
  //               sigg: address.region_2depth_name,
  //               address: address.address_name,
  //             });
  //           })
  //           .catch((err) => console.log(err));
  //         setIsLoading(false);
  //       },
  //       (err) => {
  //         toast.error("위치권한을 허용해주세요", {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       }
  //     );
  //   };
  //   getPosition();
  // }, []);

  return (
    <>
      <Styled.FixedComp>
        <>
          <Styled.DivRow>
            <Styled.DivColumn className="second">
              <HomeMap />

              <Styled.OpenModalBtn onClick={() => setOpenSearchPlaceModal(true)}>지역검색창열기</Styled.OpenModalBtn>
            </Styled.DivColumn>
            <Styled.DivColumnSecond>
              <PlaceList />
            </Styled.DivColumnSecond>
          </Styled.DivRow>

          {/* <HomeRightbar /> */}
        </>
      </Styled.FixedComp>
    </>
  );
}

export default Home;
