import Axios from 'axios';

export const getFolders = (username) => {
    var folders = [];
    const data = {
        username: username 
    }

    Axios.post('http://localhost:3002/user/get_folders', data)
        .then((res) => {
            folders.push(res.data);

        });
    
    return folders;
};
