"use client"

import { createContext, useState, useContext } from "react"

const LoadingContext = createContext()

export const useLoading = () => useContext(LoadingContext)

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  const value = {
    isLoading,
    startLoading,
    stopLoading,
  }

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && (
        <div className="global-loading">
          <div className="spinner"></div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  )
}
