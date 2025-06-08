
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-600">
              Last updated: December 15, 2024
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900">Our Commitment to Your Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-6">
                At Offscreen.site, we are committed to protecting your privacy and ensuring you have a 
                positive experience on our website. This privacy policy outlines how we collect, use, 
                and protect your information.
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">Information We Collect</h2>
                  <div className="space-y-4 text-slate-600">
                    <h3 className="text-lg font-medium text-slate-800">Information You Provide</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Contact information when you reach out to us through our contact form</li>
                      <li>Email address if you subscribe to our newsletter</li>
                      <li>Feedback and comments you may provide</li>
                    </ul>

                    <h3 className="text-lg font-medium text-slate-800">Automatically Collected Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Basic usage analytics through Google Analytics (anonymized)</li>
                      <li>Browser type and version for optimal site performance</li>
                      <li>General geographic location (country/region level)</li>
                      <li>Pages visited and time spent on our site</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">How We Use Your Information</h2>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600">
                    <li>To respond to your inquiries and provide customer support</li>
                    <li>To improve our website content and user experience</li>
                    <li>To send periodic emails about new content or features (only if you subscribe)</li>
                    <li>To analyze website traffic and usage patterns</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">Cookies and Tracking</h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      We use cookies and similar technologies to enhance your browsing experience:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                      <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                    </ul>
                    <p>
                      You can control cookie settings through your browser preferences. Note that 
                      disabling certain cookies may affect site functionality.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">Third-Party Services</h2>
                  <div className="space-y-4 text-slate-600">
                    <p>We may use third-party services that collect information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Google Analytics:</strong> For website analytics (anonymized data)</li>
                      <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
                      <li><strong>Email Service Providers:</strong> For newsletter delivery</li>
                    </ul>
                    <p>
                      These services have their own privacy policies and are GDPR compliant where applicable.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">Data Security</h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      We implement appropriate security measures to protect your personal information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>SSL encryption for data transmission</li>
                      <li>Secure hosting with regular backups</li>
                      <li>Limited access to personal information</li>
                      <li>Regular security updates and monitoring</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">Your Rights</h2>
                  <div className="space-y-4 text-slate-600">
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access the personal information we hold about you</li>
                      <li>Request correction of any inaccurate information</li>
                      <li>Request deletion of your personal information</li>
                      <li>Unsubscribe from our communications at any time</li>
                      <li>Object to processing of your personal information</li>
                    </ul>
                    <p>
                      To exercise any of these rights, please contact us at hello@offscreen.site.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">Children's Privacy</h2>
                  <p className="text-slate-600">
                    Our website is not intended for children under 13. We do not knowingly collect 
                    personal information from children under 13. If you believe we have collected 
                    information from a child under 13, please contact us immediately.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">Changes to This Policy</h2>
                  <p className="text-slate-600">
                    We may update this privacy policy from time to time. We will notify you of any 
                    significant changes by posting the new policy on this page and updating the 
                    "Last updated" date. We encourage you to review this policy periodically.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">Contact Us</h2>
                  <p className="text-slate-600">
                    If you have any questions about this privacy policy or how we handle your 
                    personal information, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-slate-900">Email:</p>
                    <p className="text-slate-600">hello@offscreen.site</p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
