import { useState } from 'react'
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa'
import { cn } from '../lib/utils'

const defaultMembers = [
  {
    name: 'Jeremy Gideon Bareh',
    role: 'Lead Developer',
    image: '/images/team/jeremy.jpeg',
    social: { twitter: '#', linkedin: '#', behance: '#' },
  },
  {
    name: 'Aaron Jaison',
    role: 'Co-Developer',
    image: '/images/team/aaron.jpeg',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    name: 'Ashba Merim Francis',
    role: 'Sales',
    image: '/images/team/ashba.jpeg',
    social: { linkedin: '#' },
  },
  {
    name: 'Placeholder',
    role: 'Team Member',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Placeholder',
    role: 'Team Member',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    name: 'Placeholder',
    role: 'Team Member',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=85',
    social: { linkedin: '#' },
  },
]

export default function TeamShowcase({ isDay = true, members = defaultMembers }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [touchedId, setTouchedId] = useState(null)

  const activeId = hoveredId || touchedId

  const col1 = members.filter((_, i) => i % 3 === 0)
  const col2 = members.filter((_, i) => i % 3 === 1)
  const col3 = members.filter((_, i) => i % 3 === 2)

  return (
    <div className={`${isDay ? '' : 'dark'}`}>
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full max-w-5xl mx-auto py-8 px-4 md:px-6 font-sans">
        <div className="flex gap-2 md:gap-3 flex-shrink-0 overflow-x-auto pb-1 md:pb-0">
          <div className="flex flex-col gap-2 md:gap-3">
            {col1.map((member, i) => (
              <PhotoCard
                key={`col1-${i}`}
                member={member}
                className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
                activeId={activeId}
                onHover={setHoveredId}
                onTouch={setTouchedId}
                id={`col1-${i}`}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
            {col2.map((member, i) => (
              <PhotoCard
                key={`col2-${i}`}
                member={member}
                className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
                activeId={activeId}
                onHover={setHoveredId}
                onTouch={setTouchedId}
                id={`col2-${i}`}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
            {col3.map((member, i) => (
              <PhotoCard
                key={`col3-${i}`}
                member={member}
                className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
                activeId={activeId}
                onHover={setHoveredId}
                onTouch={setTouchedId}
                id={`col3-${i}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-0 md:pt-2 flex-1 w-full">
          {members.map((member, i) => (
            <MemberRow
              key={`row-${i}`}
              member={member}
              activeId={activeId}
              onHover={setHoveredId}
              onTouch={setTouchedId}
              id={`row-${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function PhotoCard({ member, className, activeId, onHover, onTouch, id }) {
  const isActive = activeId === id
  const isDimmed = activeId !== null && !isActive

  const handleClick = () => {
    onTouch(activeId === id ? null : id)
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-400',
        className,
        isDimmed ? 'opacity-60' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter] duration-500"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.77)',
        }}
      />
    </div>
  )
}

function MemberRow({ member, activeId, onHover, onTouch, id }) {
  const isActive = activeId === id
  const isDimmed = activeId !== null && !isActive
  const hasSocial = member.social?.twitter || member.social?.linkedin || member.social?.instagram || member.social?.behance

  const handleClick = () => {
    onTouch(activeId === id ? null : id)
  }

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300',
        isDimmed ? 'opacity-50' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'w-4 h-3 rounded-[5px] flex-shrink-0 transition-all duration-300',
            isActive ? 'bg-foreground w-5' : 'bg-foreground/25',
          )}
        />
        <span
          className={cn(
            'text-base md:text-[18px] font-semibold leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          {member.name}
        </span>

        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-1.5 ml-0.5 transition-all duration-200',
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none',
            )}
          >
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150 hover:scale-110 min-w-[28px] min-h-[28px] flex items-center justify-center"
                title="X / Twitter"
              >
                <FaTwitter size={11} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150 hover:scale-110 min-w-[28px] min-h-[28px] flex items-center justify-center"
                title="LinkedIn"
              >
                <FaLinkedinIn size={11} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150 hover:scale-110 min-w-[28px] min-h-[28px] flex items-center justify-center"
                title="Instagram"
              >
                <FaInstagram size={11} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150 hover:scale-110 min-w-[28px] min-h-[28px] flex items-center justify-center"
                title="Behance"
              >
                <FaBehance size={11} />
              </a>
            )}
          </div>
        )}
      </div>

      <p className="mt-1.5 pl-[27px] text-[7px] md:text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {member.role}
      </p>
    </div>
  )
}
