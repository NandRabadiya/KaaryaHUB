import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import Navbar from './pages/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProjectDetail from './pages/Project/ProjectDetail'
import IssueDetails from './pages/Issue/IssueDetails'
import Subscription from './pages/Subscription/Subscription'
import { ThemeProvider } from "./components/ui/theme-provider"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">

    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail/>} />
        <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            ></Route>
        <Route path="/upgrade_plan" element={<Subscription />}></Route>

      </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
