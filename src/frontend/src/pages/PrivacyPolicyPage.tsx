import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="bg-card rounded-lg shadow-lg p-8 space-y-6 text-card-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Resha Logistics, Inc. Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Resha Logistics, Inc., we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you interact with our services.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Information We Collect</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Contact information (name, email address, phone number)</li>
                <li>Shipment details (pickup and delivery locations, load type and specifications)</li>
                <li>Communication preferences and consent records</li>
                <li>Any other information you choose to provide when requesting quotes or services</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground">How We Use Your Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Provide, maintain, and improve our logistics services</li>
                <li>Process and respond to your quote requests</li>
                <li>Communicate with you about our services, including updates and promotional materials (with your consent)</li>
                <li>Comply with legal obligations and protect our rights</li>
                <li>Analyze and improve our business operations</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground">RingCentral SMS Communication Policy</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Resha Logistics, Inc. may use RingCentral services to communicate with you via SMS text messages. By providing your phone number and granting consent, you agree to receive text messages from us regarding:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Quote confirmations and updates</li>
                <li>Shipment status notifications</li>
                <li>Service-related communications</li>
                <li>Promotional offers (only with explicit consent)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Message and data rates may apply. You can opt out of receiving SMS messages at any time by replying "STOP" to any message or by contacting us directly. Message frequency varies based on your service needs.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Data Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Information Sharing</h3>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our business, conducting our services, or servicing you, as long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Your Rights and Choices</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Access, update, or delete your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent for SMS communications</li>
                <li>Request information about how we use your data</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Contact Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-muted/50 p-4 rounded-md space-y-2">
                <p className="font-semibold text-foreground">Resha Logistics, Inc.</p>
                <p className="text-muted-foreground">22 Van Veghten Dr</p>
                <p className="text-muted-foreground">Bridgewater, NJ 08807</p>
                <p className="text-muted-foreground">Phone: <a href="tel:908-274-3658" className="text-primary hover:underline">908-274-3658</a></p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Changes to This Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on our website and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground">SMS Communication Notice</h3>
              <p className="text-muted-foreground leading-relaxed">
                Resha Logistics Inc uses RingCentral to enable SMS communications. We only send transactional and service-related text messages such as dispatch updates, shipment coordination, load confirmations, and document delivery requested by the customer. We do not send marketing messages, advertisements, or spam via SMS. You may opt-out anytime by replying STOP. Message and data rates may apply.
              </p>
            </section>

            <section className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                Last Updated: January 7, 2026
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
