import React, { useState, useEffect } from "react";

const mainURL = "https://bshproduction.dk/devops-starter";
const userInfoEndpoint = "/api/info/user";
const adminInfoEndpoint = "/api/info/admin";
const defaultEndpoint = "/api/default";
const loginEndpoint = "/api/login";
const all="/api/species/all"
const id="/api/species/id"
const add="/api/species/add"
export {
    mainURL,
    userInfoEndpoint,
    adminInfoEndpoint,
    defaultEndpoint,
    loginEndpoint,
    all,
    id,
    add
};
