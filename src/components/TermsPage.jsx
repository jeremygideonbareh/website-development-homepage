import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, FileText } from 'lucide-react'

export default function TermsPage({ onBack }) {
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
            <FileText className="size-6 text-zinc-400" />
            <p className="text-sm font-medium tracking-widest uppercase text-zinc-500">Legal</p>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-sm text-zinc-500 mb-12">Last updated: July 2026</p>

          <div className="space-y-8 text-sm leading-relaxed text-zinc-300">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Rogue Code's website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. Services Description</h2>
              <p>
                Rogue Code provides web development, AI automation, mobile app development, and UI/UX design services. The specific scope, deliverables, timeline, and pricing for each project are defined in a separate project agreement or proposal.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Project Terms</h2>
              <ul className="space-y-2 pl-5 list-disc">
                <li><strong className="text-white">Scope:</strong> The scope of work is defined in the project proposal. Any changes or additions outside the agreed scope may result in additional charges.</li>
                <li><strong className="text-white">Timeline:</strong> Estimated timelines are provided in good faith but are not guaranteed. Delays caused by client feedback, third-party services, or unforeseen technical challenges may extend the timeline.</li>
                <li><strong className="text-white">Revisions:</strong> Revision rounds are specified per tier. Revisions beyond the included rounds are billed separately.</li>
                <li><strong className="text-white">Payment:</strong> Payment terms are specified in the project proposal. Late payments may result in project suspension.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. Intellectual Property</h2>
              <p>
                Upon full payment, you retain full ownership of the source code and deliverables created specifically for your project. Rogue Code retains the right to display the project in our portfolio unless otherwise agreed in writing. Third-party libraries, frameworks, and tools remain under their respective licenses.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. Client Responsibilities</h2>
              <ul className="space-y-2 pl-5 list-disc">
                <li>Provide timely feedback and approvals to keep the project on schedule</li>
                <li>Provide all necessary content, branding assets, and access to third-party services</li>
                <li>Ensure you have the legal right to use any materials provided to us</li>
                <li>Maintain confidentiality of any login credentials or API keys shared during the project</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">6. Confidentiality</h2>
              <p>
                Both parties agree to keep confidential all proprietary information shared during the course of the project. This includes business processes, technical specifications, and any information marked as confidential. This obligation survives the termination of our agreement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">7. Limitation of Liability</h2>
              <p>
                Rogue Code's liability for any claim arising from our services is limited to the total amount paid for the specific project giving rise to the claim. We are not liable for indirect, incidental, or consequential damages, including loss of profits, data, or business opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">8. Warranty</h2>
              <p>
                We warrant that our services will be performed in a professional manner consistent with industry standards. During the post-launch support period, we will fix any bugs or defects in the delivered work at no additional charge. This warranty does not cover issues caused by third-party services, content you provide, or modifications made by other parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">9. Termination</h2>
              <p>
                Either party may terminate a project agreement with written notice. In the event of termination, the client pays for all work completed up to the termination date. Upon payment, the client receives all work product delivered up to that point.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">10. Governing Law</h2>
              <p>
                These terms are governed by the laws of India. Any disputes shall be resolved through arbitration in Bangalore, India.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">11. Contact</h2>
              <p>
                For questions about these Terms of Service, contact us at:
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
