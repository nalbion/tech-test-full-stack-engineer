import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import ControlConsole from '../components/organisms/control-console';
import ShipsTable from '../components/organisms/ships-table';
import { searchShips } from '../services/ship-service';

const SpacePaginate = styled(ReactPaginate).attrs({
    // You can redefine classes here, if you want.
    activeClassName: 'active', // default to "selected"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;

  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

const ShipsDashboard = () => {
    const [params, setParams] = useState({});
    const [ships, setShips] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        searchShips(params).then(response => {
            setShips(response.data);

            const { total_records, limit } = response._meta;
            setPageCount(Math.ceil(total_records / limit));
        })
    }, [params]);

    const handlePageClick = (event) => {
        setParams(prev => ({ ...prev, page: event.selected + 1 }))
    }

    return <>
        <ControlConsole onSearchParams={setParams} />
        <ShipsTable ships={ships} />
        <SpacePaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
        />
    </>
}

export default ShipsDashboard;
