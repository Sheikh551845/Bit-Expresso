import React from 'react';
import Banner from '../Components/Banner';
import Tags from '../Components/Tags';
import FamousCoffee from '../Components/FamousCoffee';
import FollowUs from '../Components/FollowUs';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Tags></Tags>
           <FamousCoffee></FamousCoffee>
           <FollowUs></FollowUs>
        </div>
    );
};

export default Home;