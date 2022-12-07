import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import "pace-js"
import "pace-js/themes/green/pace-theme-minimal.css"

import { store } from "./store"

import "./index.scss"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
