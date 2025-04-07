import { Box, Typography, List, ListItem } from "@mui/material";

function Footer() {
  const footerlinks = [
    { name: "About", link: "#" },
    { name: "FAQ", link: "#" },
    { name: "Contact", link: "#" }
  ];

  return (
    <Box
      sx={{ backgroundColor: "#0077ff7e", color: "black", py: 1, display: "flex", flexDirection: "column", minHeight: "10vh",textAlign: "left" }}
    >
      <List sx={{ display: "flex", gap: 3, padding: 0 }}>
        {footerlinks.map((item, index) => (
          <ListItem
            key={index}
            disableGutters
            sx={{ display: "flex", justifyContent: "center", transition: "none", "&:hover": {backgroundColor: "transparent"}
            }}
          >
            <Box
              component="a"
              href={item.link}
              sx={{display: "flex", textDecoration: "none", whiteSpace: "nowrap", textAlign: "center", backgroundColor: "transparent", color: "#444444",transition: "all 1", "&:hover": { backgroundColor: "transparent", color: "green", fontSize: "15px"}
              }}
            >
              {item.name}
            </Box>
          </ListItem>
        ))}
      </List>

      <Typography variant="body1" sx={{ mt: "auto", padding: 1 }}>
        Copyright © 2025 SmartCalendar. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;