import Image from "next/image"

export default function EchoesIcon({ size = 23 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
      <Image src="/icons/echoes-icon-new.png" alt="Echoes" width={size} height={size} className="object-contain" />
    </div>
  )
}
