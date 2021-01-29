import React, {useState} from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async ({ queryKey }) => {
    const [_key, page] = queryKey;
    const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
    return res.json();
}

const People = () => {
    const [page, setPage] = useState(1);
    const { 
        isLoading,
        isError,
        error,
        data,
        isPreviousData
     } = useQuery(['people', page], fetchPeople, {
         keepPreviousData: true
     });
     console.log(data)


    return ( 
        <div>
            <h2>People</h2>

            {isLoading ? (
                <div>Loading data...</div>
            ) : isError? (
                <div>Error: {error.message}</div>
            ) : (
                <>
                    <button
                        onClick={() => setPage(old => Math.max(old -1 , 1))}
                        disabled={ page === 1 }
                    >Previous Page</button>
                    <span> { page } </span>
                    <button
                        onClick={() => {
                            if (!isPreviousData && data.next){
                                setPage(old => old+1)
                            }
                        }}
                        disabled={isPreviousData || !data.next}
                    >Next Page</button>
                    <div>
                        {data.results.map(person => <Person key={person.name} person={person} />)}
                    </div>
                </>
            )}
        </div>
     );
}
 
export default People;