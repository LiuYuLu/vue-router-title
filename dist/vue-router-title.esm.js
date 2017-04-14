var CONFIG = {
    defaultTitle:undefined   //默认标题
};

function setTitle(title){
    if (title === undefined || title === null){
        title = CONFIG.defaultTitle;
    }
    if (title !== undefined && title !== null && window){
        window.document.title = title;
    }
}

function VueRouterTitle(options){
    install(null, options);
}

function install(
        Vue,
        ref)
{
    var defaultTitle = ref.defaultTitle;
    var router = ref.router;
    var store = ref.store;
    var beforeEach = ref.beforeEach;
    var afterEach = ref.afterEach;


    if (defaultTitle !== undefined && defaultTitle !== null){
        CONFIG.defaultTitle === defaultTitle;
    }

    if (router){
        router.afterEach(function (to) {
            var title = to.matched.reduceRight( function (last, data) {
                if (last) { return last; }
                if (data.meta && data.meta.title){
                    return data.meta.title;
                } else {
                    return null;
                }
            }, null);

            if (typeof title === 'function') { title = title(to, {router: router, store: store}); }

            if (typeof beforeEach === 'function') { title = beforeEach(title, to, {router: router, store: store}); }

            setTitle(title);

            if (typeof afterEach === 'function') { title = afterEach(title, to, {router: router, store: store}); }

        });
    } else {
        console.info('请传入 router 参数');
    }
}

VueRouterTitle.install = install;

export default VueRouterTitle;
