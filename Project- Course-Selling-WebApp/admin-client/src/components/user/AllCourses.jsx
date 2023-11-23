import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../config"
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function AllCourses(){
    const [courses, setCourses] = useState([])
    const [purchasedCourse, setPurchasedCourse] = useState([])
    const init = async() => {
        const response = await axios.get(`${BASE_URL}/user/courses`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        setCourses(response.data.courses)
        const responsePurchase = await axios.get(`${BASE_URL}/user/purchasedCourses`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        setPurchasedCourse(responsePurchase.data.courses)
    }
    useEffect(() => {
        init();
    },[])
    return (
    <div style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#eeeeee"
      }}>
      <Typography variant="h5" style={{textAlign: "center", paddingBlock: 20}}>Available Courses</Typography>
      <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>  
            {courses.map(course => {
                return <Course course={course} purchasedCourse = {purchasedCourse} key={course._id}/>
            })}
        </div>
    </div>
    )
}
export function Course({course, purchasedCourse}){
    const navigate = useNavigate()
    const isCoursePurchased = (courseid) => {
        return purchasedCourse.some((course) => course.courseId._id === courseid);
    };

    return <Card key={course.id} style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }}>
      <img src={course.imageLink} style={{width: 300}} />
      <div>
      <Typography variant="h5" textAlign={"center"}>{course.title}</Typography>
      <Typography variant="body1" textAlign={"center"}>{course.description}</Typography>
      <Typography variant="body2" textAlign={"center"}>Price: Rs.{course.price}/-</Typography>
      <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
      {isCoursePurchased(course._id) ? (
        <Button variant="contained"  disabled>
          Purchased
        </Button>
      ) : (
        <Button variant="contained" onClick={async() => {
            const res = await axios.post(`${BASE_URL}/user/courses/${course._id}`,{},{
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                  }
            })
            const data = res.data
            navigate('/courses/purchased')
        }}>
          Purchase
        </Button>
      )}
      </div>
      </div>
  </Card>
}

export default AllCourses