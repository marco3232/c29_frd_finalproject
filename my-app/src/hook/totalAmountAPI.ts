import { useQuery } from "@tanstack/react-query";

const source = "http://localhost:8080";

export function useGetAmount() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["totalAmount"],
    queryFn: async () => {
      const res = await fetch(`${source}/totalamount`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      console.log("resulttotal", result);

      return result.data;
    },
  });
  if (isLoading || isFetching) return "Data Loading";
  if (error) {
    return "Error";
  }
  if (!data) {
    return [];
  }
  return data;
}
