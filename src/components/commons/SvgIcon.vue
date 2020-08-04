<script>
export default {
  name: 'svg-icon',
  functional: true,
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconPath() {
      return '#' + this.name;
    },
    className() {
      return 'svg-icon svg-icon-' + this.name;
    }
  },
  render(h, { props }) {
    const className = 'svg-icon svg-icon-' + props.name;
    const iconPath = '#' + props.name;
    return (
      <svg class={className} aria-hidden="true">
        <use xlinkHref={iconPath}></use>
      </svg>
    );
  }
};
</script>

<style>
  .svg-icon {
    fill: currentColor;
    height: 24px;
    width: 24px;
    vertical-align: middle;
  }
</style>
