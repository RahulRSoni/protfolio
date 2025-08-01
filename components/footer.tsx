
import { siteConfig } from "@/config/site";


export const Footer = () => {

   return (
        <footer className="relative z-30 bg-[#0a0f1d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info - Takes full width on mobile, spans 2 cols on larger screens */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2d4f4a] to-[#8db1a4] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="text-2xl font-bold text-white">Digivo</span>
              </div>
              <p className="text-[#b8bcc3] leading-relaxed mb-6 max-w-md text-base lg:text-lg">
                Crafting digital excellence through innovation, expertise, and unwavering commitment to transforming your vision into reality.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href={siteConfig.links.twitter}
                  className="w-10 h-10 bg-[#2d4f4a]/20 rounded-lg flex items-center justify-center text-[#b8bcc3] hover:text-white hover:bg-[#8db1a4] transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href={siteConfig.links.github}
                  className="w-10 h-10 bg-[#2d4f4a]/20 rounded-lg flex items-center justify-center text-[#b8bcc3] hover:text-white hover:bg-[#8db1a4] transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.links.discord}
                  className="w-10 h-10 bg-[#2d4f4a]/20 rounded-lg flex items-center justify-center text-[#b8bcc3] hover:text-white hover:bg-[#8db1a4] transition-all duration-300 hover:scale-110"
                  aria-label="Discord"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Services Links */}
            <div className="sm:col-span-1">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4 lg:mb-6">Services</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/services#web" 
                    className="text-[#b8bcc3] hover:text-[#8db1a4] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#8db1a4] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Web Development
                  </a>
                </li>
                <li>
                  <a 
                    href="/services#mobile" 
                    className="text-[#b8bcc3] hover:text-[#8db1a4] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#8db1a4] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a 
                    href="/services#design" 
                    className="text-[#b8bcc3] hover:text-[#8db1a4] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#8db1a4] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    UI/UX Design
                  </a>
                </li>
                <li>
                  <a 
                    href="/services#cloud" 
                    className="text-[#b8bcc3] hover:text-[#8db1a4] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#8db1a4] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Cloud Solutions
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div className="sm:col-span-1">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4 lg:mb-6">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#8db1a4] mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-[#b8bcc3]">Bhopal, Madhya Pradesh</p>
                    <p className="text-[#b8bcc3]">India</p>
                  </div>
                </li>
                <li>
                  <a 
                    href="mailto:hello@digitalcraft.com" 
                    className="text-[#b8bcc3] hover:text-[#8db1a4] transition-colors duration-300 flex items-center group"
                  >
                    <svg className="w-4 h-4 text-[#8db1a4] mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    hello@digitalcraft.com
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact" 
                    className="text-[#b8bcc3] hover:text-[#8db1a4] transition-colors duration-300 flex items-center group"
                  >
                    <svg className="w-4 h-4 text-[#8db1a4] mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Get in Touch
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Border and Copyright */}
          <div className="border-t border-[#2d4f4a]/30 mt-8 lg:mt-12 pt-6 lg:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-[#b8bcc3] text-sm lg:text-base text-center md:text-left">
              © {new Date().getFullYear()} Digivo. All rights reserved.

              </p>
              <p className="text-[#8db1a4] text-sm lg:text-base font-medium text-center md:text-right">
                Crafting digital excellence with passion and precision.
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#8db1a4] rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-[#2d4f4a] rounded-lg rotate-45"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-[#8db1a4] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-12 h-12 bg-[#2d4f4a] rounded-lg rotate-12"></div>
        </div>
      </footer>
    
    )
 

}