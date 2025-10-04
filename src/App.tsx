import { Routes, Route, Navigate } from 'react-router-dom'
import Tasks from './Tasks'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  )
}

export default App
