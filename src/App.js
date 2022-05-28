import Home from './routes/home/home.component';
import { Routes, Route, Outlet } from 'react-router-dom';

const Navigation = () => {
  return (<div>
      <div>
        <h1>THE NAVIGATION</h1>
      </div>
      <Outlet />
    </div>);
};

const Shop = () => <h2>I'm SHOP</h2>;

const App = () => {

  return (<Routes>
      <Route path="/" element={ <Navigation /> }>
        <Route index element={ <Home /> } />
        <Route path="shop" element={ <Shop /> } />
      </Route>
    </Routes>);
};

export default App;
