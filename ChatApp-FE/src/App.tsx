import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [messages,setMessages] = useState(["Hi there"]);
  const wsRef = useRef();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8888');
    ws.onmessage = (event) => {
      event.data;
      setMessages(m => [...m, event.data])
    }
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload:{
          roomId:"red"
        }
      }))
    }

    return ()=>{
      ws.close();
    }
  })

  return (
    <>
      <div className='h-screen bg-black'>
          <div className='h-[95vh]'>
            {messages.map((m,i)=> <div key={i} className='bg-white w-max p-2 rounded-4xl'> {m} </div>)}
          </div>
          <div className='bg-white flex w-full'>
            <input type='text' id='message' className='flex-1 p-4'/>
            <button className='bg-purple-800 text-white p-4' onClick={()=>{
              const message = document.getElementById("message")?.value;
              wsRef.current.send(JSON.stringify({
                type:"chat",
                payload:{
                  message: message
                }
              }))
            }}> Send </button>
          </div>
      </div>
    </>
  )
}

export default App
