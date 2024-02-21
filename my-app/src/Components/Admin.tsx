import { useAdminCheck_LogisticInfo_3 } from "../hook/logisticAPI";
import "../css/Admin.module.css"

export default function Admin() {
  const AdminLogisticData = useAdminCheck_LogisticInfo_3();
  console.log("march answer:", AdminLogisticData);

  return (
    <>
      <div>Admin page</div>
      {AdminLogisticData &&
        Array.isArray(AdminLogisticData) &&
        AdminLogisticData.map(
          (entry: {
            id: number;
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
              <li>{entry.id}</li>
              <li>{entry.uuid}</li>
              <li>{entry.room}</li>
              <li>{entry.building}</li>
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
