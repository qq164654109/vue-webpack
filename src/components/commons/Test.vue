<script>
  export default {
    functional: true,
    props: ['a'],
    render(h, {data, props}) {
      return <div {...data}>{props.a}</div>
    }
  }
</script>