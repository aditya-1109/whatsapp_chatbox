import { NavLink, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./styles/right.css";

function Right() {
    const { id } = useParams();
    const chatRef = useRef();
    const [chat, setChat] = useState([]);
    const [socket, setSocket] = useState(null);
    const myId = localStorage.getItem("id");
    const [noChat, setNoChat] = useState(true);
    const [user, setUser]= useState("");
    const [noUser, setNoUser]= useState(true);

    useEffect(() => {
        // Initialize the socket connection
        const newSocket = io("http://localhost:4000");
        setSocket(newSocket);
        return () => newSocket.close(); // Clean up the socket on component unmount
    }, [id]);

    useEffect(() => {
        const getChat = async () => {
            const chats = await axios.get(`http://localhost:4000/api/user/getChat/${id}`, {
                params: { myId }
            });
            setChat(chats.data);
            if (chats.data.length !== 0) {
                setNoChat(false);
            }
        };
        getChat();

        const getUser = async ()=>{
            const contact = await axios.post(`http://localhost:4000/api/user/findme`, {id});
            setUser(contact.data);
            console.log(contact.data)
            if (contact.data.length !== 0) {
                setNoUser(false);
            }
        }
        getUser()

    }, [id]);

    // Receive message from socket
    useEffect(() => {
        if (socket) {
            socket.on("receiveMessage", async (newMessage) => {
                setChat((prevChats) => [...prevChats, newMessage]);
            });
        }
    }, [socket]);

    const addChat = async (e) => {
        e.preventDefault();
        const message = chatRef.current.value;
        const senderId = localStorage.getItem("id"); // Assuming you store the sender ID in localStorage

        socket.emit("sendMessage", { senderId, receiverId: id, message });
        chatRef.current.value = ""; // Clear input
    };

    return (
        <div className="right-container">
            <NavLink to={`/home/userprofile/${user._id}`} className="chat-header"> {noUser?"":<div><img src={user.photo} alt="DP" /><h1>{user.name}</h1></div>}</NavLink>
            <div className="chat-container">
                {noChat ? (
                    <p className="no-chat-message">No chat available</p>
                ) : (
                    <ul className="chat-list">
                        {chat.map((ch, index) => (
                            <li
                                className={`chat ${ch.senderId === myId ? "sent" : "received"}`}
                                key={index}
                            >
                                <div className="chat-message">{ch.message}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <form className="chat-form" onSubmit={addChat}>
                <input
                    className="chat-input"
                    placeholder="Type your message..."
                    ref={chatRef}
                    type="text"
                    required
                />
                <input className="send-button" type="submit" value="Send" />
            </form>
        </div>
    );
}

export default Right;
