import { Navigate } from 'react-router-dom';
import { useAuth } from '../../models/context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { currentUser, userRole } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect to their default module dashboard if they don't have access
        if (userRole === 'admin') return <Navigate to="/admin" replace />;
        if (userRole === 'vendor') return <Navigate to="/vendor" replace />;
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
