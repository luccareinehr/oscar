import { useRef } from 'react'
import { useT } from '../i18n/LanguageContext'
import { DropzoneSketch } from './illustrations'

interface Props {
  imageName: string | null
  imageUrl: string | null
  onPick: (file: File) => void
  onClear: () => void
}

export function ImageDropzone({ imageName, imageUrl, onPick, onClear }: Props) {
  const { t } = useT()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0]
    if (file && file.type.startsWith('image/')) onPick(file)
  }

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        className="relative flex min-h-[150px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-white/20 bg-white/[0.015] p-6 text-center transition-colors hover:border-white/40 hover:bg-white/[0.03]"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageName ?? 'selected'}
            className="max-h-48 rounded-md object-contain"
          />
        ) : (
          <>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-light leading-none text-neutral-300">+</span>
              <span className="mt-3 text-[15px] font-medium text-neutral-200">
                {t('image.dropTitle')}
              </span>
              <span className="mt-1 text-[13px] text-neutral-500">{t('image.dropSub')}</span>
            </div>
            <DropzoneSketch className="pointer-events-none absolute right-6 top-1/2 hidden h-24 w-48 -translate-y-1/2 text-neutral-400 sm:block" />
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {imageName && (
        <div className="mt-2 flex items-center justify-between text-[13px] text-neutral-500">
          <span className="truncate">
            {t('image.selected')} {imageName}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            className="ml-2 shrink-0 text-neutral-400 underline hover:text-neutral-100"
          >
            {t('image.remove')}
          </button>
        </div>
      )}
    </div>
  )
}
