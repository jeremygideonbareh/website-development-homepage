import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher({ color, border }) {
  const { i18n } = useTranslation()
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' },
    { code: 'hi', label: 'HI' },
  ]
  return (
    <div className="relative">
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label="Select language"
        className="appearance-none rounded-full border px-3 py-2 text-xs font-medium outline-none cursor-pointer min-w-[44px] min-h-[44px]"
        style={{ color, borderColor: border, backgroundColor: 'transparent', paddingLeft: '36px' }}
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
      <Globe className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color }} />
    </div>
  )
}
