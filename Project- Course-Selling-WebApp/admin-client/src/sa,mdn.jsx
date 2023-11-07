import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import {Loading} from "./Loading";
import { BASE_URL } from "../config.js";
import { courseState } from "../store/atoms/course";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { courseTitle, coursePrice, isCourseLoading, courseImage } from "../store/selectors/course";

function Course() {
    const {courseId} = useParams();
    let setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);

    const init = async() => {
        const resp = await axios.get(`${BASE_URL}/admin/course/${courseId}`,{
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        setCourse({isLoading: false, course: resp.data.course})
    }

    useEffect(()=>{
        init();
    }, [])
    if (courseLoading) {
        return <Loading />
    }


    return(
        <div>
            <GrayTopper />
            <Grid container>
                <Grid item lg={8}>
                    <UpdateCard />
                </Grid>
                <Grid item lg={4}>
                    <CourseCard />
                </Grid>
            </Grid>
        </div>
    )
}
function GrayTopper() {
    const title = useRecoilValue(courseTitle)
    return(
        <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
    )
}
function UpdateCard(){
    const [courseDetails, setCourseDetails] = useRecoilState(courseState);

    const [title, setTitle] = useState(courseDetails.course.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [image, setImage] = useState(courseDetails.course.imageLink);
    const [price, setPrice] = useState(courseDetails.course.price);
    return(
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card varint={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
                <div style={{padding: 20}}>
                    <Typography style={{marginBottom: 10}}>Update Course Details</Typography>
                    <TextField
                    value={title}
                    style = {{marginBottom: 10}}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    fullWidth = {true}
                    label = "Title"
                    variant="outlined"
                    
                />

                <TextField
                    value={description}
                    style = {{marginBottom: 10}}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    fullWidth = {true}
                    label = "Description"
                    variant="outlined"
                    
                />
                
                <TextField
                    value={image}
                    style = {{marginBottom: 10}}
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth = {true}
                    label = "Image Link"
                    variant="outlined"
                />
                
                <TextField
                    value={price}
                    style = {{marginBottom: 10}}
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                    fullWidth = {true}
                    label = "Price"
                    variant="outlined"
                />

                <Button
                    variant="contained"
                    size={"large"}
                    onClick={async() => {
                        await axios.put(`${BASE_URL}/admin/course/${courseDetails.course._id}`, {
                            title: title,
                            description: description,
                            imageLink: image,
                            published: true,
                            price: price
                        }, {
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        })
                        let updatedCourse = {
                            _id: courseDetails.course._id,
                            title: title,
                            description: description,
                            imageLink: image,
                            price: price
                        }
                        setCourseDetails({course: updatedCourse, isLoading: false})
                    }}
                >Update Course
                </Button>
                </div>
            </Card>
        </div>
    )
}
function CourseCard(props){
    const imageLink = useRecoilValue(courseImage)
    const title = useRecoilValue(courseTitle)
    const price = useRecoilValue(coursePrice)
    return(
        <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
            <Card style={{margin: 10,
            width: 350,
            minHeight: 200,
            borderRadius: 20,
            marginRight: 50,
            paddingBottom: 15,
            zIndex: 2
            }}>
                <Image />
        <div style={{marginLeft: 10}}>
            <Title />
            <Typography variant="subtitle2" style={{color: "gray"}}>
                Price
            </Typography>
            <Price />
        </div>
    </Card>
    </div>
    )
}
function Title(){
    const title = useRecoilValue(courseTitle);
    return (
        <Typography variant="h5">{title}</Typography>
    )
}
function Price(){
    const price = useRecoilValue(coursePrice)
    return(
        <Typography variant="subtitle1">
                <b>Rs {price} </b>
         </Typography>
    )
}
function Image(){
    const imageLink = useRecoilValue(courseImage);
    return(
        <img src={imageLink} style={{width: 350}} ></img>
    )
}
export default Course;