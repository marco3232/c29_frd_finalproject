import { useAdminCheck_LogisticInfo_3 } from "../hook/logisticAPI";
import "../css/Admin.module.css";
import { Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Admin() {
  const navigate = useNavigate();

  const AdminLogisticData = useAdminCheck_LogisticInfo_3();
  // console.log("march answer_3:", AdminLogisticData);


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
                      <th>Purpose</th>
                      <th>Uuid</th>
                      <th>Donate items & qty</th>
                      <th>address</th>
                      <th>Contact_name</th>
                      <th>Contact_number</th>
                      <th>Confirmed_date</th>
                      <th>Confirmed_session</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    (AdminLogisticData &&
                    Array.isArray(AdminLogisticData)) &&
                    AdminLogisticData.map(
                      (entry: {
                        id:number;
                        logistic_id:number;
                        details:string;
                        purpose: string;
                        uuid: string;
                        name:string;
                        address:string;
                        number: number;
                        contact_name: string;
                        confirmed_date: string;
                        confirmed_session: string;

                        rescheduled: boolean | string;
                        status: string;
                      }, index) => (
                        <tr key={index}>
                        <td>{entry.uuid}</td>
                        <td>{entry.purpose}</td>
                        <td>{entry.details}</td>
                        <td>{entry.address}</td>
                        <td>{entry.name}</td>
                        <td>{entry.number}</td>
                        <td>{entry.confirmed_date}</td>
                        <td>{entry.confirmed_session}</td>
                          <td>
                        <Form.Select>
                        <option value="in-storage">In-storage</option>
                        <option value="in-transit">In-transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        </Form.Select>
                        </td>
                     
                        <td>
                    <Form.Select aria-label="Default select example">
                      <option value="checkIn">CheckIn</option>
                      <option value="reject">Reject</option>
                      {/* <option value="3">Three</option> */}
                    </Form.Select>
                        <button onClick={()=>navigate(`/AdminConfirm/${entry.logistic_id}`)}>next</button>

                        </td>
                       
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
