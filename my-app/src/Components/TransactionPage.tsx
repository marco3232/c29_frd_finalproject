import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../css/InputAddressPage.module.css"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

//-------------------------------------------------------------------------------------------

export default function TransactionPage() {
  const [region, setRegion] = useState("");
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);

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
    <div >
      <div className={styles.contactInfo}>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>聯絡人姓名</Form.Label>
            <Form.Control type="email" placeholder="" />
            <Form.Label>聯絡人電話</Form.Label>
            <Form.Control type="phoneNumber" placeholder="" />
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
        <Form.Select>
          {districtOptions.map((district, index) => (
            <option key={index}>{district}</option>
          ))}
        </Form.Select>
        <Form.Label>街道</Form.Label>
        <Form.Control type="street" placeholder="" />
        <Form.Label>大廈 / 屋</Form.Label>
        <Form.Control type="building" placeholder="" />
        <Form.Label>樓 / 室</Form.Label>
        <Form.Control type="flat-room" placeholder="" />
      </div>
      <br></br>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
          <DateTimePicker
            label="收貨日期及時間"
            defaultValue={dayjs()}
          />
        </DemoContainer>
      </LocalizationProvider>
      <br></br>
          <Button>Submit</Button>
    </div>
  );
}
