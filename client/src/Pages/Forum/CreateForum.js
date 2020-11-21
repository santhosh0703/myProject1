import React, {useState,useContext} from "react";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";

const CreateForum = () => {
    const {id} = useParams();
    const history = useHistory();
    const [title, setTitle] = useState("");

    const {user} = useContext(AuthContext)
    const handleOnSubmit = async event => {
        event.preventDefault();

        const data = {
            title,
            categoryId: id
        };

        const response = await axios.post('/api/forum/create', data);
        const {_id} = response.data;
        history.push('/forum/'+_id);
    };

    return (
        <div style={{padding: "2rem"}}>
            <h1 style={{marginBottom: "2rem"}}>Create Forum</h1>

            <form onSubmit={handleOnSubmit}>
                <TextField label="Title"
                           required
                           fullWidth
                           margin="normal"
                           value={title}
                           onChange={e => setTitle(e.target.value)}/>
                <Button type="submit" disabled={!user} variant="contained" color="primary">Create title for your discussion</Button>
            </form>
        </div>
    )
};

export default CreateForum;