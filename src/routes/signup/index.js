import React, {useState} from 'react';
import useRouter from "../../router/hooks";
import './style.css';
import {httpSignup} from "../../http";

function Signup() {
    const { changeRoute, setUser } = useRouter();
    const [name, setName] = useState('');
    const [password, setPass] = useState('');
    const [isComp, setComp] = useState(false);

    function submit(e) {
        e.preventDefault();

        if (name.length > 2 && password.length > 6) {
            httpSignup({name, password, isComp, cb: ({userType, userName: name}) =>  setUser({userType, name})});
        }
    }


    return <form onSubmit={submit} className="signup">
        Please fill the following details:
        <input placeholder="Username" minLength={3} value={name} onChange={({target}) => setName(target.value)} required />
        <input placeholder="Password" minLength={7} value={password} onChange={({target}) => setPass(target.value)} type="password" required />
        <label htmlFor="is-comp">Are you Webmaster? </label><input id="is-comp" onChange={({target}) => setComp(target.checked)} value={isComp} type="checkbox" />
        <button>Signup!</button>
        Have user? <u onClick={() => changeRoute('login')}>Login!</u>
    </form>
}

export default Signup;