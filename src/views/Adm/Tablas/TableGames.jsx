import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as act from "../../../redux/actions";
import MUIDataTable from "mui-datatables";

export const TableDb = () => {
  const dispatch = useDispatch();

  const AllGamesAdmin = useSelector(state => state.gamesAdmin);
  const idGamesAdmin = useSelector((state) => state.gamesInfoId)

    useEffect(() => {
        dispatch(act.allGamesAdmin());
        //dispatch(act.infoGamesAdmin())
    }, [dispatch]);

  const columns = [
    {
      name: "id",
      label: "ID"
    },
    {
      name: "name",
      label: "NAME"
    },
    {
      name: "price_overview",
      label: "PRICE_OVERVIEW"
    }
  ];

  return (
    <MUIDataTable
      title={"ALL GAMES"}
      data={AllGamesAdmin}
      columns={columns}
    />
  );
}