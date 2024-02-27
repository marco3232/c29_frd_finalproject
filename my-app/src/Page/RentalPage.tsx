import { useNavigate } from "react-router-dom";
import { useRentalPage_3 } from "../hook/RentalPageAPI";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";
import CardMedia from "@mui/material/CardMedia";
import { useAppDispatch } from "../hook/hooks";
import { updateRentalList } from "../slice/checkOutSlice";

export function RentalPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nextStep = (rentalListMapped: number[]) => {

    dispatch(updateRentalList(rentalListMapped));
    // setInput("");
    navigate("/Transaction");
  };

  const RentListData = useRentalPage_3();

  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  const submit = () => {
    console.log("submit");
    console.log({donateItemIds})
  };

  const [donateItemIds, setDonateItemIds] = useState<Set<number>>(new Set());

  const updateDonateItem = (id: number) => {
    const updatedItemIds = new Set(donateItemIds); // Create a copy of the existing set
    if (updatedItemIds.has(id)) {
      updatedItemIds.delete(id); // Item already selected, remove it from the set
    } else {
      updatedItemIds.add(id); // Item not selected, add it to the set
    }
    setDonateItemIds(updatedItemIds); //
  };

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
            <Row key={index}>
              <Col md={6} className="mb-2">
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="200"
                  image={entry.image}
                  style={{ objectFit: "contain" }}
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
                    <div className="mb-3">
                      <Form.Check // prettier-ignore
                         onChange={() => updateDonateItem(entry.donate_item_id)}
                         checked={donateItemIds.has(entry.donate_item_id)}
                      />
                    </div>
                  </Toast.Body>
                </Toast>
              </Col>
              {/* <-----------------------------------------------------> */}
            </Row>
          )
        )}

      {/* <button onClick={nextStep}>Next</button> */}
    </>
  );
}
