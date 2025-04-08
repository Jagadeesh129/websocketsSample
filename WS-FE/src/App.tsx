
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [socket,setSocket] = useState();
  const inputRef = useRef<any>("");

  const sendMessage = () => {
    if(!socket) return;
    const mesg = inputRef.current?.value;
    //@ts-ignore
    socket.send(mesg);
  }

  useEffect(()=> {
    const ws = new WebSocket("http://localhost:8888");
    setSocket(ws);

    ws.onmessage = (event) =>{
      alert(event.data);
    }

  },[])

  return (
    <>
      <div>
        <input ref={inputRef} type='text' placeholder='Message....' />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  )
}

export default App
