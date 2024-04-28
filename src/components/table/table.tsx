import { TableProps } from "./interface";
import { useEffect, useState } from "react";
import "./table.css";
import { DISPATCH_STATUS, DISPATCH_STATUS_LABEL } from "../../utils/constant";
import { Dispatch } from "../../interfaces/dispatch.interface";
import dispatchHttpClient from "../../clients/http/dispatch.client";

const statusCssFinder = (status: string) => {
  switch (status) {
    case DISPATCH_STATUS.CREATED:
      return "status-created";
    case DISPATCH_STATUS.IN_PROGRESS:
      return "status-inprogress";
    case DISPATCH_STATUS.CLOSED:
      return "status-closed";
  }
};

export default function Table({ currentTab }: TableProps) {
  const [dispatchList, setDispatchList] = useState([] as Dispatch[]);
  const [rowsPerPage, setRowsPerPage] = useState("3");
  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  useEffect(() => {
    // Filter dispatchList based on currentTab

    const fetchDispatchist = async () => {
      const dispatchist: Dispatch[] =
        await dispatchHttpClient.fetchDispatchList(
          currentTab,
          "0",
          rowsPerPage
        );

      setDispatchList(
        dispatchist.map((dispatch) => {
          return {
            ...dispatch,
            modifiedCreated: new Date(dispatch.createdAt).toDateString(),
          };
        })
      );
    };
    fetchDispatchist();
  }, [currentTab, rowsPerPage]); // Run this effect whenever currentTab changes
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Dispatch ID</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Total Orders</th>
          </tr>
        </thead>
        <tbody>
          {dispatchList.map((dispatch) => (
            <tr key={dispatch.id}>
              <td>{dispatch.name}</td>
              <td className={statusCssFinder(dispatch.status)}>
                {DISPATCH_STATUS_LABEL[dispatch.status]}
              </td>
              <td>{dispatch.modifiedCreated?.toString() || ""}</td>
              <td>{dispatch.totalOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Rows per page:{" "}
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value={"3"}>3</option>
          <option value={"5"}>5</option>
          <option value={"10"}>10</option>
          <option value={"20"}>20</option>
        </select>
      </div>
    </div>
  );
}
