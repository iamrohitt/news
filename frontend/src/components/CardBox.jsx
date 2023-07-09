import React, { useState, useEffect } from "react";
import axios from "axios";
import { TfiTwitter } from "react-icons/tfi";
import moment from "moment";
import { Box, styled } from "@mui/system";
import { BsClock } from "react-icons/bs";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "../css/CardBox.css";

const StyledCard = styled(Card)({
  marginBottom: 10,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(5px)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  borderRadius: "10px",
  width: "375px",
});

const CustomCardContent = styled(CardContent)({
  height: "200px",
  overflow: "hidden",
});

const CustomCardContent2 = styled(CardContent)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "35px",
  overflow: "hidden",
});

const CardBox = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReadMore, setShowReadMore] = useState(true);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(30);
  const token = localStorage.getItem("token");

  const fetchNews = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:4000/api/news/related?start=${start}&end=${end}`,
        config
      );

      if (response.data.length > 0) {
        setNews((prevNews) => [...prevNews, ...response.data]);
        setStart((prevStart) => prevStart + 50);
        setEnd((prevEnd) => prevEnd + 50);
      } else {
        setShowReadMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bgbg">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        overflow="auto"
        paddingTop="100px"
        style={{
          background: "linear-gradient(to bottom right, #74ebd5, #9face6)",
        }}
      >
        <div className="card-container">
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : news.length > 0 ? (
            news.map((item) => (
              <div className="card-item" key={item.id}>
                <StyledCard>
                  <CardHeader
                    title={<TfiTwitter size="30px" color="black" />}
                    action={
                      <Box display="flex" alignItems="center">
                        <BsClock
                          size={15}
                          color="textSecondary"
                          style={{ marginRight: "6px", marginTop: "7px" }}
                        />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginTop: "12px" }}
                        >
                          {moment(item.timestamp).startOf("hour").fromNow()}
                        </Typography>
                      </Box>
                    }
                  />
                  <CustomCardContent>
                    <Typography align="justify">{item.text}</Typography>
                  </CustomCardContent>
                  <CustomCardContent2>
                    {item.class && <Typography>{item.class}</Typography>}
                  </CustomCardContent2>
                  <CardActions disableSpacing>
                    <Button
                      variant="contained"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        backgroundColor: "#FF4081",
                        color: "white",
                        "&:hover": {
                          background:
                            "linear-gradient(to bottom right, #74ebd5, #9face6)",
                        },
                      }}
                    >
                      READ MORE
                    </Button>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </StyledCard>
              </div>
            ))
          ) : (
            <Typography>No news available</Typography>
          )}
        </div>
      </Box>
      {showReadMore && (
        <div className="more-news-container">
          <Button
            variant="contained"
            onClick={fetchNews}
            disabled={loading}
            sx={{
              backgroundColor: "#FF4081",
              color: "white",
              "&:hover": {
                background:
                  "linear-gradient(to bottom right, #74ebd5, #9face6)",
              },
            }}
          >
            {loading ? "Loading..." : "More News"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardBox;
