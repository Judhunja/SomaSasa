/**
 * Footer Component for SomaNow
 * Contains app info, links, and contact details
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../contexts/I18nContext'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-kenya-brown text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-kenya-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EH</span>
              </div>
              <span className="ml-2 text-xl font-bold">SomaNow</span>
            </div>
            <p className="text-kenya-cream text-sm mb-4 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-kenya-cream hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                className="text-kenya-cream hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-kenya-cream hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2.2c2.4 0 2.688.009 3.638.052.878.04 1.354.187 1.671.31.42.163.72.358 1.035.673.315.315.51.615.673 1.035.123.317.27.793.31 1.671.043.95.052 1.238.052 3.638s-.009 2.688-.052 3.638c-.04.878-.187 1.354-.31 1.671-.163.42-.358.72-.673 1.035-.315.315-.615.51-1.035.673-.317.123-.793.27-1.671.31-.95.043-1.238.052-3.638.052s-2.688-.009-3.638-.052c-.878-.04-1.354-.187-1.671-.31a2.8 2.8 0 01-1.035-.673 2.8 2.8 0 01-.673-1.035c-.123-.317-.27-.793-.31-1.671-.043-.95-.052-1.238-.052-3.638s.009-2.688.052-3.638c.04-.878.187-1.354.31-1.671.163-.42.358-.72.673-1.035.315-.315.615-.51 1.035-.673.317-.123.793-.27 1.671-.31.95-.043 1.238-.052 3.638-.052zM10 0C7.556 0 7.249.01 6.289.054 5.331.098 4.677.25 4.105.473a4.412 4.412 0 00-1.592 1.04A4.412 4.412 0 001.473 3.105C1.25 3.677 1.098 4.331 1.054 5.289.01 6.249 0 6.556 0 10s.01 3.751.054 4.711c.044.958.196 1.612.419 2.184.23.592.538 1.096 1.04 1.592.496.502 1 .81 1.592 1.04.572.223 1.226.375 2.184.419C6.249 19.99 6.556 20 10 20s3.751-.01 4.711-.054c.958-.044 1.612-.196 2.184-.419a4.412 4.412 0 001.592-1.04c.502-.496.81-1 1.04-1.592.223-.572.375-1.226.419-2.184.044-.96.054-1.267.054-4.711s-.01-3.751-.054-4.711c-.044-.958-.196-1.612-.419-2.184a4.412 4.412 0 00-1.04-1.592A4.412 4.412 0 0016.895 1.473C16.323 1.25 15.669 1.098 14.711 1.054 13.751.01 13.444 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-kenya-cream hover:text-white transition-colors text-sm">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="text-kenya-cream hover:text-white transition-colors text-sm">
                  {t('footer.subjects')}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-kenya-cream hover:text-white transition-colors text-sm">
                  {t('footer.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-kenya-cream hover:text-white transition-colors text-sm">
                  {t('footer.pricing')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-kenya-cream hover:text-white transition-colors text-sm">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-kenya-cream hover:text-white transition-colors text-sm">
                  {t('footer.helpCenter')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-kenya-cream hover:text-white transition-colors text-sm">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <a href="tel:+254700354688" className="text-kenya-cream hover:text-white transition-colors text-sm">
                  {t('footer.phone')}: +254 700 SOMANOW
                </a>
              </li>
              <li>
                <a href="mailto:support@somanow.ke" className="text-kenya-cream hover:text-white transition-colors text-sm">
                  {t('footer.email')}: support@somanow.ke
                </a>
              </li>
              <li>
                <Link to="/ussd-guide" className="text-kenya-cream hover:text-white transition-colors text-sm">
                  {t('footer.ussdGuide')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-kenya-yellow border-opacity-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link to="/privacy" className="text-kenya-cream hover:text-white transition-colors text-sm">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-kenya-cream hover:text-white transition-colors text-sm">
                {t('footer.terms')}
              </Link>
              <Link to="/accessibility" className="text-kenya-cream hover:text-white transition-colors text-sm">
                {t('footer.accessibility')}
              </Link>
            </div>
            <div className="text-kenya-cream text-sm">
              © 2024 SomaNow. {t('footer.allRightsReserved')}
            </div>
          </div>
        </div>

        {/* Kenya SDG note */}
        <div className="mt-6 text-center">
          <p className="text-kenya-cream text-xs">
            {t('footer.sdgNote')} | {t('footer.madeInKenya')} 🇰🇪
          </p>
        </div>
      </div>
    </footer>
  )
}
