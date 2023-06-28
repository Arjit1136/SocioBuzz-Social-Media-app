import {  Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './scenes/homePage/index'
import LoginPage from './scenes/loginPage/index'
import ProfilePage from './scenes/profilePage/index'
import './App.css'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline,ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import { themeSettings } from './theme'

function App() {

  const mode=useSelector((state)=>state.mode)

  // console.log(mode)
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode])
  const isAuth=Boolean(useSelector((state)=>state.token));
  // console.log(theme)
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* resets CSS  */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
