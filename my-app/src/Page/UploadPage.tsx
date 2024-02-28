import React, { useState, ChangeEvent, FormEvent } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewItems, useItems } from "../hook/dataAPI";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { useNavigate } from "react-router-dom";
import { DonationType, updateDonationList } from "../slice/logisticSlice";
import { useAppDispatch } from "../hook/hooks";
import deleteIcon from "../image/deleteIcon.jpeg";
import Form from "react-bootstrap/Form";
import uploadImg from "../image/uploadPageStep.png";

type ItemProps = {
  // id: number;
  // name: string;
};

export default function UploadPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [preSubmit, setPreSubmit] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [donationList, setDonationList] = useState<
    Array<{
      id: number;
      item_name: {
        id: number;
        name: string;
      };
      quantity: number;
    }>
  >([]);

  const nextStep = () => {
    const donationListMapped: DonationType[] = donationList.map((item) => ({
      id: item.item_name.id,
      itemName: item.item_name.name,
      quantity: item.quantity,
    }));

    dispatch(updateDonationList(donationListMapped));
    // setInput("");
    navigate("/Transaction");
  };
  const itemList:
    | string
    | Array<{ id: number; item_name: string; qty: number; image?: string }> =
    useItems();

  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    name: string;
    // image:string
  }>();
  const handleItemChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedItemName =
      event.target.options[event.target.selectedIndex].text;
    console.log(selectedItemName);

    setSelectedItem({
      id: parseInt(event.target.value),
      name: selectedItemName,
      // image:event.target.src
    });
  };

  const [quantity, setQuantity] = useState<number>(0);
  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setQuantity(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };
  // ---------------------------------------------------------------

  const addPreSubmitHandler = () => {
    if (selectedItem && quantity) {
      const newItem = {
        id: donationList.length + 1,
        item_name: selectedItem,
        quantity: quantity,
      };
      setDonationList([...donationList, newItem]);
      setQuantity(0); // Reset quantity after adding to the list
    }
  };

  const handleDelete = (id: number) => {
    const updatedList = donationList.filter((item) => item.id !== id);
    setDonationList(updatedList);
  };

  return (
    <div className="uploadContainer">
      <div className="uploadControl">
        <div className="stepImgContainer">
          {showImage && (
            <img id="uploadStepImg" src={uploadImg} alt="Step Image"></img>
          )}
        </div>
        <div className="uploadForm">
          <form className="selectItem" onSubmit={handleSubmit}>
            <MDBBtn id="donateStepBtn" onClick={() => setShowImage(!showImage)}>
              捐贈步驟說明
            </MDBBtn>
            <h3>
              <b>請選擇捐贈物品：</b>
            </h3>
            <br />

            <Form.Select
              className="donateItemList"
              name="selectDonate"
              value={selectedItem?.id}
              onChange={handleItemChange}
            >
              <option>請選擇</option>
              {Array.isArray(itemList) && itemList.length > 0 ? (
                itemList.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.item_name}
                  </option>
                  // <img src={entry.image}></img>
                ))
              ) : (
                <option value="">No Item List</option>
              )}
            </Form.Select>
            {"\u00A0\u00A0"}
            <b>
              數量 :{" "}
              <Form.Control
                id="uploadPageInput"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const enteredValue = Number(e.target.value);
                  // Check if enteredValue is a positive number
                  if (enteredValue >= 0) {
                    setQuantity(enteredValue);
                  } else {
                    // If negative value is entered, you can handle it accordingly (e.g., show an error message)
                    // For now, setting quantity to 0 as an example
                    setQuantity(0);
                  }
                }}
              />
              <br />
              <br />
            </b>
            <h5>
              <b>
                確認捐贈物品 : {selectedItem?.name} <br />
                <br />
                確認數量 : {quantity}
              </b>
            </h5>
            <MDBBtn className="uploadAddItemBtn" onClick={addPreSubmitHandler}>
              增加
            </MDBBtn>
            <br />

            <ListGroup as="ul">
              {donationList.map((item, index) => (
                <ListGroup.Item key={item.id}>
                  <b>{item.item_name.name}</b> - Quantity: {item.quantity}
                  {"\u00A0\u00A0"}
                  {"\u00A0\u00A0"}
                  <span
                    className="delete_link"
                    onClick={() => handleDelete(item.id)}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    <img className="deleteIcon " src={deleteIcon}></img>
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <MDBBtn
              className="uploadBtn"
              color="info"
              size="lg"
              onClick={nextStep}
            >
              提交
            </MDBBtn>
          </form>
          {/* <button onClick={() => navigate("/Transaction")}>NEXT</button> */}
        </div>
      </div>
    </div>
  );
}
