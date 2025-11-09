import { useEffect, useState } from 'react';
import { LogOut, UserCircle2, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { attendanceAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface AttendanceRecord {
  id: string;
  user_name: string;
  timestamp: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const data = await attendanceAPI.getAll();
      setAttendanceRecords(data);
    } catch (error: any) {
      toast({
        title: 'Error Loading Attendance',
        description: error.response?.data?.detail || 'Failed to load attendance records',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    });
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Attendance System</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <UserCircle2 className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">{user?.name}</span>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Attendance</p>
                <p className="text-4xl font-bold mt-2">{attendanceRecords.length}</p>
              </div>
              <Clock className="w-12 h-12 text-primary-foreground/50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent-foreground/80 text-sm">Unique Users</p>
                <p className="text-4xl font-bold mt-2">
                  {new Set(attendanceRecords.map(r => r.user_name)).size}
                </p>
              </div>
              <Users className="w-12 h-12 text-accent-foreground/50" />
            </div>
          </Card>
        </div>

        <div className="flex justify-center mb-8">
          <Link to="/attendance">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 text-lg px-8 py-6">
              <Clock className="w-5 h-5 mr-2" />
              Mark Attendance Now
            </Button>
          </Link>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-2xl font-bold text-foreground">Attendance History</h2>
            <p className="text-muted-foreground text-sm">View all attendance records</p>
          </div>
          
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : attendanceRecords.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No attendance records found
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {attendanceRecords.map((record) => {
                    const date = new Date(record.timestamp);
                    return (
                      <tr key={record.id} className="hover:bg-muted/20">
                        <td className="px-6 py-4 text-sm text-foreground">{record.user_name}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {date.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {date.toLocaleTimeString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
