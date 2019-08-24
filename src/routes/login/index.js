import React, {useState, useEffect} from 'react';
import useRouter from "../../router/hooks";
import './style.css';
import {httpAuth, httpLogin} from "../../http";

function Login() {
    const { changeRoute, setUser } = useRouter();
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [password, setPass] = useState('');
    const cb = ({userType, userName: name}) =>  setUser({userType: 1, name});

    useEffect(() => httpAuth({cb}),[]);

    function submit(e) {
        e.preventDefault();

        if (name.length && password.length) {

            httpLogin({
                name,
                password,
                cb,
                errorFn: () => setError(true)
            });
        }
    }


    return <form onSubmit={submit} className="login">
        Please login to use smartify
        <input placeholder="Username" value={name} onChange={({target}) => setName(target.value)} required />
        <input placeholder="Password" value={password} onChange={({target}) => setPass(target.value)} type="password" required />
        {error && <div className="error">Can't login with entered credentials</div>}
        <button>Login!</button>
        New to smartify? <u onClick={() => changeRoute('signup')}>Signup!</u>
    </form>
}

export default Login;