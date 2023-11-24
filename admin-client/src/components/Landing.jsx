import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userRoleState } from "../store/selectors/userRole";
export const Landing = () => {
    const navigate = useNavigate()
    const userEmail = useRecoilValue(userEmailState)
    const userLoading = useRecoilValue(isUserLoading)
    const userRole = useRecoilValue(userRoleState)
    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#eeeeee"
          }}>
            <Grid container style={{paddingInline: "5vw"}}>
            <Grid item xs={12} md={6} lg={6}>
                <div style={{marginTop: 130}}>
                    {userRole === "admin" ? <div>
                    <Typography variant={"h3"}>
                        Turning your expertise into revenue just got a lot easier
                    </Typography>
                    <br />
                    <Typography variant= {"subtitle1"} color={"grey"}>
                        Create and sell online courses, build vibrant communities, and monetize memberships — all on a single, scalable platform.
                    </Typography>
                    </div> : <div>
                    <Typography variant={"h2"}>
                        You learn today and earn tomorrow
                    </Typography>
                    <br/>
                    <Typography variant= {"subtitle1"} color={"grey"}>
                        Your one-stop destination for high-quality courses. Enhance your skills and knowledge with our diverse selection of courses.
                    </Typography>
                    </div> }
                    {!userLoading && !userEmail && <div style={{display: "flex", marginTop: 20}}>
                        <div style={{marginRight: 10}}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signup")
                                }}
                            >Signup</Button>
                        </div>
                        <div>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signin")
                                }}
                            >Signin</Button>
                        </div>
                    </div>}
                </div>
                <div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}  style={{marginTop: 0}}>
                {userRole === "admin" ? <img 
                    src={"https://res.cloudinary.com/dpz3rctll/image/upload/v1700485235/Course-selling-website/ea007fa4-a310-4d36-8d84-61e1bac1c692_ellie-diop-homepage_vrjtnk.png"} 
                    width={"100%"} 
                /> : <img 
                    src={"https://res.cloudinary.com/dpz3rctll/image/upload/v1700487753/Course-selling-website/Group_4_gai7pe.png"} 
                    width={"100%"} 
                /> }
            </Grid>
        </Grid>
        </div>
    )
}