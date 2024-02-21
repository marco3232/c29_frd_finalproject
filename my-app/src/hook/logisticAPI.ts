import { useQuery } from "@tanstack/react-query";
import { DonationType, TransactionType } from "../slice/logisticSlice";
//-------------------------------------------------------------------------------------------

const source = "http://localhost:8080";

export function useGetLogisticInfo() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["logistic"],
    queryFn: async () => {
      const res = await fetch(`${source}/finaldonateconfirmMix`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      console.log("result",result.data)
      return result.data;
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

export async function addLogisticColumn(
  donationList: DonationType[],
  transaction: TransactionType
) {
  const body = {
    donationList,
    transaction
  }
  console.log({
    body
  })
  const res = await fetch(`${source}/logisticmix`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });

  let resp = await res.json();
  console.log("check logistic api", resp);
  return resp.message;
}


export async function editLogisticColumn(
  id: number,
  room?: string,
  building?: string,
  street?: string,
  district?: string,
  contact_number?: string,
  contact_name?: string,
  confirmed_date?: string,
  confirmed_session?: string,
  user_id?: number
) {
  const res = await fetch(`${source}/edit/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      id: id,
      room: room,
      building: building,
      street: street,
      district: district,
      contact_number: contact_number,
      contact_name: contact_name,
      confirmed_date: confirmed_date,
      confirmed_session: confirmed_session,
      user_id: user_id,
    }),
  });
  let resp = await res.json();
  return resp.message;
}

export function useAdminCheck_LogisticInfo_3() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["adminLogistic"],
    queryFn: async () => {
      const res = await fetch(`${source}/logistics/logistics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let result = await res.json();
      console.log("march answer:", result);
      return result;
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
