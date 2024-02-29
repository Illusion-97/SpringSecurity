import './App.css'
import {Header} from "./components/Header.jsx";
import {
    BrowserRouter as Router,
    Route, Routes
} from "react-router-dom";
import {Home} from "./views/Home.jsx";
import {Login} from "./views/Login.jsx";
import {Register} from "./views/Register.jsx";
import Modal from "react-modal";

function App() {
    Modal.setAppElement('body')
  return (
    <>
        <Router>
        <div className="w-screen h-screen flex flex-col">
            <Header></Header>
            <div className="grow min-h-0 overflow-y-auto overflow-x-hidden flex justify-center items-center p-10 bg-slate-300 dark:bg-slate-700">
                    <Routes>
                        <Route path="/" Component={Home}/>
                        <Route path="/login" Component={Login}/>
                        <Route path="/register" Component={Register}/>
                    </Routes>
            </div>
        </div>
    </Router>
    </>
  )
}

export default App
