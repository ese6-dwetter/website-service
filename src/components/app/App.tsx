import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import store from "../../redux/store";
import { StyledContainer } from "./App.styles";
import NavigationBar from "../navigation-bar/NavigationBar";
import Register from "../register/Register";
import Login from "../login/Login";
import Home from "../home/Home";
import Logout from "../logout/Logout";
import Profile from "../profile/Profile";
import { StylesProvider } from "@material-ui/core";

const App = (): JSX.Element => {
    return (
        <React.StrictMode>
            <StylesProvider injectFirst>
                <StyledContainer>
                    <Provider store={store}>
                        <BrowserRouter>
                                <NavigationBar />

                                <main role="main">
                                    <Switch>
                                        <Route exact path="/" component={Home} />
                                        <Route exact path="/register" component={Register} />
                                        <Route exact path="/login" component={Login} />
                                        <Route exact path="/logout" component={Logout} />
                                        <Route exact path="/profile" component={Profile} />
                                    </Switch>
                                </main>
                        </BrowserRouter>
                    </Provider>
                </StyledContainer>
            </StylesProvider>
        </React.StrictMode>
    );
}

export default App;
