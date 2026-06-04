from pathlib import Path
from statistics import median

from PIL import Image

src_dir = Path("public/assets/stickers")

targets = {
    "reading": [(707, 319)],
    "guitar": [(675, 255), (691, 273)],
    "robotics": [(746, 292)],
    "pid": [(443, 360)],
}


def find_dark_center(im, cx, cy, search_radius=28):
    pixels = im.load()
    w, h = im.size
    best = (cx, cy, 999)
    for y in range(max(0, cy - search_radius), min(h, cy + search_radius + 1)):
        for x in range(max(0, cx - search_radius), min(w, cx + search_radius + 1)):
            r, g, b, a = pixels[x, y]
            if a < 180:
                continue
            lum = r * 0.299 + g * 0.587 + b * 0.114
            # Mole pixels are tiny, dark, and usually less saturated than hair/line art.
            dist = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
            score = lum + dist * 2.0
            if lum < 95 and score < best[2]:
                best = (x, y, score)
    return best[0], best[1]


def sample_skin(im, cx, cy, inner=16, outer=38):
    pixels = im.load()
    w, h = im.size
    samples = []
    for y in range(max(0, cy - outer), min(h, cy + outer + 1)):
        for x in range(max(0, cx - outer), min(w, cx + outer + 1)):
            dx, dy = x - cx, y - cy
            dist2 = dx * dx + dy * dy
            if inner * inner <= dist2 <= outer * outer:
                r, g, b, a = pixels[x, y]
                if a > 180 and r > 175 and g > 115 and b > 80 and r >= g and g >= b * 0.72:
                    lum = r * 0.299 + g * 0.587 + b * 0.114
                    if lum > 145:
                        samples.append((r, g, b))
    if not samples:
        return (236, 174, 126)
    return tuple(int(median(channel)) for channel in zip(*samples))


def paint_skin(im, cx, cy, radius=13):
    pixels = im.load()
    skin = sample_skin(im, cx, cy)
    w, h = im.size
    for y in range(max(0, cy - radius), min(h, cy + radius + 1)):
        for x in range(max(0, cx - radius), min(w, cx + radius + 1)):
            dx, dy = x - cx, y - cy
            dist = (dx * dx + dy * dy) ** 0.5
            if dist > radius:
                continue
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            feather = 1.0 if dist <= radius * 0.55 else max(0.0, 1.0 - (dist - radius * 0.55) / (radius * 0.45))
            nr = int(r * (1 - feather) + skin[0] * feather)
            ng = int(g * (1 - feather) + skin[1] * feather)
            nb = int(b * (1 - feather) + skin[2] * feather)
            pixels[x, y] = (nr, ng, nb, a)


for name, centers in targets.items():
    path = src_dir / f"{name}.png"
    image = Image.open(path).convert("RGBA")
    actual = []
    for cx, cy in centers:
        x, y = find_dark_center(image, cx, cy)
        actual.append((x, y))
        paint_skin(image, x, y)
    image.save(path)
    print(name, actual)
