'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../db/firebase'
import { Button, VStack, Input, useToast, Heading } from '@chakra-ui/react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({
        title: 'Inicio de sesión exitoso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error al iniciar sesión',
        description: 'Por favor, verifica tu email y contraseña',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack as="form" onSubmit={handleLogin} spacing={4} width="100%" maxWidth="300px">
      <Heading size="xl">Bienvenido a Notorio</Heading>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" isLoading={loading} colorScheme="blue" width="100%">
        Iniciar sesión
      </Button>
    </VStack>
  )
}

// Comentarios en español:
// Este componente maneja el inicio de sesión para usuarios.
// La función handleLogin procesa el inicio de sesión con Firebase Authentication.
// Mostramos mensajes de éxito o error utilizando el componente toast de Chakra UI.