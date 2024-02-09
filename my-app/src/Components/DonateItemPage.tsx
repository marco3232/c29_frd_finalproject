import styles from "../css/DonateItemPage.module.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


export default function DonateItemPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.title}>
        <span className={styles.header}>器材募集 </span>
        <h3>現接受捐贈以下物品</h3>
        <div className={styles.cards}>
          <Card sx={{ width: 300 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image="assets/donate_items_img/輪椅.webp"
              style={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                輪椅
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
            </CardContent>
            <CardActions></CardActions>
          </Card>

          <Card sx={{ width: 300 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image="assets/donate_items_img/電動輪椅.webp"
              style={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                電動輪椅
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
            </CardContent>
            <CardActions></CardActions>
          </Card>

          <Card sx={{ width: 300 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image="assets/donate_items_img/四腳叉.webp"
              style={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                四腳叉
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
            </CardContent>
            <CardActions></CardActions>
          </Card>

          <Card sx={{ width: 300 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image="assets/donate_items_img/穿手拐杖.webp"
              style={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                穿手拐杖
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
            </CardContent>
            <CardActions></CardActions>
          </Card>

          <Card sx={{ width: 300 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image="assets/donate_items_img/步行架.webp"
              style={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                步行架
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
            </CardContent>
            <CardActions></CardActions>
          </Card>

          <Card sx={{ width: 300 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image="assets/donate_items_img/沐浴椅.webp"
              style={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                沐浴椅
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
            </CardContent>
            <CardActions></CardActions>
          </Card>

          <Card sx={{ width: 300 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image="assets/donate_items_img/便椅.webp"
              style={{ objectFit: 'contain' }}

            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                便椅
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
            </CardContent>
            <CardActions></CardActions>
          </Card>

          <Card sx={{ width: 300 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image="assets/donate_items_img/高背椅.webp"
              style={{ objectFit: 'contain' }}

            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                高背椅
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
            </CardContent>
            <CardActions></CardActions>
          </Card>


        </div>
        <button onClick={() => navigate('/Upload')}>按此捐贈</button>
      </div>
    </>
  );
}
