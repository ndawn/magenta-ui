import { forwardRef, type AnchorHTMLAttributes } from 'react'

import { createLink, type LinkComponent } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import type { MenuItem } from '@/menu'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  ['data-status']?: 'active'
} & MenuItem

const BottomNavLinkComponent = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ title, className, ...props }, ref) => (
    <a
      ref={ref}
      {...props}
      className={cn(
        'p-2 flex flex-col items-center justify-center gap-1 text-primary/120 rounded-md select-none hover:bg-primary/10',
        props['data-status'] === 'active' && 'bg-primary/10',
        className,
      )}
    >
      <props.icon size={24} />
      {/* <span className="text-xs font-medium">{title}</span> */}
    </a>
  ),
)

const CreatedLink = createLink(BottomNavLinkComponent)

const Link: LinkComponent<typeof BottomNavLinkComponent> = (props) => (
  <CreatedLink {...props} />
)

export default Link
