import React from "react";

export default function DetailsField({name, value}) {
    return (
        <>
            <div>{name}:</div>
            <div className="font-bold">{value}</div>
        </>
    )
}