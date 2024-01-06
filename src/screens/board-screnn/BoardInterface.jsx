import { Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";
import useApp from "../../hooks/useApp";
import useStore from "../../store";
import { DragDropContext } from "react-beautiful-dnd";
import AppLoader from "../../components/layout/AppLoader";

const statusMap = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};

const BoardInterface = ({ boardData, boardId, updateLastUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTab] = useState(structuredClone(boardData));
  const { updateBoardData } = useApp();
  const { setToastr } = useStore();

  const handleOpenAddTaskModal = useCallback((status) => {
    setAddTaskTo(status);
  }, []);

  const handleAddTask = async (text) => {
    if (!text.trim()) return setToastr("Please wite Board name");
    const dClone = structuredClone(tabs);
    dClone[addTaskTo].unshift({ text, id: crypto.randomUUID() });
    try {
      setLoading(true);
      await updateBoardData(boardId, dClone);
      setTab(dClone);
      setAddTaskTo("");
      updateLastUpdated();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTask = useCallback(
    async (tab, taskId) => {
      const dClone = structuredClone(tabs);
      const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);
      dClone[tab].splice(taskIdx, 1);
      try {
        setLoading(true);
        await updateBoardData(boardId, dClone);
        setTab(dClone);
        updateLastUpdated();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [tabs]
  );

  const handleDnd = async ({ source, destination }) => {
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const dClone = structuredClone(tabs);
    // Remove the task from tab
    const [draggedTask] = dClone[source.droppableId].splice(source.index, 1);

    // Add task to another tab

    dClone[destination.droppableId].splice(destination.index, 0, draggedTask);

    try {
      setLoading(true);
      await updateBoardData(boardId, dClone);
      setTab(dClone);
      updateLastUpdated();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AppLoader />;

  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
          addTask={handleAddTask}
        />
      )}
      <DragDropContext onDragEnd={handleDnd}>
        <Grid container px={4} mt={2} spacing={2}>
          {Object.keys(statusMap).map((status) => (
            <BoardTab
              key={status}
              tasks={tabs[status]}
              name={statusMap[status]}
              status={status}
              openAddTaskModal={handleOpenAddTaskModal}
              removeTask={handleRemoveTask}
            />
          ))}
        </Grid>
      </DragDropContext>
    </>
  );
};

export default BoardInterface;
