<script>
    import { Router, Route } from "svelte-routing";
    import Home from "./Home.svelte";
    import NotFound from "./NotFound.svelte";
</script>

<Router>
    <Route path="/" component={Home} />
    <Route path="*" component={NotFound} />
</Router>
