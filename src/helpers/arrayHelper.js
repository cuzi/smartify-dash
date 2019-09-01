const groupBy = (items, key) => {
    const groupedObj = items.reduce(
        (result, item) => ({
            ...result,
            [item[key]]: {
                ...(result[item[key]] || {}),
                ...item,
                count: (result[item[key]] ? result[item[key]].count : 0) + 1,
            },
        }),
        {},
    );
    return Object.keys(groupedObj).map(_key => groupedObj[_key]);
};

export {groupBy};