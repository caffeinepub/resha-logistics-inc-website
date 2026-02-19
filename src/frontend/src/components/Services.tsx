import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, Snowflake, Users } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Truck,
      title: 'OTR Trucking',
      description: 'Over-the-road transportation services connecting businesses across the country with reliable, long-haul freight solutions.',
      image: '/assets/generated/otr-service.dim_400x300.jpg',
    },
    {
      icon: Package,
      title: 'Local Delivery',
      description: 'Fast and efficient local delivery services for businesses in the tri-state area, ensuring your goods arrive on time.',
      image: '/assets/generated/local-delivery.dim_400x300.jpg',
    },
    {
      icon: Snowflake,
      title: 'Refrigerated Transport',
      description: 'Temperature-controlled reefer transport for perishable goods, maintaining optimal conditions throughout the journey.',
      image: '/assets/generated/reefer-transport.dim_400x300.jpg',
    },
    {
      icon: Users,
      title: 'Team Driving',
      description: 'Expedited shipping with professional team drivers, ensuring faster delivery times for time-sensitive freight.',
      image: '/assets/generated/team-driving-natural.dim_400x300.jpg',
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive logistics solutions tailored to meet your transportation needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card key={service.title} className="overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
