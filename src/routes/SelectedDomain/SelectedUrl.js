import React from 'react';
import './style.css';
import Icon from "../../components/Icon";
import {Bar} from 'react-chartjs-2';
import {groupBy} from "../../helpers/arrayHelper";
import {defaultChartOptions, arrayToDatesBucket} from "../../helpers/chartHelper";

const defaultDataset = {
    backgroundColor: 'rgba(119,187,255,0.63)',
    borderColor: '#7bf',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(119,187,255,0.85)',
    hoverBorderColor: '#7bf',
};

const expComputeDateObj = (hits) => {
    const {data, labels} = arrayToDatesBucket(hits || [], {});

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

function SelectedUrl({name, hits, backFn, icon, url}) {
    const usersArr = groupBy( hits, 'userID');
    const chartData = expComputeDateObj(hits);

    return <div className="selected-url">
        <h1 className="selected-url__header">
            <a href="#" onClick={backFn}>⬅ Back</a>
            <Icon icon={icon} text={name}/> <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
        </h1>
        <div className="selected-url__tiles">
            <div className="selected-url__tiles__item">
                <h2>{hits.length}</h2>
                <small>Total page views</small>
            </div>
            <div className="selected-url__tiles__item">
                <h2>{usersArr.length}</h2>
                <small>Unique users</small>
            </div>
        </div>
            <div className="selected-url__toolbar">
                <h2>SmartInt</h2>
                <Bar data={chartData} options={defaultChartOptions} width={150} height={50}/>
            </div>
            <div className="selected-url__history">
                <h2>Latest visits</h2>
                <div className="history-list">
                    <div className="history-list__row">
                        <span>Date</span>
                    </div>
                    {hits.map(({url, visitTime, id}) => {
                        return <div className="history-list__row" key={`${url}-${id}`}>
                            <span>{visitTime}</span>
                        </div>
                    })}
                </div>
        </div>
    </div>;
}

export default SelectedUrl;