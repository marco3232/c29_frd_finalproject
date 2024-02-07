

export default function UploadPage() {
    return (
    <>
    <label>
        請選擇捐贈物品： 
        <select name="selectDonate">
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
        數量 : <input />
        <button onClick={()=> {}}>add</button>
    </label>
    </>)
}

