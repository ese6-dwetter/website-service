import React from "react";
import { StyledContainer } from "./Home.styles";

const Home = (props: any): JSX.Element => {
    const content = (
        <StyledContainer>
            <h1>Welcome to Dwetter!</h1>
            <h2>A Twitter clone by Davy de Haas</h2>
        </StyledContainer>
    )

    return (
        <div>
            {content}
        </div>
    );
}

export default Home