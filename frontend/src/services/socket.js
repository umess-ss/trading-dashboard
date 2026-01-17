import {io} from "socket.io-client";


const socket = io("htttp://localhost:8000");
export default socket;