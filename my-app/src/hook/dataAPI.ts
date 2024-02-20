import { useQuery } from "@tanstack/react-query";
//-------------------------------------------------------------------------------------------

const source = "http://localhost:8080";
interface DonateItem {
  id: number;
  item_name: string;
}

export function useItems() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["donate_items"],
    queryFn: async () => {
      const res = await fetch(`${source}/donate/items`,{
        headers: {
          "Authorization":`Bearer ${localStorage.getItem('token')}`
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
  logistic_id_input: number,
  donate_item_id_input: number,
  qty_input: number
) {
  const res = await fetch(`${source}/donate/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":`Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      logistic_id: logistic_id_input,
      donate_item_id: donate_item_id_input,
      qty: qty_input,
    }),
  });
  let resp = await res.json();
  console.log("resp",resp)
  return resp.message;
}
