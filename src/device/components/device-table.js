import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Address',
        accessor: 'address',
    },
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'MaxHConsumption',
        accessor: 'maxHConsumption',
    }

];

const filters = [
    {
        accessor: 'name',
    }
];

class DeviceTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default DeviceTable;