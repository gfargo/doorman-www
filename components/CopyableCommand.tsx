'use client'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select-bare'
import { useToast } from '@/hooks/use-toast'
import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  command: {
    value: string
    command: string
  }[]
  /** Homepage dark theme. Only restyles the trigger/pre chrome — the select popover keeps its default (light) theme. */
  dark?: boolean
}

export function CopyableCommand({ command, dark = false }: Props) {
  const { toast } = useToast()

  const [selectedManager, setSelectedManager] = useState<Props['command'][0]>()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    const textToCopy = (selectedManager && selectedManager?.command) || command[0]?.command || ''
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      toast({
        title: 'Copied to clipboard',
        description: 'The command has been copied to your clipboard.',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  useEffect(() => {
    if (selectedManager) {
      copyToClipboard()
    }

    return () => {
      setCopied(false)
    }
  }, [selectedManager])

  return (
    <div className="w-full max-w-lg">
      <div className="relative">
        <pre
          className={
            dark
              ? 'overflow-x-auto rounded-[4px] border border-[#2a333c] bg-[#131920] p-4 pr-12 font-mono text-sm text-[#e7edf3] select-all'
              : 'overflow-x-auto bg-gray-100 p-4 rounded-md font-mono text-sm select-all'
          }
          onClick={(event) => {
            event.currentTarget.focus()
            copyToClipboard()
          }}
        >
          {(selectedManager && selectedManager.command) || command[0]?.command || ''}
        </pre>
        <div className="absolute top-2 right-2">
          <Select
            value={selectedManager?.value || command[0]?.value || ''}
            onValueChange={(value) => {
              setSelectedManager(command.find((cmd) => cmd.value === value) || command[0])
            }}
          >
            <SelectTrigger className={dark ? 'text-sm border-[#2a333c] text-[#8b98a5]' : 'text-sm'}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </SelectTrigger>
            <SelectContent>
              {command.map((pm) => (
                <SelectItem
                  aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                  key={pm.value}
                  value={pm.value}
                  className="text-sm"
                >
                  {pm.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
