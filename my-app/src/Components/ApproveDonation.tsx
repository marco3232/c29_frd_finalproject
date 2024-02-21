import axios from 'axios';
import React, { useState } from 'react';


interface Props {
    donationId: number;
}


const ApproveDonationPage: React.FC<Props> = ({ donationId }) => {
    const [approved, setApproved] = useState(false);

    const handleApprove = async () => {
        try {

            const response = await axios.put(`/approve-donation/${donationId}`, { approved: true });
            console.log(response.data.message);
            setApproved(true);
        } catch (error) {
            console.error('捐贈申請審批失敗', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await axios.put(`/approve-donation/${donationId}`, { approved: false });
            console.log(response.data.message);
            setApproved(false);
        } catch (error) {
            console.error('捐贈申請審批失敗', error);
        }
    };

    return (
        <div>
            <h2>審批捐贈申請</h2>
            {!approved && (
                <div>
                    <button onClick={handleApprove}>批准</button>
                    <button onClick={handleReject}>拒絕</button>
                </div>
            )}
            {approved && <p>捐贈申請已審批</p>}
        </div>
    );
};

export default ApproveDonationPage;
