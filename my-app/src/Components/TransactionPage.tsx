import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../css/InputAddressPage.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLogisticColumn } from "../hook/logisticAPI";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useNow } from "@mui/x-date-pickers/internals";
import {
  clearForm,
  updateTransaction,
} from "../slice/logisticSlice";
import { useAppDispatch, useAppSelector } from "../hook/hooks";

//-------------------------------------------------------------------------------------------

export default function TransactionPage() {
  const dispatch = useAppDispatch();
  const donationList = useAppSelector((state) => state.logistic.donationList);
  const transaction = useAppSelector((state) => state.logistic.transaction);

  // -----------react query-----------------------
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const onAddLogistic = useMutation({
    mutationFn: async () =>
      addLogisticColumn(
        donationList,
        transaction
        // data.room,
        // data.building,
        // data.street,
        // data.district,
        // data.contact_number,
        // data.contact_name,
        // data.confirmed_date,
        // data.confirmed_session
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["logistic"],
        exact: true,
      });
      dispatch(clearForm());
    },
  });

  const addLogisticHandler = () => {
    dispatch(
      updateTransaction({
        room: roomInput,
        building: buildingInput,
      })
    );
    onAddLogistic.mutate();
    // {
    //   room: roomInput,
    //   building: buildingInput,
    //   street: streetInput,
    //   district: districtInput,
    //   contact_number: contactNumberInput,
    //   contact_name: contactNameInput,
    //   confirmed_date: confirmedDateInput,
    //   confirmed_session: confirmedSessionInput,
    // }

    // navigate("/FinalConfirmPage");
  };

  const [roomInput, setRoomInput] = useState("");
  const [buildingInput, setBuildingInput] = useState("");
  const [streetInput, setStreetInput] = useState("");
  const [contactNumberInput, setContactNumberInput] = useState("");
  const [contactNameInput, setContactNameInput] = useState("");
  const [confirmedDateInput, setConfirmDateInput] = useState("");
  const [confirmedSessionInput, setConfirmSessionInput] = useState("");
  // const [userIdInput, setUserIdInput] = useState("");
  // -----------react query-----------------------

  const [region, setRegion] = useState("");
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);
  const [districtInput, setDistrictInput] = useState("");

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);

    switch (selectedRegion) {
      case "香港島":
        setDistrictOptions(["中西區", "灣仔區", "東區", "南區", "其他"]);
        break;
      case "九龍區":
        setDistrictOptions([
          "九龍城區",
          "觀塘區",
          "深水埗區",
          "黃大仙區",
          "油尖旺區",
          "其他",
        ]);
        break;
      case "新界區":
        setDistrictOptions([
          "葵青區",
          "荃灣區",
          "離島區",
          "北區",
          "西貢區",
          "沙田區",
          "大埔區",
          "屯門區",
          "元朗區",
          "其他",
        ]);
        break;
      default:
        setDistrictOptions([]);
    }
  };

  return (
    <div>
      <div className={styles.contactInfo}>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>聯絡人姓名</Form.Label>
            <Form.Control
              type="name"
              placeholder=""
              value={contactNameInput}
              onChange={(e) => {
                setContactNameInput(e.target.value);
              }}
            />
            <Form.Label>聯絡人電話</Form.Label>
            <Form.Control
              type="phoneNumber"
              placeholder=""
              value={contactNumberInput}
              onChange={(e) => {
                setContactNumberInput(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
        <Form.Label>區域</Form.Label>
        <Form.Select onChange={handleRegionChange} value={region}>
          <option></option>
          <option>香港島</option>
          <option>九龍區</option>
          <option>新界區</option>
        </Form.Select>

        <Form.Label>地區</Form.Label>
        <Form.Select
          value={districtInput}
          onChange={(e) => {
            setDistrictInput(e.target.value);
          }}
        >
          {districtOptions.map((district, index) => (
            <option key={index}>{district}</option>
          ))}
        </Form.Select>
        <Form.Label>街道</Form.Label>
        <Form.Control
          type="street"
          placeholder=""
          value={streetInput}
          onChange={(e) => {
            setStreetInput(e.target.value);
          }}
        />
        <Form.Label>大廈 / 屋</Form.Label>
        <Form.Control
          type="building"
          placeholder=""
          value={buildingInput}
          onChange={(e) => {
            setBuildingInput(e.target.value);
          }}
        />
        <Form.Label>樓 / 室</Form.Label>
        <Form.Control
          type="flat-room"
          placeholder=""
          value={roomInput}
          onChange={(e) => {
            setRoomInput(e.target.value);
          }}
        />
      </div>
      <br></br>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Date"
            // defaultValue={dayjs()}
            value={dayjs(confirmedDateInput)}
            onChange={(date) => {
              const dayjsDate = dayjs(date);
              const dateToString = new Date(
                dayjsDate.toDate()
              ).toLocaleDateString("en-US");
              console.log("date", dateToString);
              setConfirmDateInput(dateToString);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <br></br>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            label="Time"
            // defaultValue={dayjs()}
            value={dayjs(confirmedSessionInput)}
            onChange={(session) => {
              const dayjsSession = dayjs(session);
              const sessionToString = new Date(
                dayjsSession.toDate()
              ).toLocaleTimeString("en-US");
              console.log("session", sessionToString);
              setConfirmSessionInput(sessionToString);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <br></br>
      <Button onClick={addLogisticHandler}>Submit</Button>
    </div>
  );
}
