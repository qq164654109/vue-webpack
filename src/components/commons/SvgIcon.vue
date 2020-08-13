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
  render(h, { props, data }) {
    const className = 'svg-icon svg-icon-' + props.name;
    const iconPath = '#' + props.name;
    return (
      <svg {...data} class={className} aria-hidden="true">
        <use xlinkHref={iconPath}></use>
      </svg>
    );
  }
};
</script>

<style>
  .svg-icon {
    fill: currentColor;
    height: 18px;
    width: 18px;
    vertical-align: middle;
  }
</style>
