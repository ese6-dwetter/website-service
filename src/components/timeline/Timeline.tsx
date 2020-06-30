import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Input, Button } from "@material-ui/core";
import { StyledForm, StyledFormControl } from "./Timeline.styles";
import CreatePost from "../../entities/CreatePost.entity";
import { createPostFetch, postsFetch } from "../../networking/post.networking";
import { Alert } from "@material-ui/lab";
import Post from "../../entities/Post.entity";

const Timeline = (props: any): JSX.Element => {

    const [content, setContent] = React.useState('');
    
    const [posts, setPosts] = React.useState(<div />);
    const [error, setError] = React.useState(<div />);
    
    const onContentChange = (event: any) => setContent(event.target.value);

    const postContent = async (): Promise<void> => {
        setError(<div />);

        const post: CreatePost = {
            content: content
        }

        const response = await createPostFetch(post, props.authenticationReducer.user.token);
        
        // OK status code
        if (response.status === 200) {
            props.history.push("/");

            return;
        }

        const errorMessage = await response.text();

        setError(
            <Alert severity="error">
                {errorMessage}
            </Alert>
        );
    }

    const getPosts = async (): Promise<Post[]> => {
        setError(<div />);

        const response = await postsFetch();

        if (response.status === 200) {
            const posts: Post[] = await response.json()

            return posts;
        }

        const errorMessage = await response.text();

        setError(
            <Alert severity="error">
                {errorMessage}
            </Alert>
        );
        
        throw new Error(errorMessage)
    }

    useEffect(() => {
        (async (): Promise<void> => {
            const posts: Post[] = await getPosts();

            setPosts(
                <StyledContainer>
                    
                </StyledContainer>
            )
        })
    })

    const items = (
        <StyledForm>
            {error}
            <StyledFormControl>
                <Input
                    error={false}
                    required={true}
                    type="text"
                    value={content}
                    onChange={onContentChange}
                />
            </StyledFormControl>
            <Button 
                variant="outlined" 
                onClick={postContent}
            >
                Post
            </Button>
        </StyledForm>
        {posts}
    )

    return (
        <div>
            {items}
        </div>
    );
}

const mapStateToProps = (state: any): any => {
    return {
        authenticationReducer: state.authenticationReducer
    }
}

export default withRouter(connect(mapStateToProps)(Timeline));