import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Button } from '../components/Button/ButtonElements';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroItems, HeroH1, HeroP } from './HeroElements';
import Video from '../assets/hero-cherry-blossom.mp4'

const Hero = () => {
  return (
    <HeroContainer>
        <HeroBg>
            <VideoBg src={Video} type="video/mp4" autoPlay loop muted playsInLine />
        </HeroBg>
        <HeroContent>
          <HeroItems>
            <HeroH1>Fast Travel</HeroH1>
            <HeroP>Find all your travel needs in one place</HeroP>
            <Router>
              <Button primary="true" big="true" round="true" to="/sign-in">Start planning</Button>
            </Router>
          </HeroItems>
        </HeroContent>
    </HeroContainer>
  )
}

export default Hero