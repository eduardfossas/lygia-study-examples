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

#define LIGHT_DIRECTION     vec3(0, 0, 0)
#define RESOLUTION          u_resolution
#define LIGHT_COLOR         u_lightColor

#define RAYMARCH_SAMPLES 100
#define RAYMARCH_MULTISAMPLE 4
#define RAYMARCH_MATERIAL_FNC raymarchFresnel

#define RAYMARCH_BACKGROUND ( vec3(0.1) )
#define RAYMARCH_AMBIENT    vec3(0.)

vec3 raymarchFresnel(vec3 ray, vec3 pos, vec3 nor, vec3 map);
#include "lygia/space/ratio.glsl"
#include "lygia/lighting/fresnel.glsl"
#include "lygia/lighting/diffuse.glsl"
#include "lygia/lighting/raymarch.glsl"
#include "lygia/sdf/sphereSDF.glsl"

vec4 raymarchMap( in vec3 pos )
{
    vec4 res = vec4(1.);
    res.a = sphereSDF(pos - vec3(0., 0., 0.), 0.5);
    return res;
}

vec3 raymarchFresnel(vec3 ray, vec3 pos, vec3 nor, vec3 map) {
    vec3 color = vec3(map.z);
    vec3 vie = normalize( ray );
    vec3 lig = normalize( LIGHT_DIRECTION - pos);

    float diffuse = diffuse(lig, nor, -vie, 0.);
    vec3 diffuseColor = vec3(0, 0.6, 1);
    float fres = fresnel(0.0, dot(nor, -vie) * 0.65);

    vec3 rimColor = vec3(1, 0, 1);
    rimColor.g = sin(u_time - 1.5);
    rimColor.b = sin(u_time + 0.5);
    vec3 sphereColor = diffuse * diffuseColor + fres * rimColor;

    color = mix(color, sphereColor, step(-map.z, 0.));

    return color;
}

void main (void) {
    vec3 cameraPos = vec3(0., 5., 20.);
    vec3 color = vec3(0.0);
    vec2 st = v_texcoord;
    vec2 uv = ratio(st, u_resolution);
    color = raymarch(cameraPos, uv).rgb;
 
    gl_FragColor = vec4(color, 1.0 );
}