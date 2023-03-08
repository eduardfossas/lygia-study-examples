// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D   u_tex0;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#define SAMPLEBUMPMAP_Z 2.

#include "lygia/sample/bumpMap.glsl"


void main() {
    vec3 color = vec3(0.0);
    vec2 pixel = 1. / u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec3 N = sampleBumpMap(u_tex0, st, pixel);
    vec3 L = normalize(vec3(1.0, 1.0, 1.0));
    float s = pow(max(dot(N,L), .0), 4.); // Shiny!
    vec3 scolor = vec3(1.0,1.0,1.0);
    vec3 ncolor = vec3(0., 0.0, 0.0);

    gl_FragColor = vec4(mix(ncolor, scolor, s), 1.0);
}
