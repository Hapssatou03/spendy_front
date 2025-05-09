import { createContext, useContext, useEffect, useState } from 'react'

// Création du contexte d'authentification
const AuthContext = createContext()

// Hook personnalisé pour consommer le contexte facilement
export const useAuth = () => useContext(AuthContext)

// Composant fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // Stocke les infos utilisateur
  const [token, setToken] = useState(localStorage.getItem("token")); // Stocke le token JWT
  const [loading, setLoading] = useState(null) // Contrôle l'état de chargement initial
  

  // Vérifie s'il y a déjà un token sauvegardé dans le localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
  
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setToken(savedToken)
        setUser(parsedUser)
      } catch (error) {
        console.error("Erreur de parsing JSON :", error)
        localStorage.removeItem('user') // On nettoie si le JSON est corrompu
      }
    }
  
    setLoading(false)
  }, [])
  

  // Fonction pour se connecter
  const login = (token, userData) => {
    setToken(token)
    setUser(userData)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Fonction pour se déconnecter
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {!loading && children} {/* On n'affiche rien tant que le token n'est pas vérifié */}
    </AuthContext.Provider>
  )
}






















// import { useEffect } from 'react'
// import axios from 'axios'
// import './App.css'

// function App() {
//   const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoYUBzcGVuZHkuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDY1Mjk0MjEsImV4cCI6MTc0NjYxNTgyMX0.nosPN6D6-XGufD_aR1vAsEodplDtVn5zg76z1lKrtF8';

//   useEffect(() => {
//     axios.get('http://localhost:6415/api/users', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       withCredentials: true // équivalent à credentials: 'include'
//     })
//       .then(response => {
//         console.log('Success:', response.data);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }, [])

//   return (
//     <>
//     </>
//   )
// }

// export default App
