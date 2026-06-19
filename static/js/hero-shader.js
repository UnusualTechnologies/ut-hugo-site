(function () {
  var canvas = document.getElementById('hero-shader');
  if (!canvas) return;

  var gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
  if (!gl) return;

  var vertSrc = [
    'attribute vec2 a_pos;',
    'void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }'
  ].join('\n');

  var fragSrc = [
    'precision mediump float;',
    'uniform vec2 u_res;',
    'uniform float u_time;',
    '',
    '#define PI 3.14159265',
    '',
    'vec3 palette(in float t) {',
    '    vec3 a = vec3(0.0, 0.42, 0.72);',
    '    vec3 b = vec3(0.15, 0.2, 0.22);',
    '    vec3 c = vec3(1.0, 1.0, 1.0);',
    '    vec3 d = vec3(0.0, 0.15, 0.25);',
    '    return a + b * cos(2.0 * PI * (c * t + d));',
    '}',
    '',
    'vec4 wave(vec2 uv, float amp, float freq, float phase, float thick, vec3 hue) {',
    '    float x = uv.x - phase;',
    '    float y = uv.y + amp * sin(freq * x);',
    '    float bright = smoothstep(0.0, 1.0, 1.0 - abs(y) / thick);',
    '    return vec4(vec3(bright) * hue, bright);',
    '}',
    '',
    'void main() {',
    '    vec2 uv = (2.0 * gl_FragCoord.xy - u_res) / u_res.y;',
    '    vec4 color = vec4(0.0);',
    '    for (float layer = 0.0; layer < 1.0; layer += 0.1) {',
    '        float amp = 0.25 + 0.25 * sin(u_time + layer) * (1.0 - layer);',
    '        float freq = 2.0;',
    '        float phase = u_time * (1.0 - layer);',
    '        float thick = 0.01 + 0.001 * pow(abs(uv.x), 8.0);',
    '        vec3 hue = palette(0.5 * uv.x + 1.0 * layer - 0.5 * u_time);',
    '        color += wave(uv, amp, freq, phase, thick, hue);',
    '    }',
    '    color.a = clamp(color.a, 0.0, 1.0);',
    '    gl_FragColor = color;',
    '}'
  ].join('\n');

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  var prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertSrc));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

  var aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  var uRes = gl.getUniformLocation(prog, 'u_res');
  var uTime = gl.getUniformLocation(prog, 'u_time');

  function resize() {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  resize();
  window.addEventListener('resize', resize);

  var start = performance.now();
  function frame() {
    var t = (performance.now() - start) / 3000.0;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, t);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(frame);
  }

  frame();
})();
