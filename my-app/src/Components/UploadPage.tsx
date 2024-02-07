import React, { useState, ChangeEvent, FormEvent } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "..";
import { toggleItem } from "../hook/todoAPI";

type ListPoops = {
    id: number;
    name: string;
    count: number;
};

const itemList = [
    { value: "wheelchair", item: "輪椅", showValue: "輪椅" },
    { value: "electric_wheelchair", item: "電動輪椅" },
    { value: "crutch", item: "拐杖" },
    { value: "walker_frame", item: "步行架" },
    { value: "bath_chair", item: "步行架" },
    { value: "walker_frame", item: "沐浴椅" },
    { value: "nutritional_supplement", item: "營養食品" },
    { value: "adult_diapers", item: "成人紙尿片" },
    { value: "wipes", item: "濕紙巾" },
    { value: "sphygmomanometer", item: "血壓計" },
    { value: "paramount_bed", item: "護理床" },
    { value: "lotion", item: "潤膚霜" },
    { value: "others", item: "其他" },
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


    const onToggleItem = useMutation({
        mutationFn: async (id: number) => toggleItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["itemList"],
                exact: true
            });
        }
    });

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
                            <option key={entry.value} value={entry.item}>
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
                        <button onClick={() => ('')}> + + </button>
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

