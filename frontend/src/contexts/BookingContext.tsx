import { FC, ReactNode, createContext, useContext, useState } from 'react'

interface BookingContextProps {
  step: number
  // language: string
  guestCount: number
  setStep: (step: number) => void
  // setLanguage: (language: string) => void
  setGuestCount: (guestCount: number) => void
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined)

export const BookingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(1)
  // const [language, setLanguage] = useState('EN')
  const [guestCount, setGuestCount] = useState(1)

  return (
    <BookingContext.Provider
      value={{
        step,
        // language,
        guestCount,
        setStep,
        // setLanguage,
        setGuestCount,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingContext)

  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }

  return context
}
