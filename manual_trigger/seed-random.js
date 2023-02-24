!html
<script>
function random(seed) {
  const m = 0x80000000; // 2**31;
  const a = 1103515245;
  const c = 12345;
  const state = seed ? seed : Math.floor(Math.random() * (m - 1));
  return (a * state + c) % m;
}
</script>