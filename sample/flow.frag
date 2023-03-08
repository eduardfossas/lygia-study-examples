// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D   u_tex0;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;


#include "lygia/sample/flow.glsl"


void main() {
    vec3 color = vec3(0.0);
    vec2 pixel = 1. / u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    vec4 textureColor = texture2D(u_tex0, vec2(st));

    gl_FragColor = sampleFlow(u_tex0, st, vec2(1.0, 0.),u_time * 0.1, 2.);
}
