import React, { useContext, useState } from "react";
import { 
    Container,
    IconsContainer,
    IconsPages,
} from "./headerStyle";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push('/login/login');
    };

    return (
        <div>
            <Container>
                <IconsContainer>
                    <IconsPages onClick={() => router.push('/home/upload')}>Home</IconsPages>
                    <IconsPages onClick={() => router.push('/list/documents')}>List</IconsPages>
                    <IconsPages onClick={() => router.push('/download/download')}>Download</IconsPages>
                    <IconsPages onClick={handleLogout}>Logout</IconsPages>
                </IconsContainer>
            </Container>
        </div>
    );
};

export default Header;