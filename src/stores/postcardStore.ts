import { create } from 'zustand'
import { CountryOption } from '../components/CountryList'

type PostcardState = {
  uploadedImage: string | null
  setImage: (img: string) => void
  isGrayscale: boolean
  toggleGrayscale: () => void
  message: string
  setMessage: (msg: string) => void
  textCount: number
  setTextCount: (count: number) => void
  senderName: string
  setSenderName: (name: string) => void
  senderCountry: CountryOption | null;
  setSenderCountry: (country: CountryOption | null) => void;
  recipientName: string
  setRecipientName: (name: string) => void
  recipientEmail: string
  setRecipientEmail: (email: string) => void
  recipientCountry: CountryOption | null;
  setRecipientCountry: (country: CountryOption | null) => void;
  reset: () => void
}

export const usePostcardStore = create<PostcardState>((set) => ({
  uploadedImage: null,
  isGrayscale: false,
  message: '',
  textCount: 0,
  senderName: '',
  senderCountry: null,
  recipientName: '',
  recipientEmail: '',
  recipientCountry: null,
  setImage: (img) => set({ uploadedImage: img }),
  toggleGrayscale: () => set(state => ({ isGrayscale: !state.isGrayscale })),
  setMessage: (msg) => set({ message: msg }),  
  setTextCount: (count) => set({ textCount: count }),
  setSenderName: (name) => set({ senderName: name }),
  setSenderCountry: (country) => set({ senderCountry: country }),
  setRecipientName: (name) => set({ recipientName: name }),
  setRecipientEmail: (email) => set({recipientEmail: email}),
  setRecipientCountry: (country) => set({ recipientCountry: country }),
  reset: () => set({
    uploadedImage: null,
    isGrayscale: false,
    message: '',
    textCount: 0,
    senderName: '',
    senderCountry: null,
    recipientName: '',
    recipientCountry: null
  })
}))
