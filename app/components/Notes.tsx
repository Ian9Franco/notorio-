'use client'

import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

interface NotesProps {
  notes: Note[];
}

export default function Notes({ notes }: NotesProps) {
  const bg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box>
      <Heading mb={4}>Notas</Heading>
      <VStack align="stretch" spacing={4}>
        {notes.map((note) => (
          <Box key={note.id} p={4} bg={bg} borderRadius="md" borderWidth={1} borderColor={borderColor}>
            <Text>{note.content}</Text>
            <Text fontSize="xs" color="gray.500" mt={2}>
              Creada el: {new Date(note.createdAt).toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

// Comentarios en español:
// Este componente representa la sección "Notas".
// Muestra una lista de todas las notas del usuario.
// Cada nota se muestra en un cuadro con su contenido y fecha de creación.