import "./App.css";
import { AppDataProvider } from "./context/appContext";
import ROUTES, { RenderRoutes } from "./routes";

function App() {
  return (
    <AppDataProvider>
      <div className="min-vh-100">
        <RenderRoutes routes={ROUTES} />
      </div>
    </AppDataProvider>
  );
}

export default App;
