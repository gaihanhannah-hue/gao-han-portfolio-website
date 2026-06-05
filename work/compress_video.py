import cv2
import os

INPUT = "public/assets/serpentine-robot.mp4"
OUTPUT = "public/assets/serpentine-robot-compressed.mp4"

cap = cv2.VideoCapture(INPUT)
fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
cap.release()

orig_size = os.path.getsize(INPUT) / (1024 * 1024)
print(f"Original: {w}x{h}, {fps:.1f}fps, {total_frames} frames, {orig_size:.1f}MB")

# Target: max 640px wide, 15fps, moderate quality
TARGET_W = min(w, 640)
scale = TARGET_W / w
TARGET_H = int(h * scale)
# Ensure even dimensions (required by some codecs)
TARGET_W = TARGET_W if TARGET_W % 2 == 0 else TARGET_W + 1
TARGET_H = TARGET_H if TARGET_H % 2 == 0 else TARGET_H + 1
TARGET_FPS = min(fps, 15)
FRAME_SKIP = max(1, int(fps / TARGET_FPS))

print(f"Target: {TARGET_W}x{TARGET_H}, {TARGET_FPS}fps (skip every {FRAME_SKIP} frames)")

fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # MPEG-4
out = cv2.VideoWriter(OUTPUT, fourcc, TARGET_FPS, (TARGET_W, TARGET_H))

cap = cv2.VideoCapture(INPUT)
frame_idx = 0
written = 0
while True:
    ret, frame = cap.read()
    if not ret:
        break
    if frame_idx % FRAME_SKIP == 0:
        resized = cv2.resize(frame, (TARGET_W, TARGET_H), interpolation=cv2.INTER_AREA)
        out.write(resized)
        written += 1
    frame_idx += 1
    if frame_idx % 50 == 0:
        print(f"  processing... {frame_idx}/{total_frames}")

cap.release()
out.release()

new_size = os.path.getsize(OUTPUT) / (1024 * 1024)
print(f"Compressed: {TARGET_W}x{TARGET_H}, {written} frames, {new_size:.1f}MB ({orig_size/new_size:.1f}x smaller)")

# Replace original with compressed
os.replace(OUTPUT, INPUT)
print(f"Replaced {INPUT} with compressed version")
