import React from 'react';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import imgOne from "../image/img1.jpeg"
import imgTwo from "../image/img2.jpg"
import imgThree from "../image/img3.jpg"



export default function BodyContent() {
    return (
        <div className='homePageController'>
            <MDBRow className='homePageCardContainer'>
                <MDBCol className='homePageCardControl'>
                    {/* <h1 className='d-flex justify-content-center'>歡迎來到我們的捐贈行動輔助物品網站</h1> */}
                    <MDBCard className='homePageCard'>
                        <MDBCardImage className='homePageImg '
                            src={imgOne}
                            alt='...' />
                        <MDBCardBody>
                            <MDBCardTitle><h3><b>共同改變生活</b></h3></MDBCardTitle>{"\u00A0\u00A0"}
                            <MDBCardText>
                                <h5>我們關注老人社區，他們為社會作出巨大貢獻。我們的使命是改善他們的生活，提供行動輔助物品，讓他們恢復自由行動能力。透過我們的平台，您可以輕鬆地捐贈不再需要的輔助器材，例如 <b>行動輪椅、拐杖、助聽器</b> 等，這些器材將會送到有需要的長者手中。您的捐贈和參與將為老人社區帶來積極變化，營造更關懷和支持的環境。加入我們，共同努力，為改善老人社區的生活做出巨大的影響！</h5>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard >
                </MDBCol >
                <MDBCol className=' homePageCardControl '>
                    <MDBCard className='homePageCard2 ' >

                        <MDBCardBody>
                            <MDBCardTitle id="homePageCard2Title" ><h3><b>長者服務</b></h3></MDBCardTitle>{"\u00A0\u00A0"}
                            <MDBCardText >
                                <h5>同時我們亦了解長者的需求，並致力於幫助他們找到合適的社工照顧。我們了解長者可能在日常生活中需要特別的支持和關懷，因此我們提供專業的社工服務，以確保他們的需求得到滿足。透過我們的計劃，我們與社工機構和個人合作，為長者提供優質的照顧服務，包括日常生活援助、情緒支持和社交活動等。
                                    同時，我們也致力於捐贈輔助器材給有需要的長者。我們明白輔助器材對於長者的日常生活至關重要，可以幫助他們恢復自主性和行動能力。</h5>
                            </MDBCardText>
                        </MDBCardBody>
                        <MDBCardImage className='homePageImg'
                            src={imgThree}
                            alt='...' />
                    </MDBCard>
                </MDBCol>
                <MDBCol className='homePageCardControl'>
                    <MDBCard className='homePageCard'>
                        <MDBCardImage className='homePageImg'
                            src={imgTwo}
                            alt='...' />
                        <MDBCardBody>
                            <MDBCardTitle><h3><b>您的參與</b></h3></MDBCardTitle>{"\u00A0\u00A0"}
                            <MDBCardText>
                                <h5>我們誠摯地邀請您參與我們的使命，共同改善老人社區的生活。您可以通過我們的平台輕鬆捐贈不再需要的輔助器材，這些器材將直接送到有需要的長者手中。此外，您也可以參與我們的志願者計劃，為長者提供陪伴、社交和日常生活援助。您的參與將為老人社區帶來積極的改變，為他們提供更多的關懷和支持。</h5>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

            </MDBRow >
        </div>
    );
}