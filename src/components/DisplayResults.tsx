
import { FC, useState } from 'react';
import styled from "styled-components"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { ResultType, Degrees } from '../types/result';

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
                    <Row>
                        <Col xs="12">
                            <Col xs="12" sm="6" lg="4" className='weather-panel'></Col>
                            <Col xs="6" className='m-auto text-center'>
                                <h6 className='fs-2'>{results.cityName}
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
                                            <h6 className='fs-6'>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</h6>
                                            <div className='text-center m-auto w-100'>
                                                <Image src={day.condition.icon} className='icon-weather' />
                                            </div>
                                            <p>{degrees?.maxTemp + ' | ' + degrees?.minTemp}</p>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                            <Button variant="light" onClick={handleChange}>
                                <p className='mb-0 pb-0'>{toggleCtoF ? 'Celsius' : 'Fahrenheit'}</p>
                            </Button>
                        </Col>
                    </Row>
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

  .main {
  width: 40vw;
    height: 80vh;
    position: relative;
    margin: auto;
    text-align: center;
        margin-top: 7dvh;
     @media (max-width: 990px) {
        width: 85vw;
        height: 70vh;
    }
}
.weather-panel {
        filter: blur(2px) saturate(0.9);
    background-image: url(https://media.istockphoto.com/id/1133849931/pt/vetorial/blue-sky-fluffy-clouds-and-sun-vector-illustration-for-your-new-design.jpg?s=612x612&w=0&k=20&c=eSGSoa_LtJlXPhcujNVuk9c-4M3nvNhh5a2JJSTHbWg=);
  background-size: cover;
  border-radius: 20px;
      border: 1px solid #6c757d;
  color: #fff;
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    margin: -2dvh;
  small {
    color: inherit;
    font-size: 50%;
  }  
}
    .forecast{
  margin: auto;
    text-align: center;
    justify-content: center;
    font-size: 0.9rem !important;
    }
.icon-weather{
    max-height: 12vh;
    max-width: 12vw;
    object-fit: contain;
}
`