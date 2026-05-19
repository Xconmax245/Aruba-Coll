import { useContext } from 'react';
import { LenisContext } from '@/components/layout/SmoothScrollProvider';

export function useLenis() {
  const lenis = useContext(LenisContext);
  return lenis;
}
