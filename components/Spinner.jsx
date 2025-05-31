import { Loader2 } from "lucide-react"

export default function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="h-64 w-64 h-6 w-6 animate-spin text-primary" />
    </div>
  )
}
