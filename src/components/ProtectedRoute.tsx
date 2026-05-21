// src/components/ProtectedRoute.tsx
import React from "react";

type Props = { children: React.ReactNode };

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default ProtectedRoute;
