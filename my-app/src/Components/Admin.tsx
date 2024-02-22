import { useAdminCheck_LogisticInfo_3 } from "../hook/logisticAPI";
import "../css/Admin.module.css";
import { Form, Table } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";


export default function Admin() {
  const navigate = useNavigate();

  const AdminLogisticData = useAdminCheck_LogisticInfo_3();
  console.log("march answer_3:", AdminLogisticData);

  const dispatch = useDispatch<AppDispatch>
  const [input, setInput] = useState("");

  // const queryClient = useQueryClient();
  // const OnToggleItem = useMutation({
  //   mutationFn: async (id: number) => OnToggleItem(id),
  //   onSuccess: () =>
  //     queryClient.invalidateQueries({
  //       queryKey: ["todoItems"],
  //       exact: true,
  //     }),
  // });

  return (
    <>
      <div>
        <h3>Logistics Page</h3>
      </div>
            <>
              <div>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Uuid</th>
                      <th>Purpose</th>
                      <th>Chi_surname</th>
                      <th>mobile_phone</th>
                      <th>Street</th>
                      <th>Districts</th>
                      <th>Contact_number</th>
                      <th>Contact_name</th>
                      <th>Confirmed_date</th>
                      <th>Confirmed_session</th>
                      <th>Tried</th>
                      {/* <th>Rescheduled</th> */}
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    (AdminLogisticData &&
                    Array.isArray(AdminLogisticData)) &&
                    AdminLogisticData.map(
                      (entry: {
                        id: number;
                        
                        uuid: string;
                        purpose: string;
                        chi_surname:string;
                        mobile_phone: number;
                        street: string;
                        district: string;
                        contact_number: number;
                        contact_name: string;
                        confirmed_date: string;
                        confirmed_session: string;
                        tried: boolean | string;
                        rescheduled: boolean | string;
                        status: string;
                      }) => (
                        <tr>
                        <td>{entry.id}</td>
                        <td>{entry.uuid}</td>
                        <td>{entry.purpose}</td>
                        <td>{entry.chi_surname}</td>
                        <td>{entry.mobile_phone}</td>
                        <td>{entry.street}</td>
                        <td>{entry.district}</td>
                        <td>{entry.contact_number}</td>
                        <td>{entry.contact_name}</td>
                        <td>{entry.confirmed_date}</td>
                        <td>{entry.confirmed_session}</td>
                        <td>{String(entry.tried)}</td>
                        <Form>
                        <option>{entry.status}</option>
                        <option></option>
                        </Form>
                     
                    <Form.Select aria-label="Default select example">
                              

                      <option value="1">CheckIn</option>
                      <option value="2">Reject</option>
                      {/* <option value="3">Three</option> */}
                    </Form.Select>
                    <button onClick={()=>navigate('/AdminConfirm')}>next</button>
                        </tr> 
                      )
                    )
                  }

              
                  </tbody>
                </Table>
              </div>
            </>

    </>
  );
}
