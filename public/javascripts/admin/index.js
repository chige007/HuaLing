document.body.onload = function () {
    new Vue({
        el: '#APP',
        data: function () {
            return {
                visible: false
            }
        },
        mounted: function () {
            console.log(this.$el.removeAttribute('v-cloak'));
        }
    })
}