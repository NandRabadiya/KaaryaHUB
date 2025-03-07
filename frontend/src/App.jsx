import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import Navbar from './pages/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProjectDetail from './pages/Project/ProjectDetail'
import IssueDetails from './pages/Issue/IssueDetails'
import Subscription from './pages/Subscription/Subscription'
import { ThemeProvider } from "./components/ui/theme-provider"
import Auth from './pages/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from "./redux/Auth/Action";
import { getUserSubscription } from "./redux/Subscription/Action";
import Loader from './pages/Loader/Loader'
import { fetchProjects } from './redux/Project/Project.Action'

function App() {
  const [count, setCount] = useState(0)

  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
    dispatch(fetchProjects( {category: "all", tag: "all"}));
  //  dispatch(getUserSubscription(auth.jwt || localStorage.getItem("jwt")))
  }, [auth.jwt]);


  return (
    <>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">


        {/* {auth.loading?<Loader/> : */}
        
        {auth.user 
        
       ? (
  <>
    <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail/>} />
        <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            ></Route>
        <Route path="/upgrade_plan" element={<Subscription />}></Route>

      </Routes>

      </>
) : (
  <Auth/>
)
}

        </ThemeProvider>
    </>
  )
}




export default App
