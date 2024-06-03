import { useState, useEffect, useContext } from 'react';

import { AuthStateContext } from '../App';
import axiosInstance from '../services/axiosInstance';

export default function GetLogin() {

    const { isLoggedIn, setIsLoggedIn } = useContext(AuthStateContext);

    const [loginError, setLoginError] = useState(undefined);

    async function handleLogin(event) {
        event.preventDefault();
        // Get username and password from form
        const username = event.target.closest("form").username.value;
        const password = event.target.closest("form").password.value;

        // Check if credentials are valid (generates a new token if valid)
        const token = await validateCredentials(username, password);

        // Store token in local storage and set global state logged in to true
        if (token) {
            window.localStorage.setItem("token", token);
            setIsLoggedIn(true);
            setLoginError(undefined);
        } else {
            setLoginError("Invalid username or password");
        }
    }

    async function handleLogout() {
        // Remove token from local storage and set global state logged in to false
        window.localStorage.removeItem("token");
        setIsLoggedIn(false);
    }

    async function validateCredentials(username, password) {
        try {
            const response = await axiosInstance.post(`/api/login`, {
                username,
                password
            });
            if (response.status === 200) {
                return response.data.token;
            } else {
                console.error("Login failed");
                return undefined;
            }
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    async function validateToken(token) {
        try {
            const response = await axiosInstance.post(`/api/validatetoken`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                return true;
            } else {
                console.error("Token is invalid");
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // Check if token exists in local storage and if it's still valid
    // If it is, keep logged in, if it isn't log out
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        
        if (token) {
            (async () => {
                const isValid = await validateToken(token);
                if (isValid) {
                    setIsLoggedIn(true);
                } else {
                    window.localStorage.removeItem("token");
                    setIsLoggedIn(false);
                }
            })();
        }
    }, []);


    return (
        <div className="loginForm">
            <form>
                {!isLoggedIn && (
                    <>
                        <label>Username: </label>
                        <input type="text" name="username" />
                        <label>Password: </label>
                        <input type="password" name="password" />
                        <button onClick={handleLogin}>Login</button>
                    </>
                )}
                {isLoggedIn && (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </form>
            {loginError && setTimeout(() => setLoginError(undefined), 3000) && <div className="errorMsg">{loginError}</div>}
        </div>
    )    
}