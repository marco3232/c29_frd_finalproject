import { useQuery } from "@tanstack/react-query";

const source = "http://localhost:8080";

export function useAdminCheckIn_Confirm_3(id: number) {
    const { isLoading, error, data, isFetching } = useQuery({
      queryKey: ["adminCheckInConfirm"],
      queryFn: async () => {
        const res = await fetch(`${source}/logistics/adminCheckIn/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        let result = await res.json();

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

export async function toggleItem(id: number) {
  const res = await fetch(`${source}/checkIns/${id}`, {
    method: "PUT",
  });

  const resp = await res.json();

  return resp.message as string;
}