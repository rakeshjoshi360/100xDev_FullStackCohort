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
import AllCourses from "./components/user/AllCourses";
import PurchasedCourse from "./components/user/PurchasedCourse";

function App() {

  return (
    <RecoilRoot>
      <div>
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
              <Route path= {"/allcourses"} element = {<AllCourses />} />
              <Route path= {"/courses/purchased"} element = {<PurchasedCourse />}/>
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
      const adminResponse = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      if(adminResponse.data.username){
        setUser({
          isLoading: false,
          userEmail: adminResponse.data.username,
          role: adminResponse.data.role
        })
        return
      }
      const userResponse = await axios.get(`${BASE_URL}/user/me`,{
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      if(userResponse.data.username){
        setUser({
          isLoading: false,
          userEmail: userResponse.data.username,
          role: userResponse.data.role
        })
      }else{
        setUser({
          isLoading: false,
          userEmail: null,
          role: "user"
        })  
      }
    } catch (error) {
      setUser({
        isLoading: false,
        userEmail: null,
        role: "user"
      })
    }
  }
  useEffect(() => {
    init();
  }, []);

  return <></>
}

export default App
