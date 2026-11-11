#!/usr/bin/env bash
set -e

mkdir -p /tmp/ultra_cine
FONT="/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

echo "=== 1. Generating Master Cinematic Audio Track ==="
# Synthesize rich multi-layered Hollywood trailer sound design (20 seconds):
# Track 1: Sub-bass rumble (45Hz + 60Hz) with swell
# Track 2: Hypersonic atmospheric fire / rocket thrust (filtered pink noise + resonant sweep)
# Track 3: Supersonic boom transient at t=7.5s (cloud dive)
# Track 4: Ocean jet flyby roar at t=11.2s
# Track 5: Energy charge riser from t=14.0s to 17.5s
# Track 6: Monumental Climax Impact (Braam + sub-drop + harmonic chime) at t=17.5s
ffmpeg -y \
  -f lavfi -i "sine=frequency=48:duration=22.0" \
  -f lavfi -i "anoisesrc=d=22.0:c=pink:r=44100:a=0.35" \
  -f lavfi -i "sine=frequency=180:duration=22.0" \
  -f lavfi -i "sine=frequency=55:duration=22.0" \
  -f lavfi -i "sine=frequency=440:duration=22.0" \
  -filter_complex "
    [0:a]volume=0.85,lowpass=f=120[sub];
    [1:a]volume='if(lt(t,3.8),0.12,if(lt(t,7.6),0.85,if(lt(t,11.2),0.55,if(lt(t,14.8),0.45,if(lt(t,17.5),0.75,0.2)))))',bandpass=f=600:width_type=h:w=500[thrust];
    [2:a]volume='if(between(t,7.4,8.2),0.9*exp(-4*(t-7.4)),0)',lowpass=f=350[boom1];
    [3:a]volume='if(between(t,17.4,21.5),1.2*exp(-0.8*(t-17.4)),0)'[braam];
    [4:a]volume='if(between(t,17.5,21.0),0.4*exp(-1.2*(t-17.5)),0)'[chime];
    [sub][thrust][boom1][braam][chime]amix=inputs=5:duration=first:dropout_transition=2,volume=1.3[out]
  " -map "[out]" /tmp/ultra_cine/audio.wav

echo "=== 2. Creating Scene 1: Deep Cosmos & Saturn Flyby (0s - 3.8s) ==="
ffmpeg -y -loop 1 -i public/cinematic/shot1_space_ultra.jpg -t 3.8 -vf "
  scale=8000:-1,
  zoompan=z='min(zoom+0.0012,1.35)':x='iw/2-(iw/zoom/2)+on*0.4':y='ih/2-(ih/zoom/2)':d=114:s=1920x1080:fps=30,
  drawtext=fontfile='${FONT}':text='EFORTS ORBITER // ORBITAL RECON // DEEP SPACE':fontcolor=white@0.85:fontsize=22:x=70:y=h-90:shadowcolor=black@0.8:shadowx=2:shadowy=2,
  drawtext=fontfile='${FONT}':text='TRAJECTORY: LOCKED // INBOUND TO TERRA-1':fontcolor=0x38bdf8@0.9:fontsize=18:x=70:y=h-62:shadowcolor=black@0.8:shadowx=2:shadowy=2,
  fade=t=in:st=0:d=0.8,fade=t=out:st=3.2:d=0.6
" -c:v libx264 -pix_fmt yuv420p -preset fast /tmp/ultra_cine/scene1.mp4

echo "=== 3. Creating Scene 2: Hypersonic Atmospheric Entry (3.8s - 7.6s) ==="
# Includes camera vibration/jitter to simulate extreme hypersonic reentry
ffmpeg -y -loop 1 -i public/cinematic/shot2_reentry_ultra.jpg -t 3.8 -vf "
  scale=8000:-1,
  zoompan=z='min(zoom+0.0022,1.45)':x='iw/2-(iw/zoom/2)+sin(on*0.8)*12':y='ih/2-(ih/zoom/2)+cos(on*0.9)*10':d=114:s=1920x1080:fps=30,
  drawtext=fontfile='${FONT}':text='CRITICAL REENTRY // MACH 25.4':fontcolor=0xec3935@0.95:fontsize=24:x=70:y=h-90:shadowcolor=black@0.8:shadowx=2:shadowy=2,
  drawtext=fontfile='${FONT}':text='PLASMA SHEATH ACTIVE // SHIELD TEMP: 2,850°C':fontcolor=white@0.85:fontsize=18:x=70:y=h-62:shadowcolor=black@0.8:shadowx=2:shadowy=2,
  fade=t=in:st=0:d=0.5,fade=t=out:st=3.3:d=0.5
" -c:v libx264 -pix_fmt yuv420p -preset fast /tmp/ultra_cine/scene2.mp4

echo "=== 4. Creating Scene 3: Supersonic Cloud Dive (7.6s - 11.2s) ==="
ffmpeg -y -loop 1 -i public/cinematic/shot3_clouds_ultra.jpg -t 3.6 -vf "
  scale=8000:-1,
  zoompan=z='min(zoom+0.0035,1.55)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+on*0.8':d=108:s=1920x1080:fps=30,
  drawtext=fontfile='${FONT}':text='ATMOSPHERIC PENETRATION // ALTITUDE: 8,400M':fontcolor=0x38bdf8@0.95:fontsize=22:x=70:y=h-90:shadowcolor=black@0.8:shadowx=2:shadowy=2,
  drawtext=fontfile='${FONT}':text='VOLUMETRIC CLOUD DIVE // SONIC BOOM CONFIRMED':fontcolor=white@0.85:fontsize=18:x=70:y=h-62:shadowcolor=black@0.8:shadowx=2:shadowy=2,
  fade=t=in:st=0:d=0.4,fade=t=out:st=3.1:d=0.5
" -c:v libx264 -pix_fmt yuv420p -preset fast /tmp/ultra_cine/scene3.mp4

echo "=== 5. Creating Scene 4: Island Supersonic Swoop (11.2s - 14.8s) ==="
ffmpeg -y -loop 1 -i public/cinematic/shot4_island_ultra.jpg -t 3.6 -vf "
  scale=8000:-1,
  zoompan=z='min(zoom+0.0018,1.40)':x='iw/2-(iw/zoom/2)-on*0.6':y='ih/2-(ih/zoom/2)+on*0.3':d=108:s=1920x1080:fps=30,
  drawtext=fontfile='${FONT}':text='TERRAIN CONTOUR FLIGHT // ISLAND PROXIMITY':fontcolor=white@0.95:fontsize=22:x=70:y=h-90:shadowcolor=black@0.8:shadowx=2:shadowy=2,
  drawtext=fontfile='${FONT}':text='SURFACE ALTITUDE: 220M // VOLCANIC SECTOR':fontcolor=0x4ade80@0.9:fontsize=18:x=70:y=h-62:shadowcolor=black@0.8:shadowx=2:shadowy=2,
  fade=t=in:st=0:d=0.4,fade=t=out:st=3.1:d=0.5
" -c:v libx264 -pix_fmt yuv420p -preset fast /tmp/ultra_cine/scene4.mp4

echo "=== 6. Creating Scene 5: Crater Approach & Tech Sanctum (14.8s - 17.6s) ==="
ffmpeg -y -loop 1 -i public/cinematic/shot5_crater_ultra.jpg -t 2.8 -vf "
  scale=8000:-1,
  zoompan=z='min(zoom+0.0025,1.38)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)-on*0.4':d=84:s=1920x1080:fps=30,
  drawtext=fontfile='${FONT}':text='CRATER SANCTUM DETECTED // VTOL MODE ENGAGED':fontcolor=0xec3935@0.95:fontsize=22:x=70:y=h-90:shadowcolor=black@0.8:shadowx=2:shadowy=2,
  drawtext=fontfile='${FONT}':text='POWER CONVERGENCE INITIATING...':fontcolor=white@0.85:fontsize=18:x=70:y=h-62:shadowcolor=black@0.8:shadowx=2:shadowy=2,
  fade=t=in:st=0:d=0.3,fade=t=out:st=2.4:d=0.4
" -c:v libx264 -pix_fmt yuv420p -preset fast /tmp/ultra_cine/scene5.mp4

echo "=== 7. Creating Scene 6: Grand Climax with Official EForts Logo (17.6s - 22.0s) ==="
# Overlay official EForts Logo in center of radiant energy vortex with subtle pulse and glowing flare
ffmpeg -y -loop 1 -i public/cinematic/shot6_climax_ultra.jpg -loop 1 -i public/textures/eferz_logo.png -filter_complex "
  [0:v]scale=8000:-1,zoompan=z='min(zoom+0.0012,1.30)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=132:s=1920x1080:fps=30[bg];
  [1:v]scale=460:460[logo];
  [bg][logo]overlay=(W-w)/2:(H-h)/2:eval=init,
  drawtext=fontfile='${FONT}':text='EFORTS':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=h/2+240:shadowcolor=0xec3935@0.9:shadowx=0:shadowy=0,
  drawtext=fontfile='${FONT}':text='INNOVATION BEYOND BOUNDARIES':fontcolor=0xec3935@0.95:fontsize=20:x=(w-text_w)/2:y=h/2+305:shadowcolor=black@0.8:shadowx=1:shadowy=1,
  fade=t=in:st=0:d=0.5,fade=t=out:st=3.6:d=0.8
" -t 4.4 -c:v libx264 -pix_fmt yuv420p -preset fast /tmp/ultra_cine/scene6.mp4

echo "=== 8. Concatenating Scenes ==="
cat << 'EOF' > /tmp/ultra_cine/concat.txt
file '/tmp/ultra_cine/scene1.mp4'
file '/tmp/ultra_cine/scene2.mp4'
file '/tmp/ultra_cine/scene3.mp4'
file '/tmp/ultra_cine/scene4.mp4'
file '/tmp/ultra_cine/scene5.mp4'
file '/tmp/ultra_cine/scene6.mp4'
EOF

ffmpeg -y -f concat -safe 0 -i /tmp/ultra_cine/concat.txt -c copy /tmp/ultra_cine/video_only.mp4

echo "=== 9. Muxing Master Video with Master Audio ==="
ffmpeg -y -i /tmp/ultra_cine/video_only.mp4 -i /tmp/ultra_cine/audio.wav \
  -c:v copy -c:a aac -b:a 256k -shortest /tmp/ultra_cine/master_ultra_cinematic.mp4

echo "=== 10. Copying to Public and Dist Directories ==="
cp /tmp/ultra_cine/master_ultra_cinematic.mp4 public/cinematic/intro_cinematic.mp4
cp /tmp/ultra_cine/master_ultra_cinematic.mp4 public/videos/intro_cinematic.mp4

mkdir -p dist/cinematic dist/videos
cp /tmp/ultra_cine/master_ultra_cinematic.mp4 dist/cinematic/intro_cinematic.mp4
cp /tmp/ultra_cine/master_ultra_cinematic.mp4 dist/videos/intro_cinematic.mp4

# Also copy separate clips to public/cinematic for individual viewing
cp /tmp/ultra_cine/scene1.mp4 public/cinematic/clip1.mp4
cp /tmp/ultra_cine/scene2.mp4 public/cinematic/clip2.mp4
cp /tmp/ultra_cine/scene3.mp4 public/cinematic/clip3.mp4
cp /tmp/ultra_cine/scene4.mp4 public/cinematic/clip4.mp4
cp /tmp/ultra_cine/scene5.mp4 public/cinematic/clip5.mp4
cp /tmp/ultra_cine/scene6.mp4 public/cinematic/clip6.mp4

echo "Master Ultra 3D Cinematic Video successfully generated!"
ls -lh public/cinematic/intro_cinematic.mp4
