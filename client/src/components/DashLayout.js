import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import FilterBar from './FilterBar';
import Catalogue from './Catalogue';

const DashLayout = () => {
  return (
    <>
      <DashHeader />
        <div className="body-container">
        <FilterBar />
        <Catalogue />
    </div>
        <DashFooter />

    </>
  )
}

export default DashLayout