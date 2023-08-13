import React from 'react';
import styled from 'styled-components';

const StyledShipsTable = styled.table`
  border: 1px solid black;
  
  td {
    //border: 1px solid red;
    height: 20px;
  }
`;

const ShipsTable = ({ships}) => {
    return <StyledShipsTable>
        <thead>
            <tr>
                <th>Ship Type</th>
                <th>Weight</th>
                <th>Home port</th>
                <th>Ship Name</th>
                <th>Class</th>
                <th>Image</th>
            </tr>
        </thead>
        <tbody>
            { ships.map((ship, i) =>
            <tr key={i}>
                <td>{ship ? ship.type : ''}</td>
                <td>{ship && ship.mass_kg && (ship.mass_kg.toLocaleString() + ' kg')}</td>
                <td>{ship && ship.home_port}</td>
                <td>{ship && ship.name}</td>
                <td>{ship && ship.class}</td>
                <td>{ship && (ship.image ? <img alt="ship icon" src={ship.image} /> : <button>Upload Icon</button>) }</td>
            </tr>) }
        </tbody>
    </StyledShipsTable>
}


export default ShipsTable;
