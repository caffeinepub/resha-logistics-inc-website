import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubmitQuoteRequest } from '@/hooks/useQueries';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  pickupLocation: string;
  deliveryLocation: string;
  loadDetails: string;
  consentGiven: boolean;
}

export default function QuoteForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<QuoteFormData>();
  const submitQuoteMutation = useSubmitQuoteRequest();
  const [consentChecked, setConsentChecked] = useState(false);

  const onSubmit = async (data: QuoteFormData) => {
    if (!consentChecked) {
      toast.error('Consent Required', {
        description: 'Please grant permission to contact you before submitting.',
        icon: <AlertCircle className="h-5 w-5" />,
      });
      return;
    }

    try {
      await submitQuoteMutation.mutateAsync({
        ...data,
        consentGiven: consentChecked,
      });
      
      toast.success('Quote Request Submitted!', {
        description: 'Thank you! We will contact you shortly with a competitive quote.',
        icon: <CheckCircle2 className="h-5 w-5" />,
        duration: 5000,
      });
      
      reset();
      setConsentChecked(false);
    } catch (error: any) {
      const errorMessage = error?.message || 'An unexpected error occurred. Please try again.';
      
      toast.error('Submission Failed', {
        description: errorMessage,
        icon: <AlertCircle className="h-5 w-5" />,
        duration: 7000,
      });
    }
  };

  return (
    <section id="quote" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Request a Quote
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you with a competitive quote
            </p>
          </div>

          <Card className="border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Get Started Today</CardTitle>
              <CardDescription>
                Provide your shipment details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    placeholder="John Doe"
                    className={errors.name ? 'border-destructive' : ''}
                    disabled={submitQuoteMutation.isPending}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9\s\-\(\)]+$/,
                        message: 'Please enter a valid phone number'
                      }
                    })}
                    placeholder="(908) 274-3658"
                    className={errors.phone ? 'border-destructive' : ''}
                    disabled={submitQuoteMutation.isPending}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    placeholder="john@example.com"
                    className={errors.email ? 'border-destructive' : ''}
                    disabled={submitQuoteMutation.isPending}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Pickup Location */}
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <Input
                    id="pickupLocation"
                    {...register('pickupLocation')}
                    placeholder="City, State or ZIP"
                    disabled={submitQuoteMutation.isPending}
                  />
                </div>

                {/* Delivery Location */}
                <div className="space-y-2">
                  <Label htmlFor="deliveryLocation">Delivery Location</Label>
                  <Input
                    id="deliveryLocation"
                    {...register('deliveryLocation')}
                    placeholder="City, State or ZIP"
                    disabled={submitQuoteMutation.isPending}
                  />
                </div>

                {/* Load Details */}
                <div className="space-y-2">
                  <Label htmlFor="loadDetails">Load Type / Shipment Details</Label>
                  <Textarea
                    id="loadDetails"
                    {...register('loadDetails')}
                    placeholder="Describe your shipment (type, weight, dimensions, special requirements, etc.)"
                    rows={4}
                    disabled={submitQuoteMutation.isPending}
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                  <Checkbox
                    id="consent"
                    checked={consentChecked}
                    onCheckedChange={(checked) => setConsentChecked(checked as boolean)}
                    className="mt-1"
                    disabled={submitQuoteMutation.isPending}
                  />
                  <div className="space-y-1">
                    <Label 
                      htmlFor="consent" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      I grant permission to contact me *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      By checking this box, you consent to receive communications from Resha Logistics, Inc. via phone, email, or SMS regarding your quote request and our services.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg"
                  disabled={submitQuoteMutation.isPending}
                >
                  {submitQuoteMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Submit Quote Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
