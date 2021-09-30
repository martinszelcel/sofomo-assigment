import { useFormik } from "formik";
import React from "react";
import Button from "../Button";
import FormField from "../FormField";

export default function GeolocationEdit({geolocation, updateGeolocation, removeGeolocation}) {
    const formik = useFormik({
        initialValues: geolocation,
        onSubmit: (geolocation) => {
            updateGeolocation(geolocation);
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="my-10 w-full max-w-xl">
            <div className="text-left text-xl">
                <FormField id="ip" name="IP address" onChange={formik.handleChange} value={formik.values.ip} readOnly={true} />
                <FormField id="continent" name="Continent" onChange={formik.handleChange} value={formik.values.continent} />
                <FormField id="country" name="Country" onChange={formik.handleChange} value={formik.values.country} />
                <FormField id="region" name="Region" onChange={formik.handleChange} value={formik.values.region} />
                <FormField id="city" name="City" onChange={formik.handleChange} value={formik.values.city} />
                <FormField id="zip"name="Zip" onChange={formik.handleChange} value={formik.values.zip} />
                <FormField id="callingCode" name="Calling code" onChange={formik.handleChange} value={formik.values.callingCode} />
                <FormField id="capital" name="Capital" onChange={formik.handleChange} value={formik.values.capital} />
                <FormField id="countryFlag" name="Country flag" onChange={formik.handleChange} value={formik.values.countryFlag} />
            </div>
            <div className="flex justify-center gap-2 mt-2">
                <Button type="submit">Save</Button>
                <Button className="hover:bg-red-600" onClick={() => removeGeolocation(geolocation.ip)}>Remove</Button>
            </div>
        </form>
       
    )
}