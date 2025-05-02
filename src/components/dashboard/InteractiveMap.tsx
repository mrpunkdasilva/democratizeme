import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

export function InteractiveMap() {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Aqui você pode adicionar interatividade ao SVG
    // Por exemplo, adicionar event listeners aos elementos do mapa
    if (svgContainerRef.current) {
      const regions = svgContainerRef.current.querySelectorAll('circle');
      
      regions.forEach(region => {
        region.addEventListener('mouseenter', () => {
          // Destacar região ao passar o mouse
          region.setAttribute('opacity', '0.8');
        });
        
        region.addEventListener('mouseleave', () => {
          // Restaurar opacidade original
          region.setAttribute('opacity', '0.4');
        });
      });
    }
  }, []);
  
  return (
    <Box ref={svgContainerRef} className="svg-container">
      {/* O SVG será carregado aqui via fetch ou importação */}
      <object
        type="image/svg+xml"
        data="/images/politicians-map.svg"
        width="100%"
        height="600px"
        aria-label="Mapa interativo de distribuição de políticos"
      />
    </Box>
  );
}