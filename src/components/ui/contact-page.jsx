import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Check,
  Copy,
  Mail,
  MapPin,
  Phone,
  GitBranch,
  MessageCircle,
  Briefcase,
  Camera,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LeadForm } from '@/components/LeadForm'

const APP_EMAIL = 'cloudlyconfusing@gmail.com'
const APP_PHONE = '+92 334 8585873'

export function ContactPage() {
  const socialLinks = [
    { icon: GitBranch, href: 'https://github.com/sshahaider', label: 'GitHub' },
    { icon: MessageCircle, href: 'https://twitter.com/sshahaider', label: 'Twitter' },
    { icon: Briefcase, href: 'https://linkedin.com/in/sshahaider', label: 'LinkedIn' },
    { icon: Camera, href: 'https://instagram.com/sshahaider', label: 'Instagram' },
  ]

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="mx-auto h-full max-w-6xl lg:border-x lg:border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 isolate -z-10 opacity-80 contain-strict"
        >
          <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
        </div>
        <div className="flex grow flex-col justify-center px-4 md:px-6 pt-32 pb-16">
          <h1 className="text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="text-zinc-400 mb-5 text-base">Contact the support team at Asme.</p>
        </div>
        <BorderSeparator />
        <div className="grid md:grid-cols-3">
          <Box icon={Mail} title="Email" description="We respond to all emails within 24 hours.">
            <a
              href={`mailto:${APP_EMAIL}`}
              className="font-mono text-base font-medium tracking-wide hover:underline"
            >
              {APP_EMAIL}
            </a>
            <CopyButton className="size-6" test={APP_EMAIL} />
          </Box>
          <Box
            icon={MapPin}
            title="Office"
            description="Drop by our office for a chat."
          >
            <span className="font-mono text-base font-medium tracking-wide">
              Indiranagar, Bangalore
            </span>
          </Box>
          <Box
            icon={Phone}
            title="Phone"
            description="We're available Mon-Fri, 9am-5pm."
            className="border-b-0 md:border-r-0"
          >
            <div className="flex items-center gap-x-2">
                <a
                  href={`tel:${APP_PHONE}`}
                  className="block font-mono text-base font-medium tracking-wide hover:underline"
                >
                  {APP_PHONE}
                </a>
                <CopyButton className="size-6" test={APP_PHONE} />
              </div>
          </Box>
        </div>
        <BorderSeparator />
        <div className="grid md:grid-cols-2">
          <div className="border-b border-white/10 md:border-b-0 md:border-r md:border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-1">Send us a message</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Fill out the form and we'll get back to you within 24 hours.
            </p>
            <LeadForm />
          </div>
          <div className="flex flex-col items-center justify-center p-6 sm:p-8">
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold md:text-3xl">Find us online</h2>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-white/10 flex items-center gap-x-2 rounded-full border border-white/10 px-4 py-2 min-h-[44px]"
                  >
                    <link.icon className="size-4" />
                    <span className="font-mono text-sm font-medium tracking-wide">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BorderSeparator() {
  return <div className="absolute inset-x-0 h-px w-full border-b border-white/10" />
}

function Box({ title, description, className, children, icon: Icon, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-col justify-between border-b border-white/10 md:border-r md:border-b-0',
        className,
      )}
      {...props}
    >
      <div className="bg-white/5 flex items-center gap-x-3 border-b border-white/10 p-4">
        <Icon className="text-zinc-400 size-5" strokeWidth={1} />
        <h2 className="text-lg font-medium tracking-wider">{title}</h2>
      </div>
      <div className="flex items-center gap-x-2 p-4 py-12">{children}</div>
      <div className="border-t border-white/10 p-4 py-6 md:py-12">
        <p className="text-zinc-400 text-sm">{description}</p>
      </div>
    </div>
  )
}

function CopyButton({ className, variant = 'ghost', size = 'icon', test, ...props }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(test)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('disabled:opacity-100', className)}
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      disabled={copied || props.disabled}
      {...props}
    >
      <div className={cn('transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}>
        <Check className="size-3.5 stroke-emerald-500" aria-hidden="true" />
      </div>
      <div className={cn('absolute transition-all', copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100')}>
        <Copy aria-hidden="true" className="size-3.5" />
      </div>
    </Button>
  )
}
