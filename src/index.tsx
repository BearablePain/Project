import { render } from 'react-dom'
import React from  'React'
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./app/providers/ThemeProvider/ui/ThemeProvider";
import App from "./app/App";
render(
  <BrowserRouter
  ><ThemeProvider><App/> </ThemeProvider>
</BrowserRouter>,
    document.getElementById('root')
)
