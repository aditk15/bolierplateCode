import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import DashboardPage from './features/dashboard/DashBoardPage';
import TestPage from './features/test/TestPage';
import ProtectedRoute from './components/ProtectedRoute';
import NavigationBar from './components/NavigationBar';

// Simple 404 component
// check if the user is authenticated
const NotFound = () => (
	<div style={{ padding: 32 }}>
		<h2>404 - Not Found</h2>
		<p>The page you requested does not exist.</p>
	</div>
);

const App = () => {
	return (
		<>
			<NavigationBar />
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/test"
					element={
						<ProtectedRoute>
							<TestPage />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<NotFound />} />
				{/* Redirect legacy /dashboard path if used */}
				<Route path="/dashboard" element={<Navigate to="/" replace />} />
			</Routes>
		</>
	);
};

export default App;
