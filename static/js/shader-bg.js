(function () {
  var container = document.getElementById('shader-bg');
  if (!container) return;

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  var parallaxFactor = 0.35;

  function shaderHeight() {
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    return Math.round(window.innerHeight + maxScroll * parallaxFactor);
  }

  renderer.setSize(window.innerWidth, shaderHeight());
  container.appendChild(renderer.domElement);

  var uniforms = {
    iTime: { value: 0.0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, shaderHeight()) }
  };

  var vertexShader = [
    'void main() {',
    '  gl_Position = vec4(position, 1.0);',
    '}'
  ].join('\n');

  var fragmentShader = [
    'precision highp float;',
    'uniform float iTime;',
    'uniform vec2 iResolution;',
    '',
    'vec4 colormap(float x) {',
    '  vec3 dark = vec3(20.0/255.0, 38.0/255.0, 28.0/255.0);',
    '  vec3 mid = vec3(121.0/255.0, 196.0/255.0, 173.0/255.0);',
    '  vec3 bright = vec3(200.0/255.0, 240.0/255.0, 220.0/255.0);',
    '  vec3 col = x < 0.5 ? mix(dark, mid, x * 2.0) : mix(mid, bright, (x - 0.5) * 2.0);',
    '  return vec4(col, 1.0);',
    '}',
    '',
    'float rand(vec2 n) {',
    '  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);',
    '}',
    '',
    'float noise(vec2 p) {',
    '  vec2 ip = floor(p);',
    '  vec2 u = fract(p);',
    '  u = u * u * (3.0 - 2.0 * u);',
    '  float res = mix(',
    '    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),',
    '    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);',
    '  return res * res;',
    '}',
    '',
    'const mat2 mtx = mat2(0.80, 0.60, -0.60, 0.80);',
    '',
    'float fbm(vec2 p) {',
    '  float f = 0.0;',
    '  f += 0.500000 * noise(p + iTime); p = mtx * p * 2.02;',
    '  f += 0.031250 * noise(p);         p = mtx * p * 2.01;',
    '  f += 0.250000 * noise(p);         p = mtx * p * 2.03;',
    '  f += 0.125000 * noise(p);         p = mtx * p * 2.01;',
    '  f += 0.062500 * noise(p);         p = mtx * p * 2.04;',
    '  f += 0.015625 * noise(p + sin(iTime));',
    '  return f / 0.96875;',
    '}',
    '',
    'float pattern(in vec2 p) {',
    '  return fbm(p + fbm(p + fbm(p)));',
    '}',
    '',
    'void main() {',
    '  vec2 uv = gl_FragCoord.xy / iResolution.x * 0.3;',
    '  float shade = pattern(uv);',
    '  shade = pow(shade, 2.0);',
    '  shade = clamp(shade, 0.15, 1.0);',
    '  gl_FragColor = vec4(colormap(shade).rgb, 1.0);',
    '}'
  ].join('\n');

  var geometry = new THREE.PlaneGeometry(2, 2);
  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });
  scene.add(new THREE.Mesh(geometry, material));

  function onResize() {
    var w = window.innerWidth;
    var h = shaderHeight();
    renderer.setSize(w, h);
    uniforms.iResolution.value.set(w, h);
  }
  window.addEventListener('resize', onResize);

  // Parallax: shift the shader-bg slower than the page scroll
  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    container.style.transform = 'translateY(' + (scrollY * -parallaxFactor) + 'px)';
  }, { passive: true });

  var startTime = Date.now();
  function animate() {
    requestAnimationFrame(animate);
    uniforms.iTime.value = (Date.now() - startTime) * 0.0001;
    renderer.render(scene, camera);
  }
  animate();
})();
