import React from "react";
import {Bar, Doughnut} from "react-chartjs-2";
import {arrayToDatesBucket, defaultChartOptions} from "../../helpers/chartHelper";

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

function DomainChartSection({currSite, urlsArr}) {
    const _chartData = expComputeDateObj(currSite);
    const _doughnutTaples = {};
    urlsArr.sort((a, b) => b.count - a.count).slice(0, 5).forEach(url => _doughnutTaples[url.name] = url.count);
    const _doughnutData = {
        labels: Object.keys(_doughnutTaples),
        datasets: [
            {
                data: Object.values(_doughnutTaples),
                backgroundColor: ['#ff9890', '#427ab3', '#77bbff', '#aaa', '#fff']
            }
        ],
    };

    return <div className="selected-domain__content">
    <div className="selected-domain__toolbar">
        <h2>Visits</h2>
        <Bar data={_chartData} options={defaultChartOptions} width={520} height={260}/>
    </div>
        <div className="selected-domain__toolbar">
            <h2>Top pages</h2>
            <Doughnut data={_doughnutData} options={{legend: { display: false}}} width={520} height={260}/>
        </div>
    </div>;
}


export default DomainChartSection;