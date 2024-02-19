import { useDonateItems } from "../hook/logisticAPI"

export function ConfirmationPage() {

    const donateItemList : string | Array<{id:number,item_name:string,qty:number}> = useDonateItems();


    return (
        <>
        <div>
          <h1>確認版面</h1>
        </div>
        </>
    )
}