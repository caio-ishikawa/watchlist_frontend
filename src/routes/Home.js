import Axios from 'axios';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import {  makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getFolders } from '../utils/getFolders';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



const useStyles = makeStyles({
    test: {
        background: "#1B263B",
        width:"100%",
        margin: "auto",
        borderRadius: "10px",
        borderColor: "purple"
    },
    searchBar: {
        width: "80%",
        margin: "auto",
        backgroundColor: "white"
    },
    movieTitle: {
        verticalAlign: "top",
        height: "10vh",
        marginLeft: "2vh",
    },
    style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#FFFF',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    results: {
        maxWidth: "90%",
        minWidth: "80%",
        background: "white"
    },
    poster: {
        maxWidth: "6vh",
        verticalAlign: "center",
    },
    contBox: {
        background: "white",
        width: "80%",
        margin: "auto",
        borderRadius: "7px"
    },
    listButton: {
        float: "right",
        height: "4.5vh",
    }
});


const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const username = history.location.state;
    const [movieTitle, setMovieTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [moviePoster, setMoviePoster] = useState('');
    const [folderMenu, setFolderMenu] = useState(false);
    const [folderArr, setFolderArr] = useState([]);
    var folders;

    if (username) {
        console.log(username);
    } else{ 
        console.log('no username')
    }

    useEffect(() =>{
        console.log(searchResults);
    }, [searchResults]);

    const handleChange = (e) => {
        setMovieTitle(e.target.value);
    };

    const getMovieData = () => {
        const apiKey = 'b53dac20';
        const apiUrl  = 'http://www.omdbapi.com/?apikey=' + apiKey + '&s=' + movieTitle;
        Axios.get(apiUrl)
            .then((res) => {
                setSearchResults(res.data.Search);
            });
    };

    const handleModal = (poster) => {
        if (open === true) {
            setOpen(false);
        } else {
            setOpen(true);
            setMoviePoster(poster);

        }
    };
    
    const addToList = (d) => {
        const data = {
            email: "caio@caiotest.com",
            movie: d.Title,
            file_name: "caiouser's Folder"
        }
        Axios.post('http://localhost:3002/user/add', data)
            .then((res) => console.log(res));
        console.log(d);
    };

   


    const results = searchResults.map(function(d, idx){
        return(
            <div>
              <Box className={classes.contBox}>
                <Button className={classes.listButton} id={idx} onClick={() => addToList(d)}>
                    <AddCircleOutlineIcon/>
                </Button>
                <ListItemButton id={idx} onClick={() => handleModal(d.Poster)} className={classes.results}>
                    <ListItemAvatar id={idx}>
                    <img alt={d.Title} src={d.Poster} className={classes.poster}/>
                    </ListItemAvatar>
                    <ListItemText className={classes.movieTitle} primary={d.Title} secondary={d.Year}/>
                
                </ListItemButton>
              </Box>
              <br></br>
              <Modal open={open} onClose={handleModal} aria-labelledby={idx}>
                <Box className={classes.style}>
                    <img id={idx} src={moviePoster} alt={moviePoster}/>
                </Box>
              </Modal>
            </div>
        );
    });

 
    return(
        <div>
          <p>Home page</p>
          <TextField className={classes.searchBar} placeholder="Movie" onChange={(e) => handleChange(e)}/>
          <br></br>
          <br></br>
          <Button variant="outlined" onClick={getMovieData}>Search</Button>
          <br></br>
          <br></br>
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        >
          {results}
        </List>
        </div>
    );
};

export default Home;
