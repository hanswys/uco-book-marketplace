import { Outlet } from 'react-router-dom'
import Header from './Header.js';


const Layout = () => {

    return (
        <>
          <Header />
          <div>
          <Outlet />
          </div>
        </>
    );
}
export default Layout