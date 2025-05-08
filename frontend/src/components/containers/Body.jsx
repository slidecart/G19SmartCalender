import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import TopBar from "./TopBar";

/**
 * Body component now includes a TopBar (horizontal) below the Header.
 * Removed the old sidebar logic. The TopBar is always rendered.
 */
function Body({ children }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Header />

            {/* Horizontal TopBar under the navbar */}
            <TopBar />

            {/* Main content area */}
            <Box sx={{ flexGrow: 1, p: 2 }}>
                {children}
            </Box>

            <Footer />
        </Box>
    );
}

export default Body;
