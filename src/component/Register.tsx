import { Link } from 'react-router-dom'
import axios from 'axios';

import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react"
import { USER_REGEX, PWD_REGEX, EMAIL_REGEX } from "../utils/regex"


const baseURL = "http://localhost:3011/register";

export const Register = () => {

    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState("");
    const [isValidName, setValidNameStatus] = useState(false);
    const [isUserFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmailStatus] = useState(false);

    const [password, setPassword] = useState("");
    const [isValidPassword, setValidPasswordStatus] = useState(false);
    const [isPasswordFocus, setPasswordFocus] = useState(false);

    const [matchedPassword, setMatchedPassword] = useState("");
    const [isValidMatchPassword, setIsMatchPasswordValidStatus] = useState(false);
    const [isMatchedPasswordFocus, setMatchedPasswordFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef?.current?.focus()
    }, []);

    useEffect(() => {
        setValidNameStatus(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setIsValidEmailStatus(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPasswordStatus(PWD_REGEX.test(password));
        setIsMatchPasswordValidStatus(password === matchedPassword);
    }, [password, matchedPassword]);

    useEffect(() => {
        setErrorMessage("")
    }, [user, email, password, matchedPassword])

    const handleSubmit = async (e: any) => {
        console.log("Form submited")
        console.log({
            name: user,
            password,
            email
        })
        e.preventDefault();
        try {

             await axios.post(baseURL, {
                name: user,
                email,
                password
            }).then((response: any) => console.log(response));

            setSuccess(true);
            setUser('');
            setPassword('');
            setMatchedPassword('');
        } catch (err: any) {
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 409) {
                setErrorMessage('Username Taken');
            } else {
                setErrorMessage('Registration Failed')
            }
            errRef?.current?.focus();
        }
    }

    return (
        <div className="register-component">
            {
                success ? (
                    <section>
                        <h1>Success!</h1>
                        <p>
                            <Link to="/">Login </Link>
                        </p>
                    </section>
                ) : (
                    <section>

                        <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">
                                Username:
                                <FontAwesomeIcon icon={faCheck} className={isValidName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={isValidName || !user ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                aria-invalid={isValidName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={isUserFocus && user && !isValidName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            <label htmlFor="email">
                                Email:
                                <FontAwesomeIcon icon={faCheck} className={isValidEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={isValidEmail || !email ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="email"
                                id="email"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={isValidEmail ? "false" : "true"}
                                aria-describedby="uidnote"
                            />
                            <p id="uidnote" className={email && !isValidEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            <label htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={isValidPassword ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={isValidPassword || !password ? "hide" : "invalid"} />
                            </label>

                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                aria-invalid={isValidPassword ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />

                            <p id="pwdnote" className={isPasswordFocus && !isValidPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <FontAwesomeIcon icon={faCheck} className={isValidMatchPassword && matchedPassword ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={isValidMatchPassword || !matchedPassword ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchedPassword(e.target.value)}
                                value={matchedPassword}
                                required
                                aria-invalid={isValidMatchPassword ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchedPasswordFocus(true)}
                                onBlur={() => setMatchedPasswordFocus(false)}
                            />
                            <p id="confirmnote" className={isMatchedPasswordFocus && !matchedPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>

                            <button disabled={!isValidName || !isValidPassword || !isValidMatchPassword ? true : false}>Sign Up</button>


                        </form>

                        <p>
                            Already registered?<br />
                            <span className="line">
                                <Link to="/">Login </Link>
                            </span>
                        </p>


                    </section>
                )
            }
        </div>
    )
}