import type { Metadata } from "next"
import { ShieldCheck } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description:
    "Aviso de privacidad de Panorama conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
}

// NOTA: completa los datos entre corchetes [ ] con la información real del
// responsable antes de publicar (nombre/razón social, domicilio y correo de
// contacto para el ejercicio de derechos ARCO).
const RESPONSABLE = "[Nombre o razón social del responsable]"
const CONTACTO = "[correo de contacto]"
const ULTIMA_ACTUALIZACION = "julio de 2026"

export default function AvisoPrivacidadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <PageHeader
          icon={ShieldCheck}
          title="Aviso de Privacidad"
          subtitle="Protección de tus datos personales conforme a la ley mexicana (LFPDPPP)"
        />

        <div className="rounded-2xl border border-teal-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <p className="mb-6 text-sm text-gray-500">Última actualización: {ULTIMA_ACTUALIZACION}</p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="mb-2 text-xl font-bold text-gray-900">1. Responsable del tratamiento</h2>
              <p>
                {RESPONSABLE} (en adelante, “Panorama”) es responsable del tratamiento de los datos
                personales que nos proporciones a través de este sitio, y los protege conforme a la Ley
                Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su
                Reglamento y demás normativa aplicable.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-bold text-gray-900">2. Datos que recabamos</h2>
              <p>
                A través del <strong>Buzón de Sugerencias</strong> recabamos únicamente los datos que
                decides proporcionarnos:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Nombre</li>
                <li>Correo electrónico</li>
                <li>El contenido de tu sugerencia o comentario</li>
              </ul>
              <p className="mt-2">
                No recabamos datos personales sensibles ni datos patrimoniales o financieros.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-bold text-gray-900">3. Finalidades del tratamiento</h2>
              <p>Tus datos personales se utilizan para las siguientes finalidades:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Recibir, atender y dar seguimiento a tus sugerencias o comentarios.</li>
                <li>Contactarte, en su caso, para dar respuesta a lo que nos comunicaste.</li>
                <li>Mejorar el contenido y funcionamiento de la plataforma.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-bold text-gray-900">4. Transferencia de datos</h2>
              <p>
                No transferimos ni comercializamos tus datos personales con terceros. Únicamente podrán
                ser conocidos por el personal encargado de atender las sugerencias, y solo se divulgarán
                cuando exista un requerimiento de autoridad competente en términos de ley.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-bold text-gray-900">5. Derechos ARCO</h2>
              <p>
                Tienes derecho a <strong>Acceder</strong>, <strong>Rectificar</strong> y{" "}
                <strong>Cancelar</strong> tus datos personales, así como a <strong>Oponerte</strong> a su
                tratamiento o revocar el consentimiento otorgado. Para ejercer estos derechos, envía tu
                solicitud al correo{" "}
                <a href={`mailto:${CONTACTO}`} className="font-medium text-teal-700 underline">
                  {CONTACTO}
                </a>
                , indicando tu nombre y el derecho que deseas ejercer.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-bold text-gray-900">6. Cambios al aviso de privacidad</h2>
              <p>
                Este aviso de privacidad puede actualizarse en cualquier momento. Las modificaciones se
                publicarán en esta misma página, indicando la fecha de la última actualización.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-bold text-gray-900">7. Contacto</h2>
              <p>
                Para cualquier duda sobre este aviso o el tratamiento de tus datos, escríbenos a{" "}
                <a href={`mailto:${CONTACTO}`} className="font-medium text-teal-700 underline">
                  {CONTACTO}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
