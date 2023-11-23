import { Button, Card, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../config"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function PurchasedCourse(){
    const [courses, setCourses] = useState([])
    const init = async() => {
        const resp = await axios.get(`${BASE_URL}/user//purchasedCourses`,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        setCourses(resp.data.courses)
    }
    useEffect(() => {
        init();
    }, [])
    return(
        <div style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#eeeeee"
          }}>
        <Typography variant="h5" style={{textAlign: "center", paddingBlock: 20}}>My Purchased Courses</Typography>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>  
                {courses.map(course => {
                    return <Course course={course} key={course._id}/>
                })}
            </div>
        </div>
    )
}

export function Course({course}){
    const navigate = useNavigate()
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }}>
        <img src= {course.courseId.imageLink} style={{width: 300}}/>
        <div>
        <Typography textAlign={"center"} variant="h5">{course.courseId.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1" style={{color: "gray"}}>{course.courseId.description}</Typography>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course.courseId._id);
            }}>Go To Course</Button>
        </div>
        </div>
    </Card>
}

export default PurchasedCourse