import { useAdminCheck_LogisticInfo_3 } from "../hook/logisticAPI";
import "../css/Admin.module.css"

export default function Admin() {
  const AdminLogisticData = useAdminCheck_LogisticInfo_3();
  console.log("march answer_3:", AdminLogisticData);

  return (
    <>
    <div>
      <h3>Admin page</h3>
    </div>
      {AdminLogisticData &&
        Array.isArray(AdminLogisticData) &&
        AdminLogisticData.map(
          (entry: {
            uuid: string;
            room: string;
            building: string;
            street: string;
            district: string;
            contact_number: number;
            contact_name: string;
            confirmed_date: string;
            confirmed_session: string;
          }) => (
            <div className="adminLogistics">
                
            <div>uuid:{entry.uuid}</div>
            <div>Room:{entry.room}</div>
            <div></div> <li>{entry.building}</li>
              <li>{entry.street}</li>
              <li>{entry.district}</li>
              <li>{entry.contact_number}</li>
              <li>{entry.contact_name}</li>
              <li>{entry.confirmed_date}</li>
              <li>{entry.confirmed_session}</li>
            </div>
          )
        )}
    </>
  );
}
