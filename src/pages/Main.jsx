import React, { useState } from "react";
import Create_Player_Img from "../assets/img/lionel-messi-tony-slark-v0-2b8c2nud3oo81.jpg";
import { colors } from "../assets/json/color";

import DraggableSquare from "./DraggableSquare";

const Main = () => {
  const [players, setPlayers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPositionOpen, setModalPositionOpen] = useState(false);
  const [selectPlayer, setSelectPlayer] = useState();
  const [column, setColumn] = useState("");
  const [row, setRow] = useState("");

  const [newPlayer, setNewPlayer] = useState({
    name: "",
    color: "",
    points: 0,
    column: null,
    row: null,
  });

  const openModal = () => {
    if (players.length === 10) {
      alert("Player list is full!");
    } else {
      setModalOpen(true);
    }
  };

  const openPositionModal = (index) => {
    setSelectPlayer(index);
    setModalPositionOpen(true);
  };

  const closePositionModal = () => {
    setModalPositionOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleAddColumn = (e) => {
    const { value } = e.target;

    setColumn(value.toUpperCase());
  };

  const handleAddRow = (e) => {
    const { value } = e.target;
    setRow(value);
  };

  const addPlayer = () => {
    if (newPlayer.name && newPlayer.color) {
      if (players.length < 10) {
        setPlayers([...players, newPlayer]);
        setNewPlayer({
          name: "",
          color: "#FFFFFF",
          points: 0,
          column: null,
          row: null,
        });
        closeModal();
      } else {
        alert("Maximum of 10 players reached.");
      }
    } else {
      alert("Please fill out both name and color fields.");
    }
  };

  const removePlayerById = (id) => {
    const updatedPlayers = players.filter((player, index) => index !== id);
    setPlayers(updatedPlayers);
  };

  const addPoint = (id) => {
    const updatedPlayers = [...players];
    updatedPlayers[id].points += 1;
    setPlayers(updatedPlayers);
  };

  const setPositionForPlayer = (playerIndex, newColumn, newRow) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].column = newColumn;
    updatedPlayers[playerIndex].row = newRow;
    setPlayers(updatedPlayers);
  };

  const addPosition = () => {
    setPositionForPlayer(selectPlayer, column, row);
    setModalPositionOpen(false);
  };

  const clearPlayerPosition = () => {
    const updatedPlayers = players.map((player) => ({
      ...player,
      column: null,
      row: null,
    }));
    setPlayers(updatedPlayers);
  };

  const GridSquare = () => {
    const Grid = () => {
      const rows = Array.from({ length: 16 }, (_, rowIndex) => {
        const rowLabel = String.fromCharCode(65 + rowIndex);

        return (
          <div
            key={rowIndex}
            className="flex justify-center items-center gap-1"
          >
            <div className="font-poppins text-xl font-bold text-white">
              {rowLabel}
            </div>
            {Array.from({ length: 30 }, (_, colIndex) => {
              // Find the player in this cell
              const player = players.find(
                (player) =>
                  player.column === rowLabel && player.row === `${colIndex + 1}`
              );

              return (
                <div
                  key={colIndex}
                  className="w-9 h-9 border border-black"
                  style={{
                    backgroundColor: colors[rowIndex * 30 + colIndex],
                  }}
                >
                  {player && (
                    <div
                      className="h-5 w-5 border-2 border-black rounded-full mt-2 ml-2"
                      style={{ backgroundColor: player ? player.color : "" }}
                    />
                  )}
                </div>
              );
            })}
            <div className="font-poppins text-xl font-bold text-white">
              {rowLabel}
            </div>
          </div>
        );
      });

      const Header = () => {
        return (
          <div className="flex justify-center items-center gap-1">
            {Array.from({ length: 30 }, (_, colIndex) => (
              <div
                key={colIndex}
                className="w-9 h-9  text-center text-white font-poppins text-xl font-bold"
              >
                {colIndex + 1}
              </div>
            ))}
          </div>
        );
      };

      return (
        <div>
          <Header />
          <div className="grid grid-rows-16 gap-1 mb-3">{rows}</div>
          <Header />
        </div>
      );
    };
    return (
      <div className="container mx-auto mt-10">
        <Grid />
      </div>
    );
  };

  return (
    <>
      <div className="bg-black min-h-screen">
        <div class="grid grid-cols-6 gap-4 min-h-screen">
          <div className="col-span-5 my-3">
            <div className="h-screen flex flex-col">
              <div className="h-36">
                {/* Scroll results */}
                <div className=" h-full grid grid-cols-8">
                  <div className="col-span-7">
                    <div className="p-5">
                      <div className="flex space-x-1">
                        {players.length <= 0 ? (
                          <>
                            <div className="bg-gray-600 w-full ">
                              <div className="flex justify-center items-center">
                                <div className="font-poppins text-[65px] text-white">
                                  --- No player ---
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {players.map((items, index) => (
                              <div
                                key={index}
                                className="bg-gray-600 rounded-lg w-520 border-2 border-gray-800"
                              >
                                <div className="flex justify-center items-center text-white font-bold text-2xl font-poppins p-2">
                                  <div>{`${items.name} : ${items.points} Point(s)`}</div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 ">
                    <div className="p-4">
                      <div className="border-2 border-black flex justify-center items-center">
                        <img
                          src={Create_Player_Img}
                          alt="TonySlark"
                          className="w-[170px] h-[120px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Scroll results */}
              </div>
              <div className="flex-grow">
                <div className="h-full">
                  <div className="p-4">
                    <GridSquare players={players} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Player Zone */}
          <div className="bg-white rounded-3xl col-span-1 my-3">
            <div className="p-5 border-gray-300 rounded-xl bg-[#fbe79c] mt-10">
              <div className="flex items-center justify-center">
                <div className="text-4xl font-bold font-poppins tracking-wide">
                  Position
                </div>
              </div>
            </div>

            {modalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-1/3 p-4 rounded shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Add Player</h2>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={newPlayer.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="color"
                      name="color"
                      value={newPlayer.color}
                      onChange={handleChange}
                      className="w-full h-[50px] border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={addPlayer}
                    >
                      Add
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {modalPositionOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-1/3 p-4 rounded shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Add Position</h2>
                  <div className="mb-4 flex">
                    <input
                      type="text"
                      name="column"
                      placeholder="Column (A-P)"
                      value={newPlayer.column}
                      onChange={handleAddColumn}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="number"
                      name="row"
                      placeholder="Row (1-30)"
                      value={newPlayer.row}
                      onChange={handleAddRow}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={addPosition}
                    >
                      Add
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
                      onClick={closePositionModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3">
              <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="col-span-4">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => openModal()}
                      className="bg-blue-500 w-[80%] h-[50px] border-black border-2 text-white font-bold rounded-xl"
                    >
                      Add Player
                    </button>
                    <button
                      onClick={() => clearPlayerPosition()}
                      className="bg-blue-500 w-[80%] h-[50px] border-black border-2 text-white font-bold rounded-xl"
                    >
                      Clear Grid
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7">
              {players.map((items, index) => (
                <div key={index} className="grid grid-cols-7 gap-2 mb-2">
                  <div className="col-span-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span
                        className={`rounded-full h-8 w-8 flex items-center justify-center  border-2 border-black`}
                        style={{ backgroundColor: items.color }}
                      />
                      <button
                        onClick={() => openPositionModal(index)}
                        className={`rounded-full h-8 w-8 flex items-center justify-center  border-2 border-black`}
                        style={{ backgroundColor: "black" }}
                      >
                        <div className="text-white font-poppins font-bold">
                          P
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <div className="flex justify-start items-center space-x-2">
                      <div className="flex justify-center items-center font-poppins text-xl font-bold bg-[#f4ccaf] text-black  h-8 w-[100%] border-2 border-black rounded-lg">
                        {items.name}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        className="font-poppins rounded-full text-xl font-bold bg-green-500 text-white h-8 w-[40%] border-2 border-black"
                        onClick={() => addPoint(index)}
                      >
                        +
                      </button>
                      <button
                        className="font-poppins rounded-full text-xl font-bold bg-red-500 text-white h-8 w-[40%] border-2 border-black"
                        onClick={() => removePlayerById(index)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <DraggableSquare />
            </div>
          </div>
          {/* Player Zone */}
        </div>

        <div className="bg-white rounded-xl">
          <footer className="flex justify-center items-center font-poppins text-xl">
            This game is Create By TonySlark & Unigee Inspiration By
            <a href="https://www.boardgamegeek.com/boardgame/302520/hues-and-cues">
              boardgamegeek.com
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Main;
