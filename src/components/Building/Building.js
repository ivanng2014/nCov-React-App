import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import MaterialTable from "material-table";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  title: {
    margin: 30,
    display: "flex",
    justifyContent: "center"
  },
  table: {
    minWidth: "100%"
  }
}));

export default props => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [building, setBuilding] = useState([]);

  const [columns] = useState([
    { title: "地區", field: "district", defaultGroupOrder: 0 },
    {
      title: "地址",
      field: "building",
      render: rowData => {
        let url = "http://maps.google.com/maps?q=" + rowData.building;
        let buildingName = rowData.building;
        return (
          <a href={url}>
            <h4>{buildingName}</h4>
          </a>
        );
      }
    },
    {
      title: "最後檢疫日期",
      field: "lastDayofHomeConfinees"
    }
  ]);

  useEffect(() => {
    axios.get("http://api.n-cov.info/home").then(res => {
      console.log(res.data);
      setBuilding(res.data.data);

      setIsLoading(false);
    });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h4" component="h4">
          家居檢疫大廈一覽
        </Typography>
      </div>

      <MaterialTable
        title={"高危地區"}
        columns={columns}
        data={building}
        isLoading={isLoading}
        options={{
          pageSize: 18,
          actionsColumnIndex: -1,
          exportButton: true,
          grouping: true
        }}
      />
    </div>
  );
};
