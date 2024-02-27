import {  useNavigate } from "react-router-dom";
import { useRentalPage_3 } from "../hook/RentalPageAPI";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Form from 'react-bootstrap/Form';
import CardMedia from "@mui/material/CardMedia";

export function RentalPage() {
  const navigate = useNavigate();

  const RentListData = useRentalPage_3();

  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  return (
    <>
      {RentListData &&
        Array.isArray(RentListData) &&
        RentListData.map(
          (
            entry: {
              donate_item_id: number;
              item_name: string;
              deposit_charge: number;
              rent_charge: number;
              image: string;
            },
            index
          ) => (
            <Row>
              <Col md={6} className="mb-2">
              <CardMedia
              component="img"
              alt="green iguana"
              height="200"
              image={entry.image}
              style={{ objectFit: 'contain' }}
            />
                <Button onClick={toggleShowA} className="mb-2">
                  <strong>{entry.item_name}</strong>
                </Button>
                <Toast show={showA} onClose={toggleShowA}>
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Deposit:</strong>
                    <small>{entry.deposit_charge}元</small>
                  </Toast.Header>
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Rent:</strong>
                    <small>{entry.rent_charge}元/MONTH</small>
                  </Toast.Header>
                  <Toast.Body>
                  <div key="{`default-${}`} "className="mb-3">
                    <Form.Check // prettier-ignore
                      
                      id=""
                    />
                    </div>
                  </Toast.Body>
                </Toast>
              </Col>
                <button onClick={() => navigate(`//${entry.donate_item_id}`)}>
                  next
                </button>
          
              {/* <-----------------------------------------------------> */}
            </Row>
          )
        )}
    </>
  );
}
