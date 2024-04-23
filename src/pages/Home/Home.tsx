import { Box } from "@mui/material";
import React from 'react';
import Header from "@/components/Header/Header";
import UserTable from "@/components/UserTable/UserTable";

const Home: React.FC = () => {  
    return (
      <Box>
        <Header/>
        <UserTable/>
      </Box>
    );
}
  
export default Home;