import styles from "../css/DonateItemPage.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "../css/App.css"
import "../css/DonateItemPage.module.css"


export default function DonateItemPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.title}>
      <span className={styles.header}>器材募集 </span>
      <h4><b>現接受捐贈以下物品</b></h4>
      <div className={styles.cards}>
        <Card className="cardName" >
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image="assets/donate_items_img/輪椅.webp"
            style={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              輪椅
            </Typography>
          </CardContent>
        </Card>

        <Card className="cardName">
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image="assets/donate_items_img/電動輪椅.webp"
            style={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              電動輪椅
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>

        <Card className="cardName">
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image="assets/donate_items_img/四腳叉.webp"
            style={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              四腳叉
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>

        <Card className="cardName">
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image="assets/donate_items_img/穿手拐杖.webp"
            style={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              穿手拐杖
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>

        <Card className="cardName">
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image="assets/donate_items_img/步行架.webp"
            style={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              步行架
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>

        <Card className="cardName">
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image="assets/donate_items_img/沐浴椅.webp"
            style={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              沐浴椅
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>

        <Card className="cardName">
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image="assets/donate_items_img/便椅.webp"
            style={{ objectFit: 'contain' }}

          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              便椅
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>

        <Card className="cardName">
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image="assets/donate_items_img/高背椅.webp"
            style={{ objectFit: 'contain' }}

          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              高背椅
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>


        <span
          className={styles.uploadBtn}
          onClick={() => navigate('/Upload')}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
        >按此捐贈</span>
      </div>
    </div>
  );
}
