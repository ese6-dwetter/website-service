import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import NavigationBar from "../navigation-bar/NavigationBar";
import store from "../../redux/store";
import Register from "../register/Register";
import { StyledContainer } from "./App.styles";

const App = () => {
    return (
        <React.StrictMode>
            <StyledContainer>
                <Provider store={store}>
                    <BrowserRouter>
                            <NavigationBar />
                            <main role="main">
                                <Switch>
                                    <Route exact path="/" />
                                    <Route path="/register" component={Register} />
                                </Switch>
                            </main>
                    </BrowserRouter>
                </Provider>
            </StyledContainer>
        </React.StrictMode>
    );
}

export default App;
