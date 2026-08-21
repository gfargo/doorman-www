import { CopyableCommand } from '@/components/CopyableCommand'

const INSTALL_SKILL_COMMAND = [{ value: 'npx', command: 'npx skills add gfargo/skills --skill doorman' }]

const SESSION = `> Block bad bots hitting /wp-login.php

Using skill: doorman
$ doorman add --interactive
$ doorman validate
$ doorman sync

✓ Added rule "Block Bad Bots"
✓ Config valid
✓ Synced to Vercel Firewall`

export function AgentSkill() {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className="min-w-0">
        <p className="max-w-[480px] text-[#8b98a5]">
          Doorman ships as an Agent Skill: a packaged set of instructions your coding agent reads before it touches a
          firewall rule. Install it once, then ask in plain English. Your agent runs the right doorman commands
          instead of guessing at flags.
        </p>
        <p className="mt-4 font-[family-name:var(--font-space-mono)] text-[0.72rem] uppercase tracking-wide text-[#4e5a66]">
          Works with Claude Code, Cursor, Codex, and other Agent Skills&#8209;compatible tools.
        </p>
        <div className="mt-6 max-w-lg">
          <CopyableCommand command={INSTALL_SKILL_COMMAND} dark />
        </div>
      </div>

      <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#1c1c2c] shadow-2xl shadow-black/40">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <pre className="overflow-x-auto whitespace-pre px-5 py-4 font-[family-name:var(--font-space-mono)] text-[0.75rem] leading-relaxed text-[#8b98a5]">
          {SESSION}
        </pre>
      </div>
    </div>
  )
}
