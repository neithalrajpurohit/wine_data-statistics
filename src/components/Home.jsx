import React, { useEffect, useState } from "react";
import Table from "./Table";
import { WINE_DATA } from "../data/data";
import { createNewProperty, getStatisticsData } from "../utils/calculations";
import { getTableHeaders } from "../utils/tableUtils";

const Home = () => {
    const [wineData, setWineData] = useState(WINE_DATA);
    const [wineStatistics, setWineStatistics] = useState([]);
    const [updatedWineStatistics, setUpdatedWineStatistics] = useState([]);

    useEffect(() => {
        /**
         * Task 1: class-wise mean, median,
         * mode of "Flavanoids" for the entire dataset.
         * getStatisticsData function will return mean, median, and mode
         * of any valid given property
         */
        let data = getStatisticsData(wineData, "Flavanoids");
        setWineStatistics(data);

        /**
         * Task 2: function that creates a new given property
         *  for each point of the dataset.
         */
        const updatedWineData = createNewProperty("Gamma", wineData);
        setWineData(updatedWineData);
        let wineStatistics = getStatisticsData(updatedWineData, "Gamma");
        setUpdatedWineStatistics(wineStatistics);
    }, []);

    let tableHeaders = getTableHeaders(wineStatistics);

    return (
        <div className="container">
            <h2 className="text-center">Wine Data Statistics</h2>
            <div className="table-wrap">
                <Table
                    label="Wine Data"
                    columns={tableHeaders}
                    data={wineStatistics}
                />
                <Table
                    label="Wine Data"
                    columns={tableHeaders}
                    data={updatedWineStatistics}
                />
            </div>
        </div>
    );
};

export default Home;
