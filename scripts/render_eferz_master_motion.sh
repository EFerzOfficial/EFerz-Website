#!/usr/bin/env bash
set -e

WORK_DIR="/tmp/eferz_motion_render"
rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR"

FONT="/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

echo "=== 1. Extracting Clean Keyed Spaceship ==="
ffmpeg -y -i src/assets/images/spaceship_greenscreen_1790110588297.jpg \
  -vf "colorkey=0x00FF00:0.35:0.1,format=rgba" "$WORK_DIR/ship_keyed.png"

ffmpeg -y -i "$WORK_DIR/ship_keyed.png" -vf "hflip" "$WORK_DIR/ship_flipped.png"

echo "=== 2. Synthesizing Master Cinematic Soundtrack (22.5s) ==="
ffmpeg -y \
  -f lavfi -i "sine=frequency=45:duration=22.5" \
  -f lavfi -i "anoisesrc=d=22.5:c=pink:r=44100:a=0.35" \
  -f lavfi -i "sine=frequency=130:duration=22.5" \
  -f lavfi -i "sine=frequency=60:duration=22.5" \
  -f lavfi -i "sine=frequency=480:duration=22.5" \
  -filter_complex "
    [0:a]volume=0.85,lowpass=f=100[sub];
    [1:a]bandpass=f=520:width_type=h:w=420,volume='if(lt(t,4.5),0.35,if(lt(t,9.0),0.5,if(lt(t,13.5),0.7,if(lt(t,18.0),0.85,1.1))))'[plasma];
    [2:a]volume=0.32,lowpass=f=240[ambient];
    [3:a]volume='if(between(t,16.5,20.0),1.6*(t-16.5)/3.5,if(between(t,20.0,22.4),1.9*exp(-2.5*(t-20.0)),0))',lowpass=f=170[warp_boom];
    [4:a]volume='if(between(t,19.8,22.5),0.4*exp(-1.1*(t-19.8)),0)'[celestial];
    [sub][plasma][ambient][warp_boom][celestial]amix=inputs=5:duration=first:dropout_transition=2,volume=1.4[out]
  " -map "[out]" "$WORK_DIR/soundtrack.wav"

echo "=== 3. Rendering All 5 Scenes in Parallel (Blazing Fast SIMD) ==="

# SCENE 1: Real NASA Earth Orbital Motion Video + Keyed Starship
(ffmpeg -y \
  -ss 0 -t 4.5 -i public/videos/earth_iss_orbit.mp4 \
  -loop 1 -t 4.5 -i "$WORK_DIR/ship_keyed.png" \
  -filter_complex "
    [0:v]scale=1920:1080,setsar=1[bg];
    [1:v]scale=1050:-1[ship];
    [bg][ship]overlay=x='W*1.08 - t*(W*1.55)/4.5':y='H*0.25 + sin(t*2.4)*35':eval=frame,
    drawtext=fontfile='${FONT}':text='EFERZ-01 // LOW EARTH ORBIT':fontcolor=white@0.9:fontsize=22:x=60:y=h-80:shadowcolor=black@0.9:shadowx=2:shadowy=2,
    drawtext=fontfile='${FONT}':text='ORBITAL VELOCITY: 27,600 KM/H':fontcolor=0x38bdf8@0.9:fontsize=16:x=60:y=h-54:shadowcolor=black@0.9:shadowx=2:shadowy=2,
    fade=t=in:st=0:d=0.7,fade=t=out:st=3.9:d=0.6
  " -c:v libx264 -pix_fmt yuv420p -crf 20 -preset faster -r 30 "$WORK_DIR/scene1.mp4") &

# SCENE 2: Saturn Rings Banking & Ice Particle Drift
(ffmpeg -y \
  -loop 1 -t 4.5 -i public/cinematic/eferz_scene2_saturn.jpg \
  -loop 1 -t 4.5 -i "$WORK_DIR/ship_flipped.png" \
  -filter_complex "
    [0:v]scale=2200:1238,crop=1920:1080:'(in_w-out_w)*(1-t/4.5)':'(in_h-out_h)*(t/4.5)'[bg];
    [1:v]scale=850:-1[ship];
    [bg][ship]overlay=x='-w*0.8 + t*(W*1.4)/4.5':y='H*0.35 + (t/4.5)*H*0.25 + sin(t*3)*20':eval=frame,
    drawtext=fontfile='${FONT}':text='SATURN RING SECTOR // C-RING INTERSECT':fontcolor=white@0.9:fontsize=22:x=60:y=h-80:shadowcolor=black@0.9:shadowx=2:shadowy=2,
    drawtext=fontfile='${FONT}':text='ICE PARTICLES: RAY-TRACED REFLECTION ACTIVE':fontcolor=0xf59e0b@0.9:fontsize=16:x=60:y=h-54:shadowcolor=black@0.9:shadowx=2:shadowy=2,
    fade=t=in:st=0:d=0.5,fade=t=out:st=3.9:d=0.6
  " -c:v libx264 -pix_fmt yuv420p -crf 20 -preset faster -r 30 "$WORK_DIR/scene2.mp4") &

# SCENE 3: Interstellar Nebula & High-Speed Asteroid Flight
(ffmpeg -y \
  -loop 1 -t 4.5 -i public/cinematic/eferz_scene3_nebula.jpg \
  -loop 1 -t 4.5 -i "$WORK_DIR/ship_keyed.png" \
  -filter_complex "
    [0:v]scale=2200:1238,crop=1920:1080:'(in_w-out_w)*0.5':'(in_h-out_h)*(1-t/4.5)'[bg];
    [1:v]scale='750+t*120':-1[ship];
    [bg][ship]overlay=x='W*0.65 - t*140':y='H*0.25 + sin(t*2.8)*25':eval=frame,
    drawtext=fontfile='${FONT}':text='DEEP NEBULA TRAVERSAL // VIOLET ION BURST':fontcolor=white@0.9:fontsize=22:x=60:y=h-80:shadowcolor=black@0.9:shadowx=2:shadowy=2,
    drawtext=fontfile='${FONT}':text='SUB-LIGHT THRUSTERS: 100% MAXIMUM':fontcolor=0xa855f7@0.9:fontsize=16:x=60:y=h-54:shadowcolor=black@0.9:shadowx=2:shadowy=2,
    fade=t=in:st=0:d=0.5,fade=t=out:st=3.9:d=0.6
  " -c:v libx264 -pix_fmt yuv420p -crf 20 -preset faster -r 30 "$WORK_DIR/scene3.mp4") &

# SCENE 4: Jupiter Gravity Assist Slingshot
(ffmpeg -y \
  -loop 1 -t 4.5 -i public/cinematic/eferz_scene4_jupiter.jpg \
  -loop 1 -t 4.5 -i "$WORK_DIR/ship_keyed.png" \
  -filter_complex "
    [0:v]scale=2200:1238,crop=1920:1080:'(in_w-out_w)*(t/4.5)':'(in_h-out_h)*0.5'[bg];
    [1:v]scale=1150:-1[ship];
    [bg][ship]overlay=x='W*1.1 - t*(W*1.65)/4.5':y='H*0.4 - (t/4.5)*H*0.2 + sin(t*2.8)*25':eval=frame,
    drawtext=fontfile='${FONT}':text='JOVIAN GRAVITATIONAL SLINGSHOT':fontcolor=white@0.9:fontsize=22:x=60:y=h-80:shadowcolor=black@0.9:shadowx=2:shadowy=2,
    drawtext=fontfile='${FONT}':text='APPROACHING SINGULARITY EVENT HORIZON':fontcolor=0xec3935@0.95:fontsize=16:x=60:y=h-54:shadowcolor=black@0.9:shadowx=2:shadowy=2,
    fade=t=in:st=0:d=0.5,fade=t=out:st=3.9:d=0.6
  " -c:v libx264 -pix_fmt yuv420p -crf 20 -preset faster -r 30 "$WORK_DIR/scene4.mp4") &

# SCENE 5: Quantum Wormhole Warp Jump & Climax
(ffmpeg -y \
  -loop 1 -t 4.5 -i src/assets/images/warp_tunnel_motion_1790110620439.jpg \
  -filter_complex "
    [0:v]scale=2400:1350,crop=1920:1080:'(in_w-out_w)*0.5 + sin(t*4)*20':'(in_h-out_h)*0.5 + cos(t*4)*15',
    drawtext=fontfile='${FONT}':text='QUANTUM HYPERSPACE TRANSIT':fontcolor=white@0.95:fontsize=24:x=60:y=h-80:shadowcolor=black@0.9:shadowx=2:shadowy=2,
    drawtext=fontfile='${FONT}':text='DESTINATION REACHED // EFERZ DIGITAL SANCTUM':fontcolor=0x38bdf8@0.95:fontsize=16:x=60:y=h-54:shadowcolor=black@0.9:shadowx=2:shadowy=2,
    fade=t=in:st=0:d=0.4,fade=t=out:st=3.9:d=0.6
  " -c:v libx264 -pix_fmt yuv420p -crf 20 -preset faster -r 30 "$WORK_DIR/scene5.mp4") &

wait

echo "=== 4. Assembling Master Cut ==="
cat << 'CONCAT_EOF' > "$WORK_DIR/concat.txt"
file 'scene1.mp4'
file 'scene2.mp4'
file 'scene3.mp4'
file 'scene4.mp4'
file 'scene5.mp4'
CONCAT_EOF

ffmpeg -y -f concat -safe 0 -i "$WORK_DIR/concat.txt" -c copy "$WORK_DIR/video_sequence.mp4"

echo "=== 5. Muxing Master 1080p Video with 320k Audio ==="
ffmpeg -y -i "$WORK_DIR/video_sequence.mp4" -i "$WORK_DIR/soundtrack.wav" \
  -c:v copy -c:a aac -b:a 320k -shortest "$WORK_DIR/master_eferz_motion_1080p.mp4"

echo "=== 6. Deploying to Public and Dist Assets ==="
cp "$WORK_DIR/master_eferz_motion_1080p.mp4" public/videos/intro_cinematic.mp4
cp "$WORK_DIR/master_eferz_motion_1080p.mp4" public/cinematic/intro_cinematic.mp4

mkdir -p dist/videos dist/cinematic
cp "$WORK_DIR/master_eferz_motion_1080p.mp4" dist/videos/intro_cinematic.mp4
cp "$WORK_DIR/master_eferz_motion_1080p.mp4" dist/cinematic/intro_cinematic.mp4

cp public/cinematic/eferz_scene1_earth.jpg public/videos/intro_poster.jpg
cp public/cinematic/eferz_scene1_earth.jpg dist/videos/intro_poster.jpg

echo "=== ALL 5 MOTION SCENES GENERATED SUCCESSFULLY ==="
ls -lh public/videos/intro_cinematic.mp4
