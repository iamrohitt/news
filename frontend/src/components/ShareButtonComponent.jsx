import React from "react";
import { IconButton } from "@mui/material";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FacebookShareButton, TwitterShareButton } from "react-share";

const ShareButton = ({ url, title }) => {
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <span>
      <IconButton
        aria-label="share"
        onClick={handleFacebookShare}
        style={{ marginRight: "10px" }}
      >
        <FacebookShareButton url={url}>
          <FaFacebook size={24} round />
        </FacebookShareButton>
      </IconButton>
      <IconButton aria-label="share" onClick={handleTwitterShare}>
        <TwitterShareButton url={url} title={title}>
          <FaTwitter size={24} round />
        </TwitterShareButton>
      </IconButton>
    </span>
  );
};

export default ShareButton;
