import { useRef, useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';
import {Link} from 'react-router-dom';
// import { response } from "express";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*[0-9])(?=.*?[!#@$%]).{8,24}$/;
const REGISTER_URL = '/register'

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();


    const [first, setFirst] = useState('');
    const [validFirst, setValidFirst] = useState(false);
    const [FirstFocus, setFirstFocus] = useState(false);

    const [last, setLast] = useState('');
    const [validLast, setValidLast] = useState(false);
    const [LastFocus, setLastFocus] = useState(false);

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])
 
    useEffect(() => {
        const result = USER_REGEX.test(first);
        // console.log(result);
        // console.log(first);
        setValidFirst(result);
    }, [first])

    useEffect(() => {
        const result = USER_REGEX.test(last);
        // console.log(result);
        // console.log(last);
        setValidLast(result);
    }, [last])
 
    useEffect(() => {
        const result = MAIL_REGEX.test(mail);
        // console.log(result);
        // console.log(mail);
        setValidMail(result);
    }, [mail])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        // console.log(result);
        // console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [mail, pwd, matchPwd])

    const register = async (e) => {
          e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({
                firstName: first,
                lastName: last,
                mailAddress: mail,
                password: pwd
             }),{
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
             });
            console.log(response.data);
            } catch(err){
                if(!err?.response){
                    setErrMsg('No Server Response');
                } else if(err.response?.status === 409) {
                    setErrMsg('Mail Taken');
                }else {
                    setErrMsg('Registration Failed');
                }
                errRef.current.focus();
            }
     }


    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> 
            {errMsg}</p>
            <h1>REGISTER</h1>
            <form>
                <span className={validFirst ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validFirst || !first ? "hide": "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                <input
                    type="text"
                    id="firstname"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setFirst(e.target.value)}
                    required
                    aria-invalid = {validFirst ? "false" : "true"}
                    aria-describedby = "uidnote"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                    placeholder="First name"
                    />
                    <p id="uidnote" className={FirstFocus && first && !validFirst ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 chars. <br />
                        Must start with a letter. <br />
                    </p>

                <span className={validLast ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validLast || !last ? "hide": "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                <input
                    type="text"
                    id="lastname"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setLast(e.target.value)}
                    required
                    aria-invalid = {validLast ? "false" : "true"}
                    aria-describedby = "uidnote"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                    placeholder="Last Name"
                    />
                    <p id="uidnote" className={LastFocus && last && !validLast ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 chars. <br />
                        Must start with a letter. <br />
                    </p>

                    <label htmlFor="e-mail">
                    <span className={validMail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMail || !mail ? "hide": "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    </label>
                    <input
                    type="email"
                    id="e-mail"
                    autoComplete="off"
                    onChange={(e) => setMail(e.target.value)}
                    required
                    aria-invalid = {validMail ? "false" : "true"}
                    aria-describedby = "mailnote"
                    onFocus={() => setMailFocus(true)}
                    onBlur={() => setMailFocus(false)}
                    placeholder="E-mail Address"
                    />
                    <p id="mailnote" className={mailFocus && mail && !validMail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Wrong format. <br />
                        Please enter an e-mail address. <br />
                    </p>

                    <label htmlFor="password">
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                    </label>
                    <input
                        type="password"
                        id= "password"
                        onChange = {(e) => setPwd(e.target.value)}
                        required
                        aria-invalid = {validPwd ? "false" : "true"}
                        aria-describedby = "pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        placeholder="Password"
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters. <br />
                        Must include uppercase and lowercase letters, a number and a special character. <br />
                    </p>    

                    <label htmlFor="confirm_pwd">
                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid = {validMatch ? "false" : "true"}
                        aria-describedby = "confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)} 
                        placeholder="Confirm Password"
                        />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                     <Link to="/list">
                    <button className="in" disabled={!validFirst || !validLast || !validMail || !validPwd || !validMatch ? true : false} onClick={register}>
                        Sign Up 
                    </button>
                     </Link> 
            </form>
            <p>
                Already registered ? <br />
                <span className="line">
                        <Link to="/">Sign In</Link>
                </span>
            </p>
        </section>
    )
}

export default Register