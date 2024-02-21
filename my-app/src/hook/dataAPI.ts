import { useQuery } from "@tanstack/react-query";
//-------------------------------------------------------------------------------------------

const source = "http://localhost:8080";
interface DonateItem {
  id: number;
  item_name: string;
  qty: number
}

export function useItems() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["donate_items"],
    queryFn: async () => {
      const res = await fetch(`${source}/donate/items`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      })

      const result = await res.json();
      return result.data as DonateItem[];
    },
  });

  if (isLoading || isFetching) return "Data Loading";
  if (error) {
    return "Error ";
  }
  if (!data) {
    return [];
  }
  return data;
}

//-------------------------------------------------------------------------------------------

export async function addNewItems(
  donate_item_id_input: number,
  qty_input: number,
  // logistic_id: number
) {
  const res = await fetch(`${source}/donate/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      donate_item_id: donate_item_id_input,
      qty: qty_input,
      // logistic_id: logistic_id
    }),
  });
  let resp = await res.json();
  console.log("resp", resp)
  return resp.message;
}

//-------------------------------------------------------------------------------------------

export async function confirmDonateItem() {





}

// export const fetchItemData = async (itemId: number) => {
//   try {
//     const response = await fetch(`${source}/donate/items/${itemId}`, {
//       headers: {
//         "Authorization": `Bearer ${localStorage.getItem('token')}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch item data: ${response.status}`);
//     }

//     const itemData = await response.json();
//     return itemData;
//   } catch (error: any) {
//     throw new Error(`Failed to fetch item data: ${error.message}`);
//   }
// };
