import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ overflowY: "auto" }} // Apply scrollbar style
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ data, setData }) {
  const [value, setValue] = useState(0);
  let today = new Date().toISOString().split("T")[0];
  //   console.log(today);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckboxChange = (id) => {
    const updatedData = data.map((item) =>
      item.t_id === id ? { ...item, status: !item.status } : item
    );

    // console.log(updatedData,'updatedData')
    setData(updatedData);
    localStorage.setItem("Task", JSON.stringify(updatedData)); // Update localStorage
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.t_id !== id);
    setData(updatedData); // Update state
    localStorage.setItem("Task", JSON.stringify(updatedData)); // Update localStorage
  };
  const pending = data?.filter((item) => item.status !== true);
  console.log(pending);
  const completed = data?.filter((item) => item.status == true);
  console.log(completed);
  const todays = data?.filter((item) => item.dueDate == today);
  console.log(todays);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{ width: "100%" }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ width: "33%" }} label="Todays Task" {...a11yProps(0)} />
          <Tab sx={{ width: "33%" }} label="Pending Task" {...a11yProps(1)} />
          <Tab sx={{ width: "33%" }} label="Completed Task" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div style={{ maxHeight: "300px" }}>
          {" "}
          {/* Apply maxHeight to the wrapper div */}
          {todays?.length > 0 ? (
            todays?.map((item, index) => (
              <div key={item.t_id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={item.status}
                          onChange={() => handleCheckboxChange(item.t_id)}
                        />
                      }
                      label={
                        <p
                          style={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                        >
                          {item?.task}
                        </p>
                      }
                    />
                  </FormGroup>
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "14px",
                      float: "right",
                    }}
                  >
                    {item.dueDate}
                  </p>
                  <div>
                    <IconButton onClick={() => handleDelete(item.t_id)}>
                      <DeleteOutlineIcon
                        color="error"
                        sx={{ fontSize: "17px" }}
                      />
                    </IconButton>
                  </div>
                </div>
                <Divider />
              </div>
            ))
          ) : (
            <p
              style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
            >
              No task found!
            </p>
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div style={{ maxHeight: "300px" }}>
          {" "}
          {/* Apply maxHeight to the wrapper div */}
          {pending?.length > 0 ? (
            pending?.map((item, index) => (
              <div key={item.t_id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={item.status}
                          onChange={() => handleCheckboxChange(item.t_id)}
                        />
                      }
                      label={
                        <p
                          style={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                        >
                          {item?.task}
                        </p>
                      }
                    />
                  </FormGroup>
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "14px",
                      float: "right",
                    }}
                  >
                    {item.dueDate}
                  </p>
                  <div>
                    <IconButton onClick={() => handleDelete(item.t_id)}>
                      <DeleteOutlineIcon
                        color="error"
                        sx={{ fontSize: "17px" }}
                      />
                    </IconButton>
                  </div>
                </div>
                <Divider />
              </div>
            ))
          ) : (
            <p
              style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
            >
              No task found!
            </p>
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div style={{ maxHeight: "300px" }}>
          {" "}
          {/* Apply maxHeight to the wrapper div */}
          {completed?.length > 0 ? (
            completed?.map((item, index) => (
              <div key={item.t_id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={item.status}
                          onChange={() => handleCheckboxChange(item.t_id)}
                        />
                      }
                      label={
                        <p
                          style={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                        >
                          {item?.task}
                        </p>
                      }
                    />
                  </FormGroup>
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "14px",
                      float: "right",
                    }}
                  >
                    {item.dueDate}
                  </p>
                  <div>
                    <IconButton onClick={() => handleDelete(item.t_id)}>
                      <DeleteOutlineIcon
                        color="error"
                        sx={{ fontSize: "17px" }}
                      />
                    </IconButton>
                  </div>
                </div>
                <Divider />
              </div>
            ))
          ) : (
            <p
              style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
            >
              No task found!
            </p>
          )}
        </div>
      </CustomTabPanel>
    </Box>
  );
}
