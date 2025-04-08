import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8888});


// event handler
wss.on("connection", function(socket) {
    console.log("User connected");
    // setInterval(()=>{
    //     socket.send("Price is "+Math.random());
    // },500)

    socket.on("message",(e)=>{
        if(e.toString()==="ping"){
            socket.send("pong");
        }
    })
})