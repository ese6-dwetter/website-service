import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import NavigationBar from "../navigation-bar/NavigationBar";
import store from "../../redux/store";
import Register from "../register/Register";
import { StyledContainer } from "./App.styles";

function App() {
    return (
            <React.StrictMode>
                <Provider store={store}>
                    <BrowserRouter>
                        <StyledContainer>
                            <NavigationBar />
                            <main role="main" className={"container"}>
                                <Switch>
                                    <Route exact path="/" />
                                    <Route path="/register" component={Register} />
                                </Switch>
                            </main>
                        </StyledContainer>
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>
    );
}

export default App;
