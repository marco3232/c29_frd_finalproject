import React, { useState, ChangeEvent, FormEvent } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewItems, useItems } from "../hook/dataAPI";
import ListGroup from "react-bootstrap/esm/ListGroup";

type ItemProps = {
  // id: number;
  //   name: string;
  // count: number;
};

export default function UploadPage() {
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [preSubmit, setPreSubmit] = useState("");
  const [donationList, setDonationList] = useState<
    Array<{ item_name: string; quantity: number }>
  >([]);

  const itemList: string | Array<{ item_name: string }> = useItems();


  const [selectedItem, setSelectedItem] = useState("");
  const handleItemChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
  };
  const [quantity, setQuantity] = useState("");
  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const addPreSubmitHandler = () => {
    if (selectedItem && quantity) {
      const newItem = { item_name: selectedItem, quantity: parseInt(quantity) };
      setDonationList([...donationList, newItem]);
      setSelectedItem(""); // Reset selected item after adding to the list
      setQuantity(""); // Reset quantity after adding to the list
    }
  };

  const OnAddNewItems = useMutation({
    mutationFn: async (data: {
      logistic_id: number;
      donate_item_id: number;
      qty: number;
    }) => addNewItems(data.donate_item_id, data.logistic_id, data.qty),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donate_items"],
        exact: true,
      });
    },
  });
  
  const addNewItemHandler = ()=>{
    OnAddNewItems.mutate({logistic_id:1,donate_item_id:1,qty:1})
  }
  console.log("onadd??",addNewItemHandler)

  return (
    <div className="uploadForm">
      <form className="selectItem" onSubmit={handleSubmit}>
        <label>
          <h3>
            <b>請選擇捐贈物品：</b>
          </h3>
          <br />

          <select
            className="donateItemList"
            name="selectDonate"
            value={selectedItem}
            onChange={handleItemChange}
          >
            <option value="">請選擇</option>
            {Array.isArray(itemList) && itemList.length > 0 ? (
              itemList.map((entry) => (
                <option value={entry.item_name}>{entry.item_name}</option>
              ))
            ) : (
              <option value="">No Item List</option>
            )}
          </select>

          {"\u00A0\u00A0"}
          {"\u00A0\u00A0"}
          <b>
            數量 :{" "}
            <input type="number" value={quantity} onChange={handleQuantityChange} />
            <button onClick={addPreSubmitHandler}> + + </button>
            <br />
            <br />
          </b>
          <h5>
            <b>
              確認捐贈物品 : {selectedItem} <br />
              <br />
              確認數量 : {quantity}
            </b>
          </h5>
        </label>
        <br />
        <br />
        <MDBBtn className="uploadBtn" color="info" size="lg" onClick={addNewItemHandler}>
          提交
        </MDBBtn>
      </form>
      <ListGroup as="ul">
        {donationList.map((item, index) => (
          <ListGroup.Item key={index}>
            {item.item_name} - Quantity: {item.quantity}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
