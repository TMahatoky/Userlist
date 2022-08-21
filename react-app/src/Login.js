import { useRef, useState, useEffect, useContext} from "react";
import AuthContext from "./AuthProvider";
import './Login.css';

import axios from './api/axios';
import {Link, useNavigate} from 'react-router-dom';

const LOGIN_URL = '/';

const Login = () => {
    const { setAuth } =useContext(AuthContext);

    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();


    const [mail, setMail] = useState('');


    const [pwd, setPwd] = useState('');


    const [errMsg, setErrMsg] = useState('');
    

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [mail, pwd])

     const login = async (e) => {
         e.preventDefault();
         try{
         const response = await axios.post(LOGIN_URL, JSON.stringify({mailAddress: mail, password: pwd }),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }).then((result) => {
                if(result.data.message === 'Success'){
                    console.log(result.data);
                    navigate('/list', {replace: true});
                }
                 else{
                     setErrMsg('Wrong combination');
                 }
            });
          setAuth({mail, pwd});
          setMail('');
          setPwd('');
        } catch (err){
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Mail or Password');
            } else if (err.response?.status === 401){
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            console.log(err)
            errRef.current.focus();
        }
     }


    return (
       
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> 
            {errMsg}</p>
            <h1>WELCOME</h1>
            <form >
                    <input
                    type="email"
                    id="e-mail"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setMail(e.target.value)}
                    value = {mail}
                    required
                    placeholder="E-mail Address"
                    />

                    <input
                        type="password"
                        id= "password"
                        onChange = {(e) => setPwd(e.target.value)}
                        value = {pwd}
                        required
                        placeholder="Password"
                    />

                    <Link to="/list">
                        <button id="L" onClick={login}>
                        Connect
                        </button>
                    </Link>
            </form>
            <p>
                Don't have an account yet ? <br />
                <span className="line">
                    <Link to="/register">Register</Link>
                </span>
            </p>
        </section>
    )
}

export default Login