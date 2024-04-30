import TopNav from "./components/topNav/topNav";
import Tabs from "./components/tabs/tabs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <TopNav />
      <Router>
        <Routes>
          <Route path="/" Component={Tabs} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
