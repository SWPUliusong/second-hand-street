const convert = {
    Number(str) {
        return Number(str) || ''
    },
    Boolean(str) {
        return Boolean(str)
    }
}

module.exports = [
    function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                if (!attrs.ngModel) return

                let typeArr = ['Number', 'Boolean']
                let type = attrs.converter
                if (!type || typeArr.indexOf(type) < 0) return

                elem.on('blur', () => {
                    _.set(scope, attrs.ngModel, convert[type](elem.val()))
                })
            }
        }
    }
]