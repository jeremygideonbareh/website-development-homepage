'use client'

import React, { useState, useId } from 'react'
import { motion, LayoutGroup } from 'framer-motion'

interface Props {
  heading?: string
  text?: string
  variant?: 'Default' | 'Hover'
  active?: boolean
  className?: string
  style?: React.CSSProperties
}

const springTransition = {
  bounce: 0.15,
  delay: 0,
  duration: 0.7,
  type: 'spring' as const,
}

const tweenTransition = {
  delay: 0,
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  type: 'tween' as const,
}

const bg = 'hsl(var(--background))'
const fg = 'hsl(var(--foreground))'

const sliceFaces = ['Front', 'Back', 'Right', 'Left', 'Top', 'Bottom']

function getFaceStyle(face: string): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'flex',
    flex: 'none',
    height: '34px',
    width: '240px',
    border: `3px solid ${fg}`,
    backgroundColor: bg,
    overflow: 'hidden',
  }
  switch (face) {
    case 'Front':
      return { ...base, position: 'relative', zIndex: 120 }
    case 'Back':
      return { ...base, position: 'absolute', inset: 0, rotateY: 180, zIndex: 1 }
    case 'Right':
      return { ...base, position: 'absolute', bottom: 0, left: '120px', top: 0, rotateY: 90, zIndex: 1 }
    case 'Left':
      return { ...base, position: 'absolute', bottom: 0, right: '120px', top: 0, rotateY: -90, zIndex: 1 }
    case 'Top':
      return { ...base, flex: 'none', height: '240px', left: 0, position: 'absolute', right: 0, top: '-120px', rotateX: 90, zIndex: 1 }
    case 'Bottom':
      return { ...base, flex: 'none', height: '240px', left: 0, position: 'absolute', right: 0, top: '-86px', rotateX: 90, zIndex: 1 }
    default:
      return base
  }
}

const corners = [
  { top: 14, left: 14, borderLeft: `3px solid ${fg}`, borderTop: `3px solid ${fg}` },
  { top: 310, left: 14, borderLeft: `3px solid ${fg}`, borderBottom: `3px solid ${fg}` },
  { bottom: 14, right: 14, borderRight: `3px solid ${fg}`, borderBottom: `3px solid ${fg}` },
  { top: 14, right: 14, borderRight: `3px solid ${fg}`, borderTop: `3px solid ${fg}` },
]

export const IconHover3D: React.FC<Props> = ({
  heading = 'Library',
  text = 'A comprehensive collection of digital books and resources for learning and research.',
  variant = 'Default',
  active = false,
  className = '',
  style = {},
  ...restProps
}) => {
  const [internalVariant, setInternalVariant] = useState<'Default' | 'Hover'>(variant)
  const id = useId()
  const isHover = active || internalVariant === 'Hover'

  return (
    <div className={className} style={{ maxWidth: '90vw' }}>
      <LayoutGroup id={id}>
        <motion.div
          {...restProps}
          onMouseEnter={() => !active && setInternalVariant('Hover')}
          onMouseLeave={() => !active && setInternalVariant('Default')}
          style={{
            backgroundColor: bg,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            borderRadius: '12px',
            border: `1px solid color-mix(in srgb, ${fg} 10%, transparent)`,
            ...style,
          }}
        >
          {/* 3D Cube Icon */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              border: `1px solid color-mix(in srgb, ${fg} 20%, transparent)`,
              borderRadius: '8px',
              flexShrink: 0,
            }}
          >
            <motion.div style={{ position: 'relative', width: '348px', height: '348px', scale: 0.3 }}>
              <motion.div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '28px',
                  alignItems: 'center',
                  transformStyle: 'preserve-3d',
                  rotate: 49,
                  rotateX: 23,
                  rotateY: 33,
                  scale: 0.7,
                  transformPerspective: 1200,
                }}
                transformTemplate={(_: any, t: string) => `translate(-50%, -50%) ${t}`}
                animate={isHover ? { rotateX: -28, rotateY: -43, scale: 1.1 } : { rotateX: 23, rotateY: 33, scale: 0.7 }}
                transition={springTransition}
              >
                {[0, 1, 2].map((sliceIdx) => (
                  <motion.div
                    key={sliceIdx}
                    style={{ position: 'relative', display: 'flex', transformStyle: 'preserve-3d' }}
                  >
                    {sliceFaces.map((face) => (
                      <motion.div
                        key={face}
                        style={getFaceStyle(face)}
                        animate={isHover ? { borderColor: 'rgb(139, 47, 250)' } : { borderColor: fg }}
                        transition={tweenTransition}
                      />
                    ))}
                  </motion.div>
                ))}
              </motion.div>

              {corners.map((pos, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '24px',
                    height: '24px',
                    ...pos,
                  }}
                  animate={isHover ? { scale: 2.2 } : { scale: 1 }}
                  transition={springTransition}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxWidth: 'min(400px, 70vw)',
              flex: '1 1 280px',
            }}
          >
            <motion.div style={{ position: 'relative', height: '32px' }}>
              <motion.div
                style={{
                  position: 'relative',
                  fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: fg,
                  userSelect: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  overflow: 'hidden',
                  height: '32px',
                }}
              >
                <span style={{ position: 'relative', zIndex: 1, padding: '0 4px' }}>
                  {heading}
                </span>
                <motion.span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    color: bg,
                    zIndex: 2,
                    padding: '0 4px',
                    clipPath: 'inset(0 100% 0 0)',
                  }}
                  animate={{ clipPath: `inset(0 ${isHover ? '0%' : '100%'} 0 0)` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {heading}
                </motion.span>
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: fg,
                    transformOrigin: 'left center',
                    scaleX: 0,
                    zIndex: 1,
                  }}
                  animate={{ scaleX: isHover ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              style={{
                fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1.5em',
                color: `color-mix(in srgb, ${fg} 70%, transparent)`,
                userSelect: 'none',
                maxWidth: 'min(400px, 70vw)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {text}
            </motion.div>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </div>
  )
}
