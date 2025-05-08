import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

/**
 * Body component now includes a TopBar (horizontal) below the Header.
 * Removed the old sidebar logic. The TopBar is always rendered.
 */
function Body({ children }) {
    return (
        <Box sx={{ display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden" }}>

            <Navbar/>
            {/* Main area: content + sidebar */}
            <Box sx={{ display: "flex", flexGrow: 1, width: "100%" }}>
                {/* Left column: TopBar + page content */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        pr: "56px", // Padding to avoid overlap with the fixed sidebar
                    }}>
                    {/* Horizontal TopBar under the navbar, constrained to left */}
                    <TopBar />

                    {/* Page content area with padding */}
                    <Box sx={{ flexGrow: 1, p: 2 }}>
                        {children}
                    </Box>
                </Box>

                {/* Fixed sidebar on the right */}
                <Sidebar />
            </Box>
        </Box>
    );
}

export default Body;
