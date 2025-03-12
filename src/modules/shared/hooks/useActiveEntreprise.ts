import { useParams } from './useParams'
import ComptaIcon from '../assets/icons/sidebar/compta.svg'
import PaieIcon from '../assets/icons/sidebar/paie.svg'
import FacturationIcon from '../assets/icons/sidebar/facturation.svg'
import FicheIcon from '../assets/icons/sidebar/fiche.svg'
import DashboardIcon from '../assets/icons/sidebar/home.svg'
import SettingsIcon from '../assets/icons/sidebar/settings.svg'

export function useActiveEntreprise() {
  const params = useParams()

  return [
    {
      key: 'dashboard',
      br: false,
      link: `/entreprise/${params.id}/dashboard`,
      img: DashboardIcon,
      label: 'dashboard',
      disabled: true,
    },
    {
      key: '/accounting/account-plan',
      br: false,
      link: '/accounting/account-plan',
      img: ComptaIcon,
      label: 'Comptabilité',
    },
    {
      key: '/paie',
      br: false,
      link: '/paie',
      img: PaieIcon,
      label: 'Paie',
      disabled: true,
    },
    {
      key: '/facturation',
      br: false,
      link: 'facturation',
      img: FacturationIcon,
      label: 'Facturation',
      disabled: true,
    },
    {
      key: 'br',
      br: true,
      link: '',
      icon: null,
      label: '',
    },
    {
      key: 'fiche-entreprise',
      br: false,
      link: `/entreprise/${params.id}/fiche`,
      img: FicheIcon,
      label: 'Fiche entreprise',
    },
    {
      key: '/entreprise/Gestion',
      br: false,
      link: '/entreprise/Gestion',
      img: SettingsIcon,
      label: 'Gestion',
      children: [
        { key: '5', label: 'Utilisateurs', link: `/entreprise/${params.id}/utilisateurs` },
        { key: '6', label: 'Roles', link: `/entreprise/${params.id}/roles` },
      ],
    },
  ]
}
