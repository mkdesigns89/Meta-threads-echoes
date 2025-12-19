import Image from "next/image"

export default function EchoesIconSVG({ className = "w-[35px] h-[35px]" }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/icons/meta-echoes-icon.webp"
        alt="Meta Echoes"
        width={35}
        height={35}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
