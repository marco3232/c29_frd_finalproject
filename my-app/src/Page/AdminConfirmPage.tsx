// import { QueryClient, QueryClientProvider } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toggleItem, useAdminCheckIn_Confirm_3 } from "../hook/adminAPI";
import { Form, Table } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "..";
import { useState } from "react";
import { toggleButtonClasses } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

// type Status_OptionProps = {
//   id: number;
//   normal: string;
//   repairing: string;
//   rented: string;
//   disposed: string;
//   lost: string;
// };

const source = "http://localhost:8080";


export function AdminConfirmPage() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState("");

  // console.log(id)

  // const [searchParams] = useSearchParams()

  //  const queryClient = useQueryClient()
  const items = useAdminCheckIn_Confirm_3(parseInt(id!));
  const queryClient = useQueryClient();

  // console.log("march", items.logistic_id);
  const OnToggleItem = useMutation({
    mutationFn: async (id: number) => toggleItem(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [""],
        exact: true,
      }),
  });

  const changeStatus = (e: any, index: number) => {
    const value = e.target.value;
    items[index].status = value
    console.log(value, index);
    queryClient.setQueryData(["adminCheckInConfirm"], items)
  };

  const onSubmit = async (index: number) => {
    const item = items[index]
    // console.log({
    //     logistic_item_id: item.id,
    //     qty: item.qty
    // })
    console.log("check item",item)

    await fetch(`${source}/checkin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            logistic_item_id: item.id,
            logistic_id:item.logistic_id,
            donate_item_id: item.donate_item_id,
            goods_status:item.status,
        })
    })

   
  }
  //   const { isLoading, error, data } = useQuery("repoData", () =>
  //   fetch("").then(
  //     (res) => res.json(),
  //   ),
  // );
  // if (isLoading) return "Loading...";
  // if (error) return "An error has occurred: " + error;
  return (
    <>
      <h1>Admin Confirm Page</h1>
      <p>Hi this is the detail page of item ID: {id}</p>
      <div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Status</th>
              <th>Operation</th>
            </tr>
          </thead>
          {items &&
            Array.isArray(items) &&
            items.map(
              (
                entry: {
                  id: number;
                  logistic_id: number;
                  donate_item_id: 2;
                  qty: number;
                  item_name: string;
                },
                index
              ) => (
                <tbody key={index}>
                  <tr>
                    <td>{entry.id}</td>
                    <td>{entry.item_name}</td>
                    <td>{entry.qty}</td>
                    <td>
                      <Form.Select onChange={(e) => changeStatus(e, index)}>
                        <option value="none">請選擇</option>
                        <option value="normal">Normal</option>
                        <option value="repairing">Repairing</option>
                        <option value="rented">Rented</option>
                        <option value="disposed">Disposed</option>
                        <option value="lost">Lost</option>
                      </Form.Select>
                    </td>
                    <td>
                      {" "}
                      <button type="submit" onClick={() => onSubmit(index)}> 提交</button>
                    </td>
                  </tr>
                </tbody>
              )
            )}
        </Table>
      </div>
    </>
  );
}
