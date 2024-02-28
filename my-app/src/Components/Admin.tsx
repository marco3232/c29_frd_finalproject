import React from "react";
import { useAdminCheck_LogisticInfo_3 } from "../hook/logisticAPI";
import { Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";


export default function Admin() {
  const navigate = useNavigate();
  const AdminLogisticData = useAdminCheck_LogisticInfo_3();
  const [showDetails, setShowDetails] = React.useState(false);
  const [showAddress, setShowAddress] = React.useState(false);
  const [selectedEntry, setSelectedEntry] = React.useState<any>(null);

  const handleShowDetails = (entry: any) => {
    setSelectedEntry(entry);
    setShowDetails(true);
    setShowAddress(false);
  };

  const handleShowAddress = (entry: any) => {
    setSelectedEntry(entry);
    setShowDetails(false);
    setShowAddress(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setShowAddress(false);
  };

  return (
    <div className="adminPageControl">
      <div className="adminPageContainer">
        <div className="adminTitle">
          <h3>所有捐贈記錄</h3>
        </div>
        <div>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>運單號</th>
                <th>目的</th>
                <th className="adminPageTableDonateItems">捐贈物品和數量</th>
                <th className="adminPageTableAddress">地址</th>
                <th>聯絡人姓名</th>
                <th>聯絡人電話</th>
                <th>確認交收日期</th>
                <th>確認交收時間</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {AdminLogisticData &&
                Array.isArray(AdminLogisticData) &&
                AdminLogisticData.map(
                  (
                    entry: {
                      id: number;
                      logistic_id: number;
                      details: string;
                      purpose: string;
                      uuid: string;
                      name: string;
                      address: string;
                      number: number;
                      contact_name: string;
                      confirmed_date: string;
                      confirmed_session: string;
                      rescheduled: boolean | string;
                      status: string;
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <td>{entry.uuid}</td>
                      <td>{entry.purpose}</td>
                      <td>
                        <a className="adminPagePopup"
                          onClick={() => handleShowDetails(entry)}
                        >
                          View Details
                        </a>
                      </td>
                      <td>
                        <a className="adminPagePopup"
                          onClick={() => handleShowAddress(entry)}
                        >
                          View Address
                        </a>
                      </td>
                      <td>{entry.name}</td>
                      <td>{entry.number}</td>
                      <td>{entry.confirmed_date}</td>
                      <td>{entry.confirmed_session}</td>
                      <td>
                        <MDBBtn
                          id="adminPageBtn"
                          onClick={() =>
                            navigate(`/AdminConfirm/${entry.logistic_id}`)
                          }
                        >
                          next
                        </MDBBtn>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showDetails || showAddress} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>
            {showDetails ? "Donate items & qty" : "Address"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEntry && (
            <div>
              {showDetails && (
                <p>{selectedEntry.details}</p>
              )}
              {showAddress && (<p> {selectedEntry.address}</p>)}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <MDBBtn onClick={handleCloseDetails}>
            Close
          </MDBBtn>
        </Modal.Footer>
      </Modal>
    </div >
  );
}