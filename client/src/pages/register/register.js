import React, {useRef} from 'react'

const Register = () => {
    const fullNameRef = useRef(null)
    const emloyeeIdRef = useRef(null)
    const usernameRef = useRef(null)
    const staffEmailRef = useRef(null)
    const passwordRef = useRef(null)
    const passwordConfirmRef = useRef(null)
    return (
        <div>
            <div>
                <h3>Enter your details to sign up on LetXChat</h3>
            </div>
            <div>
                <form>
                    <label htmlFor="fullname">Full Name: </label>
                    <input type="text" name="fullname" ref={fullNameRef} required/><br />
                    <label htmlFor="employeeId">Employee ID: </label>
                    <input type="text" name="employeeId" ref={emloyeeIdRef} required/><br />
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" ref={usernameRef} minLength="3" maxLength="20" required/><br />
                    <label htmlFor="staffEmail">Staff Email:</label>
                    <input type="email" name="staffEmail" maxLength="50" ref={staffEmailRef} /><br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" ref={passwordRef} minLength="6" required/><br />
                    <label htmlFor="passwordConfirm">Password Confirm:</label>
                    <input type="password" name="passwordConfirm" ref={passwordConfirmRef} required /><br />
                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Register
