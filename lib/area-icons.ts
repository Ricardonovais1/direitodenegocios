import {
  Award,
  Building2,
  House,
  Laptop,
  Lightbulb,
  Rocket,
  Scale,
  UserCheck,
  Vault,
  type LucideIcon,
} from 'lucide-react'

/**
 * Ícone de cada área de atuação, por slug.
 *
 * Um conceito visual por área, sem repetir a mesma forma: balança, prédio,
 * foguete, laptop, pessoa, lâmpada, roseta, casa e cofre. A lâmpada fica com
 * Propriedade Intelectual e a roseta com Patentes de propósito — são as duas
 * áreas que mais se confundem visualmente.
 *
 * Áreas sem entrada aqui caem no ícone padrão, então incluir uma nova área no
 * Sanity nunca quebra a página.
 */
const areaIcons: Record<string, LucideIcon> = {
  'consultoria-juridica': Scale,
  'direito-societario': Building2,
  'direito-para-startups': Rocket,
  'direito-de-ti': Laptop,
  'direito-do-trabalho': UserCheck,
  'propriedade-intelectual': Lightbulb,
  'direito-de-patentes': Award,
  'direito-das-coisas': House,
  'planejamento-patrimonial': Vault,
}

export function getAreaIcon(slug?: string): LucideIcon {
  return (slug && areaIcons[slug]) || Scale
}

/** Espessura única em todos os ícones do site — traço fino, alinhado à tipografia. */
export const ICON_STROKE = 1.75
