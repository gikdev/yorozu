import { ClipboardIcon, DownloadSimpleIcon } from '@phosphor-icons/react'
import { createFileRoute, linkOptions } from '@tanstack/react-router'
import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import { btn } from '#/common/atoms/btn'
import { AppBar } from '#/common/molecules/page-header'

const TITLE = 'QR Generator'

export const Route = createFileRoute('/apps/qr-generator')({
  head: () => ({ meta: [{ title: TITLE }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const [text, setText] = useState('')

  function downloadPng() {
    const svg = document.getElementById('qr-svg')
    if (!svg) return
    const xml = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)

      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = 'qr-code.png'
      a.click()
    }
    img.src = url
  }

  function copyText() {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 max-w-240 mx-auto w-full'>
      <AppBar title={TITLE} parentPath={linkOptions({ to: '/apps' })}>
        <button
          className={btn({ isIcon: true })}
          onClick={downloadPng}
          disabled={!text}
          aria-label='Download as PNG'
          type='button'
        >
          <DownloadSimpleIcon size={24} />
        </button>
      </AppBar>

      <main className='flex-1 flex flex-col gap-4 p-4 overflow-y-auto min-h-0 items-center'>
        <div className='flex w-full gap-2'>
          <input
            type='text'
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='Text or URL...'
            className='flex-1 bg-mist-900 rounded px-3 py-2 text-sm outline-none'
          />
          <button
            className={btn({ isIcon: true })}
            type='button'
            onClick={copyText}
            disabled={!text}
            aria-label='Copy text'
          >
            <ClipboardIcon size={24} />
          </button>
        </div>

        {text && (
          <div className='bg-white p-4 rounded'>
            <QRCodeSVG id='qr-svg' value={text} size={256} />
          </div>
        )}
      </main>
    </div>
  )
}
