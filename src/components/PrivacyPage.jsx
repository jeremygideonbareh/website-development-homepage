import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PrivacyPage({ onBack }) {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          {t('nav.backToSite')}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="size-6 text-zinc-400" />
            <p className="text-sm font-medium tracking-widest uppercase text-zinc-500">Legal</p>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-sm text-zinc-500 mb-12">Last updated: July 2026</p>

          <div className="space-y-8 text-sm leading-relaxed text-zinc-300">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Introduction</h2>
              <p>
                Rogue Code ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. Information We Collect</h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="space-y-2 pl-5 list-disc">
                <li><strong className="text-white">Personal Information:</strong> Name, email address, phone number, and company name when you submit a contact form or book a call.</li>
                <li><strong className="text-white">Project Information:</strong> Details about your project requirements, budget range, and timeline preferences.</li>
                <li><strong className="text-white">Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent.</li>
                <li><strong className="text-white">Technical Data:</strong> IP address, browser type, device information, and operating system.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. How We Use Your Information</h2>
              <ul className="space-y-2 pl-5 list-disc">
                <li>To respond to your inquiries and provide project proposals</li>
                <li>To deliver our development, design, and consulting services</li>
                <li>To improve our website and service offerings</li>
                <li>To send occasional service-related communications</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. Data Storage and Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. Your data is stored on secure servers with encryption at rest and in transit. We retain your information only as long as necessary to provide our services or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. Data Sharing and Disclosure</h2>
              <p>
                We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">6. Your Rights</h2>
              <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
              <ul className="space-y-2 pl-5 list-disc">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">7. Cookies</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie preferences through your browser settings. We do not use cookies for targeted advertising.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">10. Contact</h2>
              <p>
                For questions about this Privacy Policy or to exercise your data rights, contact us at:
              </p>
              <p className="mt-2">
                Email: cloudlyconfusing@gmail.com<br />
                Phone: +92 334 8585873
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <p className="text-xs text-zinc-600">
              Rogue Code · Bangalore, India
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
