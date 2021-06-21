import React, {useState} from 'react'
import { useEffect } from 'react'
import {API, graphqlOperation, Auth} from 'aws-amplify'
import { createComment } from '../graphql/mutations'



export const CreateCommentPost = (props) => {
    const [state, setState] = useState({
        commentOwnerId: "",
        commentOwnerUsername: "",
        content: ""
    })

    // async function unMount(){
    //     await Auth.currentUserInfo()
    //         .then(user => {
    //             setState({ ...state, 
    //                 commentOwnerId: user.attributes.sub, 
    //                 commentOwnerUsername: user.username})
    //         })
    // }

    async function mount(){
        await Auth.currentUserInfo()
            .then(user => {
                setState({ ...state, 
                    commentOwnerId: user.attributes.sub, 
                    commentOwnerUsername: user.username})
            })
    }

    useEffect(()=>{
        mount()
        return ()=>{
            // unMount()
        }
    }, [])


    const handleChangeContent = event => setState({ ...state, content: event.target.value})
    const handleAddComment = async event => {
          event.preventDefault()

          const input = {
               commentPostId: props.postId,
               commentOwnerId: state.commentOwnerId,
               commentOwnerUsername: state.commentOwnerUsername,
               content: state.content,
               createdAt: new Date().toISOString()
          }
          await API.graphql(graphqlOperation(createComment, { input }))

          setState({...state, content: ""}) // clear field
    }

    return (
        <div>

          <form className="add-comment"
            onSubmit={handleAddComment}>
              
              <textarea 
                type="text"
                 name="content"
                 rows="3"
                 cols="40"
                 required
                 placeholder="Add Your Comment..."
                 value= {state.content}
                 onChange={handleChangeContent}/>

                 <input 
                  className="btn"
                  type="submit"
                  style={{ fontSize: '19px'}}
                  value="Add Comment"/>

        </form>     
        </div>

    )
}

export default CreateCommentPost