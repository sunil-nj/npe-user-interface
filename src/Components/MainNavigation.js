import React, { Component } from "react";
import { Routes,Router, Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import LandingPage from "./login/LandingPage";
import UserDetails from './userProfile/UserDetails';

export default class MainNavigation extends Component {
    render() {
        return (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<LandingPage />}/>
            <Route path="/userprofile" element={<UserDetails />} />
          </Routes>
        )
    }
}