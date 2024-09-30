'use client'

import React, { useState, useEffect } from 'react'
import { Box, Flex, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { auth, db } from '../db/firebase'
import { ref, onValue } from 'firebase/database'
import Sidebar from './Sidebar'
import MyDay from './MyDay'
import Important from './Important'
import Planned from './Planned'
import Tasks from './Tasks'
import Notes from './Notes'

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  category: 'myDay' | 'important' | 'planned' | 'tasks';
  dueDate?: string;
}

interface Note {
  id: string;
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
          setTasks(Object.entries(data).map(([id, task]) => ({ id, ...(task as Omit<Task, 'id'>) })))
        }
      })

      onValue(notesRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setNotes(Object.entries(data).map(([id, note]) => ({ id, ...(note as Omit<Note, 'id'>) })))
        }
      })
    }
  }, [])

  const renderSection = () => {
    switch (currentSection) {
      case 'myDay':
        return <MyDay tasks={tasks.filter(task => task.category === 'myDay')} />
      case 'important':
        return <Important tasks={tasks.filter(task => task.category === 'important')} />
      case 'planned':
        return <Planned tasks={tasks.filter(task => task.category === 'planned')} />
      case 'tasks':
        return <Tasks tasks={tasks} />
      case 'notes':
        return <Notes notes={notes} />
      default:
        return <MyDay tasks={tasks.filter(task => task.category === 'myDay')} />
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
      </Box>
    </Flex>
  )
}

// Comentarios en español:
// Este componente es el panel principal de la aplicación.
// Maneja la navegación entre las diferentes secciones: "Mi día", "Importante", "Planeado", "Tareas" y "Notas".
// Obtiene las tareas y notas del usuario desde Firebase y las distribuye a los componentes correspondientes.
// La interfaz se ajusta según si la barra lateral está abierta o cerrada.