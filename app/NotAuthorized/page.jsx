"use client"
import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AccessDenied() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <ShieldAlert className="w-20 h-20 text-red-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Acceso Denegado</h1>
      <p className="text-muted-foreground mb-6">
        No tienes permiso para ver esta página.<br />
        Por favor, contacta al administrador si crees que esto es un error.
      </p>
      <Button onClick={() => router.push("/")}>Volver al inicio</Button>
    </div>
  )
}
