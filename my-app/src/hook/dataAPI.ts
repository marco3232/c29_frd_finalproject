import { useQuery } from "@tanstack/react-query";
//-------------------------------------------------------------------------------------------

const source = "http://localhost:8080";
interface DonateItem {
  item_name: string;
}

export function useItems() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["donate_items"],
    queryFn: async () => {
      const res = await fetch(`${source}/donate/items`);
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
  donate_item_id_input: number | string,
  qty_input: number
) {
  const res = await fetch(`${source}/donate/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      logistic_id: logistic_id_input,
      donate_item_id: donate_item_id_input,
      qty: qty_input,
    }),
  });
  let resp = await res.json();
  return resp.message;
}

export async function addLogistic(
  room_input?: string,
  building_input?: string,
  street_input?: string,
  district_input?: string,
  contact_number_input?: string,
  contact_name_input?: string,
  confirmed_date_input?: string,
  confirmed_session_input?: string,
  user_id_input?: number
) {
  const res = await fetch(`${source}/logistic`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      room: room_input,
      building: building_input,
      street: street_input,
      district: district_input,
      contact_number: contact_number_input,
      contact_name: contact_name_input,
      confirmed_date: confirmed_date_input,
      confirmed_session: confirmed_session_input,
      user_id: user_id_input,
    }),
  });

  let resp = await res.json();
  return resp.message;
}
