from pathlib import Path

from PIL import Image, ImageDraw

items = {
    "reading": ((520, 210, 860, 520), [(708, 324)]),
    "guitar": ((570, 170, 910, 500), [(674, 264), (690, 276)]),
    "robotics": ((610, 210, 900, 500), [(747, 297)]),
    "pid": ((300, 250, 610, 570), [(451, 363)]),
}

thumbs = []
for name, (box, points) in items.items():
    im = Image.open(f"public/assets/stickers/{name}.png").convert("RGBA")
    crop = im.crop(box)
    bg = Image.new("RGBA", crop.size, (250, 246, 238, 255))
    bg.alpha_composite(crop)
    draw = ImageDraw.Draw(bg)
    for gx in range(0, crop.width, 20):
        draw.line((gx, 0, gx, crop.height), fill=(255, 0, 0, 60))
    for gy in range(0, crop.height, 20):
        draw.line((0, gy, crop.width, gy), fill=(255, 0, 0, 60))
    for x, y in points:
        lx, ly = x - box[0], y - box[1]
        draw.ellipse((lx - 7, ly - 7, lx + 7, ly + 7), outline=(0, 180, 255, 255), width=3)
    draw.text((8, 8), name, fill=(0, 0, 0, 255))
    thumbs.append(bg.resize((510, 465)))

sheet = Image.new("RGBA", (1020, 930), (250, 246, 238, 255))
for index, thumb in enumerate(thumbs):
    sheet.alpha_composite(thumb, ((index % 2) * 510, (index // 2) * 465))

Path("work/qa").mkdir(parents=True, exist_ok=True)
sheet.save("work/qa/face-crops-grid.png")
