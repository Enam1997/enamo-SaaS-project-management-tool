import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import useStore from "../store";

const useApp = () => {
  const {
    currentUser: { uid },
  } = getAuth();

  const boardColRef = collection(db, `users/${uid}/boards`);

  const { setBoards, addBoard } = useStore();

  const createBoard = async ({ name, color }) => {
    try {
      await addDoc(boardColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      addBoard({ name, color, createdAt: new Date().toLocaleDateString() });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const q = query(boardColRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleDateString(),
      }));
      setBoards(boards);
    } catch (error) {
      console.log(error);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return { createBoard, fetchBoards };
};

export default useApp;
