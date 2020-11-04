import React, { useState, useEffect, useRef, Fragment } from "react";
import ReactTooltip from 'react-tooltip';

// styled component
import { InputWrapper} from "./Styles";

// components
import Weather from "./Weather";
  

function InputLocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState({country: "", state: "", city: "", isSubmitted: false});
    const [responseMsg, setResponseMsg] = useState("");
    const [stateCode, setStateCode] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const inputRef = useRef(null);

    // When form is submitted start to load weather and campground data
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            setUserInput({...userInput, isSubmitted: true});
            setResponseMsg("");
            getLocation();
        } catch (err) {
            console.error(err.message);
        }
    };

    // Access Postgres database to get location record
    const getLocation = async () => {
        try {
            setIsLoading(true);
            let tempState;
            if (userInput.state === "") {
                tempState = "none";
            } else{
                tempState = userInput.state;
            }
            const response = await fetch(`/location/${userInput.country}/${tempState}`);
            const jsonData = await response.json();
            
            // Check to see if request value was valid in database
            if (typeof(jsonData) === "object") {
                setCountryCode(jsonData.country_code);
                setStateCode(jsonData.state_code);
            } else {
                setResponseMsg(jsonData);
            }
            setIsLoading(false);
        } catch (err) {
            console.error(err.message);
        }
    }
    

    useEffect(() => {
        // focuse on input field
        inputRef.current.focus();
    }, []);

    return (
        <>
            {/* User Inputs */}
            <InputWrapper>
                <h2>Time to go camping. Let's check the weather!</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        ref={inputRef}
                        value={userInput.country}
                        onChange={e => setUserInput({country: e.target.value, state: "", city: "", isSubmitted: false})}
                        placeholder="Search for a country..."
                        data-tip data-for='global'
                    />
                    <ReactTooltip id='global'  place="bottom" type="light" >
                        <p><u>Available Countries</u></p>
                        <ul style={{listStyle: "none"}}>
                            <li>North American Countries</li>
                            <li>European Countries</li>
                            <li>Russia</li>
                            <li>China</li>
                            <li>Argentina</li>
                            <li>Australia</li>
                            <li>New Zealand</li>
                        </ul>
                    </ReactTooltip>
                    {userInput.country === "United States" || userInput.country === "US" ? (
                        <Fragment>
                            <input
                            type="text"
                            value={userInput.state}
                            onChange={e => setUserInput({...userInput, state: e.target.value, isSubmitted: false})}
                            placeholder="Search for a state..."
                            />
                            {userInput.country !== "" && userInput.state !== "" ? (
                                <input
                                    type="text"
                                    value={userInput.city}
                                    onChange={e => setUserInput({...userInput, city: e.target.value, isSubmitted: false})}
                                    placeholder="Search for a city..."
                                />
                            ) : null}
                        </Fragment>
                    ) : null}
                    {userInput.country !== "" && (userInput.country !== "US" && userInput.country !== "United States") ? (
                        <input
                            type="text"
                            value={userInput.city}
                            onChange={e => setUserInput({...userInput, city: e.target.value, isSubmitted: false})}
                            placeholder="Search for a city..."
                        />
                    ) : null}
                    {userInput.city !== "" ? (
                    <button type="submit">SUBMIT</button>
                    ) : null}
                </form>
            </InputWrapper>
            
            {/* Set Other Components or status messages*/}
            {userInput.isSubmitted ? (
                isLoading ? 
                    <p style={{color: "white"}}>Loading...</p> : (
                        responseMsg === "" ?
                            <Fragment>
                                {countryCode !== "US" && countryCode !== "CA" ? 
                                    <p style={{color: "yellow"}}>Campground locations are available for the United States and Canada.</p> : 
                                    null}
                                <Weather city={userInput.city} stateCode={stateCode} countryCode={countryCode} />
                            </Fragment> :
                            <p style={{color: "red"}}>{responseMsg}</p>
                    )
                ) : null}
                
        </>
    )
}

export default InputLocation
