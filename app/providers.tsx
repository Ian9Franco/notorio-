'use client'

import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>
}

// Comentarios en español:
// Este archivo crea un componente Providers que envuelve la aplicación con ChakraProvider.
// Esto permite que los componentes de Chakra UI funcionen correctamente en toda la aplicación.