import {
    Book,
    ChevronRight,
    DownloadCloudIcon,
    ExternalLink,
    FileJsonIcon,
    FolderSyncIcon,
    GitBranch,
    ListTodoIcon,
    ScanEyeIcon,
    Shield,
    Workflow,
} from 'lucide-react'
import Link from 'next/link'
import { CopyableCommand } from '../components/CopyableCommand'
// import { Marquee } from "../components/ui/marquee";
import { FeatureCard } from '@/components/FeatureCard'
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern'
import BlurIn from '@/components/ui/blur-in'
import BoxReveal from '@/components/ui/box-reveal'
import { Button } from '@/components/ui/button'
import DotPattern from '@/components/ui/dot-pattern'
import HyperText from '@/components/ui/hyper-text'
import Meteors from '@/components/ui/meteors'
import { cn } from '@/lib/utils'
import { DoubleArrowDownIcon } from '@radix-ui/react-icons'
import { FeatureSection } from '../components/FeatureSection'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doorman.griffen.codes'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Doorman',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Cross-platform',
  description:
    'Manage Vercel and Cloudflare WAF rules as code with version control and CI/CD integration. CLI tool for syncing, downloading, validating, and deploying multi-provider security configurations.',
  url: siteUrl,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Unified Vercel and Cloudflare WAF management',
    'Version control and code review for firewall rules',
    'CI/CD automation for security deployments',
    'Provider-aware sync and drift detection',
    'Download and audit rule history',
    'Pre-configured policy templates',
  ],
  softwareHelp: {
    '@type': 'WebPage',
    url: `${siteUrl}/docs`,
  },
  installUrl: 'https://www.npmjs.com/package/@gfargo/doorman',
  screenshot: `${siteUrl}/og-image.jpg`,
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn('[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ')}
      />
      <main className="">
        <section className="container px-4 md:px-0 mx-auto relative text-center py-24 mb-16 overflow-hidden">
          <div className="relative z-10">
            <div className="mx-auto mb-8 w-fit rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Doorman 2.0 <span className="ml-1 font-normal text-emerald-600">Now with Cloudflare WAF support</span>
            </div>
            <BlurIn
              word="Where W▲F meets .config"
              className="text-6xl font-bold mb-6 text-black dark:text-white bg-gradient-to-b from-black to-gray-900/90 bg-clip-text text-center leading-none text-transparent dark:from-white dark:to-slate-900/10"
            />
            <p className="text-lg text-gray-600 mt-8 md:mt-0 max-w-2xl mx-auto">
              Manage{' '}
              <Link
                className="text-gray-800 underline hover:text-gray-400 hover:no-underline"
                href="https://vercel.com/docs/security/vercel-firewall"
                target="_blank"
              >
                Vercel Firewall
              </Link>{' '}
              or{' '}
              <Link
                className="text-gray-800 underline hover:text-gray-400 hover:no-underline"
                href="https://developers.cloudflare.com/waf"
                target="_blank"
              >
                Cloudflare security policies
              </Link>{' '}
              from a single file.
            </p>
            <div className="mt-10 mb-12 max-w-2xl mx-auto rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-[1px] shadow-lg">
              <div className="rounded-3xl bg-slate-950/90 px-6 py-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Doorman 2.0 — Available Now
                </div>
                <p className="mt-1.5 text-sm text-slate-100">
                  Multi-provider WAF automation wired directly into your version control and CI/CD workflows.
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <CopyableCommand
                command={[
                  { value: 'npm', command: 'npm install @gfargo/doorman' },
                  { value: 'yarn', command: 'yarn add @gfargo/doorman' },
                  { value: 'pnpm', command: 'pnpm add @gfargo/doorman' },
                  { value: 'bun', command: 'bun add @gfargo/doorman' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="container px-4 md:px-0 mx-auto grid grid-cols-1 justify-items-center lg:grid-cols-3 gap-8 space-y-8 lg:space-y-0 mb-24 xl:px-4">
          <FeatureCard
            icon={<GitBranch className="w-6 h-6" />}
            title="Multi-Provider Control"
            description="Ship one policy pack to Vercel and Cloudflare with provider-specific overrides when you need them."
            index={0}
          />
          <FeatureCard
            icon={<Workflow className="w-6 h-6" />}
            title="Automated Workflows"
            description="Promote firewall changes through pull requests, previews, and CI/CD with guardrails built in."
            index={1}
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Confident Governance"
            description="Audit every change, enforce review policies, and keep environments consistent across providers."
            index={2}
          />
        </section>

        <section className="container px-4 md:px-0  mx-auto mb-24 pb-16 relative overflow-hidden">
          <AnimatedGridPattern
            numSquares={100}
            maxOpacity={0.15}
            duration={3}
            repeatDelay={1}
            className={cn(
              '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] z-0',
              'inset-x-0 inset-y-[-30%] h-[180%] skew-y-12',
            )}
          />

          <div className="my-16 text-center text-gray-500 flex self-center flex-col justify-center items-center">
            <HyperText className="text-xs font-bold dark:text-white w-auto" text={'FEATURES'} />
            <Link href="#features">
              <DoubleArrowDownIcon className="w-3 h-3 mt-3" />
            </Link>
          </div>
          <div className="space-y-24 relative z-10 pb-24 lg:px-8" id="features">
            <FeatureSection
              title="Sync Changes"
              description="Synchronize rule packs to Vercel and Cloudflare from the same config. Catch drift with provider-aware diffs before anything ships."
              icon={<FolderSyncIcon className="w-6 h-6" />}
              imageSrc="/gifs/sync.gif"
              imageWidth={1900}
              imageHeight={700}
              command={[
                { value: 'npm', command: 'npx @gfargo/doorman sync' },
                { value: 'yarn', command: 'npx @gfargo/doorman sync' },
                {
                  value: 'pnpm',
                  command: 'pnpm dlx @gfargo/doorman@latest sync',
                },
                {
                  value: 'bun',
                  command: 'bunx --bun @gfargo/doorman@latest sync',
                },
              ]}
            />
            <FeatureSection
              title="Download Configs"
              direction="right"
              description="Export deployed rules from each provider into versioned config files. Keep Cloudflare and Vercel in lockstep with Git history."
              icon={<DownloadCloudIcon className="w-6 h-6" />}
              imageSrc="/gifs/download.gif"
              imageWidth={1900}
              imageHeight={800}
              command={[
                { value: 'npm', command: 'npx @gfargo/doorman download' },
                { value: 'yarn', command: 'npx @gfargo/doorman download' },
                {
                  value: 'pnpm',
                  command: 'pnpm dlx @gfargo/doorman@latest download',
                },
                {
                  value: 'bun',
                  command: 'bunx --bun @gfargo/doorman@latest download',
                },
              ]}
            />
            <FeatureSection
              title="List Rules & IPs"
              description="Inspect deployed policies with human-friendly tables or JSON. Filter by provider, environment, and rule group in seconds."
              icon={<ListTodoIcon className="w-6 h-6" />}
              imageSrc="/gifs/list.gif"
              imageWidth={1900}
              imageHeight={800}
              command={[
                { value: 'npm', command: 'npx @gfargo/doorman list' },
                { value: 'yarn', command: 'npx @gfargo/doorman list' },
                {
                  value: 'pnpm',
                  command: 'pnpm dlx @gfargo/doorman@latest list',
                },
                {
                  value: 'bun',
                  command: 'bunx --bun @gfargo/doorman@latest list',
                },
              ]}
            />
            <FeatureSection
              title="Validate Rules"
              direction="right"
              description="Validate rule syntax and provider-specific constraints before deployment. Ship with confidence knowing both WAFs will accept the change."
              icon={<ScanEyeIcon className="w-6 h-6" />}
              imageSrc="/gifs/validate.gif"
              imageWidth={1200}
              imageHeight={600}
              command={[
                { value: 'npm', command: 'npx @gfargo/doorman validate' },
                { value: 'yarn', command: 'npx @gfargo/doorman validate' },
                {
                  value: 'pnpm',
                  command: 'pnpm dlx @gfargo/doorman@latest validate',
                },
                {
                  value: 'bun',
                  command: 'bunx --bun @gfargo/doorman@latest validate',
                },
              ]}
            />
            <FeatureSection
              title="Use Templates"
              description="Kickstart new protections with templates tuned for Vercel and Cloudflare. Customize and extend policy packs as your edge footprint grows."
              icon={<FileJsonIcon className="w-6 h-6" />}
              imageSrc="/gifs/template-picker.gif"
              imageWidth={1200}
              imageHeight={600}
              command={[
                { value: 'npm', command: 'npx @gfargo/doorman template' },
                { value: 'yarn', command: 'npx @gfargo/doorman template' },
                {
                  value: 'pnpm',
                  command: 'pnpm dlx @gfargo/doorman@latest template',
                },
                {
                  value: 'bun',
                  command: 'bunx --bun @gfargo/doorman@latest template',
                },
              ]}
            />
          </div>
        </section>

        {/* <section className="mb-16 py-12 bg-gray-50">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Users Say
          </h2>

          <ReviewsMarquee />
        </section> */}

        <section className="bg-slate-950 text-primary-foreground p-8 py-16 text-center relative overflow-hidden">
          <div className="z-0 relative opacity-70">
            <Meteors number={12} />
          </div>
          <div className="z-10 relative">
            <div className="flex flex-col items-center justify-center gap-4">
              <BoxReveal boxColor={'hsl(var(--primary-foreground))'} duration={0.5}>
                <h2 className="text-2xl font-bold">Get Started with Doorman 2.0</h2>
              </BoxReveal>
              <BoxReveal boxColor={'hsl(var(--primary-foreground))'} duration={0.5}>
                <p className="text-gray-400 mb-6">
                  Bring Cloudflare and Vercel WAF automation into the same review process your team already trusts.
                </p>
              </BoxReveal>
              <BoxReveal boxColor={'hsl(var(--primary-foreground))'} duration={0.6}>
                <div className="flex flex-col items-center space-y-8">
                  <div className="flex justify-center space-x-4">
                    <Button asChild variant="outline" className="bg-inherit">
                      <Link href="/docs">
                        <Book className="w-5 h-5 mr-2" />
                        View Docs
                      </Link>
                    </Button>
                    <Button asChild variant="ghost">
                      <Link href="/docs/getting-started">
                        <ChevronRight className="w-5 h-5 mr-2" />
                        Getting Started
                      </Link>
                    </Button>
                  </div>
                  <Link
                    href="https://github.com/gfargo/doorman/tree/main/examples"
                    className="text-slate-600 hover:underline inline-flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    See Example Configurations
                  </Link>
                </div>
              </BoxReveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
