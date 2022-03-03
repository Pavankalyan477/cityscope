import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios"
import { useState, useEffect } from 'react';
import "../App.css"
export default function Homepage() {
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState();
    const [subhead, setSub] = useState();
    const [imag, setImag] = useState();
    const [dat, setDate] = useState();
    const [par, setPara] = useState();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleData = () => {
        const data = { Avatar: "CS", title: title, subheader: dat, image: imag, para: par };
        axios.post('http://localhost:3001/Data', data).then(res => {
            setTitle(res.title);
            setDate(res.subheader);
            subhead(subhead)
            setImag(res.Image)
            setPara(res.para);
        })
            .catch(error => {
                console.error('Something went wrong!', error);
            });
    }
    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:3001/Data");
        console.log("data", data);
        setPosts(data);
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(posts);
    return (
        <>
            <div >
                <br />
                <Button variant="outlined" onClick={handleClickOpen} style={{marginLeft:"40%" }}>
                 <AddIcon></AddIcon>   <b>Add post Details</b>
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Article</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            *Please fill all details related to the post
                        </DialogContentText>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                        <form class="mui-form">
                            <TextField
                                autoFocus
                                style={{ width: '100%' }}
                                id="outlined-multiline-flexible"
                                label="Image url"
                                type="url"
                                onClick={(e) => setTitle(e.target.value)}
                                 required
                            />
                            <TextField
                                margin="dense"
                                id="outlined-multiline-flexible"
                                label="Title"
                                 required
                                fullWidth
                                type="text"
                                style={{ width: '100%' }}
                                onClick={(e) => setSub(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="outlined-multiline-flexible"
                                label="Sub Title"
                                 required
                                fullWidth
                                style={{ width: '100%' }}
                                onClick={(e) => setImag(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="outlined-multiline-flexible"
                                type="date"
                                 required
                                fullWidth
                                style={{ width: '100%' }}
                                onClick={(e) => setDate(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Summary"
                                 required
                                rows={4}
                                fullWidth
                                id="outlined-multiline-static"
                                multiline
                                style={{ width: '100%' }}
                                onClick={(e) => setPara(e.target.value)}
                            />
                             <Button type="submit" variant="contained" onClick={handleData}>Submit</Button>
                                </form>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <br /><br />
            <div className='display'>
                {posts.map((item) => (
                    <Card sx={{ maxWidth: 345 }} key={item.id}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: "#00BFFF" }} aria-label="recipe">
                                    CS
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.title}
                            subheader={item.subheader}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={item.image}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {item.para}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </>
    )
}