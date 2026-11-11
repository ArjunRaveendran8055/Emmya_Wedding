// Render the invitation's share card and icons using existing photos and native type.
// Run from the repository root: swift scripts/create-share-assets.swift
import AppKit

func text(_ value: String, x: CGFloat, y: CGFloat, width: CGFloat, size: CGFloat, color: NSColor, serif: Bool = false) {
    let font = (serif ? NSFont(name: "Georgia", size: size) : NSFont.systemFont(ofSize: size)) ?? NSFont.systemFont(ofSize: size)
    (value as NSString).draw(in: NSRect(x: x, y: y, width: width, height: size * 2.5), withAttributes: [.font: font, .foregroundColor: color])
}
func render(width: Int, height: Int, file: String, draw: () -> Void) {
    let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
    draw()
    NSGraphicsContext.restoreGraphicsState()
    try! bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: file))
}
let gold = NSColor(srgbRed: 0.76, green: 0.58, blue: 0.25, alpha: 1)
let ink = NSColor(srgbRed: 0.20, green: 0.17, blue: 0.13, alpha: 1)
render(width: 1200, height: 630, file: "public/social/emmya-manu-betrothal.png") {
    NSColor(srgbRed: 0.98, green: 0.96, blue: 0.91, alpha: 1).setFill()
    NSRect(x: 0, y: 0, width: 1200, height: 630).fill()
    let photo = NSImage(contentsOfFile: "public/images/emmya-manu-06.jpg")!
    let sourceHeight = photo.size.width * 630 / 540
    photo.draw(in: NSRect(x: 660, y: 0, width: 540, height: 630), from: NSRect(x: 0, y: (photo.size.height - sourceHeight) / 2, width: photo.size.width, height: sourceHeight), operation: .copy, fraction: 1)
    gold.setFill()
    NSRect(x: 50, y: 530, width: 65, height: 2).fill()
    text("BETROTHAL INVITATION", x: 50, y: 445, width: 560, size: 18, color: gold)
    text("Emmya Sunny", x: 46, y: 315, width: 600, size: 54, color: ink, serif: true)
    text("& Manu Antony", x: 46, y: 245, width: 600, size: 54, color: ink, serif: true)
    text("14 NOVEMBER 2026  ·  11:30 AM", x: 50, y: 180, width: 570, size: 20, color: ink)
    text("Christ The King Church", x: 50, y: 115, width: 560, size: 23, color: ink, serif: true)
    text("Krishnankotta", x: 50, y: 78, width: 560, size: 21, color: ink, serif: true)
    text("With love, blessings & prayers", x: 50, y: 24, width: 560, size: 16, color: gold)
}
for (size, name) in [(32, "favicon-32.png"), (180, "apple-touch-icon.png")] {
    render(width: size, height: size, file: "public/" + name) {
        ink.setFill()
        NSRect(x: 0, y: 0, width: size, height: size).fill()
        let font = NSFont(name: "Georgia-Bold", size: CGFloat(size) * 0.29)!
        let label = "M&E" as NSString
        let attributes: [NSAttributedString.Key: Any] = [.font: font, .foregroundColor: gold]
        let bounds = label.size(withAttributes: attributes)
        label.draw(at: NSPoint(x: (CGFloat(size) - bounds.width) / 2, y: (CGFloat(size) - bounds.height) / 2), withAttributes: attributes)
    }
}
