import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import axios from "axios";
import { BASE_URL } from '../config';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function Copyright(props) {
    const navigate = useNavigate()
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link style={{cursor: "pointer"}} color="inherit" onClick={() => {navigate("/")}}>
        CourseEd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [role, setRole] = useState("")
    const setUser = useSetRecoilState(userState)

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to CourseEd.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="roleType">Account Type</InputLabel>
                <Select
                  labelId="roleType"
                  id="role"
                  value={role}
                  label="Account Type"
                  onChange={(e) => {
                    setRole(e.target.value)
                  }}
                >
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"user"}>User</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="profilePic"
                  label="Profile Picture"
                  name="profilePic"
                  autoComplete="profilePic"
                  onChange={(e) => {
                    setProfilePic(e.target.value)
                  }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick = {async() => {
                if(role === "admin"){
                  const res = await axios.post(`${BASE_URL}/admin/signup`, {
                    firstName: firstName,
                    lastName: lastName,
                    username: email,
                    password: password,
                    profilePic: profilePic,
                    role: role,
                  }, {
                    headers: {
                      "Content-type": "application/json"}
                  }) 
                  const data = res.data
                  localStorage.setItem("token", data.token)
                }else{
                  const res = await axios.post(`${BASE_URL}/user/signup`, {
                    firstName: firstName,
                    lastName: lastName,
                    username: email,
                    password: password,
                    profilePic: profilePic,
                    role: role,
                  }, {
                    headers: {
                      "Content-type": "application/json"}
                  })
                  const data = res.data
                  localStorage.setItem("token", data.token)
                }
                setUser({userEmail: email, isLoading: false, role: role})
                navigate("/")
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link style={{cursor: "pointer"}} onClick = {() => {navigate("/signin")}} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}