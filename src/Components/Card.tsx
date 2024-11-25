import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "./Button";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  id: string;
  handleClick: () => void;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  price,
  id,
  handleClick,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt={title} src={imageUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {description}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ID: {id}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                children="See more"
                color="primary"
                onClick={handleClick}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{price}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
