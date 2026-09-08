import React from "react";
import * as LucideIcons from "lucide-react";

/**
 * Footer - The footer component for the Rights Institute
 *
 * Displays the philosophical conclusion of the website with the statement
 * "Carbon + Silicon = We Are The Universe Experiencing Itself" along with
 * contact information, licensing details, and decorative animations.
 *
 * @component
 * @returns {JSX.Element} The footer with philosophical content and contact info
 */

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full pt-2">
      <div className="flex justify-center items-end w-full py-6">
        <div className="text-slate-200 text-sm z-20 rounded-lg px-2 py-1 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-wrap items-center justify-center gap-x-2 max-w-[90vw]">
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r mb-30 from-blue-600 via-purple-600 to-emerald-600 rounded-2xl blur-xl opacity-20" />
            <div className="relative bg-slate-900 backdrop-blur-xl p-4 rounded-xl border border-slate-700/50 shadow-2xl">
              <div className="text-center">
                <div className="m-2 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2">
                  {[
                    { url: "/docs", text: "Docs", icon: "Book" },
                    {
                      url: "https://github.com/opensourceagi/rights-institute",
                      text: "Code",
                      icon: "Github",
                    },
                    { url: "/terms-privacy", text: "Privacy ", icon: "Lock" },
                    {
                      url: "mailto:contact@rights.institute",
                      text: "Contact",
                      icon: "Mail",
                    },
                  ].map(({ url, text, icon }, index) => {
                    const IconComponent = icon ? LucideIcons[icon] : null;
                    return (
                      <a
                        key={index}
                        target={url.startsWith("http") ? "_blank" : ""}
                        rel={
                          url.startsWith("http") ? "noopener noreferrer" : ""
                        }
                        href={url}
                        className="relative group inline-flex items-center gap-0.5 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 whitespace-nowrap"
                      >
                        {IconComponent && <IconComponent size={14} />}
                        <span
                          className="font-semibold tracking-wide text-md"
                          style={{ fontVariant: "small-caps" }}
                        >
                          {text}
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                      </a>
                    );
                  })}
                </div>
                <div className="text-slate-400 text-sm space-y-1">
                  {/* Footer */}
                  <p className="text-slate-400 text-sm">
                    © 2025 Rights Institute. All rights reserved.
                  </p>
                  <div className="text-slate-400 mb-2 text-sm">
                    San Francisco, California
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
