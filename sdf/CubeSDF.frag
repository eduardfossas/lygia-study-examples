#ifdef GL_ES
precision mediump float;
#endif

uniform vec3        u_light;
uniform vec3        u_lightColor;

uniform vec2        u_resolution;

varying vec2        v_texcoord;

uniform float u_time;
uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

#define LIGHT_DIRECTION     u_light
#define RESOLUTION          u_resolution
#define LIGHT_COLOR         u_lightColor

#define RAYMARCH_SAMPLES 100
#define RAYMARCH_MULTISAMPLE 4

#define RAYMARCH_BACKGROUND ( vec3(0.1) )
#define RAYMARCH_AMBIENT    vec3(1.)

#include "lygia/space/ratio.glsl"
#include "lygia/space/rotateY.glsl"
#include "lygia/lighting/raymarch.glsl"
#include "lygia/sdf/cubeSDF.glsl"

vec4 raymarchMap( in vec3 pos )
{
    vec4 res = vec4(1.);
    res.a = cubeSDF(rotateY(pos, u_time) - vec3(0., 0., 0.), 0.5);
    return res;
}

void main (void) {
    vec3 color = vec3(0.0);
    vec2 st = v_texcoord;
    vec2 uv = ratio(st, u_resolution);
    color = raymarch(vec3(0., 0., 70.), uv).rgb;
 
    gl_FragColor = vec4(color, 1.0 );
}