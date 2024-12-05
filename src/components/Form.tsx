import { FC } from "react";
import Button from 'react-bootstrap/Button';
import { FormType } from "../types/form";
import styled from "styled-components"

export const CityForm: FC<FormType> = (props) => {
  const { city, setCity, getWeather } = props;
  console.log(getWeather)
  return (
    <ContainerSearch>
      <form onSubmit={getWeather}>
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className="me-3"
        />
        <Button variant="light" type="submit">
          <p className='mb-0 pb-0'>Get Weather</p>
        </Button>
      </form>
    </ContainerSearch>
  );
};

export const ContainerSearch = styled.div`
input{
height: 100%;
    border: none;
     background-color: white !important;
    border-radius: 0.375rem !important;
        padding: 0.375rem 0.75rem !important;
    }
`