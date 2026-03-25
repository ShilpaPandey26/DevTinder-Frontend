import { BrowserRouter, Route, Routes } from "react-router-dom"

import Body from "./Body"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<div>Login page</div>}></Route>
            <Route path="/Test" element={<div>Test page</div>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
