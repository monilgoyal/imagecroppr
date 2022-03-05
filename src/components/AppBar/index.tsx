import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1, mt: 3 }}>
            <AppBar position="static" color="transparent" sx={{ boxShadow: 0 }}>
                <Toolbar sx={{ flexDirection: { sm: 'row', xs: 'column' } }}>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <b>
                            Image Cropper
                        </b>
                    </Typography>
                    <a href="https://github.com/monilgoyal/imagecropper.git"  >
                        <Button color="inherit"><GitHubIcon sx={{ mx: 1 }} />Source Code</Button>
                    </a>
                </Toolbar>
            </AppBar>
        </Box >
    );
}