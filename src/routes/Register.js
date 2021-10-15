import { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password2, setPassword2] = useState('');

    const getUsername = (e) => {
        setUsername(e.target.value);
    };

    const getEmail= (e) => {
        setEmail(e.target.value);
    };

    const getPassword= (e) => {
        setPassword(e.target.value);
    };

    const getPassword2 = (e) => {
        setPassword2(e.target.value);
    };

    const submitData = () => {
        if (password === password2) {

            const data = {
                username: username,
                email: email,
                password: password
            };
            Axios.post('http://localhost:3002/auth/register', data)
                .then((res) =>{
                    if (res.data !== "Username/Email already exists.") {
                        history.push({
                            pathname: '/',
                            state: email
                        });
                    }
                });
        } else {
            alert("Passwords do not match");
        }
    };


    return (
        <div>
          <p>register page</p>
          <input type="text" placeholder="username" onChange={(e) => getUsername(e)}/>
          <input type="text" placholder="email" onChange={(e) => getEmail(e)}/>
          <input type="text" placeholder="password" onChange={(e) => getPassword(e)}/>
          <input type="text" plaholder="password 2" onChange={(e) => getPassword2(e)}/>
          <button onClick={submitData}>Submit</button>
        </div>
    );
};

export default Register;
