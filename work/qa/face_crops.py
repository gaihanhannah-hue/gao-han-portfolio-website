from pathlib import Path

from PIL import Image, ImageDraw

files = ["reading", "guitar", "agents", "robotics", "pid", "coding"]
boxes = {
    "reading": (520, 210, 860, 520),
    "guitar": (570, 170, 910, 500),
    "agents": (950, 360, 1250, 690),
    "robotics": (610, 210, 900, 500),
    "pid": (300, 250, 610, 570),
    "coding": (780, 250, 1120, 600),
}

thumbs = []
for name in files:
    im = Image.open(f"public/assets/stickers/{name}.png").convert("RGBA")
    crop = im.crop(boxes[name]).resize((340, 310))
    bg = Image.new("RGBA", crop.size, (250, 246, 238, 255))
    bg.alpha_composite(crop)
    draw = ImageDraw.Draw(bg)
    draw.text((8, 8), name, fill=(0, 0, 0, 255))
    thumbs.append(bg)
    print(name, im.size, im.getchannel("A").getextrema())

sheet = Image.new("RGBA", (680, 930), (250, 246, 238, 255))
for index, thumb in enumerate(thumbs):
    sheet.alpha_composite(thumb, ((index % 2) * 340, (index // 2) * 310))

Path("work/qa").mkdir(parents=True, exist_ok=True)
sheet.save("work/qa/face-crops.png")
