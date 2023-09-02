import FooterColumn from '../FooterColumn/FooterColumn'
import Logo from '../Logo/Logo'
import './Footer.scss'

const FOOTER_CLEANING_LINKS = [
  { name: 'Регулярная', url: '#' },
  { name: 'Генеральная', url: '#' },
  { name: 'После ремонта', url: '#' },
  { name: 'После праздника', url: '#' },
  { name: 'Мытье окон', url: '#' },
]

const FOOTER_COMPANY_LINKS = [
  { name: 'О компании', url: '#' },
  { name: 'Клинеры', url: '#' },
  { name: 'Отзывы', url: '#' },
  { name: 'Частые вопросы', url: '#' },
]

const FOOTER_CONTACTS = [{ name: '+7 (495) 783-99-00' }]

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo-wrapper">
        <Logo />
      </div>
      <FooterColumn heading="Уборка" items={FOOTER_CLEANING_LINKS} />
      <FooterColumn heading="Компания" items={FOOTER_COMPANY_LINKS} />
      <FooterColumn heading="Контакты" items={FOOTER_CONTACTS} />
    </footer>
  )
}

export default Footer
