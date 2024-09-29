'use client'

import { VStack, Text, Box } from '@chakra-ui/react'

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

interface NotesListProps {
  notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
  return (
    <VStack align="stretch" spacing={4}>
      <Text fontSize="xl" fontWeight="bold">Mis Notas</Text>
      {notes.length === 0 ? (
        <Text>No tienes notas guardadas.</Text>
      ) : (
        notes.map((note) => (
          <Box key={note.id} p={4} borderWidth={1} borderRadius="md">
            <Text>{note.content}</Text>
            <Text fontSize="sm" color="gray.500">{new Date(note.createdAt).toLocaleString()}</Text>
          </Box>
        ))
      )}
    </VStack>
  )
}

// Comentarios en español:
// Este componente obtiene y muestra las notas del usuario desde Firebase Storage.
// Utilizamos useEffect para cargar las notas cuando el componente se monta.
// La función fetchNotes obtiene todas las notas del usuario actual desde Firebase Storage.
// Mostramos un spinner mientras se cargan las notas y un mensaje si no hay notas.
// Cada nota se muestra en un Box con su contenido.