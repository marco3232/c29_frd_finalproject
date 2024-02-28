import { useQuery } from "@tanstack/react-query";


const source = "http://localhost:8080";

export function useCheckInInfo() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["checkins"],
    queryFn: async () => {
      const res = await fetch(`${source}/checkin`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();

      return result.data
    }
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

export async function addCheckIn(
  item_image_path_input: string,
  serial_number_input: string,
  user_id_input: number,
  logistic_id_input: number,
  donate_item_id_input: number
) {
  const res = await fetch(`${source}/checkin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      item_image_path: item_image_path_input,
      serial_number: serial_number_input,
      user_id: user_id_input,
      logistic_id: logistic_id_input,
      donate_item_id: donate_item_id_input
    }),
  });
  let resp = await res.json();
  console.log("resp", resp)
  return resp.message;
}