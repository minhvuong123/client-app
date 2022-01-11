
import RoutesPath, { RenderRoutes } from "routes/routes";
import './app.scss';

function App() {
  return (
    <div className="app-container">
      <RenderRoutes routes={RoutesPath} />
    </div>
  );
}

export default App;
