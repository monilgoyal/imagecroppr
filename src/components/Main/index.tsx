import React, { useState } from 'react'
import styles from '../../styles/Main.module.css'
import { Box, Button } from '@mui/material'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
let file: Blob;
let filename: string;
let fileExtention: string;
function Main() {
    const [isDragIn, setisDragIn] = useState(false)
    const [editArea, seteditArea] = useState(false)
    const [image, setimage] = useState<string | ArrayBuffer | null>(null)
    const handlecapture = (event: React.ChangeEvent) => {
        // @ts-ignore
        file = event.target.files[0]
        // @ts-ignore
        filename = event.target.files[0].name.split('.')[0]
        // @ts-ignore
        fileExtention = event.target.files[0].name.split('.')[1]
        handleUpload()


    }

    const handleUpload = () => {
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        // console.log(validExtensions.includes(fileType))
        if (validExtensions.includes(fileType)) { //if user selected file is an image file
            let fileReader = new FileReader(); //creating new FileReader object
            fileReader.onload = () => {
                let fileURL = fileReader.result;
                setimage(fileURL)
                seteditArea(true)
            }
            fileReader.readAsDataURL(file);

        }
        else {
            alert('Wrong image type use only jpg/jpeg/png files')
            setisDragIn(false)
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.stopPropagation();
        e.preventDefault()
        setisDragIn(true)
    }
    const handleDragLeave = (e: React.DragEvent) => {
        e.stopPropagation();
        e.preventDefault()
        setisDragIn(false)
    }
    const handleDrop = (e: React.DragEvent) => {
        e.stopPropagation();
        e.preventDefault()
        setisDragIn(true)
        file = e.dataTransfer.files[0]
        handleUpload()

    }
    const [crop, setcrop] = useState<Crop>({
        unit: 'px', // default, can be 'px' or '%'
        x: 0,
        y: 0,
        width: 200,
        height: 200
    })
    const [result, setResult] = useState<string | null>(null);

    const getCroppedImg = () => {
        try {
            const canvas = document.createElement("canvas");
            const droppedImg = document.getElementById('droppedImg') as unknown as HTMLImageElement;
            const scaleX = droppedImg.naturalWidth / droppedImg.width;
            const scaleY = droppedImg.naturalHeight / droppedImg.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            if (canvas.width === 0 && canvas.height === 0) {
                return
            }
            const ctx = canvas.getContext("2d");
            ctx!.drawImage(
                droppedImg,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL("image/" + fileExtention, 5);
            setResult(base64Image);
        } catch (e) {
            console.log("crop the image");
        }
    };

    return (
        <main className={styles.main} >
            <Box className={styles.editArea} display={!editArea ? 'none' : 'flex'} flexDirection={{ md: 'row', xs: 'column' }} alignContent="center" justifyContent={"center"} >
                <Box className={styles.container} width={{ md: '45vw', xs: '100vw' }} display="flex" justifyContent={'center'} alignContent={"center"} >
                    <Box className={styles.showImage} px="4vw " >
                        {editArea && (<ReactCrop crop={crop} onChange={c => setcrop(c)} onComplete={getCroppedImg}><img id='droppedImg' src={String(image)} alt="img" width={"100%"} height={"100%"} /></ReactCrop>)}
                    </Box>
                </Box>
                <Box className={styles.container} width={{ md: '45vw', xs: '100vw' }} display="flex" justifyContent={'center'} alignContent={"center"} mt={{ xs: 5, md: 0 }}>
                    <Box className={styles.showImage} px="4vw ">
                        {result && (<img src={String(result)} alt="img" style={{ objectFit: "contain" }} />)}
                    </Box>
                </Box>
            </Box>
            <Box className={styles.container} display={!editArea ? 'none' : 'flex'} mt={5}>
                <a download={filename + '_crop.' + fileExtention} href={String(result)}>
                    <Button component="span" className={styles.card}>
                        Download
                    </Button>
                </a>
            </Box>
            <Box className={styles.dragArea} display={editArea ? 'none' : 'flex'} border={isDragIn ? 'solid' : 'dashed'} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
                <h5 className={styles.description}>
                    {isDragIn ? 'Release to Upload' : 'Drop & Drop to Upload File'}
                </h5>
                <span style={{ color: 'rgb(143, 137, 137)' }}>OR</span>
                <span style={{ margin: '1rem 0 2rem 0' }}>

                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        name="imagetocrop"
                        disabled={editArea}
                        onChange={handlecapture}
                    />
                    <label htmlFor="raised-button-file">
                        <Button component="span" className={styles.card}>
                            Browse File
                        </Button>
                    </label>
                </span>
            </Box>

        </main >
    )
}

export default Main