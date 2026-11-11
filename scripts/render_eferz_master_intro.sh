#!/usr/bin/env bash
set -e

WORK_DIR="/tmp/eferz_render"
rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR"

echo "=== 1. Synthesizing High-Fidelity Cinematic Sound Design ==="
# 25.0s master cinematic soundtrack
ffmpeg -y \
  -f lavfi -i "sine=frequency=44:duration=25.0" \
  -f lavfi -i "anoisesrc=d=25.0:c=pink:r=44100:a=0.35" \
  -f lavfi -i "sine=frequency=128:duration=25.0" \
  -f lavfi -i "sine=frequency=64:duration=25.0" \
  -f lavfi -i "sine=frequency=432:duration=25.0" \
  -filter_complex "
    [0:a]volume=0.85,lowpass=f=110[sub];
    [1:a]bandpass=f=550:width_type=h:w=450,volume='if(lt(t,4.8),0.35,if(lt(t,9.6),0.5,if(lt(t,14.8),0.65,if(lt(t,19.8),0.75,0.95))))'[plasma];
    [2:a]volume=0.3,lowpass=f=260[ambient];
    [3:a]volume='if(between(t,18.0,22.0),1.4*(t-18.0)/4.0,if(between(t,22.0,24.8),1.8*exp(-2.5*(t-22.0)),0))',lowpass=f=160[warp_boom];
    [4:a]volume='if(between(t,21.8,25.0),0.35*exp(-1.0*(t-21.8)),0)'[celestial];
    [sub][plasma][ambient][warp_boom][celestial]amix=inputs=5:duration=first:dropout_transition=2,volume=1.4[out]
  " -map "[out]" "$WORK_DIR/soundtrack.wav"

echo "=== 2. Scene 1: Earth Orbit (0.0s - 4.8s) ==="
ffmpeg -y -loop 1 -i public/cinematic/eferz_scene1_earth.jpg -t 4.8 -vf "
  scale=3840:2160,
  zoompan=z='min(zoom+0.0008,1.25)':x='iw/2-(iw/zoom/2)+on*0.35':y='ih/2-(ih/zoom/2)':d=144:s=1920x1080:fps=30,
  fade=t=in:st=0:d=0.8,fade=t=out:st=4.2:d=0.6
" -c:v libx264 -pix_fmt yuv420p -b:v 8M -preset fast "$WORK_DIR/part1.mp4"

echo "=== 3. Scene 2: Saturn Rings (4.8s - 9.6s) ==="
ffmpeg -y -loop 1 -i public/cinematic/eferz_scene2_saturn.jpg -t 4.8 -vf "
  scale=3840:2160,
  zoompan=z='min(zoom+0.0012,1.30)':x='iw/2-(iw/zoom/2)-on*0.5':y='ih/2-(ih/zoom/2)+on*0.15':d=144:s=1920x1080:fps=30,
  fade=t=in:st=0:d=0.5,fade=t=out:st=4.2:d=0.6
" -c:v libx264 -pix_fmt yuv420p -b:v 8M -preset fast "$WORK_DIR/part2.mp4"

echo "=== 4. Scene 3: Nebula & Asteroids (9.6s - 14.8s) ==="
ffmpeg -y -loop 1 -i public/cinematic/eferz_scene3_nebula.jpg -t 5.2 -vf "
  scale=3840:2160,
  zoompan=z='min(zoom+0.0016,1.38)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)-on*0.25':d=156:s=1920x1080:fps=30,
  fade=t=in:st=0:d=0.5,fade=t=out:st=4.6:d=0.6
" -c:v libx264 -pix_fmt yuv420p -b:v 8M -preset fast "$WORK_DIR/part3.mp4"

echo "=== 5. Scene 4: Jupiter Flyby (14.8s - 19.8s) ==="
ffmpeg -y -loop 1 -i public/cinematic/eferz_scene4_jupiter.jpg -t 5.0 -vf "
  scale=3840:2160,
  zoompan=z='min(zoom+0.0015,1.32)':x='iw/2-(iw/zoom/2)+on*0.6':y='ih/2-(ih/zoom/2)+on*0.2':d=150:s=1920x1080:fps=30,
  fade=t=in:st=0:d=0.5,fade=t=out:st=4.4:d=0.6
" -c:v libx264 -pix_fmt yuv420p -b:v 8M -preset fast "$WORK_DIR/part4.mp4"

echo "=== 6. Scene 5: Wormhole Warp Singularity (19.8s - 25.0s) ==="
ffmpeg -y -loop 1 -i public/cinematic/eferz_scene5_wormhole.jpg -t 5.2 -vf "
  scale=3840:2160,
  zoompan=z='min(zoom+0.0035,1.60)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=156:s=1920x1080:fps=30,
  fade=t=in:st=0:d=0.4,fade=t=out:st=4.6:d=0.6
" -c:v libx264 -pix_fmt yuv420p -b:v 10M -preset fast "$WORK_DIR/part5.mp4"

echo "=== 7. Assembling Master Cut ==="
cat << 'CONCAT_EOF' > "$WORK_DIR/concat.txt"
file 'part1.mp4'
file 'part2.mp4'
file 'part3.mp4'
file 'part4.mp4'
file 'part5.mp4'
CONCAT_EOF

ffmpeg -y -f concat -safe 0 -i "$WORK_DIR/concat.txt" -c copy "$WORK_DIR/video_sequence.mp4"

echo "=== 8. Muxing 1080p Master Video with Audio ==="
ffmpeg -y -i "$WORK_DIR/video_sequence.mp4" -i "$WORK_DIR/soundtrack.wav" \
  -c:v copy -c:a aac -b:a 320k -shortest "$WORK_DIR/master_eferz_cinematic_1080p.mp4"

echo "=== 9. Deploying to Public and Dist Assets ==="
cp "$WORK_DIR/master_eferz_cinematic_1080p.mp4" public/videos/intro_cinematic.mp4
cp "$WORK_DIR/master_eferz_cinematic_1080p.mp4" public/cinematic/intro_cinematic.mp4

mkdir -p dist/videos dist/cinematic
cp "$WORK_DIR/master_eferz_cinematic_1080p.mp4" dist/videos/intro_cinematic.mp4
cp "$WORK_DIR/master_eferz_cinematic_1080p.mp4" dist/cinematic/intro_cinematic.mp4

# High-res poster
cp public/cinematic/eferz_scene1_earth.jpg public/videos/intro_poster.jpg
cp public/cinematic/eferz_scene1_earth.jpg dist/videos/intro_poster.jpg

echo "SUCCESS: Master High-Quality EFerz Cinematic Intro rendered and deployed!"
ls -lh public/videos/intro_cinematic.mp4
