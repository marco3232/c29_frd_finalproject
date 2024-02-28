import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCheckOutInfo } from "../hook/checkoutAPI";
import loadingGif from "../image/loading.gif";
// -----------------------------------------------------

import { Form, Col, Row, ListGroup } from "react-bootstrap";
import { useState } from "react";

import { queryClient } from "..";
import React from "react";
import { useGetAmount } from "../hook/totalAmountAPI";

export function FinalCheckOutPage() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState([]);

  const [buildingInput, setBuildingInput] = useState("");

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
        address: string;
        district: string;
        number: number;
        name: string;
        confirmed_date: string;
        confirmed_session: string;
        user_id?: number;
        item_name?: string;
        logistic_id?: number;
        donate_item_id?: number;
        quantity: number;
        item_list?: string;
        created_at: number;
        deposit_charge?: number;
        rent_charge?: number;
        item_info?: string;
        total_deposit_sum?: number;
        total_rent_price_sum?: number;
      }> = useCheckOutInfo();

  const getRentNDeposit:
    | string
    | Array<{
        deposit_charge: number;
        rent_charge: number;
      }> = useCheckOutInfo();

  //   const getDepositAndRent:
  //   | string
  //   | Array<{
  //     deposit_charge:number;
  //     rent_charge:number;
  //   }> = getAmount()

  return (
    <div className="logisticConfirm">
      {Array.isArray(getLogisticList) && getLogisticList.length > 0 ? (
        <Form className="logisticForm">
          <h1 className="logisticTitle">租借記錄</h1>
          {getLogisticList.map((entry) => (
            <>
              <a></a>
              <Row className="logisticRow" key={entry.id}>
                {/* <Col className="logisticConfirmContainer">
                    <Form.Group className="logisticConfirmCard">
                      <Form.Label>目的</Form.Label>
                      <Form.Control value={entry.purpose} />
                    </Form.Group>
                  </Col> */}
                <Col className="logisticConfirmContainer">
                  <Form.Group className="logisticConfirmCard">
                    <Form.Label>運單號</Form.Label>
                    <Form.Control value={entry.uuid} />
                  </Form.Group>
                </Col>
                {/* <Col className="logisticConfirmContainer">
                    <Form.Group className="logisticConfirmCard">
                      <Form.Label>捐贈物品及數量</Form.Label>
                      <Form.Control value={entry.item_list} />
                    </Form.Group>
                  </Col>
                */}
                <Col className="logisticConfirmContainer">
                  <Form.Group className="logisticConfirmCard">
                    <Form.Label>聯絡人姓名</Form.Label>
                    <Form.Control value={entry.name} />
                  </Form.Group>
                </Col>
                <Col className="logisticConfirmContainer">
                  <Form.Group className="logisticConfirmCard">
                    <Form.Label>聯絡人電話</Form.Label>
                    <Form.Control value={entry.number} />
                  </Form.Group>
                </Col>
                <Col className="logisticConfirmContainer">
                  <Form.Group className="logisticConfirmCard">
                    <Form.Label>地址</Form.Label>
                    <Form.Control value={entry.address} />
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
                <Col className="logisticConfirmContainer">
                  <Form.Group className="logisticConfirmCard">
                    <Form.Label>租借項目表</Form.Label>
                    <Form.Control value={entry.item_info} />
                  </Form.Group>
                </Col>
                <Col className="logisticConfirmContainer">
                  <Form.Group className="logisticConfirmCard">
                    <Form.Label>總按金</Form.Label>
                    <Form.Control value={entry.total_deposit_sum} />
                  </Form.Group>
                </Col>
                <Col className="logisticConfirmContainer">
                  <Form.Group className="logisticConfirmCard">
                    <Form.Label>總租金</Form.Label>
                    <Form.Control value={entry.total_rent_price_sum} />
                  </Form.Group>
                </Col>
                <Col className="logisticConfirmContainer">
                  <Form.Group className="logisticConfirmCard">
                    <Form.Label>總額</Form.Label>
                    {/* <Form.Control value={entry.total_rent_price_sum + entry.total_deposit_sum} /> */}
                    <Form.Control
                      value={
                        entry.total_rent_price_sum !== undefined &&
                        entry.total_deposit_sum !== undefined
                          ? Number(entry.total_rent_price_sum) +
                            Number(entry.total_deposit_sum)
                          : "Error: Data not available"
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* {Array.isArray(getRentNDeposit) && getRentNDeposit.length > 0 ? (
                <ListGroup as="ul">
                  <ListGroup.Item as="li">付款詳情</ListGroup.Item>
                  {getRentNDeposit.map((entry) => (
                    <div>
                      <ListGroup.Item as="li">
                        總按金 ${entry.deposit_charge}
                         總租金 $ {entry.rent_charge} 
                      </ListGroup.Item>
                    </div>
                  ))}
                </ListGroup>
              ) : (
                <div id="finalConfirmNodata">
                  <h3>No data available</h3>
                </div>
              )} */}
            </>
          ))}
        </Form>
      ) : (
        <div id="finalConfirmNodata">
          <h3>No data available</h3>
        </div>
      )}
    </div>
  );
}
