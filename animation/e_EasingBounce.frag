
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

varying vec2    v_texcoord;

#include "lygia/draw/circle.glsl"
#include "lygia/animation/easing.glsl"
#include "lygia/space/ratio.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    float pct = fract((u_time) * 0.25);
    pct = pct  < 0.5 ? bounceOut((pct) * 2.0) - 0.5: bounceIn( (1.-pct) * 2.0 ) - 0.5;

    st.y -= pct;

    color += circle(vec2(st.x, st.y), 0.1);
    
    gl_FragColor = vec4(color, 1.0);
}
