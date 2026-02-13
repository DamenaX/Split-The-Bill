import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GroupsProvider from './state/GroupsProvider'

import AddGroup from "./pages/AddGroup.jsx"
import AddExpense from './pages/AddExpense.jsx'
import AddMembers from './pages/AddMembers.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Group from './pages/Group.jsx'
import MainContainer from './components/MainContainer.jsx'

function App() {
  return (
    <GroupsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddGroup />} />
          <Route path="/groups/:groupId/add-members" element={<AddMembers />} />
          <Route path="/groups/:groupId/add-expense" element={<MainContainer><AddExpense /></MainContainer>} />
          <Route path="/groups/:groupId" element={<Group />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </GroupsProvider>
  )
}

export default App
