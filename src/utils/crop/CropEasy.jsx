import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slider,
  Typography,
} from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import Cropper from 'react-easy-crop';
import { appContext } from 'src/context/appContext';
import getCroppedImg from './cropImage';
import Iconify from 'src/components/iconify';
import { urltoFile } from '../fileUtil';

const StyledPlaceholder = styled('div')(({ theme }) => ({
  display: 'flex',
  borderRadius: '50%',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  width: `calc(100% - 16px)`,
  height: `calc(100% - 16px)`,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: theme.palette.text.disabled,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
}));

const CropEasy = ({
  photoURL,
  setPhotoURL,
  file,
  setFile,
  aspectRatio = 16 / 9,
  openCrop,
  setOpenCrop,
  id = '',
  label,
  helperText,
}) => {
  const theme = useTheme();
  const [zoom, setZoom] = useState(0);
  const [rotation, setRotation] = useState(0);
  const { setLoading } = useContext(appContext);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    setLoading(true);
    try {
      // ADDED BECAUSE BLOB FILE IS NOT NEEDED FOR NOW
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { file, url, dataObject } = await getCroppedImg(photoURL, croppedAreaPixels, rotation);
      setPhotoURL(url);
      if (dataObject) {
        urltoFile(dataObject, 'image.jpeg', 'image/jpeg')
          .then((f) => {
            setFile(f);
          })
          .catch(() => {});
      }
      setOpenCrop(false);
    } catch (error) {
      // setAlert({
      //   isAlert: true,
      //   severity: 'error',
      //   message: error.message,
      //   timeout: 5000,
      //   location: 'modal',
      // });
      console.log(error);
    }

    setLoading(false);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      console.log('file if=>', file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  return (
    <>
      <>
        <Box
          sx={{
            ...boxStyle,
            border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
          }}
        >
          <label htmlFor={`profilePhoto${id}`}>
            <input
              accept="image/*"
              id={`profilePhoto${id}`}
              type="file"
              style={{ display: 'none' }}
              onChange={handleLogoChange}
            />
            {/* SHOW UPLOADED IMAGE IN THE AVATAR */}
            {file && (
              <Avatar
                src={typeof photoURL === 'string' ? photoURL : ''}
                sx={{ width: 75, height: 75, cursor: 'pointer' }}
              />
            )}
            {/* SHOW PLACEHOLDER WHEN FILE IS NOT UPLOADED */}
            {!file && (
              <StyledPlaceholder
                className="placeholder"
                sx={{
                  '&:hover': {
                    opacity: 0.72,
                  },
                }}
              >
                <Iconify icon="ic:round-add-a-photo" width={24} sx={{ mb: 1 }} />

                <Typography variant="caption">{file ? label : label}</Typography>
              </StyledPlaceholder>
            )}
          </label>

          {/* SHOW CROP ICON IF FILE IS UPLOADED */}
          {file && (
            <IconButton
              aria-label="Crop"
              color="primary"
              style={{
                position: 'absolute',
                top: '2px',
                right: '20px',
              }}
              onClick={() => setOpenCrop(true)}
            >
              <Iconify icon="solar:crop-minimalistic-bold" />
            </IconButton>
          )}
        </Box>
        {helperText}
      </>
      <Dialog fullWidth maxWidth="sm" open={openCrop} onClose={setOpenCrop}>
        <DialogContent
          dividers
          sx={{
            background: '#333',
            position: 'relative',
            height: 400,
            width: 'auto',
            minWidth: { sm: 500 },
          }}
        >
          <Cropper
            image={photoURL}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspectRatio}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
            onMediaLoaded={(mediaSize) => {
              // Adapt zoom based on media size to fit max height
              setZoom(400 / mediaSize.naturalHeight);
            }}
          />
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
          <Box sx={{ width: '100%', mb: 1 }}>
            <Box>
              <Typography>Zoom: {zoomPercent(zoom)}</Typography>
              <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={zoomPercent}
                min={0}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </Box>
            <Box>
              <Typography>Rotation: {rotation + '°'}</Typography>
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={360}
                value={rotation}
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Iconify icon="material-symbols:cancel" />}
              onClick={() => {
                // setFile(null);
                // setPhotoURL('');
                // document.getElementById(`profilePhoto${id}`).value = null;
                setOpenCrop(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:crop-minimalistic-bold" />}
              onClick={cropImage}
            >
              Crop
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CropEasy;

// eslint-disable-next-line arrow-body-style
const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
const boxStyle = {
  width: 144,
  height: 144,
  margin: 'auto',
  display: 'flex',
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: '50%',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
};
