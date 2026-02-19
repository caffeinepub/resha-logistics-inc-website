import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface SubmitQuoteRequestParams {
  name: string;
  phone: string;
  email: string;
  pickupLocation: string;
  deliveryLocation: string;
  loadDetails: string;
  consentGiven: boolean;
}

interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  pickupLocation: string;
  deliveryLocation: string;
  loadDetails: string;
  consentGiven: boolean;
  timestamp: bigint;
}

export function useSubmitQuoteRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SubmitQuoteRequestParams) => {
      if (!actor) {
        throw new Error('Backend connection not initialized. Please refresh the page and try again.');
      }
      
      // Check if the function exists on the actor
      if (typeof (actor as any).submitQuoteRequest !== 'function') {
        throw new Error('Quote submission service is not available. Please contact support.');
      }
      
      const timestamp = BigInt(Date.now());
      
      try {
        const result = await (actor as any).submitQuoteRequest(
          params.name,
          params.phone,
          params.email,
          params.pickupLocation,
          params.deliveryLocation,
          params.loadDetails,
          params.consentGiven,
          timestamp
        );
        
        // Handle different response formats
        if (result && typeof result === 'object') {
          // Check for error response
          if ('Err' in result || 'err' in result) {
            const errorMsg = result.Err || result.err || 'Failed to submit quote request';
            throw new Error(typeof errorMsg === 'string' ? errorMsg : 'Email delivery failed. Please try again or contact us directly.');
          }
          
          // Check for success response
          if ('Ok' in result || 'ok' in result) {
            return result.Ok || result.ok;
          }
        }
        
        // If we get here, assume success
        return result;
      } catch (error: any) {
        // Provide more specific error messages
        if (error.message?.includes('has no update method')) {
          throw new Error('Quote submission service is currently unavailable. Please contact us directly at support@reshalogistics.com or call +1-855-RESHA-01.');
        }
        
        if (error.message?.includes('Postmark') || error.message?.includes('email')) {
          throw new Error('Unable to send email notification. Your request was saved but we may not have received it. Please contact us to confirm.');
        }
        
        if (error.message?.includes('network') || error.message?.includes('timeout')) {
          throw new Error('Network error. Please check your connection and try again.');
        }
        
        // Re-throw with original message if it's already user-friendly
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quoteRequests'] });
    },
    onError: (error: Error) => {
      console.error('Quote submission error:', error);
    },
  });
}

export function useGetAllQuoteRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<QuoteRequest[]>({
    queryKey: ['quoteRequests'],
    queryFn: async () => {
      if (!actor) return [];
      
      // Check if the function exists
      if (typeof (actor as any).getAllQuoteRequests !== 'function') {
        console.warn('getAllQuoteRequests function not available on backend');
        return [];
      }
      
      try {
        const result = await (actor as any).getAllQuoteRequests();
        return Array.isArray(result) ? result : [];
      } catch (error) {
        console.error('Error fetching quote requests:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}
