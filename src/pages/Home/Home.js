import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import {
  getFirestore,
  query,
  where,
  addDoc,
  onSnapshot,
  orderBy,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import db, { auth } from "../../helpers/firebase";
import "./Home.css";

function Home(props) {
  const { user } = props;
  const [userData, setUserData] = useState({
    name: "",
    surName: "",
  });
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getAll = () => {
      const q = query(
        collection(db, "isimSoyisimTest"),
        orderBy("name", "asc")
      );
      onSnapshot(q, (querySnapshot) => {
        setUserList(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    };
    getAll();
  }, []);

  useEffect(() => {
    console.log(userList);
  }, [userList]);

  const add = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "isimSoyisimTest"), {
      name: userData.name,
      surName: userData.surName,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  return (
    <div className="login">
      <div className="container">
        <h2>Hoşgeldin {user?.displayName}</h2>
        <button onClick={() => signOut(auth)}>Çıkış Yap</button>
        <form>
          İsim{" "}
          <input
            type={"text"}
            value={userData?.name}
            onChange={(e) => {
              setUserData({
                ...userData,
                name: e.target.value,
              });
            }}
          />
          Soyisim{" "}
          <input
            type={"text"}
            value={userData?.surName}
            onChange={(e) => {
              setUserData({
                ...userData,
                surName: e.target.value,
              });
            }}
          />
          <button onClick={add}>Ekle</button>
        </form>
        <br/>
        <div>
          {userList?.map((data) => (
            <div style={{display: "flex", justifyContent: 'space-between'}} key={data.id}>
            <h3>{data.id}</h3>
            <h3>{data.data?.name}</h3>
            <h3>{data.data?.surName}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
