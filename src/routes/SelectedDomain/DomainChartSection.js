import React from "react";
import {Bar} from "react-chartjs-2";
import {arrayToDatesBucket, defaultChartOptions} from "../../helpers/chartHelper";
import DomainHistorySection from "./DomainHistorySection";

const defaultDataset = {
    backgroundColor: '#ff9890a8',
    borderColor: '#ff9890',
    borderWidth: 1,
    hoverBackgroundColor: '#ff9890de',
    hoverBorderColor: '#ff9890',
};

const expComputeDateObj = (currSite) => {
    const {data, labels} = arrayToDatesBucket(currSite.hits || [], {});

    return {
        labels,
        datasets: [
            {
                ...defaultDataset,
                data,
            }
        ],
    }
};

function DomainChartSection({currSite}) {
    const _chartData = expComputeDateObj(currSite);

    return <div className="selected-domain__content">
        <div className="selected-domain__toolbar">
            <h2>SmartInt</h2>
            <Bar data={_chartData} options={defaultChartOptions} width={520} height={260}/>
        </div>
        <DomainHistorySection currSite={currSite}/>
    </div>;
}


export default DomainChartSection;