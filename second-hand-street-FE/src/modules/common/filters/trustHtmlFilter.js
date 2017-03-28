export default [
    '$sce',
    function ($sce) {
        return input => {
            if (_.isFinite(input)) {
                input = input.toString()
            }
            return $sce.trustAsHtml(input || '暂无')
        }
    }
]