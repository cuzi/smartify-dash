import moment from 'moment';

const defaultChartOptions = {
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                fontColor:'#999',
                fontSize:10
            },
            ticks: {
                maxTicks: 12,
                fontColor: '#aaa',
                fontSize: 12
            }
        }],
        yAxes: [{
            display: true,
            ticks: {
                fontColor: '#aaa',
                fontSize: 12
            }
        }]
    }
};

const getMomentFormat = type => {
    switch (type) {
        case 'days':
            return 'l';
        case 'years':
            return 'YYYY';
        case 'months':
            return 'MMMM';
        case 'hours':
            return 'l LT';
    }
};

const arrayToDatesBucket = (arr, {
    type = 'days',
    start = null,
    end,
    key = null,
    dateKey = 'visitTime'
}) =>  {
    const momStart = start ? moment(start) : null;
    const momEnd = end ? moment(end) : moment();
    const _format = getMomentFormat(type);
    const retData = {};

    const sorted = arr.sort((a, b) =>
        moment(a[dateKey], 'YYYY/MM/DD HH:mm:ss A').unix() - moment(b[dateKey], 'YYYY/MM/DD HH:mm:ss A').unix()
    );

    sorted.forEach(item => {
        const momentItem = moment(item[dateKey], 'YYYY/MM/DD HH:mm:ss A');

        if ((!start || momStart <= momentItem) && momEnd >= momentItem) {
            const currItemData = retData[momentItem.format(_format)] || 0;
            const dataToAdd = key ? item[key] : 1;
            retData[momentItem.format(_format)] = currItemData + dataToAdd;
        }
    });
    return {
        labels: Object.keys(retData),
        data: Object.values(retData),
    }
};


export {defaultChartOptions, arrayToDatesBucket};