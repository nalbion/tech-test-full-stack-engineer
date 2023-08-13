import React from 'react';
const { useState, useEffect } = require('react');
const { getShipTypes } = require('../../services/ship-service');

const ControlConsole = ({ onSearchParams }) => {
    const [shipTypes, setShipTypes] = useState([]);
    const [shipType, setShipType] = useState(null);
    const [weight, setWeight] = useState(null);
    const [homePort, setHomePort] = useState(null);

    useEffect(() => {
        getShipTypes().then(types => {
            setShipTypes(types);
        })
    }, []);

    const onShipType = (e) => {
        setShipType(e.target.value);
    }

    const onWeight = (e) => {
        setWeight(e.target.value);
    }

    const onHomePort = (e) => {
        setHomePort(e.target.value);
    }

    const onSearchClick = (e) => {
        e.preventDefault();

        onSearchParams({
            type: shipType === '' ? null : shipType,
            weight: weight ? parseInt(weight) : null,
            home_port: homePort === '' ? null : homePort,
        })
    }

    return <form>
        <div className="row">
            <label>Ship type</label>
            <select value={shipType} onChange={onShipType}>
                    <option value={null}></option>
                { shipTypes.map((type, i) =>
                    <option
                        key={i}
                        value={type}
                    >
                        { type }
                    </option>) }
            </select>
        </div>

        <div className="row">
            <label>Weight</label>
            <input value={weight} onChange={onWeight} type="number" />
        </div>

        <div className="row">
            <label>Home port</label>
            <input value={homePort} onChange={onHomePort}/>

            <button onClick={onSearchClick}>Search</button>
        </div>
    </form>
}

export default ControlConsole;
