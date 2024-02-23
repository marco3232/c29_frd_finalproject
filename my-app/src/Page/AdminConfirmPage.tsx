// import { QueryClient, QueryClientProvider } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { addNewItems, confirmDonateItem } from "../hook/dataAPI";
import { useAdminCheckIn_Confirm_3 } from "../hook/adminAPI";
import { useQuery } from "react-query";
import { Table } from "react-bootstrap";

export function AdminConfirmPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  // console.log(id)

  // const [searchParams] = useSearchParams()

  //  const queryClient = useQueryClient()
  const items = useAdminCheckIn_Confirm_3(parseInt(id!));

  console.log(items);
  // console.log(AdminCheckInConfirm)
  // const OnEditItem = useMutation({
  //     mutationFn: async (data: {

  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     }) => useAdminCheckIn_Confirm_3(),
  //     onSuccess: () =>
  //       queryClient.invalidateQueries({
  //         queryKey: ["adminCheckInConfirm"],
  //         exact: true,
  //       }),
  //   })
  // console.log("march answer_3:", AdminCheckInConfirm);
  //     const { isLoading, error, data } = useQuery("repoData", () =>
  //     fetch("").then(
  //       (res) => res.json(),
  //     ),
  //   );
  //   if (isLoading) return "Loading...";
  //   if (error) return "An error has occurred: " + error;
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
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
            </tr>
          </thead>
          {items &&
            Array.isArray(items) &&
            items.map((entry: {}, index) => (
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
    </>
  );
}
