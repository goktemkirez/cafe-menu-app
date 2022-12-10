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
  doc,
  updateDoc,
  deleteDoc,
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
  const [isButtonAdd, setIsButtonAdd] = useState(true);
  const [updateId, setUpdateId] = useState(0);

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
    setUserData({
      name: "",
      surName: "",
    });
  };

  const moveData = (data) => {
    setUserData(data.data);
    setUpdateId(data.id);
    setIsButtonAdd(false);
  };
  const update = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "isimSoyisimTest", updateId);
    try {
      await updateDoc(taskDocRef, {
        name: userData.name,
        surName: userData.surName,
      });
      setUserData({
        name: "",
        surName: "",
      });
    } catch (err) {
      alert(err);
    }
  };

  const remove = async (id) => {
    const taskDocRef = doc(db, "isimSoyisimTest", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
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
          {isButtonAdd ? (
            <button onClick={add}>Ekle</button>
          ) : (
            <>
              <button onClick={update}>Güncelle</button>
              <button
                onClick={() => {
                  setIsButtonAdd(true);
                  setUserData({
                    name: "",
                    surName: "",
                  });
                }}
              >
                Vazgeç
              </button>
            </>
          )}
        </form>
        <br />
        <div>
          {userList?.map((data) => (
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              key={data.id}
            >
              <h3>{data.id}</h3>
              <h3>{data.data?.name}</h3>
              <h3>{data.data?.surName}</h3>
              <button onClick={() => moveData(data)}>Güncelle</button>
              <button onClick={() => remove(data.id)}>Sil</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
