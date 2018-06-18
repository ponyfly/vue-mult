<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="'#icon-' + name"></use>
  </svg>
</template>

<script>
  export default {
    name: 'svgicon',
    props: {
      name: {
        type: String,
        required: true
      }
    }
  }
</script>

<style>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    overflow: hidden;
    fill: currentColor;
  }
</style>
