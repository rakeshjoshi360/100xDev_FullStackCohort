import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
      <Link style={{cursor: "pointer"}} color="inherit" onClick = {() => {navigate("/signup")}}>
        CourseEd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Signin() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
            Welcome Back
          </Typography>
          <Box sx={{ mt: 1 }}>
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
            <TextField
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={async () => {
                if(role === "admin"){
                  const res = await axios.post(`${BASE_URL}/admin/signin`, {
                    username: email,
                    password: password
                  }, {
                    headers: {
                      "Content-type": "application/json"
                    }
                  });
                  const data = res.data
                  localStorage.setItem("token", data.token)
                }else{
                  const res = await axios.post(`${BASE_URL}/user/signin`, {
                    username: email,
                    password: password
                  }, {
                    headers: {
                      "Content-type": "application/json"
                    }
                  });
                  const data = res.data
                  localStorage.setItem("token", data.token)
                }
                setUser({userEmail: email, isLoading: false, role: role})
                navigate("/")
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link style={{cursor: "pointer"}} onClick = {() => {navigate("/signup")}} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}