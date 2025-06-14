import axios from 'axios'
const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const LoginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        console.log({REACT_APP_API_BASE_URL: REACT_APP_API_BASE_URL})
        const response = await axios.post(`${REACT_APP_API_BASE_URL}/api/auth/login`, userCredentials)
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data })
        
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error})
    }
}


export default LoginCall