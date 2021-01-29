import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async ({ queryKey }) => {
    const [_key, page] = queryKey;
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
}

const Planets = () => {
    const [page, setPage] = useState(1);
    const { data, status } = useQuery(['planets', page], fetchPlanets);
    console.log(data);


    return ( 
        <div>
            <h2>Planets</h2>

            <button onClick={() => {setPage(1)}}>Page 1</button>
            <button onClick={() => {setPage(2)}}>Page 2</button>
            <button onClick={() => {setPage(3)}}>Page 3</button>
            <button onClick={() => {setPage(4)}}>Page 4</button>
            <button onClick={() => {setPage(5)}}>Page 5</button>
            <button onClick={() => {setPage(6)}}>Page 6</button>

            { status === 'error' && (
                <div>Error fetching data</div>
            )}

            { status === 'loading' && (
                <div>Loading data...</div>
            )}

            { status === 'success' && (
                <div>
                    { data.results.map(planet => <Planet key={planet.name} planet={planet} />) }
                </div>
            )}
        </div>
     );
}
 
export default Planets;