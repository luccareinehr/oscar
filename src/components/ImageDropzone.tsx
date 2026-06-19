import { useRef } from 'react'
import { useT } from '../i18n/LanguageContext'

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
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-graphite-600 bg-graphite-900 p-5 text-center transition-colors hover:border-gold-500/60"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageName ?? 'selected'}
            className="max-h-44 rounded-md object-contain"
          />
        ) : (
          <>
            <span className="text-[15px] font-medium text-neutral-300">
              {t('image.dropTitle')}
            </span>
            <span className="mt-1 text-[13px] text-neutral-500">{t('image.dropSub')}</span>
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
            className="ml-2 shrink-0 text-neutral-400 underline hover:text-gold-400"
          >
            {t('image.remove')}
          </button>
        </div>
      )}
    </div>
  )
}
