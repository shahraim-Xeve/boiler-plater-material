import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC5Rxj4n-m9wZ5KNmkNKQmdFhGtCKeIVd8",
  authDomain: "mini-hackathon-80115.firebaseapp.com",
  projectId: "mini-hackathon-80115",
  storageBucket: "mini-hackathon-80115.appspot.com",
  messagingSenderId: "1099121272558",
  appId: "1:1099121272558:web:ae777ecae6f528855b35ff",
  measurementId: "G-3JR8XRSXMV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

//initialize firestore database
const db = getFirestore(app);

// register user
let signUpUser = (obj) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, obj.userEmail, obj.userPass)
      .then(async (res) => {
        obj.id = res.user.uid;
        await addDoc(collection(db, "users"), obj)
          .then(async (res) => {
            console.log("user added to database successfully");
            const q = query(
              collection(db, "users"),
              where("id", "==", auth.currentUser.uid)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              resolve(doc.data());
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

// login user
let loginUser = (obj) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, obj.userEmail, obj.userPass)
      .then(async () => {
        const q = query(
          collection(db, "users"),
          where("id", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          resolve(doc.data());
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//signout User
const signOutUser = () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve("user Signout Successfully");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//send data to firestore
const sendData = (obj, colName) => {
  return new Promise((resolve, reject) => {
    addDoc(collection(db, colName), obj)
      .then((res) => {
        resolve("data send to db successfully");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//get data with id from firestore
const getData = (colName) => {
  return new Promise(async (resolve, reject) => {
    const dataArr = [];
    const q = query(
      collection(db, colName),
      where("id", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data());
      resolve(dataArr);
    });
    reject("error occured");
  });
};

//get all data
const getAllData = (colName) => {
  return new Promise(async (resolve, reject) => {
    const dataArr = [];
    const querySnapshot = await getDocs(collection(db, colName));
    querySnapshot.forEach((doc) => {
      const obj = { ...doc.data(), documentId: doc.id };
      dataArr.push(obj);
      resolve(dataArr);
    });
    reject("error occured");
  });
};

//Delete document by id
const deleteDocument = async (id, name) => {
  return new Promise((resolve, reject) => {
    deleteDoc(doc(db, name, id));
    resolve("document deleted");
    reject("error occured");
  });
};

//update document by id
const updateDocument = async (obj, id, name) => {
  return new Promise((resolve, reject) => {
    const update = doc(db, name, id);
    updateDoc(update, obj);
    resolve("document updated");
    reject("error occured");
  });
};

export {
  auth,
  db,
  signUpUser,
  loginUser,
  signOutUser,
  sendData,
  getData,
  getAllData,
  deleteDocument,
  updateDocument,
};
