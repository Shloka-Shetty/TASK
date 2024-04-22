import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import BasicTabs from "./Tabs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import tbg from "../tbg.jpg";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Index() {
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const [task, setTask] = useState({ task: "" });
  const [dueDate, setDueDate] = useState(null);
  const [taskError, setTaskError] = useState(false);
  const [dateError, setDateError] = useState(false);

  //to get initial task if there are any
  let initialValue;
  useEffect(() => {
    if (localStorage.getItem("Task") === null) {
      initialValue = [];
    } else {
      initialValue = JSON.parse(localStorage.getItem("Task"));
    }
    setValue(initialValue);
  }, [task]);

  //to display task
  useEffect(() => {
    const val = JSON.parse(localStorage.getItem("Task"));
    setData(val);
  }, [task]);

  const handleChange = (e) => {
    setTaskError(false);

    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  const handleDate = (e) => {
    
    const date = e?.$d;
    if (date) {
      const year = date.getFullYear();
      console.log(year,"year")
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate,"formattedDate")

      setDueDate(formattedDate);
    } else {
      console.log("Invalid date");
    }
  };

  const handleSubmit = async () => {
    if (task.task == "") {
      setTaskError("Please fill in the task");
    } else if (dueDate == null) {
      setTaskError(false);
      setDateError("Please select the date");
    } else {
      setTaskError(false);
      setDateError(false);
      const newTaskId =
        value.length === 0 ? 1 : value[value.length - 1].t_id + 1;
      const details = {
        t_id: newTaskId,
        ...task,
        status: false,
        dueDate: dueDate,
        cdate: new Date().toISOString().split("T")[0],
      };
      console.log(details);
      const updatedValue = [...value, details];
      await localStorage.setItem("Task", JSON.stringify(updatedValue));
      setTask({ task: "" });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${tbg})`,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
      }}
    >
      <Card
        style={{
          width: "600px",
          padding: "20px",
          backgroundColor: "#ffffffe0",
        }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bolder",
                fontFamily: "Kanit, sans-serif",
              }}
              gutterBottom
            >
              Task Listing
            </Typography>
          </div>
          <div style={{ marginBottom: "20px", display: "block", gap: 5 }}>
            <div style={{ width: "100%" }}>
              <TextField
                onChange={handleChange}
                id="outlined-basic"
                variant="outlined"
                label="Task"
                name="task"
                fullWidth
                value={task.task}
                InputLabelProps={{
                  style: { color: "gray" }, // Change this value to the desired label color
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#1a7051e0", // border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#11543c", // border color on focus
                    },
                  },
                }}
              />
              {taskError && (
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "14px",
                    float: "right",
                  }}
                >
                  *{taskError}
                </span>
              )}
            </div>

            <div
              style={{
                marginTop: "8px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    onChange={handleDate}
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    name="ddate"
                    InputLabelProps={{
                      style: { color: "gray" }, // Change this value to the desired label color
                    }}
                    sx={{
                      width: "100%", // Set width to 100%
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#1a7051e0", // border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#11543c", // border color on focus
                        },
                      },
                    }}
                    label="Due date"
                  />
                </DemoContainer>
              </LocalizationProvider>
              {dateError && (
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "14px",
                    float: "right",
                  }}
                >
                  *{dateError}
                </span>
              )}
            </div>
          </div>
          <Button onClick={handleSubmit} fullWidth variant="outlined">
            Add
          </Button>

          <div>
            <BasicTabs data={data} setData={setData} />
          </div>
        </CardContent>
        {/* <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions> */}
      </Card>
    </div>
  );
}
