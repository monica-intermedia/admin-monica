import Link from "next/link";
import { styled, Box } from "@mui/material";
import Image from "next/image";
import { FcFeedIn } from "react-icons/fc";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <FcFeedIn size={50} />
      </Box>
    </LinkStyled>
  );
};

export default Logo;
