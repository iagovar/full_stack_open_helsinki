import axios from 'axios';
import { useState, useEffect } from 'react';

export default function GetLogin({api_url, setIsLoggedIn}) {
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [loginError, setLoginError] = useState(undefined);
    async function checkCredentials() {
        try {
            const username = window.localStorage.getItem("username");
            const password = window.localStorage.getItem("password");

            if (!username || !password) {
                console.log("No username or password found, asking for login");
                return false;
            }

            console.log(`Logging in with username ${username} and password ${password} to ${api_url}`);
            const response = await axios.post(`${api_url}/api/login`, {
                username,
                password
            })

            if (response.status === 200) {
                window.localStorage.setItem("token", response.data.token);
                setLoginError(undefined);
                return true;
            } else {
                window.localStorage.removeItem("token");
                setLoginError("Login failed");
                return false;
            }

        }
        catch (error) {
            console.error(error);
            setLoginError("Login failed");
            return false;
        }
    }

    async function handleLogin(event) {
        event.preventDefault();
        const username = event.target.closest("form").username.value;
        const password = event.target.closest("form").password.value;

        window.localStorage.setItem("username", username);
        window.localStorage.setItem("password", password);

        const thisToken = await checkCredentials();

        setIsTokenValid(thisToken);
    }

    function handleLogout() {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("password");

        setIsTokenValid(false);

        setIsLoggedIn(false);
    }

    useEffect(() => {

        (async () => {
            const thisValid = await checkCredentials();
            setIsTokenValid(thisValid);
        })();

    }, []);

    return (
        <div className="loginForm">
            <form>
                {!isTokenValid && (
                    <>
                        <label>Username: </label>
                        <input type="text" name="username" />
                        <label>Password: </label>
                        <input type="password" name="password" />
                        <button onClick={handleLogin}>Login</button>
                    </>
                )}
                {isTokenValid && (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </form>
            {loginError && <p>{loginError}</p>}
        </div>
    )    
}