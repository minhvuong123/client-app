

import NavBar from 'navbar/nav-bar';
import './app.scss';
import RoutesPath, { RenderRoutes } from "routes/routes";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <RenderRoutes routes={RoutesPath} />
    </div>
  );
}

export default App;
