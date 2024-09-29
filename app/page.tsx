'use client'

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './db/firebase'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { Center, Spinner, Button, VStack } from '@chakra-ui/react'

export default function Home() {
  const [user, loading] = useAuthState(auth)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    if (user) {
      setShowLogin(false)
    }
  }, [user])

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  if (!user && !showLogin) {
    return (
      <Center h="100vh">
        <VStack spacing={4}>
          <Button colorScheme="blue" onClick={() => setShowLogin(true)}>
            Iniciar sesión
          </Button>
        </VStack>
      </Center>
    )
  }

  if (!user && showLogin) {
    return (
      <Center h="100vh">
        <Login />
      </Center>
    )
  }

  return <Dashboard />
}

// Comentarios en español:
// Este componente maneja la lógica principal de la aplicación.
// Utilizamos useAuthState para manejar el estado de autenticación del usuario.
// Mostramos un spinner mientras se carga el estado de autenticación.
// Si no hay usuario autenticado y no se está mostrando el formulario de login, mostramos un botón para iniciar sesión.
// Si se hace clic en el botón de inicio de sesión, mostramos el componente Login.
// Una vez que el usuario está autenticado, mostramos el componente Dashboard.