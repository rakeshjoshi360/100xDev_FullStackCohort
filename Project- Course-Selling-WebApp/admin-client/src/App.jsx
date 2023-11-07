import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup.jsx";
import Appbar from "./components/Appbar.jsx";
import {Landing} from "./components/Landing.jsx";
import Courses from "./components/Courses";
import AddCourse from "./components/AddCourse";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user.js";
import axios from "axios";
import { BASE_URL } from "./config";
import { useEffect } from "react";
import Course from "./components/Course";

function App() {

  return (
    <RecoilRoot>
      <div style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#eeeeee"
      }}>
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
              <Route  path= {"/"} element = {<Landing />} />
              <Route  path= {"/signin"} element = {<Signin />} />
              <Route  path= {"/signup"} element = {<Signup />} />
              <Route path={"/courses"} element = {<Courses />} />
              <Route path= {"/addcourse"} element = {<AddCourse />} />
              <Route path= {"/course/:courseId"} element = {<Course />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  )
}

function InitUser() {
  const setUser = useSetRecoilState(userState)
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      if(response.data.username){
        setUser({
          isLoading: false,
          userEmail: response.data.username
        })
      }else{
        setUser({
          isLoading: false,
          userEmail: null
        })  
      }
    } catch (error) {
      setUser({
        isLoading: false,
        userEmail: null
      })
    }
  }
  useEffect(() => {
    init();
  }, []);

  return <></>
}

export default App
