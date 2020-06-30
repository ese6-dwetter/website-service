import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Post from "../../entities/Post.entity";
import { Alert } from "@material-ui/lab";
import { postFetch } from "../../networking/post.networking";

const PostDetails = (props: any): JSX.Element => {
    const [post, setPost] = React.useState(<div />);
    const [error, setError] = React.useState(<div />);

    const getPost = async (id: string): Promise<Post> => {
        setError(<div />)

        const response = await postFetch(id);
        
        // OK status code
        if (response.status === 200) {
            const post: Post = await response.json();
            
            return post;
        }

        // Get error message from response
        const errorMessage = await response.text();

        setError(
            <Alert severity="error">
                {errorMessage}
            </Alert>
        );
        
        throw new Error(errorMessage)
    }
    return (
        <div>
            {error}
            {post}
        </div>
    )
}

const mapStateToProps = (state: any): any => {
    return {
        authenticationReducer: state.authenticationReducer
    }
}

export default withRouter(connect(mapStateToProps)(PostDetails));