import { Link } from 'react-router-dom';
import { UserPlus, LogIn, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-foreground mb-4">
            Face Recognition Attendance
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern attendance tracking powered by AI face recognition technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-card/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Quick Signup</h3>
            <p className="text-muted-foreground">
              Register with your face in seconds
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Secure Login</h3>
            <p className="text-muted-foreground">
              Login using face recognition or password
            </p>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Easy Tracking</h3>
            <p className="text-muted-foreground">
              Mark attendance with a single face scan
            </p>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 text-lg px-8 py-6">
              <UserPlus className="w-5 h-5 mr-2" />
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
