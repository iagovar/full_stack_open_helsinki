import { useState, createContext } from 'react'

import './App.css'

import GetLogin from './components/GetLogin'
import ListBlogs from './components/ListBlogs';

export const AuthStateContext = createContext();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthStateContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <h1>Blogs App</h1>
      <GetLogin />
      {isLoggedIn && (
        <>
          <ListBlogs />
        </>
      )}
    </AuthStateContext.Provider>
  )
}

export default App
