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
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

const useApp = () => {
  const {
    currentUser: { uid },
  } = getAuth();

  const navigate = useNavigate();

  const boarsdColRef = collection(db, `users/${uid}/boards`);
  const { boards, setBoards, addBoard, setToastr } = useStore();

  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (error) {
      setToastr("Error upadating Board");
      throw error;
    }
  };

  const fetchBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const doc = await getDoc(docRef);
      if (doc.exists) {
        return doc.data();
      } else return null;
    } catch (error) {
      setToastr("Error Fetching Board");
      throw error;
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
      setToastr("Error Creating Board");
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
      setToastr("Error Fetching Boards");
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      const docRef = doc(db, `users/${uid}/boards/${boardId}`);
      // delete board form db
      await deleteDoc(docRef);
      const tempBoards = boards.filter((board) => board.id !== boardId);
      // update board to store
      setBoards(tempBoards);

      // Navigat the user to boards screen
      navigate("/boards");
    } catch (error) {
      setToastr("Error delting the board");
      throw error;
    }
  };

  return { createBoard, fetchBoards, fetchBoard, updateBoardData, deleteBoard };
};

export default useApp;
