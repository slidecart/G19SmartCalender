// Body.jsx
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./AppSidebar"; // Adjust the import path as necessary

function Body({ children, withSidebar = false }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Header/>

            {withSidebar ? (
                // <-- new wrapper around main + sidebar
                <Box sx={{ display: "flex", flexGrow: 1 }}>
                    {/* 1) main content */}
                    <Box sx={{ flexGrow: 1, p: 2 }}>
                        {children}
                    </Box>

                    {/* 2) sidebar: sticky, fixed width when expanded, thin when collapsed */}
                    <Box
                        sx={{
                            flexShrink: 0,
                            position: "sticky",
                            top: "64px",        // match your header height
                            bottom: 0,
                            height: "calc(100vh - 64px)",
                            // width will be controlled inside Sidebar via its `collapsed` state
                        }}
                    >
                        <Sidebar />
                    </Box>
                </Box>
            ) : (
                // no sidebar
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    {children}
                </Box>
            )}

            <Footer/>
        </Box>
    );
}

export default Body;
