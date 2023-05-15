export const roundUpToDecimalPlaces = (number, places) => {
    if (!isNaN(number)) {
        return Number(number).toFixed(places);
    } else {
        return number;
    }
};

export const getTableHeaders = (wineData) => {
    let tableHeaders = [];
    if (wineData[0]) {
        tableHeaders = Object.keys(wineData[0]);
        tableHeaders = tableHeaders.sort((a, b) => (a === "measure" ? -1 : 0));
    }
    return tableHeaders;
};
