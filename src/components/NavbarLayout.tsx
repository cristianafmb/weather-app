import styled from "styled-components"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FC } from "react";
import { FormType } from '../types/form';
import { CityForm } from './Form';

export const NavbarLayout: FC<FormType> = (props) => {

  return (
    <ContainerSwitch>
      <BgNavBar />
      <Navbar expand="lg" className="">
        <Container className="main-container">
          <Navbar.Brand href="/">Weather App</Navbar.Brand>
          <CityForm getWeather={props.getWeather} setCity={props.setCity} city={props.city} />
        </Container>
      </Navbar>
    </ContainerSwitch>)
}

export const ContainerSwitch = styled.div`
.main-container{
  @media (max-width: 990px){
    display: inline !important;
  }
}
.navbar-brand{
    background-color: white !important;
    border-radius: 0.375rem !important;
        padding: 0.375rem 0.75rem !important;
    }
position: relative;
background: linear-gradient(180deg, rgb(243 247 255) 0%, rgba(247, 247, 247, 0.6587885154061625) 100%, rgba(247, 247, 247, 0) 100%);
`

export const BgNavBar = styled.div`
position: absolute;
height: 100%;
width: 100%;
    background-image: url(data:image/png;base64,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);
    background-position: 50% 40%;
    mask-image: linear-gradient(rgb(0 0 0 / 100%), transparent);
`