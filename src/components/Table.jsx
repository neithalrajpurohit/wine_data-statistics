import React from "react";
import { roundUpToDecimalPlaces } from "../utils/tableUtils";

const Table = ({ columns, data }) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((column, i) => {
                            return (
                                <th className="table-header" key={i}>
                                    {column === "measure"
                                        ? column
                                        : `Class ${column}`}
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                <tbody>
                    {data.map((tableData, i) => {
                        return (
                            <tr className="table-row" key={i}>
                                {columns.map((header, i) => {
                                    return (
                                        <td
                                            className={
                                                isNaN(header)
                                                    ? "table-data bold"
                                                    : "table-data"
                                            }
                                            key={i}
                                        >
                                            {roundUpToDecimalPlaces(
                                                tableData[header],
                                                3
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
