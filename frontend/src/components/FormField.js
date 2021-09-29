import React from 'react';

const FormField = ({id, name, type, onChange, value}) => {
    return (
        <div className="text-lg flex flex-col items-start flex-grow mb-2">
            <label htmlFor={id} className="mb-1">{name}</label>
            <input id={id} name={id} type={type || "text"} onChange={onChange} value={value} className=" bg-indigo-800 border border-indigo-900 rounded-lg w-full px-4 py-2 focus:shadow-2xl" />
        </div>
    );
}

export default FormField