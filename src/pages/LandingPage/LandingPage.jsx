import React from 'react';
import './LandingPage.css';
import RibbonHeader from '../../components/RibbonHeader/RibbonHeader';
import LandingCard from '../../components/LandingCard/LandingCard';
import LandingButtons from '../../components/LandingButtons/LandingButtons';

const LandingPage = (props) => {

    return(
        <div className="LandingPage">
            <RibbonHeader />
            <LandingCard />
            <LandingButtons />
        </div>
    );
}

export default LandingPage;