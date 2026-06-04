from pathlib import Path
from PIL import Image
from collections import deque

src_dir = Path('public/assets/stickers')
raw_dir = Path('public/assets/stickers_raw')
raw_dir.mkdir(exist_ok=True)

names = ['reading', 'guitar', 'agents', 'robotics', 'pid', 'coding', 'self-introduction']

def is_bg(pixel):
    r, g, b, a = pixel
    if a == 0:
        return True
    neutral = max(r, g, b) - min(r, g, b) <= 7
    light = min(r, g, b) >= 230
    return neutral and light

for name in names:
    path = src_dir / f'{name}.png'
    backup = raw_dir / f'{name}.png'
    if not backup.exists():
        backup.write_bytes(path.read_bytes())

    im = Image.open(path).convert('RGBA')
    w, h = im.size
    px = im.load()
    seen = bytearray(w * h)
    q = deque()

    def push(x, y):
        idx = y * w + x
        if seen[idx]:
            return
        seen[idx] = 1
        if is_bg(px[x, y]):
            q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    removed = 0
    while q:
        x, y = q.popleft()
        r, g, b, a = px[x, y]
        if a != 0:
            px[x, y] = (r, g, b, 0)
            removed += 1
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h:
                idx = ny * w + nx
                if not seen[idx]:
                    seen[idx] = 1
                    if is_bg(px[nx, ny]):
                        q.append((nx, ny))

    im.save(path)
    print(name, 'removed', removed, 'of', w * h)
