import Axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const getUsername = (e) => {
        setUsername(e.target.value);
    };

    const getPassword = (e) => {
        setPassword(e.target.value);
    };

    const submitData = (e) => {
        const data = {
            username: username,
            password: password
        };
        Axios.post('http://localhost:3002/auth/login', data)
            .then((res) => {
                if (res) {
                    history.push({
                        pathname: '/',
                        state: username, 
                    })
                }
            });

    };

    return(
        <div>
          <p>login page</p>
          <input type="text" onChange={(e) => getUsername(e)}/>
          <input type="text" onChange={(e) => getPassword(e)}/>
          <button onClick={submitData}>Submit</button>
        </div>
    );
};

export default Login;
