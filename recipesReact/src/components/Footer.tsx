import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#333',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', 
    padding: '10px 20px',
    zIndex: 2000,
}));

const StyledLink = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    color: 'inherit', 
}));

const FooterText = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    textAlign: 'center', 
}));

const Footer = () => {
    return (
        <FooterContainer>
            <StyledLink href="https://github.com/Zipora5572" target="_blank">
                <GitHubIcon fontSize="small" />
            </StyledLink>
            <FooterText variant="body2">
                © 2025 Recipes App. All rights reserved.
            </FooterText>
        </FooterContainer>
    );
};

export default Footer;
