import imageio_ffmpeg
import subprocess
import os

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
INPUT = "photo_video/蛇形机器人.mp4"
OUTPUT = "public/assets/serpentine-robot.mp4"

orig_size = os.path.getsize(INPUT) / (1024 * 1024)
print(f"Original size: {orig_size:.1f}MB")

# Resize to 640px wide, 15fps, H.264 with CRF quality
cmd = [
    ffmpeg, "-y",
    "-i", INPUT,
    "-vf", "scale=640:-2,fps=15",
    "-c:v", "libx264",
    "-crf", "28",
    "-preset", "fast",
    "-an",
    "-movflags", "+faststart",
    OUTPUT
]
print("Running:", " ".join(cmd))
result = subprocess.run(cmd, capture_output=True, text=True)
if result.returncode != 0:
    print("STDERR:", result.stderr[-500:])
    print("STDOUT:", result.stdout[-500:])
else:
    new_size = os.path.getsize(OUTPUT) / (1024 * 1024)
    print(f"Compressed: {new_size:.1f}MB ({orig_size/new_size:.1f}x smaller)")
    print("Done!")
