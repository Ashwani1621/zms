"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      {/* <span className="text-sm text-gray-600"> */}
        {/* Welcome, {user.name} ({user.role}) */}
      {/* </span> */}
      <Button onClick={handleLogout} variant="outline" size="sm">
        Logout
      </Button>
    </div>
  );
}
