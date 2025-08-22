import {cn} from '@/lib/utils';
import React from 'react'

export const Container = ({children, className}:{
    children: React.ReactNode,
    className?: string;
}) => {
  return (
    <div className={cn("relative mx-auto h-full w-full bg-white dark:bg-black", className
      )}>
      {children}
    </div>
  )
}