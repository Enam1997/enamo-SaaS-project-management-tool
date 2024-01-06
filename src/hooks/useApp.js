import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import useStore from "../store";

const useApp = () => {
  const {
    currentUser: { uid },
  } = getAuth();

  const boarsdColRef = collection(db, `users/${uid}/boards`);
  const { setBoards, addBoard } = useStore();

  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (error) {}
  };

  const fetchBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const doc = await getDoc(docRef);
      if (doc.exists) {
        return doc.data();
      } else return null;
    } catch (error) {
      console.log(error);
    }
  };

  const createBoard = async ({ name, color }) => {
    try {
      const doc = await addDoc(boarsdColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      addBoard({
        name,
        color,
        createdAt: new Date().toLocaleDateString(),
        id: doc.id,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const q = query(boarsdColRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString("en-US"),
      }));
      setBoards(boards);
    } catch (error) {
      console.log(error);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return { createBoard, fetchBoards, fetchBoard, updateBoardData };
};

export default useApp;
