import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import Scrollbar from '../scrollbar';
import { Typography } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';

interface Variation {
  weight?: number;
  hex: string;
  variant_type: string;
}

interface MaterialColor {
  color: string;
  variations: Variation[];
}

interface ColorSelectorProps {
  colors: MaterialColor[];
  onColorSelect: (color: string) => void;
  selectedColor: string;
}

function getPaletteColor(variant: string) {
  if (variant === 'dark' || variant === 'darker') {
    return '#ffffff';
  } else return '#140a53';
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, onColorSelect, selectedColor }) => (
  <Scrollbar>
    <div className="color-selector">
      {colors.map((color, index) => {
        const checked = selectedColor === color.color;
        return (
          <label
            key={index}
            className={checked ? 'label-checked' : ''}
            style={{ color: color.variations[4].hex }}
          >
            <input type="radio" name="material-color" onChange={() => onColorSelect(color.color)} />
          </label>
        );
      })}
    </div>
  </Scrollbar>
);

interface ColorPaletteProps {
  variations: Variation[];
  onCopy: (hex: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ variations, onCopy }) => {
  const isMobile = useResponsive('down', 'md');
  return (
    <ol className="color-palette">
      {variations.map((variation, index) => (
        <li
          key={index}
          className="color-palette__item"
          style={{
            backgroundColor: variation.hex,
            border: variation.hex === '#ffffff' ? '1px solid #d3d3d3' : '',
          }}
          onClick={() => onCopy(variation.hex)}
        >
          {!isMobile && (
            <span
              style={{
                color: getPaletteColor(variation.variant_type),
              }}
            >
              {variation.variant_type}
            </span>
          )}
          {/* <span className="copied-indicator">Color copied!</span> */}
          {/* <span>{variation.hex}</span> */}
        </li>
      ))}
    </ol>
  );
};

interface MyColorPickerProps {
  materialColors: MaterialColor[];
}

const MyColorPicker: React.FC<MyColorPickerProps> = ({ materialColors }) => {
  const [selectedColor, setSelectedColor] = useState(materialColors[0].color);
  const { enqueueSnackbar } = useSnackbar();
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    enqueueSnackbar(`copied ${hex}`);
  };
  const filteredColors = materialColors.filter((color) => color.color === selectedColor);

  return (
    <>
      <div className="material-color-picker">
        <div className="material-color-picker__left-panel">
          <ColorSelector
            colors={materialColors}
            onColorSelect={handleColorSelect}
            selectedColor={selectedColor}
          />
        </div>
        <div className="material-color-picker__right-panel">
          {filteredColors.map((color, index) => (
            <div
              key={index}
              className={`color-palette-wrapper ${
                selectedColor === color.color ? 'js-active' : ''
              }`}
            >
              <Typography
                variant="body1"
                textTransform="uppercase"
                fontWeight="700"
                color={color.color}
                mb={2}
              >
                {color.color}
              </Typography>
              <ColorPalette variations={color.variations} onCopy={handleCopy} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyColorPicker;
