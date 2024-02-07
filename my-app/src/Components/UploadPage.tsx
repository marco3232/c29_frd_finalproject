import { useState } from "react";

// type ListPoops = {
//   id: number;
//   name: string;
//   count: number;
// };

const itemList = [
  { value: "wheelchair", item: "輪椅" },
  { value: "electric_wheelchair", item: "電動輪椅" },
  { value: "crutch", item: "拐杖" },
  { value: "walker_frame", item: "步行架" },
];

export default function UploadPage() {
  const [item, setItem] = useState("");
  const [count, setCount] = useState(0);
  const [add,setAdd] = useState([{item:"",count:0}])

  const itemHandler = (e: any) => {
    setItem(e.target.value);
  };
  const countHandler = (e: any) => {
    setCount(e.target.value);
  };

  const addHandler = ()=>{setAdd([...add,{item:"",count:0}])}
  console.log("addhandler",addHandler)
  
  return (
    <>
      <label>
        請選擇捐贈物品：
        <select name="selectDonate" value={item} onChange={itemHandler}>
          <option value="">請選擇</option>
          {itemList.map((entry) => (
            <option key={entry.value} value={entry.value}>
              {entry.item}
            </option>
          ))}
        </select>
        數量 : <input type="number" value={count} onChange={countHandler} />
      </label>
      <button onClick={addHandler}>ADD</button>
     
    </>
  );
}
