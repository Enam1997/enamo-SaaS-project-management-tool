import React, { useCallback, useEffect, useMemo, useState } from "react";
import BoardTopBar from "./BoardTopBar";
import BoardInterface from "./BoardInterface";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../store";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import BoardsNotReady from "./BoardsNotReady";

const BoardScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { boards, areBoardsFetched } = useStore();
  const { boardId } = useParams();
  const { fetchBoard, deleteBoard } = useApp();

  const board = useMemo(() => boards.find((board) => board.id === boardId), []);
  const boardData = useMemo(() => data, [data]);

  const handleBoardDeleted = useCallback(async () => {
    if (!window.confirm("Are you sure to delete the board?")) return;
    try {
      setLoading(true);
      await deleteBoard(boardId);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const handleUpdateLastUpdate = useCallback(
    () => setLastUpdated(new Date().toLocaleString("en-US")),
    []
  );

  const handleFetchBoard = async () => {
    try {
      const boardData = await fetchBoard(boardId);
      if (boardData) {
        const { lastUpdated, tabs } = boardData;
        setData(tabs);
        setLastUpdated(lastUpdated.toDate().toLocaleString("en-US"));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!areBoardsFetched || !board) navigate("/boards");
    else handleFetchBoard();
  }, []);

  if (!board) return null;
  if (loading) return <AppLoader />;
  if (!data) return <BoardsNotReady />;

  return (
    <>
      <BoardTopBar
        name={board.name}
        color={board.color}
        lastUpdated={lastUpdated}
        deleteBoard={handleBoardDeleted}
      />
      <BoardInterface
        boardData={boardData}
        boardId={boardId}
        updateLastUpdated={handleUpdateLastUpdate}
      />
    </>
  );
};

export default BoardScreen;
