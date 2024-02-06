import React, { useState, ChangeEvent, FormEvent } from 'react';

export default function UploadPage() {
    const [selectedItem, setSelectedItem] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleItemChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(event.target.value);
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        // 在這裡實現提交功能，可以將selectedItem和quantity傳遞給後端或其他處理函數
        console.log("選擇的物品：", selectedItem);
        console.log("數量：", quantity);
    };

    return (
        <div className='uploadForm'>
            <form onSubmit={handleSubmit}>
                <label>
                    請選擇捐贈物品：
                    <select name="selectDonate" value={selectedItem} onChange={handleItemChange}>
                        <option value="">請選擇</option>
                        <option value="wheelchair">輪椅</option>
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
                    </select>
                    數量 : <input type="number" value={quantity} onChange={handleQuantityChange} />
                </label>
                <button type="submit">提交</button>
            </form>
        </div>
    );
}
