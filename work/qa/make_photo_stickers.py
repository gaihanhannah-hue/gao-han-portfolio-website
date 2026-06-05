from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageFilter, ImageOps


ROOT = Path("public/assets/stickers")
OUT_ROOT = Path("public/assets/stickers")


def sorted_images(folder: Path) -> list[Path]:
    return sorted(folder.glob("*.jpg"), key=lambda p: p.name.lower())


def find_source_folders() -> tuple[Path, Path]:
    folders = [p for p in ROOT.iterdir() if p.is_dir()]
    grad = next(p for p in folders if len(sorted_images(p)) == 8)
    life = next(p for p in folders if len(sorted_images(p)) == 19)
    return grad, life


def background_mask(im: Image.Image) -> Image.Image:
    rgb = im.convert("RGB")
    arr = np.asarray(rgb).astype(np.int16)
    h, w, _ = arr.shape

    edge = max(6, min(w, h) // 80)
    corners = np.concatenate(
        [
            arr[: edge * 2, : edge * 2].reshape(-1, 3),
            arr[: edge * 2, -edge * 2 :].reshape(-1, 3),
            arr[-edge * 2 :, : edge * 2].reshape(-1, 3),
            arr[-edge * 2 :, -edge * 2 :].reshape(-1, 3),
        ],
        axis=0,
    )
    prototypes = [np.median(corners, axis=0)]

    border = np.concatenate(
        [
            arr[:edge, :, :].reshape(-1, 3),
            arr[-edge:, :, :].reshape(-1, 3),
            arr[:, :edge, :].reshape(-1, 3),
            arr[:, -edge:, :].reshape(-1, 3),
        ],
        axis=0,
    )
    bright = border[np.min(border, axis=1) > 205]
    if len(bright) > 40:
        prototypes.append(np.median(bright, axis=0))

    prototypes = np.asarray(prototypes)
    channel_range = arr.max(axis=2) - arr.min(axis=2)
    min_channel = arr.min(axis=2)
    max_channel = arr.max(axis=2)
    dist = np.min(np.linalg.norm(arr[:, :, None, :] - prototypes[None, None, :, :], axis=3), axis=2)
    likely_bg = (
        (dist < 58)
        | ((min_channel > 232) & (channel_range < 58))
        | ((max_channel > 240) & (channel_range < 82))
    )

    seen = np.zeros((h, w), dtype=bool)
    bg = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()

    def push(x: int, y: int) -> None:
        if seen[y, x] or not likely_bg[y, x]:
            return
        seen[y, x] = True
        bg[y, x] = True
        q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not seen[ny, nx]:
                seen[ny, nx] = True
                if likely_bg[ny, nx]:
                    bg[ny, nx] = True
                    q.append((nx, ny))

    alpha = Image.fromarray(np.where(bg, 0, 255).astype(np.uint8), "L")
    alpha = alpha.filter(ImageFilter.MedianFilter(5))
    alpha = alpha.filter(ImageFilter.GaussianBlur(1.2))
    return alpha


def stickerize(src: Path, dest: Path, max_side: int = 920) -> None:
    im = Image.open(src).convert("RGBA")
    im.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
    alpha = background_mask(im)
    subject = im.copy()
    subject.putalpha(alpha)

    bbox = alpha.getbbox()
    if bbox:
        pad = 44
        left = max(bbox[0] - pad, 0)
        top = max(bbox[1] - pad, 0)
        right = min(bbox[2] + pad, subject.width)
        bottom = min(bbox[3] + pad, subject.height)
        subject = subject.crop((left, top, right, bottom))
        alpha = alpha.crop((left, top, right, bottom))

    pad = 54
    canvas_size = (subject.width + pad * 2, subject.height + pad * 2)
    canvas = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    base_alpha = Image.new("L", canvas_size, 0)
    base_alpha.paste(alpha, (pad, pad))

    stroke_outer = base_alpha.filter(ImageFilter.MaxFilter(37))
    stroke_inner = base_alpha.filter(ImageFilter.MaxFilter(13))
    stroke = ImageChops.subtract(stroke_outer, base_alpha)
    stroke_soft = ImageChops.subtract(stroke_inner, base_alpha)

    shadow = Image.new("RGBA", canvas_size, (68, 52, 34, 0))
    shadow_alpha = stroke_outer.filter(ImageFilter.GaussianBlur(16))
    shadow_alpha = ImageChops.offset(shadow_alpha, 10, 16)
    shadow.putalpha(ImageOps.autocontrast(shadow_alpha).point(lambda v: int(v * 0.22)))
    canvas.alpha_composite(shadow)

    outer = Image.new("RGBA", canvas_size, (255, 250, 240, 0))
    outer.putalpha(stroke.point(lambda v: int(v * 0.98)))
    canvas.alpha_composite(outer)

    tint = Image.new("RGBA", canvas_size, (239, 123, 101, 0))
    tint.putalpha(stroke_soft.point(lambda v: int(v * 0.18)))
    canvas.alpha_composite(tint)

    canvas.alpha_composite(subject, (pad, pad))
    dest.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(dest)


def main() -> None:
    grad, life = find_source_folders()
    jobs = [
        (grad, OUT_ROOT / "grad-cutouts", "grad"),
        (life, OUT_ROOT / "life-cutouts", "life"),
    ]
    for folder, out_dir, prefix in jobs:
        for index, src in enumerate(sorted_images(folder), start=1):
            dest = out_dir / f"{prefix}-{index}.png"
            stickerize(src, dest)
            print(dest)


if __name__ == "__main__":
    main()
