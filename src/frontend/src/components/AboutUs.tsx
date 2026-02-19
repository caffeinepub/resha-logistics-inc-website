import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Award, Clock, Users } from 'lucide-react';

export default function AboutUs() {
  const features = [
    {
      icon: MapPin,
      title: 'Nationwide Coverage',
      description: 'Coast-to-coast logistics solutions',
    },
    {
      icon: Award,
      title: 'Professional Service',
      description: 'Experienced and reliable team',
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'Commitment to punctuality',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Dedicated to your success',
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Resha Logistics
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Based in Bridgewater, New Jersey, Resha Logistics, Inc. is your trusted partner for efficient and reliable transportation solutions. We specialize in over-the-road trucking, local delivery services, and refrigerated transport, serving businesses across the nation with dedication and professionalism.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-2xl mx-auto bg-card border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Our Location</h3>
                <p className="text-muted-foreground">
                  22 Van Veghten Dr<br />
                  Bridgewater, NJ 08807
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
