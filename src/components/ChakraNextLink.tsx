import NextLink from 'next/link';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export type ChakraNextLinkProps = ChakraLinkProps & {
  href: string;
  isExternal?: boolean;
  // Adicionamos passHref como opcional para compatibilidade, mas não o usamos
  passHref?: boolean;
};

export const ChakraNextLink = forwardRef<HTMLAnchorElement, ChakraNextLinkProps>(
  ({ href, isExternal = false, children, passHref, ...props }, ref) => {
    if (isExternal) {
      return (
        <ChakraLink href={href} isExternal ref={ref} {...props}>
          {children}
        </ChakraLink>
      );
    }

    return (
      <NextLink href={href} passHref legacyBehavior>
        <ChakraLink ref={ref} {...props}>
          {children}
        </ChakraLink>
      </NextLink>
    );
  }
);

ChakraNextLink.displayName = 'ChakraNextLink';
