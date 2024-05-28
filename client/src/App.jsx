import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [messageRecieve, setMessageRecieve] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageRecieve(data.message);
    });
  }, [socket]);

  return (
    <>
      <div className=" flex justify-center items-center h-48 ">
        <div className="">
          <input
            className="border-2 border-black h-10"
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type Your Message"
          />
          <button
            className="ml-4 bg-blue-800 text-white w-10"
            onClick={sendMessage}
          >
            Send
          </button>
          <h1>{messageRecieve}</h1>
        </div>
      </div>
    </>
  );
}

export default App;
