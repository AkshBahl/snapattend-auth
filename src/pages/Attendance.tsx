import { useState } from 'react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WebcamCapture } from '@/components/WebcamCapture';
import { attendanceAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Attendance = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const handleMarkAttendance = async (imageData: string) => {
    setIsLoading(true);
    
    try {
      const response = await attendanceAPI.mark(imageData);
      
      setAttendanceMarked(true);
      toast({
        title: 'Attendance Marked!',
        description: `Welcome! Your attendance has been recorded at ${new Date().toLocaleTimeString()}`,
      });
    } catch (error: any) {
      toast({
        title: 'Attendance Failed',
        description: error.response?.data?.detail || 'Face not recognized or already marked',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="max-w-2xl mx-auto py-8">
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Mark Attendance</h1>
            <p className="text-muted-foreground">Capture your face to mark your attendance</p>
          </div>
        </div>

        {attendanceMarked ? (
          <Card className="p-8 bg-card/80 backdrop-blur-sm text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Attendance Recorded!</h2>
            <p className="text-muted-foreground">
              Your attendance has been successfully marked for today.
            </p>
            <div className="pt-4">
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-primary to-primary/80">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <WebcamCapture
            onCapture={handleMarkAttendance}
            isCapturing={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Attendance;
