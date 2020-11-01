import React, { useState, useEffect } from 'react'

// components

const tempTypes  = {
    SEVERE_COLD: "It's way too cold! Better stay indoors: Severe Cold",
    COLD: "It's too cold for camping: Cold",
    COOL: "It's quite suitable for camping: Cool",
    WARM: "It's the perfect props for camping: Warm",
    HOT: "It's way too hot! Get some A/C: Hot",
    OTHER: "Camping is not recommended at this time."
}

function CampingMsg({feelsLike, weatherIcon}) {
    const [campingMsg, setCampingMsg] = useState("");

    useEffect(() => {
        // MSg for the user to see if it's good to camp or not
        if (feelsLike < -15) {
            setCampingMsg(tempTypes.SEVERE_COLD);
        } else if (feelsLike < 0) {
            setCampingMsg(tempTypes.COLD);
        }else if (feelsLike < 15) {
            setCampingMsg(tempTypes.COOL);
        }else if (feelsLike < 30) {
            setCampingMsg(tempTypes.WARM);
        } else if (feelsLike < 100) {
            setCampingMsg(tempTypes.HOT);
        }else {
            setCampingMsg(tempTypes.OTHER);
        }
    }, []);

    return (
        <>
            <h2>
                {campingMsg}
                <img src={weatherIcon} alt="props icon" />
            </h2>
        </>
    )
}

export default CampingMsg
