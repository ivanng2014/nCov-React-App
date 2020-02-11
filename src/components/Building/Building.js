import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import MaterialTable from "material-table";

import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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

function TablePanel(props) {
  const { title, columns, data, isLoading, index, value } = props;

  return (
    <div hidden={value !== index}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
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
}

export default props => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [home, setHome] = useState([]);
  const [building, setBuilding] = useState([]);

  const [columns, setColumns] = useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `table-tab-${index}`,
      "aria-controls": `table-tabpanel-${index}`
    };
  }

  useEffect(() => {
    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/home"
      )
      .then(res => {
        setHome(res.data.data);
        setColumns([
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
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/building"
      )
      .then(res => {
        console.log(res.data);
        setBuilding(res.data.data);
        setColumns([
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
            title: "最後出現日期",
            field: "lastDate"
          },
          {
            title: "相關案例",
            field: "relatedCase"
          }
        ]);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h4" component="h4">
          高危地區
        </Typography>
      </div>

      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="家居檢疫大廈一覽" {...a11yProps(0)} />

          <Tab label="患者曾出現地區" {...a11yProps(1)} />
        </Tabs>
      </Paper>

      <TablePanel
        title="家居檢疫大廈一覽"
        columns={columns}
        data={home}
        isLoading={isLoading}
        value={value}
        index={0}
      />
      <TablePanel
        title="患者曾出現地區"
        columns={columns}
        data={building}
        isLoading={isLoading}
        value={value}
        index={1}
      />
    </div>
  );
};
