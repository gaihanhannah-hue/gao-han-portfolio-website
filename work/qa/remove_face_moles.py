from pathlib import Path
from statistics import median

from PIL import Image

src_dir = Path("public/assets/stickers")
backup_dir = Path("public/assets/stickers_before_mole_cleanup")
backup_dir.mkdir(parents=True, exist_ok=True)

# Coordinates are in each sticker image's native pixel space.
points = {
    "reading": [(707, 319, 12)],
    "guitar": [(675, 255, 11), (691, 273, 11)],
    "robotics": [(746, 292, 12)],
    "pid": [(443, 360, 12)],
}


def skin_sample(im, cx, cy, inner=13, outer=30):
    w, h = im.size
    pixels = im.load()
    samples = []
    for y in range(max(0, cy - outer), min(h, cy + outer + 1)):
        for x in range(max(0, cx - outer), min(w, cx + outer + 1)):
            dx, dy = x - cx, y - cy
            dist2 = dx * dx + dy * dy
            if inner * inner <= dist2 <= outer * outer:
                r, g, b, a = pixels[x, y]
                if a > 180 and r > 165 and g > 105 and b > 70 and r >= g >= b * 0.75:
                    if max(r, g, b) - min(r, g, b) > 18:
                        samples.append((r, g, b))
    if not samples:
        return (238, 174, 126)
    return tuple(int(median(channel)) for channel in zip(*samples))


def blend_patch(im, cx, cy, radius):
    pixels = im.load()
    skin = skin_sample(im, cx, cy)
    w, h = im.size
    for y in range(max(0, cy - radius * 2), min(h, cy + radius * 2 + 1)):
        for x in range(max(0, cx - radius * 2), min(w, cx + radius * 2 + 1)):
            dx, dy = x - cx, y - cy
            dist = (dx * dx + dy * dy) ** 0.5
            if dist > radius * 1.75:
                continue
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            # Feathered center-heavy blend: strong on the dot, soft at the edge.
            strength = max(0.0, 1.0 - dist / (radius * 1.75))
            strength = min(1.0, strength * strength * 1.65)
            nr = int(r * (1 - strength) + skin[0] * strength)
            ng = int(g * (1 - strength) + skin[1] * strength)
            nb = int(b * (1 - strength) + skin[2] * strength)
            pixels[x, y] = (nr, ng, nb, a)


for name, mole_points in points.items():
    path = src_dir / f"{name}.png"
    backup = backup_dir / f"{name}.png"
    if not backup.exists():
        backup.write_bytes(path.read_bytes())

    image = Image.open(path).convert("RGBA")
    for x, y, radius in mole_points:
        blend_patch(image, x, y, radius)
    image.save(path)
    print(f"cleaned {name}: {len(mole_points)} point(s)")
