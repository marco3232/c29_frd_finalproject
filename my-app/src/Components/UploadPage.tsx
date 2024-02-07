import React, { useState, ChangeEvent, FormEvent } from "react";
import { MDBBtn } from "mdb-react-ui-kit";

type ListPoops = {
  id: number;
  name: string;
  count: number;
};

const itemList = [
  { value: "wheelchair", item: "輪椅" },
  { value: "electric_wheelchair", item: "電動輪椅" },
  { value: "crutch", item: "拐杖" },
  { value: "walker_frame", item: "步行架" },
];



export default function UploadPage() {
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

            {itemList.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.item}
              </option>
            ))}
          </select>
          {"\u00A0\u00A0"}
          {"\u00A0\u00A0"}
          <b>
            數量 :{" "}
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
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
        <MDBBtn className="uploadBtn" type="submit" color="info" size="lg">
          提交
        </MDBBtn>
      </form>
    </div>
  );
}

{
  /* <option value="wheelchair">輪椅</option>
                        <option value="electric_wheelchair">電動輪椅</option>
                        <option value="crutch">拐杖</option>
                        <option value="walker_frame">步行架</option>
                        <option value="bath_chair">沐浴椅</option>
                        <option value="nutritional_supplement">營養食品</option>
                        <option value="adult_diapers">成人紙尿片</option>
                        <option value="wipes">濕紙巾</option>
                        <option value="sphygmomanometer">血壓計</option>
                        <option value="paramount_bed">護理床</option>
                        <option value="lotion">潤膚霜</option>
                        <option value="others">其他</option>
                        <option value="其他">其他</option> */
}
