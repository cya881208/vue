<template>
    <div class="recommend">
        <div class="recommend-content">
            <div v-if="recomends.length" class="slide-wrapper">
                <slider>
                    <div v-for="item in recomends">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="">
                        </a>
                    </div>
                </slider>
            </div>
        </div>
        <div class="recommend-list">
            <h1 class="list-title"></h1>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getReCommend} from 'api/recomend'
    import {ERR_OK} from 'api/config'
    import Slider from 'base/slider/slider'
    export default {
      created() {
        this._getCommend()
      },
      data() {
        return {
          recomends: []
        }
      },
      methods: {
        _getCommend () {
          getReCommend().then((res) => {
            if (res.code === ERR_OK) {
              this.recomends = res.data.slider
            }
          })
        }
      },
      components: {
        Slider
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
    @import "~common/stylus/variable"

    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)

</style>