import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Nhung Nguyen</h3>
            <p className="text-gray-300 mb-4">Senior M&E & Gender Inclusion Consultant</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">nhungnt102@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+1-672-999-7979</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Vancouver, Canada</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/expertise" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Expertise
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Work & Impact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/nhungnguyen7979/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Nhung Nguyen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
