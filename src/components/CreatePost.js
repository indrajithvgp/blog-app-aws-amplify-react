import React, {useEffect, useState} from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import {createPost} from '../graphql/mutations'

const CreatePost = () => {
    const [state, setState] = useState({
        postOwnerId:"",
        postOwnerUsername:"",
        postTitle:"",
        postBody:""
    })
    const {postOwnerId, postOwnerUsername, postTitle, postBody} = state

    async function getAuth(){
        return await Auth.currentUserInfo()
    }
    useEffect(() =>{
        getAuth().then(user => 
            {
                setState({
                    ...state,
                    postOwnerId: user.id, 
                    postOwnerUsername: user.username
                })
            })
            
    },[])

    const handleChange = (e)=>{
        setState({...state, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const input = {
            postOwnerId,
            postBody,
            postOwnerUsername,
            postTitle,
            createdAt: new Date().toISOString()
        }
        await API.graphql(graphqlOperation(createPost, {input}))
        setState({...state, postTitle:"", postBody:""})
    }

    return (
        <div>
            <form className="add-post" onSubmit={handleSubmit}>
                <input style={{font:'19px'}} required
                onChange={handleChange}
                name="postTitle" type="text" value={postTitle} placeholder="Title"/>  

                <textarea type="text"
                onChange={handleChange}
                name="postBody" rows="3" 
                placeholder="New Blog Post"
                value={postBody}
                cols="40" required/>
                <input type="submit" style={{fontSize: '19px'}} className="btn"/>
            </form>
        </div>
    )
}

export default CreatePost
