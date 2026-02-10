import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import AddGroup from "./pages/AddGroup.jsx"
import AddExpense from './pages/AddExpense.jsx'
import AddMembers from './pages/AddMembers.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Group from './pages/Group.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddGroup />}/>
        <Route path="add-members" element={<AddMembers />} />
        <Route path="groups/:id" element={<Group />} />
        <Route path="groups/:id/add-expense" element={<AddExpense />} />
        <Route path="Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
