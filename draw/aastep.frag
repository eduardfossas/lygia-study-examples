
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;
varying vec2    v_texcoord;

#define AA_EDGE 0.004

#include "lygia/draw/circle.glsl"

void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec3 color = vec3(1.0);

    color -= vec3(circle(st, 0.5));
    
    gl_FragColor = vec4(color, 1.0);
}
