import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port:8888});

interface User {
    socket : WebSocket,
    room : string
}
let allSockets : User[] = [];

wss.on("connection",(socket)=> {

    socket.on("message", (mesg)=>{
        // convert string to object
        let obj = JSON.parse(mesg.toString());
        if(obj.type === "join"){
            allSockets.push({
                socket,
                room: obj.payload.roomId
            })
        }
        else if(obj.type==="chat") {
            const currentRoom = allSockets.find((x)=>x.socket == socket);
            if(currentRoom==null) {
                return;
            }
            for(const x of allSockets){
                if(x.room === currentRoom.room){
                    x.socket.send(obj.payload.message);
                }
            }
        }
    })

    socket.on("close", ()=> {
        console.log("user Disconnected");
    })
})

