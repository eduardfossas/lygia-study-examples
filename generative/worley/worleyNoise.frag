
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;
uniform sampler2D   u_tex0;

varying vec2    v_texcoord;

#include "lygia/generative/psrdnoise.glsl"
#include "lygia/generative/worley.glsl"
#include "lygia/generative/fbm.glsl"
#include "lygia/generative/snoise.glsl"

void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec3 color = vec3(1.);
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 v = 12.0 * (st - 0.5);
    vec2 distortedV = vec2(v.x, v.y) + vec2(fbm(vec3(v * 0.3, u_time * 0.5)));
    vec3 textureColor = texture2D(u_tex0, vec2(st)).rgb;
    float worleyN = 1. - worley(vec3(distortedV.x, distortedV.y + u_time * 1.5, u_time));
    vec2 p = vec2(0.0);
    vec2 g = vec2(0.0);


    worleyN *= worleyN * 3. - 1.75;
    textureColor = mix(vec3(textureColor + worleyN), vec3(worleyN), worleyN);
    
    
    gl_FragColor = vec4(vec3(textureColor), 1.0);
}
