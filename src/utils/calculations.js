/**
 * helper function to group wineData by alcohoalClass
 * @param {Array of Objects} wineData
 * @param {String} property [object propertyName to which group the wineData]
 * @returns {Array of Objects}
 */
export const groupWineData = (wineData, property) => {
    const groupedWineData = {};

    for (let wine of wineData) {
        if (!groupedWineData[wine.Alcohol]) {
            groupedWineData[wine.Alcohol] = [Number(wine[property])];
        } else {
            groupedWineData[wine.Alcohol].push(Number(wine[property]));
        }
    }
    return groupedWineData;
};

/**
 * function to calculate mean
 * @param {Array of objects} data
 * @param {String} property [object propertyName for which to calculate the mean]
 * @returns {Object} with {measure: [propertyName], [alcoholClass]: [meanValue]}
 */
export const getMean = (data, property) => {
    const groupedWineData = groupWineData(data, property);
    let meanData = {};

    for (let alcoholClass in groupedWineData) {
        let sum = groupedWineData[alcoholClass].reduce(
            (prev, curr) => prev + curr,
            0
        );
        let mean = sum / groupedWineData[alcoholClass].length;
        meanData["measure"] = property + " mean";
        meanData[alcoholClass] = mean;
    }
    return meanData;
};

/**
 * function to calculate median
 * @param {Array of objects} data
 * @param {String} property [object propertyName for which to calculate the median]
 * @returns {Object} with {measure: [propertyName], [alcoholClass]: [medianValue]}
 */
export const getMedian = (data, property) => {
    const groupedWineData = groupWineData(data, property);
    const medianData = {};

    for (let alcoholClass in groupedWineData) {
        const sortedProp = groupedWineData[alcoholClass].sort((a, b) => a - b);
        let length = sortedProp.length;

        if (length % 2 === 0) {
            let mid = length / 2;
            let median = (sortedProp[mid] + sortedProp[mid - 1]) / 2;
            medianData["measure"] = property + " median";
            medianData[alcoholClass] = median;
        } else {
            let mid = Math.floor(length / 2);
            let median = sortedProp[mid];
            medianData["measure"] = property + " median";
            medianData[alcoholClass] = median;
        }
    }
    return medianData;
};

/**
 * function to calculate mode
 * @param {Array of objects} data
 * @param {String} property [object propertyName for which to calculate the mode]
 * @returns {Object} with {measure: [propertyName], [alcoholClass]: [modeValue]}
 */
export const getMode = (data, property) => {
    const groupedWineData = groupWineData(data, property);

    const modeData = {};

    for (let alcoholClass in groupedWineData) {
        const frequencyCounter = {};
        let wineclassData = groupedWineData[alcoholClass];
        let maxFrequency = Number.MIN_SAFE_INTEGER;
        let wineValue = 0;

        for (let wineClassValue of wineclassData) {
            if (!frequencyCounter[wineClassValue]) {
                frequencyCounter[wineClassValue] = 1;

                if (frequencyCounter[wineClassValue] > maxFrequency) {
                    maxFrequency = frequencyCounter[wineClassValue];
                    wineValue = wineClassValue;
                }
            } else {
                frequencyCounter[wineClassValue] += 1;

                if (frequencyCounter[wineClassValue] > maxFrequency) {
                    maxFrequency = frequencyCounter[wineClassValue];
                    wineValue = wineClassValue;
                }
            }
        }
        modeData["measure"] = property + " mode";
        modeData[alcoholClass] = wineValue;
    }

    return modeData;
};

/**
 * This function is responsible for adding a new given property to given wineData
 * @param {String} propName
 * @param {Array of objects} wineData
 * @returns {Array of objects} with given newly added property
 */
export const createNewProperty = (propName, wineData) => {
    // Formula for Gamma = (Ash * Hue) / Magnesium.
    const updatedWineData = wineData.map((wine) => {
        return {
            ...wine,
            [propName]: (wine.Ash * wine.Hue) / wine.Magnesium,
        };
    });
    return updatedWineData;
};

/**
 * main function which will return the mean, median & mode of given property from wineData
 * @param {Array of objects} data
 * @param {String} property
 * @returns {Array of objects}
 */
export const getStatisticsData = (data, property) => {
    const mean = getMean(data, property);
    const median = getMedian(data, property);
    const mode = getMode(data, property);

    return [mean, median, mode];
};
