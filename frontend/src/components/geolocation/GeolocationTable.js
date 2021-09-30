import React from "react";
import Button from "../Button";
import TableCell from "../TableCell";
import TableHeader from "../TableHeader";

export default class GeolocationTable extends React.Component {
    state = {
        sortingBy: 'continent',
        sortOrder: 1,
        page: 1
    }

    componentDidMount() {
        this.props.getGeolocationsList();
    }

    sortBy = (property) => {
        this.setState({
            sortingBy: property,
            sortOrder: this.state.sortingBy == property ? this.state.sortOrder * -1 : 1
        });
    }

    sortingFunction = (a, b) => {
        const { sortingBy, sortOrder } = this.state;

        const result = (a[sortingBy] > b[sortingBy]) ? 1 : ((b[sortingBy] > a[sortingBy]) ? -1 : 0)
        return result * sortOrder
    }

    nextPage = () => {
        this.setState({
            page: this.state.page + 1
        });
    }

    prevPage = () => {
        this.setState({
            page: this.state.page > 1 ? this.state.page - 1 : 0
        });
    }

    render() {
        const { geolocations, removeGeolocation, editGeolocation } = this.props;
        const { page } = this.state;
        
        const sortedList = geolocations.sort(this.sortingFunction);

        const pageSize = 10;
        const pages = Math.ceil(sortedList.length / pageSize);

        const paginatedList = sortedList.slice((page - 1) * pageSize, page * pageSize);

        return (
            <>
                <table className="my-10 text-center w-full bg-indigo-800 table-fixed border-collapse border border-indigo-700 shadow-xl">
                    <thead>
                        <tr>
                            <TableHeader onClick={() => this.sortBy("ip")} className="cursor-pointer">IP address</TableHeader>
                            <TableHeader onClick={() => this.sortBy("continent")} className="cursor-pointer">Continent</TableHeader>
                            <TableHeader onClick={() => this.sortBy("country")} className="cursor-pointer">Country</TableHeader>
                            <TableHeader onClick={() => this.sortBy("region")} className="cursor-pointer">Region</TableHeader>
                            <TableHeader onClick={() => this.sortBy("city")} className="cursor-pointer">City</TableHeader>
                            <TableHeader onClick={() => this.sortBy("zip")} className="cursor-pointer w-24">Zip</TableHeader>
                            <TableHeader onClick={() => this.sortBy("callingCode")} className="cursor-pointer w-24">Calling code</TableHeader>
                            <TableHeader onClick={() => this.sortBy("capital")} className="cursor-pointer">Capital</TableHeader>
                            <TableHeader className="w-24">Country flag</TableHeader>
                            <TableHeader className="w-48">Action</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedList.map(geolocation => (
                            <tr key={geolocation._id}>
                                <TableCell>{geolocation.ip}</TableCell>
                                <TableCell>{geolocation.continent}</TableCell>
                                <TableCell>{geolocation.country}</TableCell>
                                <TableCell>{geolocation.region}</TableCell>
                                <TableCell>{geolocation.city}</TableCell>
                                <TableCell>{geolocation.zip}</TableCell>
                                <TableCell>{geolocation.callingCode}</TableCell>
                                <TableCell>{geolocation.capital}</TableCell>
                                <TableCell>{geolocation.countryFlag}</TableCell>
                                <TableCell>
                                    <div className="flex justify-center gap-3">
                                        <Button onClick={() => editGeolocation(geolocation)}>Edit</Button>
                                        <Button className="hover:bg-red-600" onClick={() => removeGeolocation(geolocation.ip)}>Remove</Button>
                                    </div>
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex gap-3 items-center">
                    {page > 1 ? <Button onClick={this.prevPage}>Previous page</Button> : null}
                    <div>Page {page} of {pages}</div>
                    {page < pages ? <Button onClick={this.nextPage}>Next page</Button> : null}
                </div>
            </>
        );
    }

}