'use client'

import React from 'react'
import {
  VStack,
  Text,
  Icon,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
  Divider,
  Box,
} from '@chakra-ui/react'
import {
  FaSun,
  FaStar,
  FaCalendar,
  FaTasks,
  FaMoon,
  FaBars,
  FaBook,
} from 'react-icons/fa'
import UserProfile from './UserProfile'

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onSectionChange: (section: string) => void;
  currentSection: string;
}

export default function Sidebar({ isOpen, onToggle, onSectionChange, currentSection }: SidebarProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('gray.100', 'gray.800')
  const color = useColorModeValue('gray.800', 'white')

  const sidebarItems = [
    { icon: FaSun, text: 'Mi día', section: 'myDay' },
    { icon: FaStar, text: 'Importante', section: 'important' },
    { icon: FaCalendar, text: 'Planeado', section: 'planned' },
    { icon: FaTasks, text: 'Tareas', section: 'tasks' },
  ]

  return (
    <Box
      position="fixed"
      left={0}
      h="100vh"
      w={isOpen ? '250px' : '60px'}
      bg={bg}
      color={color}
      transition="width 0.3s"
      zIndex={1}
    >
      <VStack spacing={4} align="stretch" p={4}>
        <Flex justify="space-between" align="center" mb={4}>
          {isOpen && <UserProfile />}
          <Button onClick={onToggle} variant="ghost" size="sm">
            <Icon as={FaBars} />
          </Button>
        </Flex>
        {sidebarItems.map((item, index) => (
          <Flex
            key={index}
            align="center"
            cursor="pointer"
            onClick={() => onSectionChange(item.section)}
            bg={currentSection === item.section ? 'blue.500' : 'transparent'}
            color={currentSection === item.section ? 'white' : color}
            p={2}
            borderRadius="md"
          >
            <Icon as={item.icon} mr={2} />
            {isOpen && <Text>{item.text}</Text>}
          </Flex>
        ))}
        <Divider />
        <Flex
          align="center"
          cursor="pointer"
          onClick={() => onSectionChange('notes')}
          bg={currentSection === 'notes' ? 'blue.500' : 'transparent'}
          color={currentSection === 'notes' ? 'white' : color}
          p={2}
          borderRadius="md"
        >
          <Icon as={FaBook} mr={2} />
          {isOpen && <Text>Notas</Text>}
        </Flex>
        <Flex align="center" mt="auto" onClick={toggleColorMode} cursor="pointer">
          <Icon as={colorMode === 'light' ? FaMoon : FaSun} mr={2} />
          {isOpen && <Text>{colorMode === 'light' ? 'Modo oscuro' : 'Modo claro'}</Text>}
        </Flex>
      </VStack>
    </Box>
  )
}

// Comentarios en español:
// Este componente representa la barra lateral de la aplicación.
// Incluye secciones para "Mi día", "Importante", "Planeado", "Tareas" y "Notas".
// También incluye un botón para alternar entre modo claro y oscuro.
// La barra lateral se puede colapsar para mostrar solo iconos.