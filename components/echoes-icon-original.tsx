// This is a direct implementation of the SVG you provided
export default function EchoesIconOriginal({ className = "w-[17px] h-[17px]" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
      <g>
        <path
          d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm0,336c-70.58,0-128-57.42-128-128s57.42-128,128-128,128,57.42,128,128S326.58,384,256,384Z"
          fill="currentColor"
        />
        <path
          d="M363.31,227.31l-96,96a16,16,0,0,1-22.62,0l-96-96a16,16,0,0,1,22.62-22.62L256,289.37l84.69-84.68a16,16,0,0,1,22.62,22.62Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
