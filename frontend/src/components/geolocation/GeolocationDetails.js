import React from "react";
import Button from "../Button";
import DetailsField from "../DetailsField";

export default function GeolocationDetails({geolocation, editGeolocation, removeGeolocation}) {
    return (
        <div className="my-10">
            <div className="grid grid-cols-2 grid-rows-1 text-left text-xl">
                <DetailsField name="IP address" value={geolocation.ip} />
                <DetailsField name="Continent" value={geolocation.continent} />
                <DetailsField name="Country" value={geolocation.country} />
                <DetailsField name="Region" value={geolocation.region} />
                <DetailsField name="City" value={geolocation.city} />
                <DetailsField name="Zip" value={geolocation.zip} />
                <DetailsField name="Calling code" value={geolocation.callingCode} />
                <DetailsField name="Capital" value={geolocation.capital} />
                <DetailsField name="Country flag" value={geolocation.countryFlag} />
            </div>
            <div className="flex justify-center gap-2 mt-2">
                <Button onClick={() => editGeolocation(geolocation)}>Edit</Button>
                <Button className="hover:bg-red-600" onClick={() => removeGeolocation(geolocation.ip)}>Remove</Button>
            </div>
        </div>
       
    )
}