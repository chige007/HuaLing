const menus = [{
    url: '/home',
    name: {
        cn: '首页',
        en: 'Home',
        hk: '首頁'
    }
}, {
    url: '',
    name: {
        cn: '集团简介',
        en: 'About us',
        hk: '集團簡介'
    },
    sub: [{
        url: '/group_business',
        name: {
            cn: '集团业务',
            en: 'Who we are',
            hk: '集團業務'
        }
    // }, {
    //     url: '/core_value',
    //     name: {
    //         cn: '核心价值',
    //         en: 'Core Value',
    //         hk: '核心價值'
    //     }
    }, {
        url: '/development_history',
        name: {
            cn: '发展历程',
            en: 'Our Journey',
            hk: '發展歷程'
        },
    }, {
        url: '/management_team',
        name: {
            cn: '桦岭团队',
            en: 'Our Teams',
            hk: '樺嶺團隊'
        },
    }]
}, {
    url: '',
    name: {
        cn: '我们的业务',
        en: 'Our Business',
        hk: '我們的業務'
    },
    sub: [{
        url: '/seven_business',
        name: {
            cn: '七大板块业务',
            en: 'Business Sectors',
            hk: '七大板塊業務'
        }
    }, {
        url: '/cooperation_mode',
        name: {
            cn: '合作模式',
            en: 'Our Services',
            hk: '合作模式'
        }
    }]
}, {
    url: '',
    name: {
        cn: '产品线',
        en: 'Our lines',
        hk: '產品線'
    },
    sub: [{
        url: '/four_commodity',
        name: {
            cn: '四大商品系列',
            en: 'Four Sport Lines',
            hk: '四大商品系列'
        }
    }, {
        url: '/brand',
        name: {
            cn: '品牌',
            en: 'Brands',
            hk: '品牌'
        }
    }]
}, {
    url: '/latest_information',
    name: {
        cn: '最新资讯',
        en: 'News',
        hk: '最新資訊'
    }
}, {
    url: '/join_us',
    name: {
        cn: '加入我们',
        en: 'Join Us',
        hk: '加入我們'
    }
}, {
    url: '/contact_us',
    name: {
        cn: '联系我们',
        en: 'Contact Us',
        hk: '聯繫我們'
    }
}];

module.exports = menus;