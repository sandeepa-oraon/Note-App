import { useState } from 'react'
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom'
import CreateNotes from './Components/CreateNotes'
import NotesHandle from './Components/NotesHandle'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div className="main">
        <CreateNotes />
      </div> */}
      <Router>
        <Routes>
          <Route path= '/' element={<CreateNotes />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
