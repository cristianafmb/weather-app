
import { FC, useState } from 'react';
import styled from "styled-components"
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { ResultType, Degrees } from '../types/result';
import { AnimationToScrollSides } from './AnimationToScrollSides';

type Props = {
    results: ResultType;
};

export const DisplayResults: FC<Props> = (props) => {
    const { results } = props;
    console.log(results)

    const [toggleCtoF, setToggleCtoF] = useState<boolean>(false);
    const [degrees, setDegrees] = useState<Degrees>({
        temperature: results.temperatureC + 'ºC' || '',
        maxTemp: results.nextFiveDays[0]?.maxTempC + 'ºC' || '',
        minTemp: results.nextFiveDays[0]?.minTempC + 'ºC' || '',
    });

    function handleChange<E extends Element = HTMLAnchorElement>(
        e: React.MouseEvent<E, MouseEvent>
    ) {
        e.preventDefault();
        setToggleCtoF(!toggleCtoF)
        if (toggleCtoF) {
            setDegrees({
                temperature: results.temperatureC + 'ºC',
                maxTemp: results.nextFiveDays[0].maxTempC + 'ºC',
                minTemp: results.nextFiveDays[0].minTempC + 'ºC',
            })
        } else {
            setDegrees({
                temperature: results.temperatureF + 'ºF',
                maxTemp: results.nextFiveDays[0].maxTempF + 'ºF',
                minTemp: results.nextFiveDays[0].minTempF + 'ºF',
            })
        }
    }

    if (results.cityName === '')
        return (
            <WaitingForCity>
                <h3>
                    Choose a City <br />
                    <i>and explore</i>
                </h3></WaitingForCity>)
    else
        return (

            <ContainerCard>
                <div className="main container">
                    <Col xs="12" className='container-main'>
                        <Col xs="12" sm="6" lg="4" className='weather-panel'></Col>
                        <div className='container-info'>
                            <div>
                                <Col xs="6" className='m-auto text-center'>
                                    <h6 className='fs-2 mb-0'>{results.cityName}
                                    </h6>
                                    <p className='fs-6 mb-0'>{results.country}</p>
                                    <div className='d-inline-flex align-middle align-items-center'>
                                        <div className='text-center m-auto w-100'>
                                            <Image src={results.condition.icon} />
                                        </div>
                                        <p className="mb-0"> {results.condition.text}</p>
                                    </div>
                                </Col>
                                <Col xs="6" className='m-auto text-center'>
                                    <h3 className='display-3'>{degrees?.temperature}</h3>
                                    <p className='fs-6'>{degrees?.maxTemp + ' | ' + degrees?.minTemp}</p>
                                </Col>
                                <Col xs="12" className='m-auto text-center'>
                                    <Row className='list-inline forecast '>
                                        {results.nextFiveDays.map((day) => (
                                            <Col xs="4" sm="2" className='text-center'>
                                                <h6 className='fs-6 mb-0'>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</h6>
                                                <div className='text-center m-auto w-100'>
                                                    <Image src={day.condition.icon} className='icon-weather' />
                                                </div>
                                                <p className='mb-0'>{degrees?.maxTemp + ' | ' + degrees?.minTemp}</p>
                                            </Col>
                                        ))}
                                    </Row>
                                    <MobileView className='mt-2'>
                                        {<AnimationToScrollSides />}
                                    </MobileView>
                                </Col>
                                <Button variant="light" onClick={handleChange} className='mt-3'>
                                    <p className='mb-0 pb-0'>{toggleCtoF ? 'Celsius' : 'Fahrenheit'}</p>
                                </Button>
                            </div>
                        </div>
                    </Col>
                </div>
            </ContainerCard>
        );
}

export const WaitingForCity = styled.div`
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    height: 70dvh;
    .card{
        border: none;
    }
`
export const ButtonBorder = styled.div`
     display: flex;
  justify-content: center;
  align-items: center;

.btn {
  display: inline-block;
  color: #000;
  padding: 32px;
  position: relative;
  letter-spacing: 1px;

  &__circle,
  &__text,
  &__white-circle {
    position: absolute;
  }

  &__circle {
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 100%;
    width: 100%;
    box-shadow: 0 0 1px 1px #000;
    transition: 0.3s linear;
  }

  &__white-circle {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 56px;
    height: 56px;
    border-radius: 100%;
    background: #fafafa;
    display: flex;
    transition: 0.3s ease-in-out;

    svg {
      width: 24px;
      height: 24px;
      margin: auto;
    }
  }

  &__text {
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    z-index: 2;
    padding: 24px 8px;
    transition: 0.3s linear;
  }

  &:hover {
    .btn__circle {
      transform: scale(0);
    }

    .btn__white-circle {
      transform: translate(-50%, -50%) scale(1);
    }

    .btn__text {
      transform: translate(40px, -50%);
    }
  }
}
}
`

export const ContainerCard = styled.div`

  .main,  {
      padding: 0;
    width: 35vw;
    height: 65vh;
    position: relative;
    margin: auto;
    text-align: center;
    display: grid;
        margin-top: 7dvh;
     @media (max-width: 990px) {
        width: 85vw;
        height: 70vh;
        max-height: 60dvh;
        margin-top: 4dvh;
    }
}
     .container-main{
     height: 100%;
     width: 35vw;
     .container-info{
        padding: 2vh 0vw;
        height: 100%;
        align-content: center;
    }
     @media (max-width: 990px) {
        width: 85vw;
        padding: 0 7vw;
        .container-info{
        padding: 0 5vw;
    }
        }
     }
.weather-panel {
right: 0;
    top: 0;
        filter: blur(2px) saturate(0.9);
    background-image: url(https://media.istockphoto.com/id/1133849931/pt/vetorial/blue-sky-fluffy-clouds-and-sun-vector-illustration-for-your-new-design.jpg?s=612x612&w=0&k=20&c=eSGSoa_LtJlXPhcujNVuk9c-4M3nvNhh5a2JJSTHbWg=);
  background-size: cover;
  border-radius: 20px;
      border: 1px solid #6c757d;
  color: #fff;
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: calc(100% + 7vh);
    z-index: -1;
    margin: -2dvh 0;
  small {
    color: inherit;
    font-size: 50%;
  }  
     @media (max-width: 990px){
        height: 70dvh;
}
}
    .forecast{
  margin: auto;
    text-align: center;
    justify-content: center;
    font-size: 0.9rem !important;
    @media (max-width: 990px){
        height: 20vh;  
        display: grid;
        overflow-x: scroll;
        grid-template-columns: repeat(5, 40%);
        margin: auto;
        text-align: center;
        align-items: center;
        div{
        width: 100% !important;}
    }
    }
.icon-weather{
    max-height: 12vh;
    max-width: 12vw;
    object-fit: contain;
}
`