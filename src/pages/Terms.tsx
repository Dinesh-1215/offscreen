import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-slate-600">
              Last updated: December 15, 2024
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-900">Terms of Use for Offscreen.site</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-6">
                By accessing and using Offscreen.site, you agree to be bound by these Terms and Conditions 
                and our Privacy Policy. If you do not agree with any part of these terms, please do not use our website.
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-slate-600">
                    These Terms and Conditions constitute a legally binding agreement between you and Offscreen.site. 
                    By using our website, tools, or services, you acknowledge that you have read, understood, 
                    and agree to be bound by these terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Description of Service</h2>
                  <div className="space-y-4 text-slate-600">
                    <p>Offscreen.site provides:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Free online productivity tools (Pomodoro Timer, Keep Screen Awake, White Noise Player)</li>
                      <li>Educational content and blog articles about focus and digital wellness</li>
                      <li>Tips and strategies for improving productivity</li>
                      <li>Resources for maintaining healthy digital habits</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Use of Our Tools</h2>
                  <div className="space-y-4 text-slate-600">
                    <h3 className="text-lg font-medium text-slate-800">Permitted Use</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use our tools for personal productivity and focus enhancement</li>
                      <li>Share our content with proper attribution</li>
                      <li>Access our website from any compatible device or browser</li>
                    </ul>

                    <h3 className="text-lg font-medium text-slate-800">Prohibited Use</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Attempt to hack, break, or circumvent our website security</li>
                      <li>Use our tools for illegal or harmful activities</li>
                      <li>Copy, modify, or redistribute our content without permission</li>
                      <li>Interfere with other users' ability to access our services</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Disclaimer of Warranties</h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      <strong>Use at Your Own Risk:</strong> Our tools and content are provided "as is" without 
                      any warranties, express or implied. We do not guarantee:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Uninterrupted or error-free operation of our tools</li>
                      <li>That our tools will meet your specific requirements</li>
                      <li>The accuracy or completeness of our content</li>
                      <li>That our services will be available at all times</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Limitation of Liability</h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      To the fullest extent permitted by law, Offscreen.site shall not be liable for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Any direct, indirect, incidental, or consequential damages</li>
                      <li>Loss of data, revenue, or productivity</li>
                      <li>Device damage or software conflicts</li>
                      <li>Any issues arising from the use of our tools or following our advice</li>
                    </ul>
                    <p>
                      <strong>Browser Compatibility:</strong> Our tools require modern web browsers with 
                      JavaScript enabled. We are not responsible for compatibility issues with outdated browsers.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Intellectual Property</h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      All content on Offscreen.site, including text, images, code, and design elements, 
                      is owned by us or our licensors and is protected by copyright and other intellectual property laws.
                    </p>
                    <p>
                      You may share links to our content and quote brief excerpts with proper attribution, 
                      but you may not reproduce substantial portions without written permission.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. External Links</h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      Our website may contain links to external websites and resources. We are not responsible for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The content or privacy practices of external sites</li>
                      <li>Any damages resulting from your use of external sites</li>
                      <li>The availability or functionality of linked resources</li>
                    </ul>
                    <p>
                      External links are provided for convenience only and do not constitute an endorsement.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Privacy and Data</h2>
                  <p className="text-slate-600">
                    Your privacy is important to us. Our collection and use of personal information is 
                    governed by our Privacy Policy, which is incorporated into these terms by reference. 
                    Please review our Privacy Policy to understand our practices.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Advertising</h2>
                  <div className="space-y-4 text-slate-600">
                    <p>
                      Our website may display advertisements through Google AdSense and other advertising networks. 
                      We are not responsible for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The content of advertisements displayed on our site</li>
                      <li>Any transactions between you and advertisers</li>
                      <li>The accuracy of advertising claims</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Modifications to Terms</h2>
                  <p className="text-slate-600">
                    We reserve the right to modify these Terms and Conditions at any time. Changes will be 
                    effective immediately upon posting on this page. Your continued use of our website after 
                    changes are posted constitutes your acceptance of the revised terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Termination</h2>
                  <p className="text-slate-600">
                    We may terminate or suspend your access to our website at any time, without prior notice, 
                    for any reason, including violation of these Terms and Conditions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Governing Law</h2>
                  <p className="text-slate-600">
                    These Terms and Conditions are governed by and construed in accordance with applicable laws. 
                    Any disputes arising from these terms will be resolved through appropriate legal channels.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">13. Contact Information</h2>
                  <p className="text-slate-600">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-slate-900">Email:</p>
                    <p className="text-slate-600">hello@offscreen.site</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">14. Severability</h2>
                  <p className="text-slate-600">
                    If any part of these Terms and Conditions is found to be unenforceable, the remaining 
                    portions will continue to be valid and enforceable to the fullest extent permitted by law.
                  </p>
                </section>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-600">
                    By using Offscreen.site, you acknowledge that you have read and understood these Terms and Conditions 
                    and agree to be bound by them. Thank you for using our productivity tools responsibly!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
