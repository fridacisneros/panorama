export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <p className="text-teal-600 text-lg font-medium">Cargando normativas...</p>
      </div>
    </div>
  )
}
