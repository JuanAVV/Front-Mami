import { useState } from 'react'
import Invitacion from './components/invitacion.jsx'
import Ceremonia from './components/ceremonia.jsx'
import LinkInvalido from './components/LinkInvalido.jsx'
import './App.css'

import { Routes, Route, Navigate} from 'react-router-dom'
function App() {
  return (
    <>
      <Routes >
      {/* Ruta principal con ID */}
      <Route path='/invitacion' element={<Invitacion />} />
      <Route path='/ceremonia' element={<Ceremonia />} />

      {/* Ruta para link inválido */}
      <Route path='/linkInvalido' element={<LinkInvalido />} />

      {/* Redirección */}
      <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default App
