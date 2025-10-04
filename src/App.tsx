import { Routes, Route, Navigate } from 'react-router-dom'
import TasksPage from './Tasks'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" />} />
      <Route path="/tasks" element={<TasksPage />} />
    </Routes>
  )
}

export default App
