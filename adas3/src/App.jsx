import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'



function App() {
  const [items, setItems] = useState([]) //useState is a hook that allows you to add state to a functional component
  useEffect(() => {
    const fetchData = async () => { 
      const res = await fetch('http://localhost:3000/')
      const data = await res.json() //convert to json format
      console.log(data)
      setItems(data.items)
    }
    fetchData(); 
  }, [])
  return (
    <>
    {items.map(i => 
      <p> {i.name}, {i.brand} </p>  
    )}

    <h1> Welcome to </h1>
    <h1> SlayFocus </h1>
    <h3> by Another Day Another Slay </h3>


    </>
  )
}

export default App



{/* <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </> */}


