import { useQuery } from "@tanstack/react-query";

const source = "http://localhost:8080";

export function useRentalPage_3(){
    const {isLoading, error, data, isFetching}= useQuery({
        queryKey:["rentalPage"],
        queryFn:async()=>{
            const res = await fetch(`${source}/rent/rentResult`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                },
            });
            let result = await res.json();

            return result;
        }
    });
    if (isLoading || isFetching) return "Data loading";
    if (error){
        return "Error";
    }
    if (!data){
        return [];
    }
    return data;
}
