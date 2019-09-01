import React from "react";
import ReactTable from "react-table";

function DomainUrlSection({selectRow, data}) {
    return <div className="selected-domain__urls">
        <h2>All pages</h2>
        {data.length ? <ReactTable
            data={data}
            filterable
            defaultPageSize={10}
            minRows={1}
            columns={[
                {
                    Header: "Name",
                    accessor: "name"
                },
                {
                    Header: "Visits",
                    accessor: "count"
                }
            ]}
            getTrProps={(state, rowInfo) => {
                return {
                    onClick: () => {
                        selectRow(rowInfo.original.url);
                        window.scrollTo(0, 0);
                    }
                }
            }}
        /> : "Still no data gathered here, implement our script if you did'nt done it yet"}
    </div>;
}

export default DomainUrlSection;