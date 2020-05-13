import React from "react";
import logo from "../../logo.svg";
import "./app.css";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import NavigationBar from "../navigation-bar/navigation-bar";
import store from "../../redux/store";
import Register from "../register/register";

function app() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <div className="app-container">
                        <NavigationBar />
                        <main role="main" className={"container"}>
                            <Switch>
                                <Route exact path="/" />
                                <Route path="/register" component={Register} />
                            </Switch>
                        </main>
                    </div>
                </Router>
            </Provider>
        </React.StrictMode>
    );
}

export default app;
