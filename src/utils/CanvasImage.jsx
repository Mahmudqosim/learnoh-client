import { useCallback, useEffect, useRef } from "react"

export default function CanvasImage({
  source,
  setSelectedFile,
  type,
}) {
  const canvasRef = useRef(null)

  const resizeImage = useCallback(
    (
      /* imageW: number,
      imageH: number, */
      originalWidthToHeightRatio,
      activeImage
    ) => {
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      const IMAGE_HEIGHT = type === "profile" ? 130 : 170
      if (!context) return

      const heightValue =  IMAGE_HEIGHT
      const widthValue = IMAGE_HEIGHT * originalWidthToHeightRatio
      // const heightValue = imageH > IMAGE_HEIGHT ? IMAGE_HEIGHT : imageH
      /* const widthValue =
        imageH > IMAGE_HEIGHT
          ? IMAGE_HEIGHT * originalWidthToHeightRatio
          : imageW */

      canvas.width = widthValue
      canvas.height = heightValue

      context.drawImage(
        activeImage,
        0,
        0,
        Math.floor(widthValue),
        Math.floor(heightValue)
      )

      setSelectedFile(canvas.toDataURL())
    },
    [setSelectedFile, type]
  )

  useEffect(() => {
    const activeImage = new Image()

    activeImage.addEventListener("load", () => {
      let originalWidthToHeightRatio = activeImage.width / activeImage.height

      resizeImage(
        /* activeImage.width,
        activeImage.height, */
        originalWidthToHeightRatio,
        activeImage
      )
    })

    if (!source) return

    activeImage.src = source.toString()
  }, [resizeImage, setSelectedFile, source, type])

  return (
    <canvas
      width="1200"
      height="900"
      className="w-full hidden"
      ref={canvasRef}
    ></canvas>
  )
}
