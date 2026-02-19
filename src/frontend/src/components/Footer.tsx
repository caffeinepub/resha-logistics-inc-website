import { useNavigate } from '@tanstack/react-router';
import { Phone, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    navigate({ to: '/' }).then(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  };

  const handlePrivacyClick = () => {
    navigate({ to: '/privacy-policy' });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img 
              src="/assets/generated/resha-logo.dim_200x100.png" 
              alt="Resha Logistics" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional logistics solutions for businesses nationwide. Reliable, efficient, and dedicated to your success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Button 
                variant="link" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => scrollToSection('hero')}
              >
                Home
              </Button>
              <Button 
                variant="link" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => scrollToSection('about')}
              >
                About Us
              </Button>
              <Button 
                variant="link" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => scrollToSection('services')}
              >
                Services
              </Button>
              <Button 
                variant="link" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={() => scrollToSection('quote')}
              >
                Request a Quote
              </Button>
              <Button 
                variant="link" 
                className="justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                onClick={handlePrivacyClick}
              >
                Privacy Policy
              </Button>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a 
                    href="tel:201-838-0000" 
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    201.838.0000
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-foreground">
                    22 Van Veghten Dr<br />
                    Bridgewater, NJ 08807
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © 2025. Built with love using{' '}
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
