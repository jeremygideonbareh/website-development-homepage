'use client'

/**
 * @author: @emerald-ui
 * @description: Editorial-style team member card with overlapping layers and motion
 * @version: 2.0.0
 * @date: 2026-02-19
 * @license: MIT
 * @website: https://emerald-ui.com
 *
 * ── Photo paths ──────────────────────────────────────────
 * The default `imageUrl` below is a fallback Unsplash photo.
 * When this card is used via AboutUs.jsx, the `imageUrl` prop
 * is explicitly set to `/images/team/jeremy.jpeg` (or another
 * local path). To replace photos, swap the .jpeg files in
 * public/images/team/ — no prop changes needed.
 * ──────────────────────────────────────────────────────────
 */
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface TeamMemberCardProps {
  position: 'left' | 'right'
  jobPosition?: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  description?: string
  className?: string
}

/**
 * Editorial-style team member card with overlapping portrait, large display
 * typography, circular CTA toggle, and staggered entrance animations.
 */
export default function TeamMemberCard({
  position = 'left',
  jobPosition = 'Backend Engineer',
  firstName = 'Jennie',
  lastName = 'Garcia',
  imageUrl = 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?fm=jpg&q=60',
  description = 'Jennie is a skilled developer with expertise in modern web technologies and a passion for creating seamless user experiences.',
  className,
}: TeamMemberCardProps) {
  const fullName = `${firstName} ${lastName}`
  const isPositionRight = position === 'right'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative my-16 flex flex-col justify-center', className)}
    >
      {/* jobPosition label — editorial uppercase tracking */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p
          className={cn(
            'mb-4 text-xs font-medium tracking-[0.3em] text-zinc-400 uppercase dark:text-zinc-500',
            isPositionRight && 'text-right'
          )}
        >
          {jobPosition}
        </p>
      </motion.div>

      <div className='flex flex-col md:flex-row items-center md:items-end justify-end gap-6 md:gap-0'>
        {/* Portrait image with reveal animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative w-full md:w-90 md:h-125 aspect-[4/5] md:aspect-auto shrink-0 overflow-hidden md:order-none',
            isPositionRight && 'md:order-1'
          )}
        >
          {/* Subtle grain overlay for texture */}
          <div className='pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/20 via-transparent to-transparent' />
          <img
            src={imageUrl}
            alt={fullName}
            loading="lazy"
            decoding="async"
            className='h-full w-full object-cover duration-500 ease-[0.22,1,0.36,1] hover:scale-105'
          />
        </motion.div>

        {/* Info block — overlaps image via negative margin on desktop */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative md:-left-8 z-2 flex w-full md:w-[calc(100%-350px)] flex-col gap-6 md:gap-14 px-4 md:px-0',
            isPositionRight && 'md:left-8 md:items-end'
          )}
        >
          {/* Display name — large editorial type */}
          <div>
            <p className='text-3xl md:text-5xl leading-[1.1] font-extralight tracking-tight text-zinc-900 dark:text-white text-center md:text-left'>
              {firstName}
              <br />
              <span className='font-normal'>{lastName}</span>
            </p>
          </div>

          {/* Details row — toggle + bio */}
          <div className={cn('flex gap-4 md:gap-8', isPositionRight && 'md:justify-end')}>
            {/* Circular CTA with hover pulse */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'group flex h-12 w-12 md:h-20 md:w-20 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-300 transition-colors duration-300 hover:border-zinc-600 hover:bg-zinc-900 dark:border-white/20 dark:hover:border-white/60 dark:hover:bg-white/10',
                isPositionRight && 'md:order-1'
              )}
            >
              <ArrowRight
                size={22}
                className={cn(
                  'text-zinc-600 transition-all duration-300 group-hover:-rotate-45 group-hover:text-white dark:text-zinc-400 dark:group-hover:text-white',
                  isPositionRight && 'rotate-180 group-hover:md:rotate-225'
                )}
              />
            </motion.div>

            {/* Bio copy — restrained body text */}
            <div className='w-full md:w-[40%]'>
              <p
                className={cn(
                  'text-sm leading-[1.8] text-zinc-500 dark:text-zinc-400',
                  isPositionRight && 'md:text-right'
                )}
              >
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
