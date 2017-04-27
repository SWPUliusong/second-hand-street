module.exports = [
    function () {
        return {
            restrict: 'A',
            priority: 2,
            link: function (scope, elem, attrs) {

                let key = attrs.ngModel
                if (!key) return

                if (!attrs.validator) return
                let $regex = new RegExp(attrs.validator)

                elem.on('blur', renderView)

                elem.on('keydown', e => {
                    if(e.key === "Enter") return renderView(e)
                })

                function renderView(event) {
                    if (!$regex.test(_.get(scope, key))) {
                        let val = attrs.origin || ''
                        scope.$apply(() => _.set(scope, key, val))
                        event.preventDefault()
                    }
                }
            }
        }
    }
]