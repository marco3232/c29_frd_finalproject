import { useAdminCheck_LogisticInfo_3 } from "../hook/logisticAPI";

export default function Admin() {
  const LogisticData = useAdminCheck_LogisticInfo_3();
  console.log("march answer:", LogisticData);

  return (
    <>
      <div>Admin page</div>
    </>
  );
}
