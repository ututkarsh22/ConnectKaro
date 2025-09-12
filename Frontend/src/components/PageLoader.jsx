import React from 'react'
import { useThemeStore } from "../store/useThemeStore"
import { LoaderIcon } from 'lucide-react'

const PageLoader = () => {
  const {theme} = useThemeStore();
  return (
    <div className='min-h-screen flex items-center justify-center' data-theme = {theme}>
        <LoaderIcon className="animate-spin size-15 text-orange-200"/>
    </div>
  )
}

export default PageLoader