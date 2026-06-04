from pathlib import Path
from statistics import median

from PIL import Image

src_dir = Path("public/assets/stickers")

# Native image coordinates for the small forehead / between-eye dots.
targets = {
    "reading": [(708, 322, 6)],
    "guitar": [(673, 247, 6), (686, 263, 6)],
    "robotics": [(739, 295, 6)],
    "pid": [(444, 358, 6)],
}


def sample_skin(im, cx, cy, inner=10, outer=24):
    pixels = im.load()
    w, h = im.size
    samples = []
    for y in range(max(0, cy - outer), min(h, cy + outer + 1)):
        for x in range(max(0, cx - outer), min(w, cx + outer + 1)):
            dx, dy = x - cx, y - cy
            dist2 = dx * dx + dy * dy
            if inner * inner <= dist2 <= outer * outer:
                r, g, b, a = pixels[x, y]
                if a > 180 and r > 175 and g > 115 and b > 75 and r >= g and g >= b * 0.72:
                    samples.append((r, g, b))
    if not samples:
        return (237, 178, 130)
    return tuple(int(median(channel)) for channel in zip(*samples))


def cover_dot(im, cx, cy, radius):
    pixels = im.load()
    skin = sample_skin(im, cx, cy)
    w, h = im.size
    for y in range(max(0, cy - radius * 2), min(h, cy + radius * 2 + 1)):
        for x in range(max(0, cx - radius * 2), min(w, cx + radius * 2 + 1)):
            dx, dy = x - cx, y - cy
            dist = (dx * dx + dy * dy) ** 0.5
            if dist > radius * 1.8:
                continue
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            if dist <= radius:
                strength = 1.0
            else:
                strength = max(0.0, 1.0 - (dist - radius) / (radius * 0.8))
            nr = int(r * (1 - strength) + skin[0] * strength)
            ng = int(g * (1 - strength) + skin[1] * strength)
            nb = int(b * (1 - strength) + skin[2] * strength)
            pixels[x, y] = (nr, ng, nb, a)


for name, points in targets.items():
    image = Image.open(src_dir / f"{name}.png").convert("RGBA")
    for x, y, radius in points:
        cover_dot(image, x, y, radius)
    image.save(src_dir / f"{name}.png")
    print(f"cleaned {name}")
