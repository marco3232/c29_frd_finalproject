import { useNavigate, useParams } from "react-router-dom";
import { useAdminCheckIn_Confirm_3 } from "../hook/adminAPI";
import { Form, Table } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { setSubmittedStatus } from "../slice/adminConfirmSlice";
import { IRootState } from "../store";

// --------------------------------------------------------------------------------

const source = "http://localhost:8080";

export function AdminConfirmPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const items = useAdminCheckIn_Confirm_3(parseInt(id!));
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const submittedStatus = useSelector((state: IRootState) => state.adminConfirm.submittedStatus);
  // ---------------------

  // const changeFileUpload = (e: any, index: number) => {
  //   const value = e.target.value;
  //   console.log(value);
  // };

  // ---------------------

  const changeStatus = (e: any, index: number) => {
    const value = e.target.value;
    const newStatus = [...status];
    newStatus[index] = value;
    setStatus(newStatus);
    console.log({ value, index });
    queryClient.setQueryData(["adminCheckInConfirm"], items);
  };

  // ---------------------

  const onSubmit = async (index: number) => {
    const item = items[index];
    const itemStatus = status[index];
    const body = {
      logistic_item_id: item.id,
      status: itemStatus
    };

    await fetch(`${source}/checkin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(body)
    });

    setStatus(prevStatus => {
      const newStatus = [...prevStatus];
      newStatus[index] = "已存倉";
      return newStatus;
    });
    dispatch(setSubmittedStatus({ index, status: "已存倉" }));
  };
  // ---------------------

  return (
    <div className="adminConfirmPageControl">
      <div className="adminConfirmPageContainer">

        <h1>Admin Confirm Page</h1>
        <p>Hi this is the detail page of item ID: {id}</p>
        <div className="tableResponsive">
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
            <tbody>
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
                    <tr key={index}>
                      <td>{entry.id}</td>
                      <td>{entry.item_name}</td>
                      <td>{entry.qty}</td>
                      <td>
                        <Form.Select
                          onChange={(e) => changeStatus(e, index)}
                          value={status[index] || "none"}
                          disabled={status[index] === "已存倉"}
                        >
                          <option value="none">請選擇</option>
                          <option value="normal">Normal</option>
                          <option value="repairing">Repairing</option>
                          <option value="rented">Rented</option>
                          <option value="disposed">Disposed</option>
                          <option value="lost">Lost</option>
                        </Form.Select>
                      </td>
                      <td>
                        <MDBBtn
                          className="adminConfirmPage"
                          type="submit"
                          id={`submitBtn-${index}`}
                          onClick={() => onSubmit(index)}
                          disabled={status[index] === "已存倉" || status[index] !== "normal"}
                        >
                          {status[index] === "已存倉" ? "已存倉" : "提交"}
                        </MDBBtn>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}