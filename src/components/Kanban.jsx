import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Card from "./Card";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "To do",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Kanban({ name }) {
  const avatarSource =
    "https://img.freepik.com/free-photo/painting-flowers-with-purple-flower-left_1340-23754.jpg?w=740&t=st=1687159532~exp=1687160132~hmac=ba144e085649dc175635b9fff5c3eab188958a20b0daec6a9ccf02445fd6dde0";
  const onHandler = () => console.log("clicked");
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="fullKanban overflow-hidden w-screen ">
      {/* kanban top */}
      <div className="kanban-header m-2 mb-4 pl-4">
        <div className="row1 flex justify-between">
          <div className="left-part-row1 flex space-x-1 items-end">
            <div className="header text-left text-3xl min-w-screen font-bold">
              {name}
            </div>

            <span className="editIcon">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 25 5 27.5 11.25 27.5Z"
                  fill="#5030E5"
                  fillOpacity="0.2"
                />
                <path
                  d="M16.1375 9.80001L9.64998 16.2875C9.39998 16.5375 9.16249 17.025 9.11249 17.375L8.76249 19.85C8.63749 20.75 9.26249 21.375 10.1625 21.25L12.6375 20.9C12.9875 20.85 13.475 20.6125 13.725 20.3625L20.2125 13.875C21.325 12.7625 21.8625 11.4625 20.2125 9.81251C18.5625 8.15001 17.2625 8.67501 16.1375 9.80001Z"
                  stroke="#5030E5"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.2125 10.725C15.7625 12.6875 17.3 14.2375 19.275 14.7875"
                  stroke="#5030E5"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="linkIcon">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 25 5 27.5 11.25 27.5Z"
                  fill="#5030E5"
                  fillOpacity="0.2"
                />
                <path
                  d="M16.9933 19.3167H18C20.3828 19.3167 22.3167 17.3829 22.3167 15C22.3167 12.6172 20.3828 10.6833 18 10.6833H17C16.6359 10.6833 16.35 10.9785 16.35 11.3333C16.35 11.6895 16.6438 11.9833 17 11.9833H18C19.6638 11.9833 21.0167 13.3362 21.0167 15C21.0167 16.6638 19.6638 18.0167 18 18.0167H16.9933C16.6372 18.0167 16.3433 18.3105 16.3433 18.6667C16.3433 19.0229 16.6372 19.3167 16.9933 19.3167Z"
                  fill="#5030E5"
                  stroke="#5030E5"
                  strokeWidth="0.3"
                />
                <path
                  d="M12 19.3167H13C13.3562 19.3167 13.65 19.0229 13.65 18.6667C13.65 18.3105 13.3562 18.0167 13 18.0167H12C10.3362 18.0167 8.98334 16.6638 8.98334 15C8.98334 13.3362 10.3362 11.9833 12 11.9833H13C13.3562 11.9833 13.65 11.6895 13.65 11.3333C13.65 10.9772 13.3562 10.6833 13 10.6833H12C9.61716 10.6833 7.68334 12.6172 7.68334 15C7.68334 17.3829 9.61716 19.3167 12 19.3167Z"
                  fill="#5030E5"
                  stroke="#5030E5"
                  strokeWidth="0.3"
                />
                <path
                  d="M12.3333 15.65H17.6667C18.0228 15.65 18.3167 15.3562 18.3167 15C18.3167 14.6438 18.0228 14.35 17.6667 14.35H12.3333C11.9772 14.35 11.6833 14.6438 11.6833 15C11.6833 15.3562 11.9772 15.65 12.3333 15.65Z"
                  fill="#5030E5"
                  stroke="#5030E5"
                  strokeWidth="0.3"
                />
              </svg>
            </span>
          </div>

          <div className="right-part-row1 hidden md:inline-flex items-end text-center">
            <span className="plusIcon mr-1">
              <svg
                width="30"
                height="30"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9H12"
                  stroke="#5030E5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12V6"
                  stroke="#5030E5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z"
                  fill="#5030E5"
                  fillOpacity="0.2"
                />
              </svg>
            </span>
            <div className="invite font-sm flex h-[1.75rem] mr-4">Invite</div>

            <div className="contributors flex -space-x-2 overflow-hidden m-1 p-1">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src={avatarSource}
                alt="users"
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src={avatarSource}
                alt="users"
              />

              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src={avatarSource}
                alt="users"
              />

              {/* <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://seekicon.com/free-icon-download/exposure-plus-2_1.svg"
                alt="users"
              /> */}
            </div>
          </div>
        </div>
        <div className="row2 max-h-[4rem] pt-4 flex justify-between">
          <div className="left-part-row2 flex flex-grow-0 space-x-1">
            <div className="filter-section w-[100px] border-[1px] rounded-sm border-slate-300 flex space-x-1 items-center text-sm  font-light">
              <span className="filterIcon">
                <svg
                  width="26"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.6 1H12.4C13.1333 1 13.7333 1.6 13.7333 2.33333V3.8C13.7333 4.33333 13.4 5 13.0667 5.33333L10.2 7.86667C9.8 8.2 9.53333 8.86667 9.53333 9.4V12.2667C9.53333 12.6667 9.26666 13.2 8.93333 13.4L8 14C7.13333 14.5333 5.93333 13.9333 5.93333 12.8667V9.33333C5.93333 8.86667 5.66666 8.26667 5.4 7.93333L2.86666 5.26667C2.53333 4.93333 2.26666 4.33333 2.26666 3.93333V2.4C2.26666 1.6 2.86666 1 3.6 1Z"
                    stroke="#787486"
                    strokeWidth="1.1"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Filter
              <span className="belowArrow ml-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.00001 11.2C7.53335 11.2 7.06668 11.02 6.71335 10.6667L2.36668 6.32C2.17335 6.12667 2.17335 5.80667 2.36668 5.61334C2.56001 5.42 2.88001 5.42 3.07335 5.61334L7.42001 9.96C7.74001 10.28 8.26001 10.28 8.58001 9.96L12.9267 5.61334C13.12 5.42 13.44 5.42 13.6333 5.61334C13.8267 5.80667 13.8267 6.12667 13.6333 6.32L9.28668 10.6667C8.93335 11.02 8.46668 11.2 8.00001 11.2Z"
                    fill="#787486"
                  />
                </svg>
              </span>
            </div>

            <div className="Today-section w-[100px] border-[1px] rounded-sm border-slate-300 flex space-x-1 items-center text-sm font-light">
              <span className="todayIcon mr-1 ml-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.33334 1.33333V3.33333"
                    stroke="#787486"
                    strokeWidth="1.3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.6667 1.33333V3.33333"
                    stroke="#787486"
                    strokeWidth="1.3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.6667 2.33333C12.8867 2.45333 14 3.29999 14 6.43333V10.5533C14 13.3 13.3333 14.6733 10 14.6733H6C2.66667 14.6733 2 13.3 2 10.5533V6.43333C2 3.29999 3.11333 2.45999 5.33333 2.33333H10.6667Z"
                    stroke="#787486"
                    strokeWidth="1.3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.8333 11.7333H2.16666"
                    stroke="#787486"
                    strokeWidth="1.3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.00001 5.5C7.18001 5.5 6.48668 5.94667 6.48668 6.81333C6.48668 7.22667 6.68001 7.54 6.97334 7.74C6.56668 7.98 6.33334 8.36667 6.33334 8.82C6.33334 9.64667 6.96668 10.16 8.00001 10.16C9.02668 10.16 9.66668 9.64667 9.66668 8.82C9.66668 8.36667 9.43334 7.97333 9.02001 7.74C9.32001 7.53333 9.50668 7.22667 9.50668 6.81333C9.50668 5.94667 8.82001 5.5 8.00001 5.5ZM8.00001 7.39333C7.65334 7.39333 7.40001 7.18667 7.40001 6.86C7.40001 6.52667 7.65334 6.33333 8.00001 6.33333C8.34668 6.33333 8.60001 6.52667 8.60001 6.86C8.60001 7.18667 8.34668 7.39333 8.00001 7.39333ZM8.00001 9.33333C7.56001 9.33333 7.24001 9.11333 7.24001 8.71333C7.24001 8.31333 7.56001 8.1 8.00001 8.1C8.44001 8.1 8.76001 8.32 8.76001 8.71333C8.76001 9.11333 8.44001 9.33333 8.00001 9.33333Z"
                    fill="#787486"
                  />
                </svg>
              </span>
              Today
              <span className="belowArrow ml-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.00001 11.2C7.53335 11.2 7.06668 11.02 6.71335 10.6667L2.36668 6.32C2.17335 6.12667 2.17335 5.80667 2.36668 5.61334C2.56001 5.42 2.88001 5.42 3.07335 5.61334L7.42001 9.96C7.74001 10.28 8.26001 10.28 8.58001 9.96L12.9267 5.61334C13.12 5.42 13.44 5.42 13.6333 5.61334C13.8267 5.80667 13.8267 6.12667 13.6333 6.32L9.28668 10.6667C8.93335 11.02 8.46668 11.2 8.00001 11.2Z"
                    fill="#787486"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="right-part-row2 flex items-center space-x-2">
            <div className="share-section w-[75px] border-[1px] rounded-sm h-full border-slate-400 flex space-x-1 items-center text-sm  font-light">
              <span className="shareIcon mx-1">
                <svg
                  width="16"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16 10.87C9.06 10.86 8.94 10.86 8.83 10.87C6.45 10.79 4.56 8.84 4.56 6.44C4.56 3.99 6.54 2 9 2C11.45 2 13.44 3.99 13.44 6.44C13.43 8.84 11.54 10.79 9.16 10.87Z"
                    stroke="#787486"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11"
                    stroke="#787486"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z"
                    stroke="#787486"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14"
                    stroke="#787486"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Share
            </div>
            <span className="horizontalLineIcon"></span>
            <span className="ListFormat1 hidden md:block">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="6" fill="#5030E5" />
                <path
                  d="M25.925 21.125L14.075 21.125C12.95 21.125 12.5 21.6 12.5 22.8L12.5 25.825C12.5 27.025 12.95 27.5 14.075 27.5L25.925 27.5C27.05 27.5 27.5 27.025 27.5 25.825L27.5 22.8C27.5 21.6 27.05 21.125 25.925 21.125Z"
                  fill="white"
                />
                <path
                  d="M25.925 12.5L14.075 12.5C12.95 12.5 12.5 12.975 12.5 14.175L12.5 17.2C12.5 18.3917 12.95 18.875 14.075 18.875L25.925 18.875C27.05 18.875 27.5 18.4 27.5 17.2L27.5 14.175C27.5 12.975 27.05 12.5 25.925 12.5Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className="ListFormat2 hidden md:block">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.1949 7.99994C16.5756 7.99994 17.6949 6.88065 17.6949 5.49994C17.6949 4.11923 16.5756 2.99994 15.1949 2.99994C13.8142 2.99994 12.6949 4.11923 12.6949 5.49994C12.6949 6.88065 13.8142 7.99994 15.1949 7.99994Z"
                  stroke="#787486"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.50001 7.99994C6.88072 7.99994 8 6.88065 8 5.49994C8 4.11923 6.88072 2.99994 5.50001 2.99994C4.11929 2.99994 3 4.11923 3 5.49994C3 6.88065 4.11929 7.99994 5.50001 7.99994Z"
                  stroke="#787486"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.1949 17.9999C16.5756 17.9999 17.6949 16.8807 17.6949 15.4999C17.6949 14.1192 16.5756 12.9999 15.1949 12.9999C13.8142 12.9999 12.6949 14.1192 12.6949 15.4999C12.6949 16.8807 13.8142 17.9999 15.1949 17.9999Z"
                  stroke="#787486"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.50001 17.9999C6.88072 17.9999 8 16.8807 8 15.4999C8 14.1192 6.88072 12.9999 5.50001 12.9999C4.11929 12.9999 3 14.1192 3 15.4999C3 16.8807 4.11929 17.9999 5.50001 17.9999Z"
                  stroke="#787486"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      {/* kanban board */}
      <div className="kanban-body md:flex justify-center flex-grow ml-1">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              // each column
              <div
                className="flex-col flex-wrap items-center m-1 rounded-xl bg-slate-100"
                key={columnId}
              >
                {/* Column names */}
                <h2 className="m-2 items-center min-w-[250px] ml-4  mr-[30px] font-extrabold pr-3">
                  {column.name}
                </h2>
                <hr className="border-2 h-[10px] ml-4 mr-4" />
                {column.length}
                <div>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        // while dragging
                        <div
                          className=" rounded-lg p-1"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#E8E8E8"
                              : "",
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              // draggable
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="m-2 p-2 rounded-lg hover:bg-slate-300  border-slate-300 bg-white"
                                    >
                                      <Card />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Kanban;
