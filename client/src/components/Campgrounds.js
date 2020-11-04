import React, { useState, useEffect } from 'react'
// styled components
import { CampsiteDiv } from './Styles'

function Campgrounds({coord}) {
    const [isLoading, setIsLoading] = useState(false);
    const [campgrounds, setCampgrounds] = useState([]);
    const [amount, setAmount] = useState({numOfCampgrounds: 0, userAmount: 0});

    const getCampgrounds = async (abortController) => {
        try {
            const corsAPIHost = "https://cors-anywhere.herokuapp.com/";
            const endpoint = `${corsAPIHost}https://api.amp.active.com/camping/campgrounds/?landmarkLat=${coord.lat}&landmarkLong=${coord.long}&landmarkName=true&api_key=${process.env.REACT_APP_CAMPGROUND_KEY}`;
            
            const response = 
                await fetch(endpoint, { signal: abortController.signal })
                    .then(res => res.text())
                    .then(str => {
                            let newCampgroundXML = new DOMParser().parseFromString(str, "text/xml");
                            let results = newCampgroundXML.getElementsByTagName("result");
    
                            for (let i = 0; i < results.length; i++) {
                                setCampgrounds(campgrounds => [...campgrounds, {
                                    facilityID: results[i].getAttribute("facilityID"), 
                                    facilityName: results[i].getAttribute("facilityName"),
                                    contractID: results[i].getAttribute("contractID")
                                }]);   
                            }

                            setAmount({...amount, numOfCampgrounds: results.length});
                            setIsLoading(false);
                    });
            
        } catch (err) {
            if (!abortController.signal.aborted) {
                console.error(err.message);
              }     
        }
        
    };
    
    useEffect(() => {
        // check for mounted component by passing abortController signal
        const abortController = new AbortController();
        getCampgrounds(abortController);   

        // Cleanup
        return () => {
            // cancel fetch request
            abortController.abort();
        }
    }, []);

    return (
        <CampsiteDiv>
            {isLoading ? 
            <p>Loading available campgrounds...</p> :
                (<>
                    <h3>There are {amount.numOfCampgrounds} campgrounds close by. How many would you like to view?</h3>
                    <input type="text" value={amount.userAmount} onChange={e => setAmount({...amount, userAmount: e.target.value})} />
                    <ul>
                        {campgrounds.slice(0, amount.userAmount).map(campground => 
                            <li key={campground.facilityID}>
                                <a href={`https://www.reserveamerica.com/explore/${campground.facilityName}/${campground.contractID}/${campground.facilityID}/overview`} target="_blank">{campground.facilityName}</a>
                            </li>)}
                    </ul>
                </>)}
        </CampsiteDiv>
    )
}

export default Campgrounds
