import { Route, Switch } from "wouter";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <Switch>
    <Route path="/" component={Index} />
    <Route component={NotFound} />
  </Switch>
);

export default App;