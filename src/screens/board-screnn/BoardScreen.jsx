import React, { useCallback, useEffect, useMemo, useState } from "react";
import BoardTopBar from "./BoardTopBar";
import BoardInterface from "./BoardInterface";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../store";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";

const BoardScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { boards, areBoardsFetched } = useStore();
  const { boardId } = useParams();
  const { fetchBoard } = useApp();

  const board = useMemo(() => boards.find((board) => board.id === boardId), []);
  const boardData = useMemo(() => data, [data]);

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

  return (
    <>
      <BoardTopBar
        name={board.name}
        color={board.color}
        lastUpdated={lastUpdated}
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
