import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [messages,setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8888');
    ws.onmessage = (event) => {
      event.data;
    }
  })

  return (
    <>
      <div className='h-screen bg-black'>
          <div className='h-[95vh]'></div>
          <div className='bg-white flex w-full p-4'>
            <input type='text' className='flex-1/3 m-1'/>
            <button className='bg-purple-800 text-white m-1'> Send </button>
          </div>
      </div>
    </>
  )
}

export default App
