import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

// Comentarios en español:
// Hemos eliminado la importación directa de ChakraProvider, ya que ahora está en el componente Providers.
// El componente Providers envuelve a los children, proporcionando el contexto de Chakra UI a toda la aplicación.
// Este es el componente de diseño raíz que envuelve toda la aplicación.
// Utilizamos ChakraProvider para proporcionar estilos consistentes en toda la aplicación.
// El componente Providers se utiliza para envolver la aplicación con los proveedores necesarios, como el de autenticación.