import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import CreateBoardModal from "./CreateBoardModal";
import { Grid, Stack } from "@mui/material";
import NoBoard from "./NoBoard";
import BoardItemCard from "./BoardItemCard";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import useStore from "../../store";

const BoardScreen = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { fetchBoards } = useApp();
  const { areBoardsFetched, boards } = useStore();

  useEffect(() => {
    if (!areBoardsFetched) fetchBoards(setLoading);
    else setLoading(false);
  }, []);

  if (loading) return <AppLoader />;

  return (
    <>
      <TopBar openmodal={() => setShowModal(true)} />
      {showModal && <CreateBoardModal closeModal={() => setShowModal(false)} />}
      {/* <NoBoard /> */}
      <Stack px={3} mt={5}>
        <Grid container spacing={4}>
          {boards.map((board, index) => (
            <BoardItemCard key={index} {...board} />
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default BoardScreen;
