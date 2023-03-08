
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;
varying vec2    v_texcoord;

#define AA_EDGE 0.07


#include "lygia/distort/barrel.glsl"
#include "lygia/draw/rect.glsl"

void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec3 color = vec3(0.0);

    st = barrel(st, 8.0);

    st *= 5.0;
    st = fract(st - u_time);

    color = vec3(rect(vec2(st.x), 0.55));
    
    gl_FragColor = vec4(color, 1.0);
}
