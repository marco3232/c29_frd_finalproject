import React, { useState, ChangeEvent, FormEvent } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewItems, useItems } from "../hook/dataAPI";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { useNavigate } from "react-router-dom";

type ItemProps = {
  // id: number;
  // name: string;
};

export default function UploadPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [preSubmit, setPreSubmit] = useState("");
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

  const itemList:
    | string
    | Array<{ id: number; item_name: string; qty: number }> = useItems();

  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    name: string;
  }>();
  const handleItemChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedItemName =
      event.target.options[event.target.selectedIndex].text;
    console.log(selectedItemName);

    setSelectedItem({
      id: parseInt(event.target.value),
      name: selectedItemName,
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
      // setSelectedItem(""); // Reset selected item after adding to the list
      setQuantity(0); // Reset quantity after adding to the list
    }
  };

  const OnAddNewItems = useMutation({
    mutationFn: async (data: { donate_item_id: number; qty: number }) =>
      addNewItems(data.donate_item_id, data.qty),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["donate_items"],
        exact: true,
      });
    },
  });

  // const addNewItemHandler = () => {
  //   OnAddNewItems.mutate({ logistic_id: 1, donate_item_id: 1, qty: 1 })
  // }
  // console.log("onadd??", addNewItemHandler)

  const handleDelete = (id: number) => {
    const updatedList = donationList.filter((item) => item.id !== id);
    setDonationList(updatedList);
  };

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
            value={selectedItem?.id}
            onChange={handleItemChange}
          >
            <option value="">請選擇</option>
            {Array.isArray(itemList) && itemList.length > 0 ? (
              itemList.map((entry) => (
                <option value={entry.id}>{entry.item_name}</option>
              ))
            ) : (
              <option value="">No Item List</option>
            )}
          </select>

          {"\u00A0\u00A0"}
          {"\u00A0\u00A0"}
          <b>
            數量 :{" "}
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button className="uploadAddItemBtn" onClick={addPreSubmitHandler}>   預覽   </button>
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
        </label>
        <br />
        <br />
        <MDBBtn
          className="uploadBtn"
          color="info"
          size="lg"
          onClick={() => {
            donationList.forEach((item, index) => {
              const { item_name, quantity } = item;
              OnAddNewItems.mutate({
                donate_item_id: item_name.id,
                qty: quantity,
              });
            });

            // OnAddNewItems.mutate({ logistic_id: 2, donate_item_id: parseInt(selectedItem), qty: quantity });
            console.log("check qty", quantity);
            console.log("check id", selectedItem);
            setInput("");
            navigate("/Transaction");
          }}
        >
          提交
        </MDBBtn>
      </form>
      {/* <button onClick={() => navigate("/Transaction")}>NEXT</button> */}
      <ListGroup as="ul">
        {donationList.map((item, index) => (
          <ListGroup.Item key={item.id}>
            {item.item_name.name} - Quantity: {item.quantity}
            {"\u00A0\u00A0"}
            {"\u00A0\u00A0"}
            <span
              className="delete-link"
              onClick={() => handleDelete(item.id)}
              onMouseOver={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              [Delete]
            </span>
          </ListGroup.Item>

        ))}
      </ListGroup>
    </div>
  );
}