<script>
  export default {
    props: {
      tag: {
        type: String,
        default: 'div'
      }
    },
    data() {
      return {
        rendered: false
      }
    },
    created() {
      let current = this.$vnode.data.directives.find(item => item.name === 'show');
      if (!current || current.value) {
        this.rendered = true;
      } else {
        this.$watchOnce(`$parent.${current.expression}`, val => {
          this.rendered = true;
        });
      }
    },
    render(h) {
      return (
        this.rendered ? <this.tag>
          {this.$slots.default}
        </this.tag> : null
      )
    }
  }
</script>