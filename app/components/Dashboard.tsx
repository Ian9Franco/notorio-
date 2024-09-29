'use client'

import React, { useState, useEffect } from 'react'
import { Box, Flex, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { auth, db } from '../db/firebase'
import { ref, onValue } from 'firebase/database'
import Sidebar from './Sidebar'
import MyDay from './MyDay'
import Tasks from './Tasks'
import NotesList from './NotesList'
import ListManager from './ListManager'
import UserProfile from './UserProfile'

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface Note {
  id: string;
  content: string;
  createdAt: string;
}

interface FirebaseTask {
  text: string;
  completed: boolean;
}

interface FirebaseNote {
  content: string;
  createdAt: string;
}

export default function Dashboard() {
  const [currentSection, setCurrentSection] = useState('myDay')
  const [tasks, setTasks] = useState<Task[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  const bg = useColorModeValue('gray.50', 'gray.900')
  const color = useColorModeValue('gray.800', 'white')

  useEffect(() => {
    const user = auth.currentUser
    if (user) {
      const tasksRef = ref(db, `users/${user.uid}/tasks`)
      const notesRef = ref(db, `users/${user.uid}/notes`)

      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setTasks(Object.entries(data).map(([id, task]) => ({ id, ...(task as FirebaseTask) })))
        }
      })

      onValue(notesRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setNotes(Object.entries(data).map(([id, note]) => ({ id, ...(note as FirebaseNote) })))
        }
      })
    }
  }, [])

  const renderSection = () => {
    switch (currentSection) {
      case 'myDay':
        return <MyDay tasks={tasks} />
      case 'tasks':
        return <Tasks tasks={tasks} />
      case 'notes':
        return <NotesList notes={notes} />
      default:
        return <MyDay tasks={tasks} />
    }
  }

  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar
        isOpen={isOpen}
        onToggle={onToggle}
        onSectionChange={setCurrentSection}
        currentSection={currentSection}
      />
      <Box
        flex={1}
        p={4}
        bg={bg}
        color={color}
        overflowY="auto"
        transition="margin-left 0.3s"
        ml={isOpen ? '250px' : '60px'}
      >
        {renderSection()}
        <UserProfile />
        <ListManager />
      </Box>
    </Flex>
  )
}

// Comentarios en español:
// Este es el componente principal del dashboard.
// Maneja el estado de la sección actual, las tareas y las notas.
// Utiliza Firebase Realtime Database para obtener las tareas y notas del usuario.
// Renderiza diferentes secciones basadas en la selección del usuario.
// La barra lateral es colapsable y el contenido principal se ajusta en consecuencia.