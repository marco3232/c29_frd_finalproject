import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { editLogisticColumn, useGetLogisticInfo } from "../hook/logisticAPI";
import loadingGif from "../image/loading.gif";
// -----------------------------------------------------

import { Form, Col, Row } from "react-bootstrap";
import { useState } from "react";

import { queryClient } from "..";



export default function FinalConfirmPage() {
  // const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState([]);

  const [buildingInput, setBuildingInput] = useState("");


  const OnEditItem = useMutation({
    mutationFn: async (data: {
      id: number,
      building: string
    }) => editLogisticColumn(data.id, data.building),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["logistic"],
        exact: true,
      }),
  })

  const [region, setRegion] = useState("");
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
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);
  const [districtInput, setDistrictInput] = useState("");


  const getLogisticList:
    | string
    | Array<{
      id: number;
      uuid?: number;
      purpose?: string;
      room: string;
      building: string;
      street: string;
      district: string;
      contact_number: number;
      contact_name: string;
      confirmed_date: string;
      confirmed_session: string;
      user_id?: number;
      item_name?: string;
      logistic_id?: number;
      donate_item_id?: number;
      qty: number;
    }> = useGetLogisticInfo();
  console.log("getall", getLogisticList);

  return (
    <div className="logisticConfirm">
      <h1>捐贈記錄</h1>
      {Array.isArray(getLogisticList) && getLogisticList.length > 0 ? (
        <Form className="logisticForm">
          {getLogisticList.map((entry) => (
            <Row className="logisticRow" key={entry.id} >
              <h3>Logistic ID: {entry.user_id}</h3>
              <Col className="logisticConfirmContainer">
                <Form.Group className="logisticConfirmCard">
                  <Form.Label>目的</Form.Label>
                  <Form.Control value={entry.purpose} />
                </Form.Group>
              </Col>
              <Col className="logisticConfirmContainer">
                <Form.Group className="logisticConfirmCard">
                  <Form.Label>捐贈物品</Form.Label>
                  <Form.Control value={entry.item_name} />
                </Form.Group>
              </Col>
              <Col className="logisticConfirmContainer">
                <Form.Group className="logisticConfirmCard">
                  <Form.Label>捐贈數量</Form.Label>
                  <Form.Control value={entry.qty} />
                </Form.Group>
              </Col>
              <Col className="logisticConfirmContainer">
                <Form.Group className="logisticConfirmCard">
                  <Form.Label>區域</Form.Label>
                  <Form.Control value={entry.district} />
                </Form.Group>
              </Col>
              <Col className="logisticConfirmContainer">
                <Form.Group className="logisticConfirmCard">
                  <Form.Label>街道</Form.Label>
                  <Form.Control value={entry.street} />
                </Form.Group>
              </Col>
              <Col className="logisticConfirmContainer">
                <Form.Group className="logisticConfirmCard">
                  <Form.Label>大廈 / 屋</Form.Label>
                  <Form.Control value={entry.building} />
                </Form.Group>
              </Col>
              <Col className="logisticConfirmContainer">
                <Form.Group className="logisticConfirmCard">
                  <Form.Label>樓 / 室</Form.Label>
                  <Form.Control value={entry.room} />
                </Form.Group>
              </Col>
              <Col className="logisticConfirmContainer">
                <Form.Group className="logisticConfirmCard">
                  <Form.Label>聯絡人姓名</Form.Label>
                  <Form.Control value={entry.contact_name} />
                </Form.Group>
              </Col>
              <Col className="logisticConfirmContainer">
                <Form.Group className="logisticConfirmCard">
                  <Form.Label>聯絡人電話</Form.Label>
                  <Form.Control value={entry.contact_number} />
                </Form.Group>
              </Col>
              <Col className="logisticConfirmContainer">
                <Form.Group className="logisticConfirmCard">
                  <Form.Label>確認交收日期</Form.Label>
                  <Form.Control value={entry.confirmed_date} />
                </Form.Group>
              </Col>
              <Col className="logisticConfirmContainer">
                <Form.Group className="logisticConfirmCard">
                  <Form.Label>確認交收時間</Form.Label>
                  <Form.Control value={entry.confirmed_session} />
                </Form.Group>
              </Col>
            </Row>
          ))}
        </Form>

      ) : (
        <div id="finalConfirmNodata">
          <h3>No data available</h3>
        </div>
      )
      }
    </div >
  );
}
