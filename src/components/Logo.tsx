import React from 'react';
import { HStack, Text, useColorModeValue, Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Keyframes para o efeito de brilho
const glowPulse = keyframes`
  0% { filter: drop-shadow(0 0 2px rgba(0, 255, 255, 0.5)); }
  50% { filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.8)); }
  100% { filter: drop-shadow(0 0 2px rgba(0, 255, 255, 0.5)); }
`;

interface LogoProps {
  color?: string;
  h?: string;
}

export function Logo({ color, h = "40px" }: LogoProps) {
  const isDark = useColorModeValue(false, true);
  const logoColor = color || useColorModeValue('gray.800', 'white');
  
  // Animação para o efeito de brilho
  const glowAnimation = `${glowPulse} 2s infinite ease-in-out`;
  
  return (
    <HStack spacing={2} h={h} alignItems="center">
      <Image 
        src="/logo.svg" 
        alt="Democratize Logo" 
        height={h}
        width={h}
        animation={isDark ? glowAnimation : undefined}
      />
      <Text
        fontSize={h === "40px" ? "xl" : "lg"} 
        fontWeight="bold"
        fontFamily="mono"
        letterSpacing="wider"
        bgGradient={isDark ? "linear(to-r, #2196F3, #00FFFF)" : undefined}
        bgClip={isDark ? "text" : undefined}
        color={isDark ? "transparent" : logoColor}
        textTransform="uppercase"
      >
        democratize.me
      </Text>
    </HStack>
  );
}