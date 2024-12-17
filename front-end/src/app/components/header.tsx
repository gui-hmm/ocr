import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { 
    Container,
    IconsContainer,
    IconsPages,
} from "../style/headerStyle";

const Header = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push('/login');
    };

    return (
        <div>
            <Container>
                <IconsContainer>
                    <IconsPages onClick={() => router.push('/upload')}>Home</IconsPages>
                    <IconsPages onClick={() => router.push('/documents')}>List</IconsPages>
                    <IconsPages onClick={() => router.push('/download')}>Download</IconsPages>
                    <IconsPages onClick={handleLogout}>Logout</IconsPages>
                </IconsContainer>
            </Container>
        </div>
    );
};

export default Header;