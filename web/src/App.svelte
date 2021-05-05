<script lang="ts">
  import { Layout } from "../../src/layout"
  import type { ILayout } from "../../src/layout"
  import thai5k from "../../data/thai5k-freq.json"
  import { wisesight } from "../../data/wisesight"
  import { wongnai } from "../../data/wongnai"
  import thaisumTestset from "../../data/thaisum-testset.json"
  import thaisum from "../../data/thaisum-full.json"
  import Carpalx from "../../src/carpalx"

  const datasets = {
    thai5k,
    wisesight,
    wongnai,
    thaisumTestset,
    thaisum,
  }

  let keysToSwap = []
  let effort, carpalxModel

  const predefinedLayouts = [
    { id: "manoonchai_v03", text: "Manoonchai v0.3" },
    { id: "manoonchai_v02b", text: "Manoonchai v0.2b" },
    { id: "manoonchai_v02", text: "Manoonchai v0.2" },
    { id: "manoonchai_v01", text: "Manoonchai v0.1" },
    { id: "kedmanee", text: "Kedmanee" },
    { id: "pattachote", text: "Pattachote" },
    { id: "ikbaeb", text: "Ikbaeb" },
  ]

  let layoutInput = new Layout({ name: "manoonchai_v03" }).matrix
    .map((row) => JSON.stringify(row).replaceAll('","', '", "'))
    .join("\n")

  $: layoutData = layoutInput
    .trim()
    .split("\n")
    .map((line) => {
      let data = []
      try {
        data = JSON.parse(
          line.replace(/^,+|,+$/gm, "").replaceAll("'\"'", '"\\""')
        )
      } catch (e) {
        return ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]
      }
      return data
    })

  $: if (layoutData.length == 8) {
    const baseLayout = new Layout({ name: "kedmanee" })
    const layout = new Layout({ name: "custom" })
    layout.matrix = layoutData as ILayout<string>

    carpalxModel = new Carpalx({ layout })
    const baseModel = new Carpalx({ layout: baseLayout })

    const efforts: Array<[string, number]> = Object.entries(datasets).map(
      ([name, dataset]) => {
        return [name, carpalxModel.typingEffort(dataset)]
      }
    )

    const baseEfforts: Array<[string, number]> = Object.entries(datasets).map(
      ([name, dataset]) => {
        return [name, baseModel.typingEffort(dataset)]
      }
    )

    effort =
      (100 * baseEfforts.reduce((prev, [_name, eff]) => prev + eff, 0)) /
        efforts.reduce((prev, [_name, eff]) => prev + eff, 0) -
      100 +
      "%"
  }

  $: layoutDataDisplay = Array(layoutData.length / 2)
    .fill(null)
    .map((_, i) => {
      return layoutData[i].map((x, j) => [
        x,
        layoutData[i + layoutData.length / 2][j],
      ])
    })

  function swapKeyPair(e) {
    keysToSwap = [...keysToSwap, e.target.textContent]

    if (keysToSwap.length === 2) {
      const [x, y] = keysToSwap

      layoutInput = layoutInput
        .replace('"\\""', '"""')
        .replace(`"${x}"`, "{y}")
        .replace(`"${y}"`, "{x}")
        .replace("{x}", `"${x}"`)
        .replace("{y}", `"${y}"`)
        .replace('"""', '"\\""')

      keysToSwap = []
    }
  }

  function selectLayout(e) {
    const name = e.currentTarget.value
    layoutInput = new Layout({ name }).matrix
      .map((row) => JSON.stringify(row).replaceAll('","', '", "'))
      .join("\n")
  }
</script>

<main>
  <div class="container">
    <h1>Carpalx TH : Layout Renderer</h1>

    <a
      class="github-button"
      href="https://github.com/narze/carpalx-th"
      data-size="large"
      data-show-count="true"
      aria-label="Star narze/carpalx-th on GitHub">Star</a
    >

    <div class="keyboard-container">
      <div class="keyboard">
        <!-- First row -->
        <div class="key">
          <div class="key__top">~</div>
          <div class="key__bottom">`</div>
        </div>
        {#each layoutDataDisplay[0] as keypair}
          <div class="key">
            <div class="key__top swappable" on:mousedown={swapKeyPair}>
              {keypair[1]}
            </div>
            <div class="key__bottom swappable" on:mousedown={swapKeyPair}>
              {keypair[0]}
            </div>
          </div>
        {/each}
        <div class="key is-backspace">
          <div class="key__bottom">&larr;</div>
        </div>
        <!-- Second row -->
        <div class="key is-tab">
          <div class="key__bottom">&rarrb;</div>
        </div>
        {#each layoutDataDisplay[1] as keypair}
          <div class="key">
            <div class="key__top swappable" on:mousedown={swapKeyPair}>
              {keypair[1]}
            </div>
            <div class="key__bottom swappable" on:mousedown={swapKeyPair}>
              {keypair[0]}
            </div>
          </div>
        {/each}
        <!-- Third row -->
        <div class="key is-capslock is-left">
          <div class="key__bottom">ก/A</div>
        </div>
        {#each layoutDataDisplay[2] as keypair}
          <div class="key">
            <div class="key__top swappable" on:mousedown={swapKeyPair}>
              {keypair[1]}
            </div>
            <div class="key__bottom swappable" on:mousedown={swapKeyPair}>
              {keypair[0]}
            </div>
          </div>
        {/each}
        <div class="key is-enter is-right">
          <div class="key__top" />
          <div class="key__bottom">&larrhk;</div>
        </div>
        <!-- Fourth row -->
        <div class="key is-shift-left is-left">
          <div class="key__bottom">⬆</div>
        </div>
        {#each layoutDataDisplay[3] as keypair}
          <div class="key">
            <div class="key__top swappable" on:mousedown={swapKeyPair}>
              {keypair[1]}
            </div>
            <div class="key__bottom swappable" on:mousedown={swapKeyPair}>
              {keypair[0]}
            </div>
          </div>
        {/each}
        <div class="key is-shift-right is-right">
          <div class="key__bottom">⬆</div>
        </div>
        <!-- Fifth row -->
        <div class="key is-left">
          <div class="key__bottom">fn</div>
        </div>
        <div class="key is-right">
          <div class="key__bottom">control</div>
        </div>
        <div class="key is-right">
          <div class="key__top">alt</div>
          <div class="key__bottom">option</div>
        </div>
        <div class="key is-command is-right">
          <div class="key__bottom">command</div>
        </div>
        <div class="key is-space" />
        <div class="key is-command is-left">
          <div class="key__bottom">command</div>
        </div>
        <div class="key is-left">
          <div class="key__top">alt</div>
          <div class="key__bottom">option</div>
        </div>
        <div class="key is-arrow-left">&ltrif;</div>
        <div class="key is-arrow-up">&utrif;</div>
        <div class="key is-arrow-down">&dtrif;</div>
        <div class="key is-arrow-right">&rtrif;</div>
      </div>
    </div>
    {#if keysToSwap.length === 1}
      <div class="prompt">Click another character to swap</div>
    {:else}
      <div class="prompt">
        You can swap characters by clicking at the buttons
      </div>
    {/if}

    <div>
      <textarea
        id="layout-input"
        bind:value={layoutInput}
        cols="55"
        rows="10"
      />
    </div>

    <select on:change={selectLayout} on:blur={selectLayout}>
      <option disabled selected value> -- Select Layout -- </option>
      {#each predefinedLayouts as layout}
        <option value={layout.id}>
          {layout.text}
        </option>
      {/each}
    </select>

    <div>Effort vs Kedmanee : {effort}</div>
  </div>

  <script async defer src="https://buttons.github.io/buttons.js"></script>
</main>

<style lang="scss">
  @import "./styles.scss";
</style>
