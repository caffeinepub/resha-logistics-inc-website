import { useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Header() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (routerState.location.pathname !== '/') {
      navigate({ to: '/' }).then(() => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handlePrivacyClick = () => {
    navigate({ to: '/privacy-policy' });
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    navigate({ to: '/' });
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Home', action: () => scrollToSection('hero') },
    { label: 'About Us', action: () => scrollToSection('about') },
    { label: 'Services', action: () => scrollToSection('services') },
    { label: 'Request a Quote', action: () => scrollToSection('quote') },
    { label: 'Privacy Policy', action: handlePrivacyClick },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md">
            <img 
              src="/assets/generated/resha-logo.dim_200x100.png" 
              alt="Resha Logistics" 
              className="h-12 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={item.action}
                className="text-foreground hover:text-primary hover:bg-accent"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    onClick={item.action}
                    className="justify-start text-lg"
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
