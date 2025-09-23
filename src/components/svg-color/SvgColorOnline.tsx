import { useEffect, useState } from 'react';

export function SvgColorOnline({ src, color }: any) {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        console.log('red');
        const response = await fetch(src);
        console.log('red', response);
        if (!response.ok) {
          throw new Error('Failed to fetch SVG');
        }
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Error fetching SVG:', error);
      }
    };

    fetchSvg();
  }, [src]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent && svgContent.replace(/currentColor/g, color) }}
    />
  );
}
