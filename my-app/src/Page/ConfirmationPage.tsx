import { useDonateItems } from "../hook/logisticAPI"

export function ConfirmationPage() {

    const donateItemList : string | Array<{id:number,item_name:string,qty:number}> = useDonateItems();


    return (
        <>
        <div>
        {Array.isArray(donateItemList)
        ? donateItemList.length > 0
          ? donateItemList!.map((item) => (
              <ConfirmationPage
              />
            ))
          : "No todo Items"
        : ""}
        </div>
        </>
    )
}