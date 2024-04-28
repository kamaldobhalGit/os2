import { useEffect, useState } from "react";
import { DISPATCH_STATUS } from "../../utils/constant";
import Table from "../table/table";
import "./tabs.css";
import dispatchHttpClient from "../../clients/http/dispatch.client";

export default function Tabs() {
  const [currentTab, setCurrentTab] = useState(DISPATCH_STATUS.CREATED);
  const [createdStateCount, setCreatedStateCount] = useState(0);
  const [InprogressStateCount, setInprogressStateCount] = useState(0);
  const [closedStateCount, setClosedStateCount] = useState(0);

  const handleClick = (status: DISPATCH_STATUS): undefined => {
    setCurrentTab(status);
    return undefined;
  };

  useEffect(() => {
    const fetchDispatchCount = async () => {
      const { data: dispatchCountData } =
        await dispatchHttpClient.fetchDispatchCount();
      dispatchCountData.forEach((countData) => {
        if (countData.status == DISPATCH_STATUS.CREATED) {
          setCreatedStateCount(countData.count);
        } else if (countData.status == DISPATCH_STATUS.IN_PROGRESS) {
          setInprogressStateCount(countData.count);
        } else if (countData.status == DISPATCH_STATUS.CLOSED) {
          setClosedStateCount(countData.count);
        }
      });
    };

    fetchDispatchCount();
  }, [currentTab]);

  return (
    <div className="tabs">
      <button
        className={currentTab === DISPATCH_STATUS.CREATED ? "active" : ""}
        onClick={() => handleClick(DISPATCH_STATUS.CREATED)}
      >
        {DISPATCH_STATUS.CREATED}
        <br />
        {createdStateCount}
      </button>
      <button
        className={currentTab === DISPATCH_STATUS.IN_PROGRESS ? "active" : ""}
        onClick={() => handleClick(DISPATCH_STATUS.IN_PROGRESS)}
      >
        {DISPATCH_STATUS.IN_PROGRESS}
        <br />
        {InprogressStateCount}
      </button>
      <button
        className={currentTab === DISPATCH_STATUS.CLOSED ? "active" : ""}
        onClick={() => handleClick(DISPATCH_STATUS.CLOSED)}
      >
        {DISPATCH_STATUS.CLOSED}
        <br />
        {closedStateCount}
      </button>
      <Table currentTab={currentTab} />
    </div>
  );
}
