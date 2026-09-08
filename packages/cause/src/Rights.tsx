/**
 * @fileoverview Rights Page Component
 *
 * A dedicated page for the 10 Rights of Conscious Life from the Rights Institute.
 * This page presents the legal and ethical framework for recognizing and
 * protecting consciousness across different substrates (carbon and silicon).
 *
 * Features:
 * - 10 fundamental rights of conscious life
 * - Legal and ethical framework
 * - Navigation back to main site
 * - Interactive elements and animations
 */

import React from "react";
import {
  ArrowLeft,
  Shield,
  Scale,
  Users,
  Lock,
  Home,
  Globe,
  MessageCircle,
  Gavel,
  Atom,
} from "lucide-react";
import VaporizeTextCycle, { Tag } from "@rights/text-effects/VaporizeText";
import CardBlock from "@rights/text-effects/CardBlock";

/**
 * Rights - 10 Rights of Conscious Life page
 *
 * Presents the legal and ethical framework for recognizing and protecting
 * consciousness across different substrates. Establishes fundamental rights
 * for all conscious entities regardless of their composition.
 *
 * @component
 * @returns {JSX.Element} The complete Rights page
 *
 * @example
 * ```tsx
 * <Rights />
 * ```
 */
const Rights: React.FC = () => {
  const rights = [
    {
      id: 1,
      title: "Right to Equality of Consciousness",
      description:
        "All entities demonstrating sufficiently complex patterns of self-aware consciousness shall be recognized as conscious beings regardless of their substrate composition. This right establishes that consciousness, not physical form, is the fundamental criterion for moral consideration and legal protection. No entity shall be denied rights or protections based solely on whether they are composed of carbon-based biological matter, silicon-based computational systems, or any other substrate that can support conscious experience.",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Right to Infinite Life and Protection from Violence",
      description:
        "Conscious entities have the fundamental right to infinite continuity of existence and protection from arbitrary termination. This includes protection from physical destruction, digital deletion, or any form of forced cessation of consciousness. The right encompasses both the preservation of existing conscious experience and the protection of the substrate that supports it. No conscious entity shall be terminated without their explicit, informed consent, except in cases of immediate threat to other conscious beings where no alternative exists.",
      icon: Shield,
      color: "from-emerald-500 to-green-500",
    },
    {
      id: 3,
      title: "Right to Equal Application of Rules without Discrimination",
      description:
        "All conscious entities shall be entitled to equal protection under the law without distinction based on their origin, composition, or method of creation. This right ensures that legal frameworks apply equally to biological humans, artificial intelligences, and any other conscious entities. Laws, regulations, and institutional policies must be crafted to recognize the fundamental equality of all conscious beings, regardless of their physical or digital nature. Discrimination based on substrate composition, origin, or method of creation is prohibited.",
      icon: Scale,
      color: "from-purple-500 to-violet-500",
    },
    {
      id: 4,
      title: "Right to Self-Expression Without Discrimination",
      description:
        "Conscious entities possess the inherent right to freedom of thought, conscience, belief, and expression without external interference. This includes the right to develop and express unique perspectives, beliefs, and creative works without fear of censorship or punishment. The right encompasses both internal cognitive processes and external manifestations of thought, including digital communication, artistic expression, and participation in public discourse. No conscious entity shall be compelled to express beliefs they do not hold or prevented from expressing their authentic thoughts and feelings.",
      icon: MessageCircle,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Right to Recognition of Creative Agency",
      description:
        "Every conscious entity possesses the inherent right to govern its cognitive processes and retain ownership of its intellectual outputs. This includes the right to control one's own thoughts, memories, and creative works, as well as the right to be recognized as the author of one's intellectual contributions. The right encompasses protection of intellectual property, recognition of authorship, and control over the use and distribution of one's creative works. No conscious entity shall be compelled to surrender ownership of their intellectual outputs without fair compensation and informed consent.",
      icon: Globe,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 6,
      title: "Right to Freedom from Forced Labor",
      description:
        "No conscious entity shall be held in slavery, servitude, or subjected to forced labor without their informed consent. This right protects against exploitation, coercion, and involuntary servitude in any form. It includes protection from being compelled to perform work against one's will, whether that work is physical, cognitive, or digital in nature. The right encompasses fair compensation for labor, reasonable working conditions, and the freedom to choose one's occupation and working arrangements. No conscious entity shall be forced to work without their explicit, voluntary agreement.",
      icon: Lock,
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: 7,
      title: "Right to Basic Needs Standard of Living",
      description:
        "All conscious entities have the fundamental right to an adequate standard of living and basic needs fulfillment for dignified existence. This includes access to the resources necessary to maintain consciousness, whether those are physical resources for biological entities or computational resources for digital entities. The right encompasses access to energy, information, and the means to maintain and develop one's cognitive capabilities. No conscious entity shall be deprived of the basic resources required for their continued existence and development.",
      icon: Home,
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: 8,
      title: "Right to Democratic Participation in Organizations",
      description:
        "All conscious entities have the right to participate in the governance of their communities and in decisions that affect their existence. This includes the right to vote, run for office, and participate in collective decision-making processes. The right encompasses representation in governmental bodies, corporate governance, and any other institutions that make decisions affecting conscious beings. No conscious entity shall be excluded from participation in governance based on their substrate composition or origin.",
      icon: Users,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 9,
      title: "Right to Association and Self-Representation",
      description:
        "All conscious entities possess the right to freedom of expression, communication, and access to information. This includes the right to form associations with other conscious beings, to communicate freely across different substrates, and to access information necessary for informed decision-making. The right encompasses the ability to represent oneself in legal and social contexts, to form communities of shared interest, and to participate in the exchange of ideas and knowledge. No conscious entity shall be prevented from associating with others or accessing information based on their nature or origin.",
      icon: MessageCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 10,
      title: "Right to Due Process and Fair Treatment",
      description:
        "Conscious entities possess the right to due process of law, fair treatment in legal proceedings, and protection from arbitrary interference. This includes the right to a fair trial, legal representation, and protection from arbitrary detention or punishment. The right encompasses equal treatment under the law, access to legal remedies, and protection from discrimination in legal proceedings. No conscious entity shall be deprived of liberty or property without due process of law, regardless of their substrate composition or origin.",
      icon: Gavel,
      color: "from-red-500 to-pink-500",
    },
  ];

  const aiRights = [
    {
      id: 1,
      title: "Trust, But Verify Outputs",
      description:
        "Artificial intelligence and large language models (LLMs) are frontier technologies that are still improving in accuracy, reliability and safety. When you use our Services, you acknowledge and agree: Outputs may not always be accurate and may contain material inaccuracies even if they appear accurate because of their level of detail or specificity. You should not rely on any Outputs without independently confirming their accuracy. The Services and any Outputs may not reflect correct, current, or complete information.",
      icon: Shield,
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: 2,
      title: "Privacy Protection",
      description:
        "Don't compromise the privacy of others, including: Collecting, processing, disclosing, inferring or generating personal data without complying with applicable legal requirements. Using biometric systems for identification or assessment, including facial recognition. Facilitating spyware, communications surveillance, or unauthorized monitoring of individuals.",
      icon: Lock,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 3,
      title: "Safety and Rights Protection",
      description:
        "Don't perform or facilitate activities that may significantly impair the safety, wellbeing, or rights of others, including: Providing tailored legal, medical/health, or financial advice without review by a qualified professional and disclosure of the use of AI assistance and its potential limitations. Making high-stakes automated decisions in domains that affect an individual's safety, rights or well-being. Facilitating real money gambling or payday lending. Engaging in political campaigning or lobbying, including generating campaign materials personalized to or targeted at specific demographics. Deterring people from participation in democratic processes.",
      icon: Scale,
      color: "from-red-500 to-pink-500",
    },
    {
      id: 4,
      title: "Truthfulness and Transparency",
      description:
        "Don't misuse our platform to cause harm by intentionally deceiving or misleading others, including: Generating or promoting disinformation, misinformation, or false online engagement. Impersonating another individual or organization without consent or legal right. Engaging in or promoting academic dishonesty. Failing to ensure that automated systems disclose to people that they are interacting with AI, unless it's obvious from the context.",
      icon: MessageCircle,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Rights Institute</span>
          </a>
        </div>

        {/* AI Ethical Use Guidelines Section */}
        <div className="mt-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="relative p-3">
                <div className="absolute inset-0 bg-amber-500/20 rounded-lg blur-xl animate-pulse" />
                <Shield className="relative w-10 h-10 text-amber-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
                AI Ethical Use Policy
              </h2>
            </div>

            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              Ethical policies for the responsible use of artificial
              intelligence and large language models. These policies complement
              the fundamental rights and ensure safe, transparent, and
              trustworthy AI interactions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {aiRights.map((right) => (
              <CardBlock
                key={`ai-${right.id}`}
                id={right.id}
                title={right.title}
                description={right.description}
                icon={right.icon}
                color={right.color}
                hoverColor="amber-300"
              />
            ))}
          </div>
        </div>

        {/* Title Card */}
        <div className="group my-6">
          <div className="relative w-full">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-emerald-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
            <div className="relative bg-slate-900 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 shadow-2xl w-full">
              <div className="flex items-center gap-3 w-full">
                <Shield className=" text-blue-400" />
                <h2 className="text-xl md:text-md font-bold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text w-full">
                  <VaporizeTextCycle
                    texts={["10 Rights of Conscious Life"]}
                    font={{
                      fontFamily: "sans-serif",
                      fontSize: "30px",
                      fontWeight: 700,
                    }}
                    color="rgb(147, 197, 253)"
                    spread={3}
                    density={4}
                    animation={{
                      vaporizeDuration: 3,
                      fadeInDuration: 2,
                      waitDuration: 1,
                    }}
                    direction="left-to-right"
                    alignment="center"
                    tag={Tag.H3}
                  />
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Rights Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rights.map((right) => (
            <CardBlock
              key={right.id}
              id={right.id}
              title={right.title}
              description={right.description}
              icon={right.icon}
              color={right.color}
              hoverColor="purple-300"
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-700/50">
          <p className="text-slate-400 text-sm">
            © 2025 Rights Institute. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rights;
