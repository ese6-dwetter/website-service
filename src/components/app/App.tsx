import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import store from "../../redux/store";
import { StyledAppContainer } from "./App.styles";
import NavigationBar from "../navigation-bar/NavigationBar";
import Register from "../register/Register";
import Login from "../login/Login";
import Home from "../home/Home";
import Logout from "../logout/Logout";
import Profile from "../profile/Profile";
import { StylesProvider } from "@material-ui/core";

const App = (props: any): JSX.Element => {
    return (
        <React.StrictMode>
            <StylesProvider injectFirst>
                <Provider store={store}>
                    <BrowserRouter>
                        <StyledAppContainer>
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
                        </StyledAppContainer>
                    </BrowserRouter>
                </Provider>
            </StylesProvider>
        </React.StrictMode>
    );
}

export default App;
