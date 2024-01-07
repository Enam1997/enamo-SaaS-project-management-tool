import { Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";
import useApp from "../../hooks/useApp";
import useStore from "../../store";
import { DragDropContext } from "react-beautiful-dnd";
import AppLoader from "../../components/layout/AppLoader";
import ShiftTaskModal from "./ShiftTaskModal";

export const statusMap = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};

const BoardInterface = ({ boardData, boardId, updateLastUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [shiftTask, setShiftTask] = useState(null);
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTab] = useState(structuredClone(boardData));
  const { updateBoardData } = useApp();
  const { setToastr } = useStore();

  const handleOpenAddTaskModal = useCallback((status) => {
    setAddTaskTo(status);
  }, []);

  const handleOpenShiftTaskModal = useCallback((task) => {
    setShiftTask(task);
  }, []);

  const handleShiftTaskWithModal = async (newStatus) => {
    const dClone = structuredClone(tabs);
    const oldStatus = shiftTask.status;
    if (newStatus === oldStatus) return setShiftTask(null);
    const [task] = dClone[oldStatus].splice(shiftTask.index, 1);
    dClone[newStatus].unshift(task);
    try {
      setLoading(true);
      await handleUpdateBoardData(dClone);
      setShiftTask(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBoardData = async (dClone) => {
    setLoading(true);
    await updateBoardData(boardId, dClone);
    setTab(dClone);
    updateLastUpdated();
    setToastr("Board Updated");
  };

  const handleAddTask = async (text) => {
    if (!text.trim()) return setToastr("Please wite Board name");
    const dClone = structuredClone(tabs);
    dClone[addTaskTo].unshift({ text, id: crypto.randomUUID() });
    try {
      await handleUpdateBoardData(dClone);
      setAddTaskTo("");
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
        await handleUpdateBoardData(dClone);
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
      await handleUpdateBoardData(dClone);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AppLoader />;

  return (
    <>
      {!!shiftTask && (
        <ShiftTaskModal
          shiftTask={handleShiftTaskWithModal}
          onClose={() => setShiftTask(null)}
          task={shiftTask}
        />
      )}
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
              openShiftTaskModal={handleOpenShiftTaskModal}
              removeTask={handleRemoveTask}
            />
          ))}
        </Grid>
      </DragDropContext>
    </>
  );
};

export default BoardInterface;
