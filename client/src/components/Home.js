import React from 'react'
import FilterBar from './FilterBar';
import Catalogue from './Catalogue';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="body-container">
    {/* <FilterBar /> */}
    <Catalogue />
    <Outlet /> 
  </div>
  )
}

export default Home