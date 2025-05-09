import { Link, useLocation } from 'react-router-dom'

function AuthSwitcher() {
  const location = useLocation()

  const isLogin = location.pathname === '/login'

  return (
    <p className="text-sm mt-4 text-center">
      {isLogin ? (
        <>
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Créer un compte
          </Link>
        </>
      ) : (
        <>
          Déjà inscrit ?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Se connecter
          </Link>
        </>
      )}
    </p>
  )
}

export default AuthSwitcher
